import ContactMeSection from "@/components/pages/home/ContactSection";
import ExperienceSection from "@/components/pages/home/ExperienceSection";
import HighlightsSection from "@/components/pages/home/HighlightsSection";
import LandingSection from "@/components/pages/home/LandingSection";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import Footer from "@/components/ui/Footer";
import { DB } from "@/helpers/firebase";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage = async () => {
    const personalInfo = await DB.data.personalInfo.ALL.get();
    const highlights = await DB.data.highlights.getAll();
    const experience = await DB.data.experience.getAll();
    const projects = await DB.data.projects.getAll();
    if (personalInfo)
        return (
            <main>
                <div
                    style={{
                        backgroundImage:
                            "linear-gradient(to right top,#3b4969,#7a5283,#be5678,#e3704f,#d7a319)",
                    }}
                >
                    <LandingSection personalInfo={personalInfo} />
                    <HighlightsSection highlights={highlights} />
                    <ExperienceSection experience={experience} />
                    <ProjectsSection projects={projects} />
                </div>
                <ContactMeSection personalInfo={personalInfo} />
                <Footer personalInfo={personalInfo} />
            </main>
        );
};

export default Home;
