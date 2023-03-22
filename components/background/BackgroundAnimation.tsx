"use client";

import useElapsedTime from "@/helpers/useElapsedTime";
import usePointerCoords from "@/helpers/usePointerCoords";
import { CSSProperties } from "react";
import SvgCircle from "./shapes/Circle";
import SvgGrid from "./shapes/Grid";
import SvgTriangle from "./shapes/Triangle";

const BackgroundAnimation: React.FC = () => {
    const elapsedTime = useElapsedTime();
    const pointerCoords = usePointerCoords();

    // const triangles

    /* There are 7 shape elements in SVG:
        <circle>, <ellipse>, <line>, <path>, <polygon>, <polyline>, and <rect>.
    */
    const angle = 30;
    const spacing = 20;
    const gridStile: CSSProperties = {
        stroke: "#44444420",
        strokeWidth: 0.6,
        scale: 3,
    };

    return (
        <div
            className="vw-100 vh-100"
            style={{ position: "fixed", top: 0, left: 0, zIndex: -9999999 }}
        >
            <SvgTriangle
                originCoord={{ x: 50, y: 28.8675 }}
                position={pointerCoords}
                rotate={`${((elapsedTime * 360) / 10) % 360}deg`}
                style={{
                    fill: "#44444444",
                    stroke: "none",
                    scale: "50%",
                }}
            />
            {/* {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                return (
                    <SvgCircle
                        key={i}
                        position={{
                            x: pointerCoords.x + Math.sin(i) * 15,
                            y: pointerCoords.y + Math.cos(i) * 15,
                        }}
                        originCoord={{ x: 2, y: 2 }}
                        fill="red"
                        r={2}
                    />
                );
            })} */}

        </div>
    );
};

export default BackgroundAnimation;
