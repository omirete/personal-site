"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import FCi18n from "@/i18n/types/FCi18n";
import useFormHighlights from "./useFormHighlights";

const FormHighlights: FCi18n = ({lang}) => {
    const { handleCreate, creating } = useFormHighlights(lang);
    return (
        <form onSubmit={handleCreate} className="mb-3">
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12.5ch" }}>
                    Title
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name your highlight."
                    name="title"
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12.5ch" }}>
                    Description
                </span>
                <textarea
                    className="form-control"
                    placeholder="Describe it here."
                    name="description"
                />
            </div>
            <SubmitButton
                className="btn btn-primary w-100"
                loading={creating}
                text="Create"
                textLoading="Creating"
            />
        </form>
    );
};

export default FormHighlights;
