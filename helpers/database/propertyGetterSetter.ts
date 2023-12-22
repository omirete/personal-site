import WithStringId from "@/types/WithStringId";
import { Collection, ObjectId, Filter, Document } from "mongodb";
import parseIdsAsStringIds from "./parseIdsAsStringIds";

export interface PropertyGetterSetter<T> {
    get: () => Promise<WithStringId<T> | null>;
    set: (value: Partial<T>) => Promise<boolean>;
}

export default function getterSetter<T extends Document>(
    collection: Collection<T>,
): PropertyGetterSetter<T> {
    const SINGLE_ID = new ObjectId("000000000000000000000000");
    const filter = { _id: SINGLE_ID } as Filter<T>;

    const get = async () => {
        const data = await collection.findOne(filter);
        if (data !== null) {
            return parseIdsAsStringIds([data])[0];
        } else {
            return null;
        }
    };

    const set = async (value: Partial<T>) => {
        try {
            const result = await collection.updateOne(
                filter,
                { $set: value },
                {
                    upsert: true,
                },
            );
            return result.modifiedCount > 0 || result.upsertedCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return {
        get,
        set,
    };
}
