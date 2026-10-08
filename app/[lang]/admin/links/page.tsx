import LinksList from "@/components/pages/admin/entitiesList/LinksList";
import DB from "@/helpers/database/DB";
import readUncachedData from "@/helpers/database/readUncachedData";
import parseIdsAsStringIds from "@/helpers/database/parseIdsAsStringIds";
import { NextPage } from "next";

const Home: NextPage<{}> = async () => {
    const links = parseIdsAsStringIds(
        await readUncachedData(() => DB.links.find().toArray()),
    );
    return (
        <div>
            <h3>Links</h3>
            <LinksList links={links} />
        </div>
    );
};

export default Home;
