import { Project } from "@/helpers/database/ProjectsCtor";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProjectCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    className,
    ...props
}) => {
    return (
        <div className={`card ${className}`} {...props}>
            <div className="card-body p-2 h-100">
                <div className="d-flex flex-column h-100">
                    <div className="flex-grow-1">
                        <b className="card-title">{project.name}</b>
                        <p className="card-text text-muted small mb-0">
                            {project.description}
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
