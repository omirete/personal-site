import AdminNav from "@/components/pages/admin/AdminNav";
import PrivateSection from "@/components/next-auth/PrivateSection";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PrivateSection behaviourOnUnauthorized="unauthorized">
                <div className="mx-4 my-5">
                    <AdminNav />
                    <div className="border p-2 rounded-bottom">{children}</div>
                </div>
            </PrivateSection>
        </div>
    );
}
