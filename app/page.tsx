import { i18n } from "@/i18n/config";
import { NextPage } from "next";
import MyNavbar from "@/components/layout/MyNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Home from "@/components/pages/home/Home";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Page: NextPage = async () => {
    const session = await getServerSession(authOptions);
    const lang = i18n.defaultLocale;
    return (
        <html lang={lang} data-bs-theme="light">
            <body>
                <MyNavbar session={session} lang={lang} />
                <Home lang={lang} />
            </body>
        </html>
    );
};

export default Page;
