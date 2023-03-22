import FullHeightSection from "@/components/ui/FullHeightSection";
import { Experience } from "@/helpers/database/ExperienceCtor";

const ExperienceSection: React.FC<{ experience: Experience[] }> = ({
    experience,
}) => {
    return (
        <FullHeightSection id="experience" className="py-4 px-5">
            <h3 className="mt-5">Experience</h3>
        </FullHeightSection>
    );
};

export default ExperienceSection;
