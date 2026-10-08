import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/helpers/auth";
import { ReactNode } from "react";
import { NextPage } from "next";
import LoginButton from "../LoginButton";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { lang as getLang } from "next/root-params";
import { hasLocale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";

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
    const lang = await getLang();
    if (!hasLocale(lang)) notFound();
    // NextAuth creates random CSRF values; session lookup belongs to the request.
    await connection();
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
                        <LoginButton lang={lang} dictionary={(await getDictionary(lang)).loginButton} />
                    </div>
                );
            case "redirect-unauthorized":
                return redirect(`/${lang}/unauthorized`);
            case "redirect-home":
                return redirect(`/${lang}`);
            default:
                return redirect(`/${lang}`);
        }
    }
};

export default PrivateSection;
