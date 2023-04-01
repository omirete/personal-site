import { headers } from "next/headers";

const useServerPathname = (): string | null => {
    const headersList = headers();
    // read the custom x-url header
    return headersList.get("x-url");
};

export default useServerPathname;
