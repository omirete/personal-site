"use client";

import ButtonConfetti from "@/components/ui/ButtonConfetti";
import Modal from "@/components/ui/Modal";
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";

const ButtonLaunchContactForm: React.FC<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ onClick, ...props }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <ButtonConfetti
                onClick={(e) => {
                    setShow(true);
                    if (onClick) {
                        onClick(e);
                    }
                }}
                {...props}
            />
            <Modal show={show} setShow={setShow} className="modal-lg">
                {show && (
                    <iframe
                        src="https://form.jotform.com/230786688727071"
                        className="w-100 rounded shadow"
                        height="500px"
                    />
                )}
            </Modal>
        </>
    );
};

export default ButtonLaunchContactForm;
