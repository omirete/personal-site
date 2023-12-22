import { Locale } from "@/i18n/config";
import { NextPage } from "next";
import Home from "@/components/pages/home/Home";

const Page: NextPage<{ params: { lang: Locale } }> = async ({
    params: { lang },
}) => {
    return <Home lang={lang} />;
};

export default Page;
