export const getFileUrl = (pathname: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BLOB_BASE_URL must be configured.");
    }
    return `${baseUrl.replace(/\/+$/, "")}/${pathname.replace(/^\/+/, "")}`;
};
