import FormHighlights from "@/components/pages/admin/FormHighlights";
import HighlightsList from "@/components/pages/admin/HighlightsList";
import { DB } from "@/helpers/firebase";
import { Locale } from "@/i18n/config";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{ params: { lang: Locale } }> = async ({
    params: { lang },
}) => {
    const highlights = await DB.data.highlights.getAll();

    return (
        <div>
            <h3>Highlights</h3>
            <FormHighlights lang={lang} />
            <HighlightsList lang={lang} highlights={highlights} />
        </div>
    );
};

export default Home;
