import FileDirectory from "@/components/admin/FileDirectory";
import FormFileUpload from "@/components/admin/FormFileUpload";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    return (
        <div>
            <FormFileUpload />
            <FileDirectory className="mt-2" />
        </div>
    );
};

export default Home;
