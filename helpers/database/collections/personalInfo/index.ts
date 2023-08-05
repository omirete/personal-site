import { BasicInfo } from "./basicInfo";
import { ContactInfo } from "./contactInfo";
import { SocialNetwork } from "./socialNetwork";

export interface PersonalInfo {
    basicInfo: BasicInfo;
    contactInfo: ContactInfo;
    socialNetworks: SocialNetwork[];
}
