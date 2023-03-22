"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const useElapsedTime = (): number => {
    const [time, setTime] = useState(0);

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef<number>(0);

    const animate = (time: number) => {
        setTime(time);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once

    return time / 1000;
};

export default useElapsedTime;
