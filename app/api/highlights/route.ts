import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/helpers/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getMissingProperties from "@/helpers/getMissingParams";
import { Highlight } from "@/helpers/database/HighlightsCtor";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const highlights = await DB.data.highlights.getAll();
    return NextResponse.json(highlights);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const formData: FormData = await req.formData();

            const title = formData.get("title")?.toString();
            const description = formData.get("description")?.toString();

            if (title) {
                const highlight: Highlight = await DB.data.highlights.create({
                    title,
                    description,
                });
                return NextResponse.json({ highlight });
            } else {
                const missingProperties = getMissingProperties({
                    title,
                });
                return NextResponse.json({
                    error: `Missing properties: ${missingProperties.join(
                        ", "
                    )}`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in to.",
        });
    }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const body: Highlight = await req.json();

            const id = body.id;
            const title = body.title;
            const description = body.description;

            if (id && title) {
                const highlight: Highlight | false =
                    await DB.data.highlights.update({
                        id,
                        description,
                        title,
                    });
                if (highlight !== false) {
                    return NextResponse.json({ highlight });
                } else {
                    return NextResponse.json(
                        { error: "Could not update highlight." },
                        { status: 400 }
                    );
                }
            } else {
                const missingProperties = getMissingProperties({
                    id,
                    title,
                });
                return NextResponse.json({
                    error: `Missing properties: ${missingProperties.join(
                        ", "
                    )}`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in.",
        });
    }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const id = req.nextUrl.searchParams.get("id");
            if (id) {
                const success: boolean = await DB.data.highlights.remove(id);
                return NextResponse.json(success);
            } else {
                return NextResponse.json({
                    error: `Missing properties: id`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({
            error: "You must be signed in.",
        });
    }
};
