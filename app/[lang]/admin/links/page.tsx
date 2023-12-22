import LinksList from "@/components/pages/admin/entitiesList/LinksList";
import DB from "@/helpers/database/DB";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { NextPage } from "next";

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
