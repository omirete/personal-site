import { FormEventHandler, useCallback, useState } from "react";

export interface UseFormHighlights {
    creating: boolean;
    handleCreate: FormEventHandler<HTMLFormElement>;
}
const useFormHighlights = (): UseFormHighlights => {
    const [creating, setCreating] = useState(false);

    const handleCreate: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const url = `${process.env.NEXT_PUBLIC_API_BASE_FETCH_URL}/api/highlights`;
            setCreating(true);
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if (res.status === 200) {
                alert("Highlight created correctly.");
                window.location.reload();
            } else {
                alert(
                    `Could not create highglight. Error: ${await res.text()}`
                );
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

export default useFormHighlights;
