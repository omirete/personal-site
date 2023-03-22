import Point2D from "@/types/Point2D";
import { PointerEventHandler, useEffect, useState } from "react";

const usePointerCoords = () => {
    const [pointerCoords, setPointerCoords] = useState<Point2D>({ x: 0, y: 0 });

    const handlePointerMove = (e: PointerEvent) => {
        setPointerCoords({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener("pointermove", handlePointerMove);
        return () =>
            window.removeEventListener("pointermove", handlePointerMove);
    });

    return pointerCoords;
};

export default usePointerCoords;
