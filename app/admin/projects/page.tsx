import FormProjects from "@/components/pages/admin/FormProjects";
import ProjectsList from "@/components/pages/admin/ProjectsList";
import { DB } from "@/helpers/firebase";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const projects = await DB.data.projects.getAll();

    return (
        <div>
            <h3>Projects</h3>
            <FormProjects />
            <div className="overflow-auto">
                <ProjectsList projects={projects} />
            </div>
        </div>
    );
};

export default Home;
