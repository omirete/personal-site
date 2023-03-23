"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import useFormExperience from "./useFormExperience";

const FormExperience: React.FC = () => {
    const { handleCreate, creating } = useFormExperience();
    return (
        <form onSubmit={handleCreate} className="mb-3">
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Type
                </span>
                <select className="form-control" name="type" required>
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="work">💼 Work</option>
                    <option value="studies">🎓 Studies</option>
                </select>
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Title
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Your position."
                    name="title"
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Institution
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name of the company."
                    name="institution"
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Dates
                </span>
                <div className="form-control p-0 d-flex flex-wrap">
                    <div className="col-12 col-sm-6">
                        <input
                            className="form-control border-0 shadow-none"
                            type="date"
                            name="dateFrom"
                            required
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <input
                            className="form-control border-0 shadow-none col-12 col-sm-6"
                            type="date"
                            name="dateTo"
                        />
                    </div>
                </div>
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Description
                </span>
                <textarea
                    className="form-control"
                    placeholder="Describe your activities."
                    name="description"
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Tags
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Separate your tags with a comma."
                    name="tags"
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

export default FormExperience;
