import { Database } from "firebase/database";
import { PropertyGetterSetterCtor } from "../GenericCtors";
import BasicInfoCtor, { BasicInfo } from "./BasicInfoCtor";
import ContactInfoCtor, { ContactInfo } from "./ContactInfoCtor";
import SocialNetworksCtor, { SocialNetworks } from "./SocialNetworksCtor";

export interface PersonalInfo {
    basicInfo: BasicInfo;
    contactInfo: ContactInfo;
    socialNetworks: SocialNetworks;
}

export default class PersonalInfoCtor {
    ALL: PropertyGetterSetterCtor<PersonalInfo>;
    basicInfo: BasicInfoCtor;
    contactInfo: ContactInfoCtor;
    socialNetworks: SocialNetworksCtor;

    constructor(db: Database) {
        const path = "personalInfo";
        this.ALL = new PropertyGetterSetterCtor<PersonalInfo>(db, path);
        this.basicInfo = new BasicInfoCtor(db, path);
        this.contactInfo = new ContactInfoCtor(db, path);
        this.socialNetworks = new SocialNetworksCtor(db, path);
    }
}
