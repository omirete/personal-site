import LinksList from "@/components/admin/LinksList";
import { DB } from "@/helpers/firebase";
import LinkInfo from "@/types/DataObjects/LinkInfo";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const links = await DB.data.links.getAll();
    return (
        <div>
            <h3>Links</h3>
            <LinksList links={links} />
        </div>
    );
};

export default Home;
