import type { Highlight } from "@/helpers/database/collections/highlight";
import type { Locale } from "@/i18n/config";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import type StringI18N from "@/i18n/types/StringI18N";
import type WithStringId from "@/types/WithStringId";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import type { FormEventHandler } from "react";

type Fields = { title: string; description: string };
const emptyFields: Fields = { title: "", description: "" };

const getFields = (
    highlight: WithStringId<Highlight> | null,
    lang: Locale,
): Fields =>
    highlight
        ? {
              title: parseStringI18N(highlight.title, lang),
              description: parseStringI18N(highlight.description, lang),
          }
        : emptyFields;

const rememberSelection = (id: string) => {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("highlight", id);
    else url.searchParams.delete("highlight");
    window.history.replaceState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`,
    );
};

const useFormHighlights = (
    lang: Locale,
    highlights: WithStringId<Highlight>[],
    initialSelectedId = "",
) => {
    const router = useRouter();
    const initialHighlight =
        highlights.find((item) => item._id === initialSelectedId) ?? null;
    const [selected, setSelected] = useState<WithStringId<Highlight> | null>(
        initialHighlight,
    );
    const [fields, setFields] = useState<Fields>(() =>
        getFields(initialHighlight, lang),
    );
    const [savedFields, setSavedFields] = useState<Fields>(() =>
        getFields(initialHighlight, lang),
    );
    const [action, setAction] = useState<"save" | "delete" | null>(null);
    const [feedback, setFeedback] = useState<{
        type: "success" | "danger";
        message: string;
    } | null>(null);
    const [refreshing, startTransition] = useTransition();
    const requestInFlight = useRef(false);
    const busy = action !== null || refreshing;
    const dirty =
        fields.title !== savedFields.title ||
        fields.description !== savedFields.description;

    const selectHighlight = (id: string) => {
        if (busy || requestInFlight.current || id === (selected?._id ?? ""))
            return;
        if (dirty && !window.confirm("Discard unsaved changes?")) return;
        const highlight = highlights.find((item) => item._id === id) ?? null;
        const values = getFields(highlight, lang);
        rememberSelection(highlight?._id ?? "");
        setSelected(highlight);
        setFields(values);
        setSavedFields(values);
        setFeedback(null);
    };

    const mutate = async (operation: "save" | "delete") => {
        if (busy || requestInFlight.current) return;
        if (operation === "delete") {
            if (!selected || !window.confirm("Delete this highlight?")) return;
        } else if (selected && !dirty) return;

        requestInFlight.current = true;
        setAction(operation);
        setFeedback(null);
        try {
            let response: Response;
            let updated: WithStringId<Highlight> | null = null;
            if (operation === "delete") {
                response = await fetch(
                    `/api/highlights?id=${encodeURIComponent(selected!._id)}`,
                    {
                        method: "DELETE",
                    },
                );
            } else if (selected) {
                updated = {
                    ...selected,
                    title: { ...selected.title, [lang]: fields.title },
                    description: {
                        ...selected.description,
                        [lang]: fields.description,
                    } as StringI18N,
                };
                response = await fetch("/api/highlights", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updated),
                });
            } else {
                const body = new FormData();
                body.set("title", fields.title);
                body.set("description", fields.description);
                response = await fetch(`/api/highlights?locale=${lang}`, {
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
                        ? "Highlight deleted."
                        : updated
                          ? "Highlight saved."
                          : "Highlight created.",
            });
            startTransition(() => router.refresh());
        } catch (error) {
            setFeedback({
                type: "danger",
                message: `Could not ${operation === "delete" ? "delete" : selected ? "save" : "create"} highlight. ${
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
        selectHighlight,
        handleSubmit,
        handleDelete: () => void mutate("delete"),
        busy,
        action,
        dirty,
        feedback,
    };
};

export default useFormHighlights;
