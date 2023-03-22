import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import LoginButton from "../LoginButton";

export interface PrivateSectionProps {
    children?: ReactNode;
    behaviourOnUnauthorized?: "unauthorized" | "redirect" | "hide";
}

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const PrivateSection: NextPage<PrivateSectionProps> = async ({
    children,
    behaviourOnUnauthorized,
}) => {
    const session = await getServerSession(authOptions);

    if (session) {
        return <>{children}</>;
    } else {
        switch (behaviourOnUnauthorized) {
            case "hide":
                return null;
            case "unauthorized":
                return (
                    <div>
                        <p>You are not authorized to view this content.</p>
                        <LoginButton />
                    </div>
                );
            case "redirect":
                return <span>Redirect.</span>;
            default:
                return <span>Redirect (default).</span>;
        }
    }
};

export default PrivateSection;
