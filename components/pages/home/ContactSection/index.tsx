import SocialRow from "@/components/social/SocialRow";
import Button from "@/components/ui/Button";
import ButtonConfetti from "@/components/ui/ButtonConfetti";
import FullHeightSection from "@/components/ui/FullHeightSection";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { PersonalInfo } from "@/helpers/database/PersonalInfoCtor";
import ButtonLaunchContactForm from "./ButtonLaunchContactForm";

const ContactSection: React.FC<{ personalInfo: PersonalInfo }> = ({
    personalInfo,
}) => {
    return (
        <FullHeightSection id="contact" className="py-4 px-3 px-sm-5">
            <div className="mt-5">
                <h3 className="mb-3">Contact</h3>
                <div className="d-flex flex-wrap">
                    <div className="col-12 col-sm-6">
                        <p>
                            If you are interested in collaborating, have some
                            fancy freelancing request, or just want to have a
                            chat about life, you may reach out in any of the
                            networks listed below.
                        </p>
                        <div className="mb-3">
                            Also, if you are a form person, you may use{" "}
                            {/* <ButtonConfetti className="btn btn-dark btn-sm">
                            </ButtonConfetti>{" "} */}
                            <ButtonLaunchContactForm className="btn btn-dark btn-sm d-inline">
                                ✨ the form ✨
                            </ButtonLaunchContactForm>{" "}
                            as well. 🥳
                        </div>
                        <p className="m-0">Federico Giancarelli</p>
                        <p className="">
                            <code>hello@federicogiancarelli.com</code>
                        </p>
                        <SocialRow
                            personalInfo={personalInfo}
                            styleIcons={{ width: "2em", height: "2em" }}
                            className="mb-3"
                            classNameIcons="me-2 text-secondary opacity-75 opacity-100-hover"
                        />
                    </div>
                    <div className="col-12 col-sm-6">Test</div>
                </div>

                {/* <p>
                        You may reach out in any of these networks, or you can
                        also use the form to leave me a message.
                    </p> */}

            </div>
        </FullHeightSection>
    );
};

export default ContactSection;
