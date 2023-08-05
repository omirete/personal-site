import WithStringId from "@/types/WithStringId";
import { ObjectId, WithId } from "mongodb";

export default function parseIdsAsObjectIds<T>(
    elements: (WithStringId<T>)[]
): WithId<T>[] {
    return elements.map((elem) => {
        const { _id, ...rest } = elem;
        return {
            _id: new ObjectId(_id),
            ...rest,
        } as WithId<T>; // check
    });
}
