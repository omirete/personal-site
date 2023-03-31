import FullHeightSection from "@/components/ui/FullHeightSection";
import { Experience } from "@/helpers/database/ExperienceCtor";
import sortExperience from "@/helpers/sortExperience";
import FCi18n from "@/i18n/types/FCi18n";
import { dict } from "./dictionary";
import ExperienceCard from "./ExperienceCard";
import ExperienceTimeline from "./ExperienceTimeline";

const ExperienceSection: FCi18n<{ experience: Experience[] }> = ({
    lang,
    experience,
}) => {
    const localeDict = dict[lang];
    return (
        <FullHeightSection id="experience" className="py-4 px-3 px-sm-5">
            <h3 className="mt-5 mb-3 text-white">{localeDict.experience}</h3>
            <div className="row">
                <div className="col-12 col-md-4">
                    <ExperienceTimeline
                        lang={lang}
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
                                    lang={lang}
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
