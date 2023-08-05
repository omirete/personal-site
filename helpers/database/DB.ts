import { MongoClient, ServerApiVersion, Collection } from "mongodb";
import LinkInfo from "@/types/DataObjects/LinkInfo";
import { Experience } from "./collections/experience";
import { Highlight } from "./collections/highlight";
import { Project } from "./collections/project";
import { BasicInfo } from "./collections/personalInfo/basicInfo";
import { ContactInfo } from "./collections/personalInfo/contactInfo";
import { SocialNetwork } from "./collections/personalInfo/socialNetwork";
import getterSetter, { PropertyGetterSetter } from "./propertyGetterSetter";

const DB_URI = process.env.MONGODB_URI;

export interface DBStructure {
    experience: Collection<Experience>;
    highlights: Collection<Highlight>;
    links: Collection<LinkInfo>;
    projects: Collection<Project>;
    personalInfo: {
        basicInfo: PropertyGetterSetter<BasicInfo>;
        contactInfo: PropertyGetterSetter<ContactInfo>;
        socialNetworks: Collection<SocialNetwork>;
    };
}

const mongo = new MongoClient(DB_URI as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const DB = mongo.db("federicogiancarelli");

export const MyDB: DBStructure = {
    experience: DB.collection<Experience>("experience"),
    highlights: DB.collection<Highlight>("highlights"),
    links: DB.collection<LinkInfo>("links"),
    projects: DB.collection<Project>("projects"),
    personalInfo: {
        basicInfo: getterSetter<BasicInfo>(DB.collection("basicInfo")),
        contactInfo: getterSetter<ContactInfo>(DB.collection("contactInfo")),
        socialNetworks: DB.collection<SocialNetwork>("socialNetworks"),
    },
};

export default MyDB;
