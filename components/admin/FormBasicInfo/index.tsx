"use client";

import SubmitButton from "@/components/forms/SubmitButton";
import { BasicInfo } from "@/helpers/database/PersonalInfoCtor/BasicInfoCtor";
import useFormBasicInfo from "./useFormBasicInfo";

const FormBasicInfo: React.FC<{ basicInfo?: BasicInfo }> = ({ basicInfo }) => {
    const { handleSubmit, loading, formRef } = useFormBasicInfo();
    return (
        <form onSubmit={handleSubmit} ref={formRef} className="mb-3">
            <h3>Basic information</h3>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12ch" }}>
                    Name
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    defaultValue={basicInfo?.name}
                    required
                />
                <input
                    className="form-control"
                    type="test"
                    placeholder="Last name"
                    name="lastName"
                    defaultValue={basicInfo?.lastName}
                />
            </div>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12ch" }}>
                    Title
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="A title for your profile"
                    name="title"
                    defaultValue={basicInfo?.title}
                />
            </div>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12ch" }}>
                    Subtitle
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="A subtitle for your profile"
                    name="subtitle"
                    defaultValue={basicInfo?.subtitle}
                />
            </div>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12ch" }}>
                    Birth date
                </span>
                <input
                    className="form-control"
                    type="date"
                    placeholder="A title for your profile"
                    name="dateOfBirth"
                    defaultValue={basicInfo?.dateOfBirth}
                />
            </div>
            <div className="input-group mb-2">
                <span className="input-group-text" style={{ minWidth: "12ch" }}>
                    Description
                </span>
                <textarea
                    className="form-control"
                    placeholder="Give yourself a short description."
                    name="description"
                    defaultValue={basicInfo?.description}
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

export default FormBasicInfo;
