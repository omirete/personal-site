import { Project } from "@/helpers/database/ProjectsCtor";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import FCi18n from "@/i18n/types/FCi18n";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProjectCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    project: Project;
}

const ProjectCard: FCi18n<ProjectCardProps> = ({
    lang,
    project,
    className,
    ...props
}) => {
    return (
        <div className={`card border-0 ${className}`} {...props}>
            <div className="card-body p-2 h-100">
                <div className="d-flex flex-column h-100">
                    <div className="flex-grow-1">
                        <b className="card-title">{parseStringI18N(project.name, lang)}</b>
                        <p className="card-text text-muted small mb-0">
                            {parseStringI18N(project.description, lang)}
                        </p>
                    </div>
                    <div>
                        {project.tags.map((t, i) => {
                            return (
                                <span
                                    key={i}
                                    className="badge bg-secondary me-1"
                                >
                                    {t}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
