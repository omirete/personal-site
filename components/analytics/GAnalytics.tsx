"use client";

import { useEffect } from "react";

export interface GAnalyticsProps {
    google_id: string;
}

const GAnalytics: React.FC<GAnalyticsProps> = ({ google_id }) => {
    useEffect(() => {
        const track = () => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(cmd1: any, cmd2: any) {
                (window as any).dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", google_id);
        };

        window.addEventListener("routeChange", track);
        return () => window.removeEventListener("routeChange", track);
    }, []);

    return null;
};

export default GAnalytics;
