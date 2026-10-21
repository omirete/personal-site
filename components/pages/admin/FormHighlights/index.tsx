"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import type { Highlight } from "@/helpers/database/collections/highlight";
import type { Locale } from "@/i18n/config";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import type WithStringId from "@/types/WithStringId";
import type { FC } from "react";
import useFormHighlights from "./useFormHighlights";

const FormHighlights: FC<{
    lang: Locale;
    highlights: WithStringId<Highlight>[];
    initialSelectedId?: string;
}> = ({ lang, highlights, initialSelectedId = "" }) => {
    const {
        selectedId,
        fields,
        setFields,
        selectHighlight,
        handleSubmit,
        handleDelete,
        busy,
        action,
        dirty,
        feedback,
    } = useFormHighlights(lang, highlights, initialSelectedId);
    const titles = highlights.map((highlight) =>
        parseStringI18N(highlight.title, lang),
    );

    return (
        <form onSubmit={handleSubmit} className="mb-3" aria-busy={busy}>
            <fieldset disabled={busy}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="highlight-selector">
                        Highlight
                    </label>
                    <select
                        id="highlight-selector"
                        className="form-select"
                        value={selectedId}
                        onChange={(event) =>
                            selectHighlight(event.target.value)
                        }
                    >
                        <option value="">New highlight</option>
                        {highlights.map((highlight, index) => (
                            <option key={highlight._id} value={highlight._id}>
                                {titles[index] || "Untitled highlight"}
                                {titles.filter(
                                    (title) => title === titles[index],
                                ).length > 1
                                    ? ` (${index + 1})`
                                    : ""}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="highlight-title">
                        Title
                    </label>
                    <input
                        id="highlight-title"
                        className="form-control"
                        type="text"
                        placeholder="Name your highlight."
                        name="title"
                        required
                        value={fields.title}
                        onChange={(event) =>
                            setFields((previous) => ({
                                ...previous,
                                title: event.target.value,
                            }))
                        }
                    />
                </div>
                <div className="mb-3">
                    <label
                        className="form-label"
                        htmlFor="highlight-description"
                    >
                        Description
                    </label>
                    <textarea
                        id="highlight-description"
                        className="form-control"
                        placeholder="Describe it here."
                        name="description"
                        rows={8}
                        value={fields.description}
                        onChange={(event) =>
                            setFields((previous) => ({
                                ...previous,
                                description: event.target.value,
                            }))
                        }
                    />
                </div>
                <div className="d-flex flex-wrap gap-2">
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

export default FormHighlights;
