import { authOptions } from "@/helpers/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getFiles } from "@/helpers/fileStorage";
import { getUploadConfig, MAX_UPLOAD_SIZE } from "@/helpers/fileStorage/uploadConfig";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { del } from "@vercel/blob";

export const GET = async (): Promise<NextResponse> => {
    if (!await getServerSession(authOptions)) {
        return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json({ error: "Vercel Blob storage is not configured." }, { status: 503 });
    }
    try {
        return NextResponse.json({ files: await getFiles(), msg: "ok" });
    } catch (error) {
        console.error("Could not list Blob files", error);
        return NextResponse.json({ error: "Could not list uploaded files. Please try again." }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    if (!await getServerSession(authOptions)) {
        return NextResponse.json({ error: "You must be signed in to delete a file." }, { status: 401 });
    }
    const pathname = req.nextUrl.searchParams.get("pathname");
    if (!pathname?.trim() || pathname.includes("://")) {
        return NextResponse.json({ error: "A file pathname is required." }, { status: 400 });
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json({ error: "Vercel Blob storage is not configured." }, { status: 503 });
    }
    try {
        await del(pathname);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Could not delete Blob file", error);
        return NextResponse.json({ error: "Could not delete the file. Please try again." }, { status: 500 });
    }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body = await req.json() as HandleUploadBody;
        // The SDK verifies completion callbacks; upload token requests require an admin session.
        if (body.type === "blob.generate-client-token" && !await getServerSession(authOptions)) {
            return NextResponse.json({ error: "You must be signed in to upload a file." }, { status: 401 });
        }
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            return NextResponse.json({ error: "Vercel Blob storage is not configured." }, { status: 503 });
        }
        const response = await handleUpload({
            body,
            request: req,
            onBeforeGenerateToken: async (pathname, clientPayload) => {
                if (!clientPayload) throw new Error("Missing upload details.");
                const { type, lang, name } = JSON.parse(clientPayload);
                if (typeof type !== "string" || typeof lang !== "string" || typeof name !== "string") {
                    throw new Error("Invalid upload details.");
                }
                const config = getUploadConfig(type, lang, name);
                if (pathname !== config.pathname) throw new Error("Invalid upload path.");
                return {
                    allowedContentTypes: config.contentTypes,
                    maximumSizeInBytes: MAX_UPLOAD_SIZE,
                    addRandomSuffix: false,
                    allowOverwrite: true,
                    cacheControlMaxAge: 60,
                    validUntil: Date.now() + 10 * 60 * 1000,
                };
            },
        });
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
    }
};
