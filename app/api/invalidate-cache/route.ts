import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/auth";
import { PUBLIC_CONTENT_TAG } from "@/helpers/database/publicCache";

const headers = { "Cache-Control": "private, no-store" };

async function refreshCache(): Promise<NextResponse> {
    try {
        // Expire immediately; the next public render loads and caches fresh MongoDB data.
        revalidateTag(PUBLIC_CONTENT_TAG, { expire: 0 });
        return NextResponse.json({ ok: true }, { headers });
    } catch (error) {
        console.error("Unable to refresh public website cache", error);
        return NextResponse.json(
            { error: "Unable to refresh the website cache. Please try again." },
            { status: 500, headers },
        );
    }
}

export async function POST(): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    const authorizedEmails = process.env.AUTHORIZED_EMAILS?.split(",");
    if (!session?.user?.email || !authorizedEmails?.includes(session.user.email)) {
        return NextResponse.json(
            { error: "Please sign in as an administrator to refresh the cache." },
            { status: 401, headers },
        );
    }
    return refreshCache();
}
