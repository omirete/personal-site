import { headers } from "next/headers";

const useServerPathname = async (): Promise<string | null> => {
    const headersList = await headers();
    // read the custom x-url header
    return headersList.get("x-url");
};

export default useServerPathname;
