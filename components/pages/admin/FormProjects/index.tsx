"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import useFormProjects from "./useFormProjects";

const FormProjects: React.FC = () => {
    const { handleCreate, creating } = useFormProjects();
    return (
        <form onSubmit={handleCreate} className="mb-3">
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Name
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name of your project."
                    name="name"
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Alias
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Give an alias to your project."
                    name="alias"
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Description
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Give a short description."
                    name="description"
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Full content
                </span>
                <textarea
                    className="form-control"
                    placeholder="Describe the project in detail."
                    name="fullContent"
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Image url
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Paste the link to an image."
                    name="imgUrl"
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
                    placeholder="Separate your tags with commas."
                    name="tags"
                    required
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

export default FormProjects;
