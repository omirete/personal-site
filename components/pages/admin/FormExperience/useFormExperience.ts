import { Locale } from "@/i18n/config";
import { FormEventHandler, useCallback, useState } from "react";

export interface UseFormExperience {
    creating: boolean;
    handleCreate: FormEventHandler<HTMLFormElement>;
}
const useFormExperience = (lang: Locale): UseFormExperience => {
    const [creating, setCreating] = useState(false);

    const handleCreate: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const url = `/api/experience?locale=${lang}`;
            setCreating(true);
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if (res.status === 200) {
                alert("Experience created correctly.");
                window.location.reload();
            } else {
                alert(
                    `Could not create experience. Error: ${await res.text()}`,
                );
            }
            setCreating(false);
        },
        [lang],
    );

    return {
        creating,
        handleCreate,
    };
};

export default useFormExperience;
