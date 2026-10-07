"use client";

import { useEffect, useState } from "react";

const useElapsedTime = (): number => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let request: number;
        const animate = (time: number) => {
            setTime(time);
            request = requestAnimationFrame(animate);
        };
        request = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(request);
    }, []);

    return time / 1000;
};

export default useElapsedTime;
