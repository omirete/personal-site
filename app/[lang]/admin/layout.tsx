import { notFound } from "next/navigation";
import AdminNav from "@/components/pages/admin/AdminNav";
import PrivateSection from "@/components/next-auth/PrivateSection";
import { hasLocale } from "@/i18n/config";
import RefreshCache from "@/components/pages/admin/RefreshCache";
import { Suspense } from "react";
import Loading from "@/components/ui/Loading";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const lang = (await params).lang;
    if (!hasLocale(lang)) notFound();
    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to right top,#3b4969,#7a5283,#be5678,#e3704f,#d7a319)",
            }}
        >
            <Suspense fallback={<Loading lang={lang} className="px-4 py-5" />}>
                <PrivateSection behaviourOnUnauthorized="redirect-unauthorized">
                    <div className="px-4 py-5">
                        <AdminNav lang={lang} />
                        <div className="p-2 rounded-bottom bg-white bg-opacity-75">
                            <RefreshCache />
                            {children}
                        </div>
                    </div>
                </PrivateSection>
            </Suspense>
        </div>
    );
}
