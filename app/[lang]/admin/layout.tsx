import AdminNav from "@/components/pages/admin/AdminNav";
import PrivateSection from "@/components/next-auth/PrivateSection";
import { Locale } from "@/i18n/config";

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to right top,#3b4969,#7a5283,#be5678,#e3704f,#d7a319)",
            }}
        >
            <PrivateSection behaviourOnUnauthorized="unauthorized">
                <div className="px-4 py-5">
                    <AdminNav lang={params.lang} />
                    <div className="p-2 rounded-bottom bg-white bg-opacity-75">
                        {children}
                    </div>
                </div>
            </PrivateSection>
        </div>
    );
}
