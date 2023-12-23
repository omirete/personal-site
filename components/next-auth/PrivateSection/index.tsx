import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/auth";
import { ReactNode } from "react";
import { NextPage } from "next";
import LoginButton from "../LoginButton";
import { redirect } from "next/navigation";

export interface PrivateSectionProps {
    children?: ReactNode;
    behaviourOnUnauthorized?:
        | "unauthorized"
        | "redirect-home"
        | "redirect-unauthorized"
        | "hide";
}

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
                    <div className="px-3 py-5">
                        <p className="mt-3">
                            You are not authorized to view this content.
                        </p>
                        <LoginButton lang="en" />
                    </div>
                );
            case "redirect-unauthorized":
                return redirect("/unauthorized");
            case "redirect-home":
                return redirect("/");
            default:
                return redirect("/");
        }
    }
};

export default PrivateSection;
