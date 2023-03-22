import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface SubmitButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    loading?: boolean;
    text?: string;
    textLoading?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    loading,
    text,
    textLoading,
    ...props
}) => {
    return (
        <button type="submit" disabled={loading} {...props}>
            {loading ? textLoading ?? "Submitting" : text ?? "Submit"}
            {loading && (
                <div className="spinner-border spinner-border-sm ms-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </button>
    );
};

export default SubmitButton;
