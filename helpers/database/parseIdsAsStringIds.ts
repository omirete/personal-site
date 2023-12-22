import WithStringId from "@/types/WithStringId";
import { WithId } from "mongodb";

export default function parseIdsAsStringIds<T>(
    elements: WithId<T>[],
): WithStringId<T>[] {
    return elements.map((elem) => {
        const { _id, ...rest } = elem;
        return {
            _id: _id.toHexString(),
            ...rest,
        } as WithStringId<T>; // check
    });
}
