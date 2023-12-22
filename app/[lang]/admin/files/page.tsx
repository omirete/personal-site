import FileDirectory from "@/components/pages/admin/FileDirectory";
import FormFileUpload from "@/components/pages/admin/FormFileUpload";
import { NextPage } from "next";

const Home: NextPage<{}> = async () => {
    return (
        <div>
            <FormFileUpload />
            <FileDirectory className="mt-2" />
        </div>
    );
};

export default Home;
