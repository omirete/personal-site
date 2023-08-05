import ExperienceList from "@/components/pages/admin/entitiesList/ExperienceList";
import FormExperience from "@/components/pages/admin/FormExperience";
import DB from "@/helpers/database/DB";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import sortExperience from "@/helpers/sortExperience";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{ params: { lang } }> = async ({ params: { lang } }) => {
    const experience = parseIdsAsStringIds(
        await DB.experience.find().toArray()
    );
    return (
        <div>
            <h3>Experience</h3>
            <FormExperience lang={lang} />
            <div className="overflow-auto">
                <ExperienceList
                    lang={lang}
                    experience={experience.sort(sortExperience)}
                />
            </div>
        </div>
    );
};

export default Home;
