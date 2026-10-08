import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";
import Home from "@/components/pages/home/Home";

const Page: NextPage<{ params: Promise<{ lang: string }> }> = async ({
    params,
}) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    return <Home lang={lang} />;
};

export default Page;
