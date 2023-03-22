const FormProfilePic: React.FC = () => {
    return (
        <form>
            <img
                src={`${process.env.NEXT_PUBLIC_FILES_BASE_FETCH_URL}/profile.png`}
                alt="Profile picture"
                className=""
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    // width: 'auto',
                    // objectFit: 'cover'
                }}
            />
            ;
        </form>
    );
};

export default FormProfilePic;
