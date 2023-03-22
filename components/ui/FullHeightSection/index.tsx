const FullHeightSection: React.FC<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
> = ({ className, ...props }) => {
    return <div className={`min-vh-100 w-100 ${className}`} {...props} />;
};

export default FullHeightSection;
