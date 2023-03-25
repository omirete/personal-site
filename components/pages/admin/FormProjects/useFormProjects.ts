import { FormEventHandler, useCallback, useState } from "react";

export interface UseFormProjects {
    creating: boolean;
    handleCreate: FormEventHandler<HTMLFormElement>;
}
const useFormProjects = (): UseFormProjects => {
    const [creating, setCreating] = useState(false);

    const handleCreate: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/projects`;
            console.log("will make request. Url: " + url);
            setCreating(true);
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });
            console.log('made request')
            if (res.status === 200) {
                alert("Project created correctly.");
                window.location.reload();
            } else {
                alert(`Could not create project. Error: ${await res.text()}`);
            }
            setCreating(false);
        },
        []
    );

    return {
        creating,
        handleCreate,
    };
};

export default useFormProjects;
