"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import useFormFileUpload from "./useFormFileUpload";

const FormFileUpload: React.FC = () => {
    const { handleSubmit, loading, formRef, error, uploadedUrl } = useFormFileUpload();
    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <div className="mb-2 row gx-2">
                <div className="col-6">
                    <label htmlFor="input-file-type" className="form-label">
                        Select type of file to be uploaded
                    </label>
                    <select
                        id="input-file-type"
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue=""
                        name="file-type"
                        required
                    >
                        <option value="" disabled>
                            Select type
                        </option>
                        <option value="profile-pic">Profile pic</option>
                        <option value="contact-pic">Contact pic</option>
                        <option value="cv">CV</option>
                        <option value="certificate">Certificate (.pdf)</option>
                        <option value="signature-line">
                            Signature line (.svg)
                        </option>
                        <option value="signature">Signature (.svg)</option>
                        <option value="voice-note">Voice note</option>
                    </select>
                </div>
                <div className="col-6">
                    <label htmlFor="input-file-lang" className="form-label">
                        Select language
                    </label>
                    <select
                        id="input-file-lang"
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue=""
                        name="file-lang"
                        required
                    >
                        <option value="" disabled>
                            Select language of file
                        </option>
                        <option value="-1">Not applicable</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                    </select>
                </div>
            </div>
            <input
                className="form-control mb-2"
                type="file"
                id="input-file"
                name="filepath-src"
                required
            />
            <p className="form-text">
                Upload certificates as PDFs, then select them as a reference in Experience.
                Choose “Not applicable” for certificates without a language.
            </p>
            <SubmitButton
                className="btn btn-primary w-100"
                loading={loading}
                text="Upload"
                textLoading="Uploading"
            />
            {error && <p className="text-danger mt-2" role="alert">{error}</p>}
            {uploadedUrl && (
                <p className="text-success mt-2" role="status">
                    File uploaded. <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">View file</a>
                </p>
            )}
        </form>
    );
};

export default FormFileUpload;
