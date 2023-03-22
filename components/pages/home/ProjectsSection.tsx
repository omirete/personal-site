import FullHeightSection from "@/components/ui/FullHeightSection";
import { Project } from "@/helpers/database/ProjectsCtor";

const ProjectsSection: React.FC<{ projects: Project[] }> = ({
    projects,
}) => {
    return (
        <FullHeightSection id="projects" className="py-4 px-5">
            <h3 className="mt-5">Projects</h3>
        </FullHeightSection>
    );
};

export default ProjectsSection;
