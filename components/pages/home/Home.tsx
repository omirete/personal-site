import ContactMeSection from "@/components/pages/home/ContactSection";
import ExperienceSection from "@/components/pages/home/ExperienceSection";
import HighlightsSection from "@/components/pages/home/HighlightsSection";
import LandingSection from "@/components/pages/home/LandingSection";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import Footer from "@/components/ui/Footer";
import { Experience } from "@/helpers/database/collections/experience";
import { Highlight } from "@/helpers/database/collections/highlight";
import { Project } from "@/helpers/database/collections/project";
import { readFile } from "fs/promises";
import DB from "@/helpers/database/DB";
import FCi18n from "@/i18n/types/FCi18n";
import { PersonalInfo } from "@/helpers/database/collections/personalInfo";
import WithStringId from "@/types/WithStringId";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";

interface GetData {
    personalInfo: PersonalInfo | null;
    highlights: WithStringId<Highlight>[];
    experience: WithStringId<Experience>[];
    projects: WithStringId<Project>[];
}

const getData = async (): Promise<GetData> => {
    try {
        const personalInfo = JSON.parse(
            await readFile(`public/cache/personalInfo.json`, {
                encoding: "utf-8",
            })
        );
        const highlights = JSON.parse(
            await readFile(`public/cache/highlights.json`, {
                encoding: "utf-8",
            })
        );
        const experience = JSON.parse(
            await readFile(`public/cache/experience.json`, {
                encoding: "utf-8",
            })
        );
        const projects = JSON.parse(
            await readFile(`public/cache/projects.json`, { encoding: "utf-8" })
        );
        return {
            personalInfo,
            highlights,
            experience,
            projects,
        };
    } catch (error) {
        console.error(error);
        // Fallback, get the data directly from the DB (time costly).
        const basicInfo = await DB.personalInfo.basicInfo.get();
        const contactInfo = await DB.personalInfo.contactInfo.get();
        const personalInfo = {
            basicInfo: basicInfo !== null ? basicInfo : { name: "" },
            contactInfo: contactInfo !== null ? contactInfo : { email: "" },
            socialNetworks: parseIdsAsStringIds(
                await DB.personalInfo.socialNetworks.find().toArray()
            ),
        };
        const highlights = parseIdsAsStringIds(
            await DB.highlights.find().toArray()
        );
        const experience = parseIdsAsStringIds(
            await DB.experience.find().toArray()
        );
        const projects = parseIdsAsStringIds(
            await DB.projects.find().toArray()
        );

        return {
            personalInfo,
            highlights,
            experience,
            projects,
        };
    }
};

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: FCi18n<> = async ({ lang }) => {
    const { personalInfo, highlights, experience, projects } = await getData();

    if (personalInfo) {
        return (
            <main>
                <div
                    style={{
                        backgroundImage:
                            "linear-gradient(to right top,#3b4969,#7a5283,#be5678,#e3704f,#d7a319)",
                    }}
                >
                    <LandingSection lang={lang} personalInfo={personalInfo} />
                    <HighlightsSection lang={lang} highlights={highlights} />
                    <ExperienceSection lang={lang} experience={experience} />
                    <ProjectsSection lang={lang} projects={projects} />
                </div>
                <ContactMeSection lang={lang} personalInfo={personalInfo} />
                <Footer lang={lang} personalInfo={personalInfo} />
            </main>
        );
    } else {
        return <div>Please configure your personal info.</div>;
    }
};

export default Home;
