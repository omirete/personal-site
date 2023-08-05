"use client";
import SubmitButton from "@/components/ui/forms/SubmitButton";
import { BasicInfo } from "@/helpers/database/collections/personalInfo/basicInfo";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";
import FCi18n from "@/i18n/types/FCi18n";
import StringI18N from "@/i18n/types/StringI18N";
import { useState } from "react";
import useFormBasicInfo from "./useFormBasicInfo";

const FormBasicInfo: FCi18n<{ basicInfo?: BasicInfo }> = ({
    lang,
    basicInfo,
}) => {
    const { handleSubmit, loading, formRef } = useFormBasicInfo();
    const [virtualBasicInfo, setVirtualBasicInfo] = useState<BasicInfo>(
        basicInfo ?? ({} as BasicInfo)
    );
    return (
        <form
            onSubmit={(e) => handleSubmit(e, virtualBasicInfo)}
            ref={formRef}
            className="mb-3"
        >
            <h3>Basic information</h3>
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
                    placeholder="Name"
                    name="name"
                    value={virtualBasicInfo.name ?? ""}
                    onChange={(e) =>
                        setVirtualBasicInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    required
                />
                <input
                    className="form-control"
                    type="test"
                    placeholder="Last name"
                    name="lastName"
                    value={virtualBasicInfo.lastName ?? ""}
                    onChange={(e) =>
                        setVirtualBasicInfo((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                        }))
                    }
                />
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
                    placeholder="A title for your profile"
                    name="title"
                    defaultValue={parseStringI18N(virtualBasicInfo.title, lang)}
                    onChange={(e) => {
                        setVirtualBasicInfo((prev) => {
                            const newVal = { ...prev.title };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                title: newVal as StringI18N,
                            };
                        });
                    }}
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Subtitle
                </span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="A subtitle for your profile"
                    name="subtitle"
                    defaultValue={parseStringI18N(
                        virtualBasicInfo.subtitle,
                        lang
                    )}
                    onChange={(e) =>
                        setVirtualBasicInfo((prev) => {
                            const newVal = { ...prev.subtitle };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                subtitle: newVal as StringI18N,
                            };
                        })
                    }
                />
            </div>
            <div className="input-group mb-2">
                <span
                    className="input-group-text"
                    style={{ minWidth: "12.5ch" }}
                >
                    Birth date
                </span>
                <input
                    className="form-control"
                    type="date"
                    placeholder="A title for your profile"
                    name="dateOfBirth"
                    value={virtualBasicInfo.dateOfBirth ?? ""}
                    onChange={(e) =>
                        setVirtualBasicInfo((prev) => ({
                            ...prev,
                            dateOfBirth: e.target.value,
                        }))
                    }
                />
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
                    placeholder="Give yourself a short description."
                    name="description"
                    defaultValue={parseStringI18N(
                        virtualBasicInfo.description,
                        lang
                    )}
                    onChange={(e) =>
                        setVirtualBasicInfo((prev) => {
                            const newVal = { ...prev.description };
                            newVal[lang] = e.target.value;
                            return {
                                ...prev,
                                description: newVal as StringI18N,
                            };
                        })
                    }
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
