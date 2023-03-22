"use client";

import SubmitButton from "@/components/forms/SubmitButton";
import {
    SocialNetworks,
    SocialNetworksMetadata,
} from "@/helpers/database/PersonalInfoCtor/SocialNetworksCtor";
import Link from "next/link";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaLink } from "react-icons/fa";
import useFormSocialNetworks from "./useFormSocialNetworks";

const FormSocialNetworks: React.FC<{ socialNetworks?: SocialNetworks }> = ({
    socialNetworks,
}) => {
    const { handleSubmit, loading, formRef } = useFormSocialNetworks();
    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <h3>Social networks</h3>
            {Object.entries(SocialNetworksMetadata).map(
                ([code, metadata], i) => {
                    const Icon: IconType = metadata.icon;
                    const defaultValue = socialNetworks
                        ? socialNetworks[code as keyof SocialNetworks]
                        : undefined;
                    const [username, setUsername] = useState<
                        string | undefined
                    >(defaultValue);
                    return (
                        <div className="input-group mb-2" key={i}>
                            <span className="input-group-text text-secondary">
                                <Icon />
                            </span>
                            <input
                                className="form-control"
                                type="text"
                                name={code}
                                placeholder={`Enter your ${metadata.label} user name.`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                aria-label={metadata.label}
                                // defaultValue={
                                //     socialNetworks
                                //         ? socialNetworks[
                                //               code as keyof SocialNetworks
                                //           ]
                                //         : undefined
                                // }
                            />
                            <span className="input-group-text">
                                <Link
                                    href={metadata.userUrl(username)}
                                    onClick={(e) => {
                                        if (!username) {
                                            e.preventDefault();
                                            alert(
                                                "Please enter your user name for this social network first."
                                            );
                                        }
                                    }}
                                    className="text-decoration-none text-info"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Visit <FaLink />
                                </Link>
                            </span>
                        </div>
                    );
                }
            )}
            <SubmitButton
                className="btn btn-primary w-100"
                loading={loading}
                text="Save"
                textLoading="Saving"
            />
        </form>
    );
};

export default FormSocialNetworks;
