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
        <div className={`card ${className ?? ""}`} {...props}>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title d-flex flex-row">
                    {experience.title}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {experience.institution}
                </h6>
                <p className="card-text small text-muted flex-grow-1">
                    <span>{experience.description}</span>
                    {experience.relevantUrl && (
                        <a
                            href={experience.relevantUrl}
                            className="badge bg-info text-decoration-none text-muted"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {experience.type === "studies" &&
                                "View certificate"}
                            {experience.type !== "studies" && "See link"}
                        </a>
                    )}
                </p>
                <div className="card-text text-secondary d-flex small">
                    <div className="flex-grow-1">
                        <span>
                            {new Date(experience.dateFrom).toLocaleDateString(
                                undefined,
                                { year: "numeric", month: "short" }
                            )}
                        </span>
                        {experience.dateTo && (
                            <>
                                <span>, </span>
                                <span>
                                    {new Date(
                                        experience.dateTo
                                    ).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                    })}
                                </span>
                            </>
                        )}
                    </div>
                    <div>
                        {experience.type === "work" && "💼"}
                        {experience.type === "studies" && "🎓"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceCard;
