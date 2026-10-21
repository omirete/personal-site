"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import type { Project } from "@/helpers/database/collections/project";
import type { Locale } from "@/i18n/config";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import type WithStringId from "@/types/WithStringId";
import type { ChangeEvent, FC } from "react";
import useFormProjects, { type ProjectFields } from "./useFormProjects";

const editorFields: {
    name: keyof ProjectFields;
    label: string;
    placeholder: string;
    required?: boolean;
    rows?: number;
}[] = [
    {
        name: "name",
        label: "Name",
        placeholder: "Name of your project.",
        required: true,
    },
    {
        name: "alias",
        label: "Alias",
        placeholder: "Give an alias to your project.",
        required: true,
    },
    {
        name: "imgUrl",
        label: "Image URL",
        placeholder: "Paste the link to an image.",
    },
    {
        name: "tags",
        label: "Tags",
        placeholder: "Separate your tags with commas.",
        required: true,
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Give a short description.",
        required: true,
        rows: 2,
    },
    {
        name: "fullContent",
        label: "Full content",
        placeholder: "Describe the project in detail.",
        rows: 6,
    },
];

const FormProjects: FC<{
    lang: Locale;
    projects: WithStringId<Project>[];
    initialSelectedId?: string;
}> = ({ lang, projects, initialSelectedId = "" }) => {
    const {
        selectedId,
        fields,
        setFields,
        selectProject,
        handleSubmit,
        handleDelete,
        busy,
        action,
        dirty,
        feedback,
    } = useFormProjects(lang, projects, initialSelectedId);
    const names = projects.map((project) => parseStringI18N(project.name, lang));

    return (
        <form onSubmit={handleSubmit} className="mb-3" aria-busy={busy}>
            <fieldset disabled={busy} className="row g-2">
                <div className="col-12 mb-1">
                    <div className="input-group">
                        <label
                            className="input-group-text"
                            style={{ minWidth: "12.5ch" }}
                            htmlFor="project-selector"
                        >
                            Project
                        </label>
                        <select
                            id="project-selector"
                            className="form-select"
                            value={selectedId}
                            onChange={(event) => selectProject(event.target.value)}
                        >
                            <option value="">New project</option>
                            {projects.map((project, index) => (
                                <option key={project._id} value={project._id}>
                                    {names[index] || "Untitled project"}
                                    {names.filter((name) => name === names[index])
                                        .length > 1
                                        ? ` (${index + 1})`
                                        : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {editorFields.map((field) => {
                    const props = {
                        id: `project-${field.name}`,
                        name: field.name,
                        className: "form-control",
                        placeholder: field.placeholder,
                        required: field.required,
                        value: fields[field.name],
                        onChange: (
                            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                        ) =>
                            setFields((previous) => ({
                                ...previous,
                                [field.name]: event.target.value,
                            })),
                    };
                    return (
                        <div
                            className={field.rows ? "col-12" : "col-12 col-md-6"}
                            key={field.name}
                        >
                            <div className="input-group">
                                <label
                                    className="input-group-text"
                                    style={{ minWidth: "12.5ch" }}
                                    htmlFor={props.id}
                                >
                                    {field.label}
                                </label>
                                {field.rows ? (
                                    <textarea {...props} rows={field.rows} />
                                ) : (
                                    <input {...props} type="text" />
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className="col-12 d-flex flex-wrap gap-2 pt-1">
                    <SubmitButton
                        className="btn btn-primary"
                        loading={action === "save"}
                        disabled={busy || (!!selectedId && !dirty)}
                        text={selectedId ? "Save changes" : "Create"}
                        textLoading={selectedId ? "Saving" : "Creating"}
                    />
                    {selectedId && (
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={handleDelete}
                        >
                            {action === "delete" ? "Deleting…" : "Delete"}
                        </button>
                    )}
                </div>
            </fieldset>
            {feedback && (
                <div
                    className={`alert alert-${feedback.type} mt-3`}
                    role={feedback.type === "danger" ? "alert" : "status"}
                >
                    {feedback.message}
                </div>
            )}
        </form>
    );
};

export default FormProjects;
