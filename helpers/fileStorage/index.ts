import { list } from "@vercel/blob";
import type { StoredFile } from "./types";

export const getFiles = async (): Promise<StoredFile[]> => {
    const files: StoredFile[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ cursor, limit: 1000 });
        files.push(...page.blobs.map((blob) => ({
            pathname: blob.pathname,
            url: blob.url,
            downloadUrl: blob.downloadUrl,
            size: blob.size,
            uploadedAt: blob.uploadedAt.toISOString(),
        })));
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return files.sort((a, b) => a.pathname.localeCompare(b.pathname));
};
