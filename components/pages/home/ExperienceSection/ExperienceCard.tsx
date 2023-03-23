import { Experience } from "@/helpers/database/ExperienceCtor";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ExperienceCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    experience,
    className,
    ...props
}) => {
    return (
        <div className={`card h-100 ${className ?? ""}`} {...props}>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title d-flex flex-row">
                    <span className="flex-grow-1">{experience.title}</span>
                    <span>
                        {experience.type === 'work' && '💼'}
                        {experience.type === 'studies' && '🎓'}
                    </span>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {experience.institution}
                </h6>
                <p className="card-text flex-grow-1">{experience.description}</p>
                <p className="card-text text-secondary">
                    <span>From: {experience.dateFrom}</span>
                    <span>, until: </span>
                    <span>{experience.dateTo}</span>
                </p>
            </div>
        </div>
    );
};

export default ExperienceCard;
