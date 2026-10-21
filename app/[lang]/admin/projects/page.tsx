import { notFound } from "next/navigation";
import FormProjects from "@/components/pages/admin/FormProjects";
import DB from "@/helpers/database/DB";
import readUncachedData from "@/helpers/database/readUncachedData";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { hasLocale } from "@/i18n/config";
import { NextPage } from "next";

const Home: NextPage<{
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ project?: string | string[] }>;
}> = async ({
    params,
    searchParams,
}) => {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    const projects = parseIdsAsStringIds(
        await readUncachedData(() => DB.projects.find().toArray()),
    );
    const { project } = await searchParams;

    return (
        <div>
            <h3>Projects</h3>
            <FormProjects
                key={lang}
                lang={lang}
                projects={projects}
                initialSelectedId={typeof project === "string" ? project : ""}
            />
        </div>
    );
};

export default Home;
