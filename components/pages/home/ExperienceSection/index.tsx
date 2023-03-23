import FullHeightSection from "@/components/ui/FullHeightSection";
import { Experience } from "@/helpers/database/ExperienceCtor";
import sortExperience from "@/helpers/sortExperience";
import ExperienceCard from "./ExperienceCard";

const ExperienceSection: React.FC<{ experience: Experience[] }> = ({
    experience,
}) => {
    return (
        <FullHeightSection id="experience" className="py-4 px-5">
            <h3 className="mt-5 mb-3 text-white">Experience</h3>
            <div className="row g-3">
                {experience.sort(sortExperience).map((exp) => (
                    <div key={exp.id} className="col-12 col-sm-6 col-md-4">
                        <ExperienceCard experience={exp} className="bg-opacity-75 bg-white" />
                    </div>
                ))}
            </div>
        </FullHeightSection>
    );
};

export default ExperienceSection;
