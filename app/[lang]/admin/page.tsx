import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage<{ params: Promise<{ lang: string }> }> = async ({
    params,
}) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    redirect(`/${lang}/admin/files`);
};

export default Home;
