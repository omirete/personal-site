import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";

export interface ModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    title?: string;
    children?: ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    show,
    setShow,
    title,
    children,
    className,
}) => {
    const [showClass, setShowClass] = useState(false);

    const handleHide = useCallback((e: KeyboardEvent) => {
        console.log({ code: e.code, key: e.key });
        if (e.key === "Esc" || e.key === "Escape") {
            // "Esc" is the IE/Edge specific value
            setShow(false);
        }
    }, []);

    useEffect(() => {
        setShowClass(show);
        if (show) {
            document.addEventListener("keydown", handleHide);
        }
        return () => {
            // Clean-up
            if (show) {
                document.removeEventListener("keydown", handleHide);
            }
        };
    }, [show]);

    return (
        <div
            className={`
                modal fade
                ${show ? "d-block" : "d-none"}
                ${showClass ? "show bg-dark bg-opacity-25" : ""}
                ${className ?? ""}
            `}
            tabIndex={-1}
            style={{
                zIndex: 9999,
            }}
            // aria-labelledby="exampleModalLabel"
            aria-hidden={!show}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {title && <h1 className="modal-title fs-5">{title}</h1>}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShow(false)}
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
