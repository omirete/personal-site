"use client";

import { SVGProps, useId, useSyncExternalStore } from "react";
import IconBlob from "@/assets/svg/blob-7.svg";

const motionQuery = "(prefers-reduced-motion: no-preference)";
function subscribeToMotion(callback: () => void) {
    const query = window.matchMedia(motionQuery);
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
}
const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => false;

// Preserve the original artwork; a low-frequency displacement gently reshapes
// its edges instead of replacing the silhouettes or moving the whole layer.
const outlines = [
    "M67.12,174.67C28.88,148.31,0,128.42,0,98.43c0-25,20-53.17,45.58-60.49,43.6-12.46,71.65,44.7,113.52,33.15C195.26,61.1,192,13.6,234.92,2.31c21.21-5.58,49.64-1.26,62.56,15.33,13.76,17.67-1.89,34.11,10.77,65.87,10.83,27.17,26.8,26.53,32.32,48.48,6.71,26.68-9.63,56.45-26.51,72.92-34,33.2-85.32,27.06-121,22.79C133.77,220.6,94.5,193.53,67.12,174.67Z",
    "M217.1,248.83c-45.95,20.23-120.72,26.55-162.41-19.89-28.32-31.55-27.2-71.66-26.93-77.89,3.09-72,77.94-126.56,144.6-135.48,16.55-2.22,55.48-7.44,88.25,16.57C302.79,63,312.41,126,295,172.59,276.24,222.79,230.23,243.05,217.1,248.83Z",
];

export default function AnimatedBlobs(props: SVGProps<SVGSVGElement>) {
    const id = useId().replace(/:/g, "");
    const motionAllowed = useSyncExternalStore(
        subscribeToMotion,
        getMotionPreference,
        getServerMotionPreference,
    );
    if (!motionAllowed) return <IconBlob {...props} />;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342.11 286.12" {...props}>
            <defs>
                {[0, 1].map((layer) => (
                    <filter
                        key={layer}
                        id={id + "-" + layer}
                        x="-15%"
                        y="-15%"
                        width="130%"
                        height="130%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008"
                            numOctaves="1"
                            seed={layer === 0 ? 7 : 13}
                            result="softWaves"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="softWaves"
                            scale="0"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        >
                            <animate
                                attributeName="scale"
                                values={layer === 0 ? "0;32;0;-24;0" : "0;20;0;-16;0"}
                                dur={layer === 0 ? "8s" : "10s"}
                                repeatCount="indefinite"
                                keyTimes="0;0.25;0.5;0.75;1"
                                calcMode="spline"
                                keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
                            />
                        </feDisplacementMap>
                    </filter>
                ))}
            </defs>
            {outlines.map((outline, layer) => (
                <path
                    key={layer}
                    d={outline}
                    opacity={layer === 0 ? 0.7 : 1}
                    filter={"url(#" + id + "-" + layer + ")"}
                />
            ))}
            <g className="portrait-bubbles" opacity="0.8">
                <ellipse cx="215.65" cy="274.72" rx="11.81" ry="11.39" />
                <ellipse cx="92.6" cy="20.95" rx="10.98" ry="9.94" />
                <ellipse cx="123.26" cy="9.97" rx="6.84" ry="6.01" />
                <ellipse cx="25.48" cy="216.1" rx="6.84" ry="7.46" />
            </g>
        </svg>
    );
}
