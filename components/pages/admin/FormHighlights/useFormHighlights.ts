import { Locale } from "@/i18n/config";
import { FormEventHandler, useCallback, useState } from "react";

export interface UseFormHighlights {
    creating: boolean;
    handleCreate: FormEventHandler<HTMLFormElement>;
}
const useFormHighlights = (lang: Locale): UseFormHighlights => {
    const [creating, setCreating] = useState(false);

    const handleCreate: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const url = `/api/highlights?locale=${lang}`;
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
        [lang]
    );

    return {
        creating,
        handleCreate,
    };
};

export default useFormHighlights;
