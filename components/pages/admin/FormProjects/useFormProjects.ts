import type { Project } from "@/helpers/database/collections/project";
import type { Locale } from "@/i18n/config";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import type WithStringId from "@/types/WithStringId";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import type { FormEventHandler } from "react";

export type ProjectFields = {
    name: string;
    alias: string;
    description: string;
    fullContent: string;
    imgUrl: string;
    tags: string;
};
type Fields = ProjectFields;
const emptyFields: Fields = {
    name: "",
    alias: "",
    description: "",
    fullContent: "",
    imgUrl: "",
    tags: "",
};

const getFields = (
    project: WithStringId<Project> | null,
    lang: Locale,
): Fields =>
    project
        ? {
              name: parseStringI18N(project.name, lang),
              description: parseStringI18N(project.description, lang),
              fullContent: parseStringI18N(project.fullContent, lang),
              alias: project.alias,
              imgUrl: project.imgUrl ?? "",
              tags: project.tags.join(","),
          }
        : emptyFields;

const rememberSelection = (id: string) => {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("project", id);
    else url.searchParams.delete("project");
    window.history.replaceState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`,
    );
};

const useFormProjects = (
    lang: Locale,
    projects: WithStringId<Project>[],
    initialSelectedId = "",
) => {
    const router = useRouter();
    const initialProject =
        projects.find((item) => item._id === initialSelectedId) ?? null;
    const [selected, setSelected] = useState<WithStringId<Project> | null>(
        initialProject,
    );
    const [fields, setFields] = useState<Fields>(() =>
        getFields(initialProject, lang),
    );
    const [savedFields, setSavedFields] = useState<Fields>(() =>
        getFields(initialProject, lang),
    );
    const [action, setAction] = useState<"save" | "delete" | null>(null);
    const [feedback, setFeedback] = useState<{
        type: "success" | "danger";
        message: string;
    } | null>(null);
    const [refreshing, startTransition] = useTransition();
    const requestInFlight = useRef(false);
    const busy = action !== null || refreshing;
    const dirty = (Object.keys(fields) as (keyof Fields)[]).some(
        (key) => fields[key] !== savedFields[key],
    );

    const selectProject = (id: string) => {
        if (busy || requestInFlight.current || id === (selected?._id ?? ""))
            return;
        if (dirty && !window.confirm("Discard unsaved changes?")) return;
        const project = projects.find((item) => item._id === id) ?? null;
        const values = getFields(project, lang);
        rememberSelection(project?._id ?? "");
        setSelected(project);
        setFields(values);
        setSavedFields(values);
        setFeedback(null);
    };

    const mutate = async (operation: "save" | "delete") => {
        if (busy || requestInFlight.current) return;
        if (operation === "delete") {
            if (!selected || !window.confirm("Delete this project?")) return;
        } else if (selected && !dirty) return;

        requestInFlight.current = true;
        setAction(operation);
        setFeedback(null);
        try {
            let response: Response;
            let updated: WithStringId<Project> | null = null;
            if (operation === "delete") {
                response = await fetch(
                    `/api/projects?id=${encodeURIComponent(selected!._id)}`,
                    {
                        method: "DELETE",
                    },
                );
            } else if (selected) {
                updated = {
                    ...selected,
                    name: { ...selected.name, [lang]: fields.name },
                    alias: fields.alias,
                    imgUrl: fields.imgUrl,
                    tags: fields.tags.split(","),
                    fullContent: {
                        ...selected.fullContent,
                        [lang]: fields.fullContent,
                    },
                    description: {
                        ...selected.description,
                        [lang]: fields.description,
                    },
                };
                response = await fetch("/api/projects", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updated),
                });
            } else {
                const body = new FormData();
                Object.entries(fields).forEach(([key, value]) =>
                    body.set(key, value),
                );
                response = await fetch(`/api/projects?locale=${lang}`, {
                    method: "POST",
                    body,
                });
            }
            // Some existing endpoints return errors with a 200 status.
            const result = await response.json();
            if (
                !response.ok ||
                result.error ||
                (operation === "delete" && !result.success)
            ) {
                throw new Error(
                    typeof result.error === "string"
                        ? result.error
                        : "The request could not be completed. Please try again.",
                );
            }

            if (updated) {
                setSelected(updated);
                setSavedFields({ ...fields });
            } else {
                rememberSelection("");
                setSelected(null);
                setFields(emptyFields);
                setSavedFields(emptyFields);
            }
            setFeedback({
                type: "success",
                message:
                    operation === "delete"
                        ? "Project deleted."
                        : updated
                          ? "Project saved."
                          : "Project created.",
            });
            startTransition(() => router.refresh());
        } catch (error) {
            setFeedback({
                type: "danger",
                message: `Could not ${operation === "delete" ? "delete" : selected ? "save" : "create"} project. ${
                    error instanceof Error ? error.message : "Please try again."
                }`,
            });
        } finally {
            requestInFlight.current = false;
            setAction(null);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        void mutate("save");
    };

    return {
        selectedId: selected?._id ?? "",
        fields,
        setFields,
        selectProject,
        handleSubmit,
        handleDelete: () => void mutate("delete"),
        busy,
        action,
        dirty,
        feedback,
    };
};

export default useFormProjects;
