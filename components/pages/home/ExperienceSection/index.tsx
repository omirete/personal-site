import FullHeightSection from "@/components/ui/FullHeightSection";
import { Experience } from "@/helpers/database/ExperienceCtor";
import sortExperience from "@/helpers/sortExperience";
import ExperienceCard from "./ExperienceCard";
import ExperienceTimeline from "./ExperienceTimeline";

const ExperienceSection: React.FC<{ experience: Experience[] }> = ({
    experience,
}) => {
    return (
        <FullHeightSection id="experience" className="py-4 px-3 px-sm-5">
            <h3 className="mt-5 mb-3 text-white">Experience</h3>
            <div className="row">
                <div className="col-12 col-md-4">
                    <ExperienceTimeline
                        experience={experience.sort((a, b) =>
                            sortExperience(a, b, false)
                        )}
                    />
                </div>
                <div className="d-none d-md-block col-md-8">
                    <div className="row g-2">
                        {experience.sort(sortExperience).map((exp, i) => (
                            <div
                                key={exp.id}
                                className="col-12 col-sm-6 col-lg-4"
                            >
                                <ExperienceCard
                                    experience={exp}
                                    className={`
                                        bg-opacity-75 bg-white border-0 shadow
                                        h-100
                                    `}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FullHeightSection>
    );
};

export default ExperienceSection;
