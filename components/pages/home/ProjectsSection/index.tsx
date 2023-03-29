"use client";

import FullHeightSection from "@/components/ui/FullHeightSection";
import { Project } from "@/helpers/database/ProjectsCtor";
import FCi18n from "@/i18n/types/FCi18n";
import { useState } from "react";
import { dict } from "./dictionary";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

const ProjectsSection: FCi18n<{ projects: Project[] }> = ({
    lang,
    projects,
}) => {
    const [activeProject, setActiveProject] = useState<Project | undefined>();
    const localeDict = dict[lang];
    return (
        <FullHeightSection id="projects" className="py-4 px-3 px-sm-5">
            <h3 className="mt-5 mb-3 text-white">{localeDict.projects}</h3>
            <p className="text-white">{localeDict.explanation}</p>
            <p className="text-white d-block d-sm-none">
                {localeDict.touchToLearn}
            </p>
            <div className="row">
                <div className="col-12 col-sm-6">
                    <div className="row g-2">
                        {projects.map((p, i) => {
                            const active = activeProject?.id === p.id;
                            return (
                                <div
                                    key={i}
                                    className="col-12 col-md-6 col-lg-4"
                                >
                                    <div className="d-flex flex-column h-100">
                                        {/* Desktop variant */}
                                        <ProjectCard
                                            project={p}
                                            className={`
                                                flex-grow-1 d-none d-sm-block
                                                bg-white cursor-pointer-hover
                                                ${
                                                    active
                                                        ? "bg-opacity-100"
                                                        : "bg-opacity-75"
                                                }
                                            `}
                                            onPointerEnter={() => {
                                                setActiveProject(p);
                                            }}
                                        />
                                        {/* Mobile variant */}
                                        <ProjectCard
                                            project={p}
                                            className={`
                                                flex-grow-1 d-block d-sm-none
                                                bg-white cursor-pointer-hover
                                                ${
                                                    active
                                                        ? "bg-opacity-100"
                                                        : "bg-opacity-75"
                                                }
                                            `}
                                            onClick={() => {
                                                if (
                                                    activeProject?.id === p.id
                                                ) {
                                                    setActiveProject(undefined);
                                                } else {
                                                    setActiveProject(p);
                                                }
                                            }}
                                        />
                                        {activeProject &&
                                            activeProject.id === p.id && (
                                                <ProjectDetail
                                                    lang={lang}
                                                    project={activeProject}
                                                    className={`
                                                            px-3 py-2 mt-2
                                                            rounded shadow
                                                            bg-dark bg-opacity-75
                                                            text-white
                                                            d-block d-sm-none
                                                        `}
                                                />
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="d-none d-sm-block col-sm-6">
                    {activeProject === undefined && (
                        <div
                            className={`
                                h-100 p-3 position-relative
                                d-flex align-items-center justify-content-center
                                text-white fw-bold
                            `}
                        >
                            <span>{localeDict.hoverToLearn}</span>
                            <div
                                className={`
                                    h-100 w-100 position-absolute
                                    border border-5 border-dashed rounded
                                    opacity-50
                                `}
                                style={{ top: 0, left: 0 }}
                            />
                        </div>
                    )}
                    {activeProject !== undefined && (
                        <div>
                            <ProjectDetail
                                lang={lang}
                                project={activeProject}
                                className={`
                                    px-3 py-2
                                    rounded shadow
                                    bg-dark bg-opacity-75
                                    text-white
                                `}
                            />
                        </div>
                    )}
                </div>
            </div>
        </FullHeightSection>
    );
};

export default ProjectsSection;
