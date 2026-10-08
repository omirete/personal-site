import { notFound } from "next/navigation";
import FormHighlights from "@/components/pages/admin/FormHighlights";
import HighlightsList from "@/components/pages/admin/entitiesList/HighlightsList";
import DB from "@/helpers/database/DB";
import readUncachedData from "@/helpers/database/readUncachedData";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";

const Home: NextPage<{ params: Promise<{ lang: string }> }> = async ({
    params,
}) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    const highlights = parseIdsAsStringIds(
        await readUncachedData(() => DB.highlights.find().toArray()),
    );
    return (
        <div>
            <h3>Highlights</h3>
            <FormHighlights lang={lang} />
            <HighlightsList lang={lang} highlights={highlights} />
        </div>
    );
};

export default Home;
