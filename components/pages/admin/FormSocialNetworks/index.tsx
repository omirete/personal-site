"use client";
import SubmitButton from "@/components/ui/forms/SubmitButton";
import FormSocialNetworkRow from "./FormSocialNetworkRow";
import useFormSocialNetworks from "./useFormSocialNetworks";
import {
    SocialNetwork,
    SocialNetworksMetadata,
} from "@/helpers/database/collections/personalInfo/socialNetwork";

const FormSocialNetworks: React.FC<{ socialNetworks?: SocialNetwork[] }> = ({
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
                                socialNetworks?.find(
                                    (sn) => sn.code === metadata.code
                                )?.userId
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
