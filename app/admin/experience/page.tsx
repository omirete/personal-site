import ExperienceList from "@/components/pages/admin/ExperienceList";
import FormExperience from "@/components/pages/admin/FormExperience";
import { DB } from "@/helpers/firebase";
import sortExperience from "@/helpers/sortExperience";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const experience = await DB.data.experience.getAll();
    return (
        <div>
            <h3>Experience</h3>
            <FormExperience />
            <div className="overflow-auto">
                <ExperienceList experience={experience.sort(sortExperience)} />
            </div>
        </div>
    );
};

export default Home;
