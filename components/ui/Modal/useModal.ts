"use client";
import { RefObject, useCallback, useState } from "react";

export interface UseModal {
    show: boolean;
    showModal: () => void;
    hideModal: () => void;
    // modalRef: RefObject<HTMLDivElement>;
}

const useModal = () => {
    const [show, setShow] = useState(false);
    const showModal = useCallback(() => {
        setShow(true);
    }, []);
    const hideModal = useCallback(() => {
        setShow(false);
    }, []);
    return {
        show,
        showModal,
        hideModal,
    };
};

export default useModal;
