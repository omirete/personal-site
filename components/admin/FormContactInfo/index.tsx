"use client";

import SubmitButton from "@/components/forms/SubmitButton";
import { ContactInfo } from "@/helpers/database/PersonalInfoCtor/ContactInfoCtor";
import useFormContactInfo from "./useFormContactInfo";

const FormContactInfo: React.FC<{ contactInfo?: ContactInfo }> = ({ contactInfo }) => {
    const { handleSubmit, loading, formRef } = useFormContactInfo();
    return (
        <form onSubmit={handleSubmit} ref={formRef} className="mb-3">
            <h3>Contact information</h3>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12.5ch" }}>
                    Email
                </span>
                <input
                    className="form-control"
                    type="email"
                    placeholder="Your email."
                    name="email"
                    defaultValue={contactInfo?.email}
                    required
                />
            </div>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12.5ch" }}>
                    Phone
                </span>
                <input
                    className="form-control"
                    type="tel"
                    placeholder="Your phone."
                    name="phone"
                    defaultValue={contactInfo?.phone}
                    required
                />
            </div>
            <SubmitButton
                className="btn btn-primary w-100"
                loading={loading}
                text="Save"
                textLoading="Saving"
            />
        </form>
    );
};

export default FormContactInfo;
