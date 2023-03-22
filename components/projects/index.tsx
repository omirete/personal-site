"use client";

import useFormCreateProject from "./useFormCreateProject";

const FormCreateProject: React.FC = () => {
    const { handleSubmit, loading, formRef } = useFormCreateProject();
    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="input-project-name"
                    placeholder="Enter a project name"
                    required
                />
                <label htmlFor="input-project-name">Project name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    name="alias"
                    className="form-control"
                    id="input-project-name"
                    placeholder="Enter a project alias"
                    required
                />
                <label htmlFor="input-project-name">Project alias</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    id="input-project-description"
                    placeholder="Enter a project description"
                    required
                />
                <label htmlFor="input-project-name">Project description</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    name="tags"
                    className="form-control"
                    id="input-project-description"
                    placeholder="Enter a list of tags"
                />
                <label htmlFor="input-project-name">Project tags</label>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                Submit
            </button>
        </form>
    );
};

export default FormCreateProject;
