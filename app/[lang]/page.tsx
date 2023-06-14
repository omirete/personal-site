import { Locale } from "@/i18n/config";
import { NextPage } from "next";
import Home from "@/components/pages/home/Home";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Page: NextPage = async ({ params }: { params: { lang: Locale } }) => {
    return <Home lang={params.lang} />;
};

export default Page;
