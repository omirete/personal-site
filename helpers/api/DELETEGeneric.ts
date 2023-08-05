import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ObjectId, Document, Collection, Filter, DeleteResult } from "mongodb";

async function DELETEGeneric<T extends Document>(
    req: NextRequest,
    collection: Collection<T>
): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const id = req.nextUrl.searchParams.get("id");
            if (id) {
                const filter = { _id: new ObjectId(id) } as Filter<T>;
                const success: DeleteResult = await collection.deleteOne(
                    filter
                );
                return NextResponse.json({ success: success.deletedCount > 0 });
            } else {
                return NextResponse.json({
                    error: `Missing properties: id`,
                });
            }
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    } else {
        return NextResponse.json({}, { status: 401 });
    }
}

export default DELETEGeneric;
