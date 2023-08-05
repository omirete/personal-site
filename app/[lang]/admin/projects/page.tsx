import FormProjects from "@/components/pages/admin/FormProjects";
import ProjectsList from "@/components/pages/admin/entitiesList/ProjectsList";
import DB from "@/helpers/database/DB";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { Locale } from "@/i18n/config";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{ params: { lang: Locale } }> = async ({
    params: { lang },
}) => {
    const projects = parseIdsAsStringIds(await DB.projects.find().toArray());

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
