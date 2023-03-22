import Point2D from "@/types/Point2D";
import { RefObject } from "react";

const useCanvasPointerCoords = (
    canvasRef: RefObject<HTMLCanvasElement>,
    pointerCoords: Point2D
) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
        return {
            x: pointerCoords.x - rect.left,
            y: pointerCoords.y - rect.top,
        };
    } else {
        return { x: 0, y: 0 };
    }
};

export default useCanvasPointerCoords;
