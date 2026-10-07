import { Locale } from "@/i18n/config";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage<{ params: Promise<{ lang: string }> }> = async ({
    params,
}) => {
    const lang = (await params).lang as Locale;
    redirect(`/${lang}/admin/files`);
};

export default Home;
