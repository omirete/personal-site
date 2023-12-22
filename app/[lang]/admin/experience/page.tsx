import ExperienceList from "@/components/pages/admin/entitiesList/ExperienceList";
import FormExperience from "@/components/pages/admin/FormExperience";
import DB from "@/helpers/database/DB";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import sortExperience from "@/helpers/sortExperience";
import { Locale } from "@/i18n/config";
import { NextPage } from "next";

const Home: NextPage<{ params: { lang: Locale } }> = async ({
    params: { lang },
}) => {
    const experience = parseIdsAsStringIds(
        await DB.experience.find().toArray(),
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
