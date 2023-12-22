import { Locale } from "@/i18n/config";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage<{ params: { lang: Locale } }> = async ({
    params: { lang },
}) => {
    redirect(`/${lang}/admin/files`);
};

export default Home;
