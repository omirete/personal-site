import { NextRequest, NextResponse } from "next/server";
import DB from "@/helpers/database/DB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LinkInfo from "@/types/DataObjects/LinkInfo";
import getMissingProperties from "@/helpers/getMissingParams";
import { DeleteResult, InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const links = await DB.links.find().toArray();
    return NextResponse.json(links);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const link: Omit<LinkInfo, "id"> = await req.json();
            if (link.url) {
                const createdLink: InsertOneResult<LinkInfo> =
                    await DB.links.insertOne(link);
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
            const body: WithId<LinkInfo> = await req.json();

            const id = body._id;
            const text = body.text;
            const url = body.url;

            if (id) {
                const updatedLink: UpdateResult<LinkInfo> = await DB.links.updateOne(
                    { _id: new ObjectId(id) },
                    {
                        text,
                        url,
                    }
                );
                if (
                    updatedLink.modifiedCount > 0 ||
                    updatedLink.upsertedCount > 0
                ) {
                    return NextResponse.json({ updatedLink });
                } else {
                    return NextResponse.json({
                        error: "Could not update the link. Please try again.",
                    });
                }
            } else {
                const missingParams: string[] = getMissingProperties({
                    id: body._id,
                    url: body.url,
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
            const id = req.nextUrl.searchParams.get("id");
            if (id) {
                const success: DeleteResult = await DB.links.deleteOne({
                    _id: new ObjectId(id),
                });
                return NextResponse.json({ success: success.deletedCount > 0 });
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
