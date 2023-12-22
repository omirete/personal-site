"use client";
import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import { ModalProps } from "../Modal";

export interface ButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    modal?: (
        show: boolean,
        setShow: Dispatch<SetStateAction<boolean>>,
    ) => ReactNode;
}

const Button: React.FC<ButtonProps> = ({ modal, onClick, ...props }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                {...props}
                onClick={(e) => {
                    if (modal) {
                        setShowModal(true);
                    }
                    if (onClick) {
                        onClick(e);
                    }
                }}
            />
            {modal && modal(showModal, setShowModal)}
        </>
    );
};

export default Button;
