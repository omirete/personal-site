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
import { Locale } from "@/i18n/config";
import { NextPage } from "next";
import { DB } from "@/helpers/firebase";

interface GetData {
    personalInfo: PersonalInfo | null;
    highlights: Highlight[];
    experience: Experience[];
    projects: Project[];
}

const getData = async (): Promise<GetData> => {
    try {
        const personalInfo = JSON.parse(
            await readFile(`cache/personalInfo.json`, { encoding: "utf-8" })
        );
        const highlights = JSON.parse(
            await readFile(`cache/highlights.json`, { encoding: "utf-8" })
        );
        const experience = JSON.parse(
            await readFile(`cache/experience.json`, { encoding: "utf-8" })
        );
        const projects = JSON.parse(
            await readFile(`cache/projects.json`, { encoding: "utf-8" })
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
const Home: NextPage = async ({ params }: { params: { lang: Locale } }) => {
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
                    <LandingSection
                        lang={params.lang}
                        personalInfo={personalInfo}
                    />
                    <HighlightsSection
                        lang={params.lang}
                        highlights={highlights}
                    />
                    <ExperienceSection
                        lang={params.lang}
                        experience={experience}
                    />
                    <ProjectsSection lang={params.lang} projects={projects} />
                </div>
                <ContactMeSection
                    lang={params.lang}
                    personalInfo={personalInfo}
                />
                <Footer lang={params.lang} personalInfo={personalInfo} />
            </main>
        );
    } else {
        return <div>Please configure your personal info.</div>;
    }
};

export default Home;
