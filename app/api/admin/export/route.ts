import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { BSON } from "mongodb";
import { authOptions } from "@/helpers/auth";
import DB from "@/helpers/database/DB";
import {
    exportCollections,
    isExportCollection,
} from "@/helpers/database/exportCollections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "private, no-store" };

export async function GET(req: NextRequest): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { error: "Please sign in to export your database." },
            { status: 401, headers },
        );
    }

    const collection = req.nextUrl.searchParams.get("collection");
    if (!collection || (collection !== "all" && !isExportCollection(collection))) {
        return NextResponse.json(
            { error: "Select a supported collection or all collections." },
            { status: 400, headers },
        );
    }

    try {
        const names = collection === "all" ? exportCollections : [collection];
        const entries = await Promise.all(
            names.map(async (name) => [
                name,
                await DB.database
                    .collection(name)
                    .find({}, { promoteValues: false })
                    .toArray(),
            ] as const),
        );
        const data = collection === "all" ? Object.fromEntries(entries) : entries[0][1];
        const date = new Date().toISOString().slice(0, 10);

        return new NextResponse(BSON.EJSON.stringify(data, undefined, 2, { relaxed: false }), {
            headers: {
                ...headers,
                "Content-Type": "application/json; charset=utf-8",
                "Content-Disposition": `attachment; filename="federicogiancarelli-${collection}-${date}.json"`,
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Unable to export the database. Please try again." },
            { status: 500, headers },
        );
    }
}
