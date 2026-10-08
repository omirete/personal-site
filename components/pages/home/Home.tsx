import ContactMeSection from "@/components/pages/home/ContactSection";
import ExperienceSection from "@/components/pages/home/ExperienceSection";
import HighlightsSection from "@/components/pages/home/HighlightsSection";
import LandingSection from "@/components/pages/home/LandingSection";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import Footer from "@/components/ui/Footer";
import FCi18n from "@/i18n/types/FCi18n";
import {
    getPublicPersonalInfo,
    getPublicHighlights,
    getPublicExperience,
    getPublicProjects,
} from "@/helpers/database/getPublicCollections";

const Home: FCi18n<{}> = async ({ lang }) => {
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
