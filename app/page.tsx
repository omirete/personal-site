import { i18n } from "@/i18n/config";
import { NextPage } from "next";
import MyNavbar from "@/components/layout/MyNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/auth";
import Home from "@/components/pages/home/Home";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Page: NextPage = async () => {
    const session = await getServerSession(authOptions);
    const lang = i18n.defaultLocale;
    return (
        <html lang={lang} data-bs-theme="light">
            <body>
                <MyNavbar session={session} lang={lang} />
                <Home lang={lang} />
                <SpeedInsights />
            </body>
        </html>
    );
};

export default Page;
