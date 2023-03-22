import { Project } from "@/helpers/database/ProjectsCtor";
import { FormEventHandler, RefObject, useRef, useState } from "react";

export interface UseFormCreateProject {
    loading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    formRef: RefObject<HTMLFormElement>;
}

const useFormCreateProject = (): UseFormCreateProject => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        let missingProperties: string[] = [];

        const alias = data.get("alias")?.toString();
        const name = data.get("name")?.toString();
        const description = data.get("description")?.toString();
        const tags = data.get("tags")?.toString();

        if (alias && name && description && tags) {
            const project: Omit<Project, "id"> = {
                alias: alias,
                name: name,
                description: description,
                tags: tags.split(","),
            };
            const url = `/api/projects`;
            fetch(url, {
                method: "POST",
                body: JSON.stringify(project),
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        if (formRef.current) {
                            formRef.current.reset();
                        }
                    } else {
                        throw new Error(await res.text());
                    }
                })
                .catch((e) => {
                    console.error(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            throw new Error(
                `Missing properties: ${missingProperties.join(", ")}`
            );
        }
    };
    return { handleSubmit, loading, formRef };
};

export default useFormCreateProject;
