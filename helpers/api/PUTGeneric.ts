import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/helpers/auth";
import { getServerSession } from "next-auth";
import { ObjectId, UpdateResult, Document, Collection, Filter } from "mongodb";

async function PUTGeneric<T extends Document>(
    req: NextRequest,
    collection: Collection<T>,
    id: string,
    newValue: Partial<T>,
): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const filter = { _id: new ObjectId(id) } as Filter<T>;
            const updateResult: UpdateResult<T> = await collection.updateOne(
                filter,
                { $set: newValue },
            );
            if (
                updateResult.modifiedCount > 0 ||
                updateResult.upsertedCount > 0
            ) {
                return NextResponse.json({ result: updateResult });
            } else {
                return NextResponse.json(
                    { error: "Could not update entity" },
                    { status: 400 },
                );
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error }, { status: 500 });
        }
    } else {
        return NextResponse.json({}, { status: 401 }); // UNAUTHORIZED
    }
}

export default PUTGeneric;
