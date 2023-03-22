import {
    SocialNetworks,
    SocialNetworksMetadata,
} from "@/helpers/database/PersonalInfoCtor/SocialNetworksCtor";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import { FaLink } from "react-icons/fa";

export interface FormSocialNetworkRowProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    metadata: SocialNetworksMetadata;
    defaultValue?: string;
}

const FormSocialNetworkRow: React.FC<FormSocialNetworkRowProps> = ({
    metadata,
    defaultValue,
    className,
    ...props
}) => {
    const Icon: IconType | null = metadata.icon;
    const [username, setUsername] = useState<string | undefined>(defaultValue);

    return (
        <div className={`input-group mb-2 ${className ?? ""}`} {...props}>
            <span className="input-group-text text-secondary">
                {Icon && <Icon />}
            </span>
            <input
                className="form-control"
                type="text"
                name={metadata.code}
                placeholder={`Enter your ${metadata.label} user name.`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label={metadata.label}
            />
            <span className="input-group-text">
                <a
                    href={metadata.userUrl(username ?? "")}
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
                </a>
            </span>
        </div>
    );
};

export default FormSocialNetworkRow;
