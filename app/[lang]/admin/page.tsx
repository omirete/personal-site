import { Locale } from "@/i18n/config";
import { NextPage } from "next";
import { redirect } from 'next/navigation';

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{params: {lang: Locale}}> = async ({params: {lang}}) => {
    redirect(`/${lang}/admin/files`);
};

export default Home;
