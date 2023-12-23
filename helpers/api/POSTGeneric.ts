import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/helpers/auth";
import { getServerSession } from "next-auth";
import {
    Document,
    Collection,
    InsertOneResult,
    OptionalUnlessRequiredId,
} from "mongodb";

async function POSTGeneric<T extends Document>(
    req: NextRequest,
    collection: Collection<T>,
    newValue: OptionalUnlessRequiredId<T>,
): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (session) {
        // Authorized
        try {
            const result: InsertOneResult<T> =
                await collection.insertOne(newValue);
            return NextResponse.json({ experience: result });
        } catch (error) {
            return NextResponse.json({ error });
        }
    } else {
        return NextResponse.json({}, { status: 401 });
    }
}

export default POSTGeneric;
