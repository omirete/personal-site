"use client";

import SubmitButton from "@/components/ui/forms/SubmitButton";
import {
    SocialNetworks,
    SocialNetworksMetadata,
} from "@/helpers/database/PersonalInfoCtor/SocialNetworksCtor";
import FormSocialNetworkRow from "./FormSocialNetworkRow";
import useFormSocialNetworks from "./useFormSocialNetworks";

const FormSocialNetworks: React.FC<{ socialNetworks?: SocialNetworks }> = ({
    socialNetworks,
}) => {
    const { handleSubmit, loading, formRef } = useFormSocialNetworks();
    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <h3>Social networks</h3>
            {Object.values(SocialNetworksMetadata).map(
                (metadata: SocialNetworksMetadata, i) => {
                    return (
                        <FormSocialNetworkRow
                            key={i}
                            metadata={metadata}
                            defaultValue={
                                socialNetworks
                                    ? socialNetworks[metadata.code]
                                    : undefined
                            }
                        />
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
