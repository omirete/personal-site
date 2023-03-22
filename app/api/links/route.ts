import LinkInfo from "@/types/DataObjects/LinkInfo";
import { NextRequest, NextResponse } from "next/server";

import { DB } from "@/helpers/firebase";
import getMissingProperties from "@/helpers/getMissingParams";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const links = await DB.data.links.getAll();
    return NextResponse.json(links);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const link: Omit<LinkInfo, "id"> = await req.json();
            if (link.url) {
                const createdLink: LinkInfo =
                    await DB.data.links.create(link);
                return NextResponse.json({ createdLink });
            } else {
                return NextResponse.json({
                    error: `You need to specify a url.`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({ error: "You need to be logged in." });
    }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const link: LinkInfo = await req.json();

            if ((link.id, link.id)) {
                const updatedLink: LinkInfo | false =
                    await DB.data.links.update(link);
                if (updatedLink) {
                    return NextResponse.json({ updatedLink });
                } else {
                    return NextResponse.json({
                        error: "Could not update the link. Please try again.",
                    });
                }
            } else {
                const missingParams: string[] = getMissingProperties({
                    id: link.id,
                    url: link.url,
                });
                return NextResponse.json({
                    error: `Missing params: ${missingParams.join(", ")}`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({ error: "You need to be logged in." });
    }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const { id }: LinkInfo = await req.json();

            if (id) {
                await DB.data.links.remove(id);
                return NextResponse.json(true);
            } else {
                return NextResponse.json({
                    error: `Missing id.`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({ error: "You need to be logged in." });
    }
};
