import ExperienceList from "@/components/admin/ExperienceList";
import FormExperience from "@/components/admin/FormExperience";
import { Experience } from "@/helpers/database/ExperienceCtor";
import { DB } from "@/helpers/firebase";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const experience = await DB.data.experience.getAll();
    const sortExperience = (a: Experience, b: Experience) => {
        const dateFrom_a = new Date(a.dateFrom);
        const dateFrom_b = new Date(b.dateFrom);

        const startDiff = dateFrom_a.getTime() - dateFrom_b.getTime();

        switch (startDiff) {
            case 0:
                const dateTo_a = new Date(a.dateTo ?? new Date());
                const dateTo_b = new Date(b.dateTo ?? new Date());
                return dateTo_a.getTime() - dateTo_b.getTime();
            default:
                return startDiff;
        }
    };
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
