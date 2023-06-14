import ContactMeSection from "@/components/pages/home/ContactSection";
import ExperienceSection from "@/components/pages/home/ExperienceSection";
import HighlightsSection from "@/components/pages/home/HighlightsSection";
import LandingSection from "@/components/pages/home/LandingSection";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import Footer from "@/components/ui/Footer";
import { Experience } from "@/helpers/database/ExperienceCtor";
import { Highlight } from "@/helpers/database/HighlightsCtor";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import { Project } from "@/helpers/database/ProjectsCtor";
import { readFile } from "fs/promises";
import { DB } from "@/helpers/firebase";
import FCi18n from "@/i18n/types/FCi18n";

interface GetData {
    personalInfo: PersonalInfo | null;
    highlights: Highlight[];
    experience: Experience[];
    projects: Project[];
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
        const personalInfo = await DB.data.personalInfo.ALL.get();
        const highlights = await DB.data.highlights.getAll();
        const experience = await DB.data.experience.getAll();
        const projects = await DB.data.projects.getAll();
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
