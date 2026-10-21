import { notFound } from "next/navigation";
import FormHighlights from "@/components/pages/admin/FormHighlights";
import DB from "@/helpers/database/DB";
import readUncachedData from "@/helpers/database/readUncachedData";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";

const Home: NextPage<{
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ highlight?: string | string[] }>;
}> = async ({ params, searchParams }) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    const highlights = parseIdsAsStringIds(
        await readUncachedData(() => DB.highlights.find().toArray()),
    );
    const { highlight } = await searchParams;
    return (
        <div>
            <h3>Highlights</h3>
            <FormHighlights
                key={lang}
                lang={lang}
                highlights={highlights}
                initialSelectedId={
                    typeof highlight === "string" ? highlight : ""
                }
            />
        </div>
    );
};

export default Home;
