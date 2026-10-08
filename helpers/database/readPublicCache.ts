import { readFile } from "fs/promises";

export const readPublicCache = async <T>(
    filename: string,
    loadFromDatabase: () => Promise<T>,
): Promise<T> => {
    try {
        return JSON.parse(await readFile(`public/cache/${filename}`, "utf-8"));
    } catch (error) {
        console.error(error);
        return loadFromDatabase();
    }
};
