import { notFound } from "next/navigation";
import FormProjects from "@/components/pages/admin/FormProjects";
import ProjectsList from "@/components/pages/admin/entitiesList/ProjectsList";
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
    const projects = parseIdsAsStringIds(
        await readUncachedData(() => DB.projects.find().toArray()),
    );

    return (
        <div>
            <h3>Projects</h3>
            <FormProjects lang={lang} />
            <div className="overflow-auto">
                <ProjectsList lang={lang} projects={projects} />
            </div>
        </div>
    );
};

export default Home;
