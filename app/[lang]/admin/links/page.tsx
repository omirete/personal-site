import LinksList from "@/components/pages/admin/entitiesList/LinksList";
import DB from "@/helpers/database/DB";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { NextPage } from "next";

{/* @ts-expect-error Async Server Component */}
// Previous line needed as per docs. See "Async Server Component TypeScript
// Error" here: https://beta.nextjs.org/docs/data-fetching/fetching
const Home: NextPage<{}> = async () => {
    const links = parseIdsAsStringIds(await DB.links.find().toArray());
    return (
        <div>
            <h3>Links</h3>
            <LinksList links={links} />
        </div>
    );
};

export default Home;
