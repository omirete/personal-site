import { connection } from "next/server";

export default async function readUncachedData<T>(readFromDatabase: () => Promise<T>): Promise<T> {
    // Keep admin data fresh by reading the database at request time, outside prerendering.
    // Pass direct database reads: connection() does not bypass an explicitly cached function.
    // Establish this boundary before MongoDB's driver accesses the current time,
    // which Cache Components rejects during prerendering. No DB connection is opened here.
    await connection();
    return readFromDatabase();
}
