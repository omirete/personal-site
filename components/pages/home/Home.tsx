import ContactMeSection from "@/components/pages/home/ContactSection";
import ExperienceSection from "@/components/pages/home/ExperienceSection";
import HighlightsSection from "@/components/pages/home/HighlightsSection";
import LandingSection from "@/components/pages/home/LandingSection";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import Footer from "@/components/ui/Footer";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import {
    getPublicPersonalInfo,
    getPublicHighlights,
    getPublicExperience,
    getPublicProjects,
} from "@/helpers/database/getPublicCollections";

import { getDictionary } from "@/app/[lang]/dictionaries";

const Home: FC<{ lang: Locale } & {}> = async ({ lang }) => {
    const dictionary = await getDictionary(lang);
    const [personalInfo, highlights, experience, projects] = await Promise.all([
        getPublicPersonalInfo(),
        getPublicHighlights(),
        getPublicExperience(),
        getPublicProjects(),
    ]);

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
                    <HighlightsSection dictionary={dictionary.highlightsSection} lang={lang} highlights={highlights} />
                    <ExperienceSection lang={lang} experience={experience} />
                    <ProjectsSection dictionary={dictionary.projectsSection} lang={lang} projects={projects} />
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
