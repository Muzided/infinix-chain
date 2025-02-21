import { Banner, FaqSection } from "@/components/Global";
import FadeDown from "@/motion/FadeDown";
import { headerProps } from "@/config/types";

const PrivacyPolicy = () => {
  const headerData: headerProps = {
    title: "Privacy Policy",
    description: "At InfinixChain, we are committed to protecting your privacy and ensuring transparency about how we handle your information. This Privacy Policy outlines how we manage, collect, and use your data. Please read it carefully to understand our practices.",
  };

  const policyData = [
    
    {
      id: 1,
      title: "Contact Information",
      details: `If you have any questions or concerns regarding this Privacy Policy or our practices, you can contact us exclusively through email at support@infinixchain.com.`,
      
    },
    {
      id: 2,
      title: "Decentralized Platform and Data Privacy",
      details: `InfinixChain operates as a fully decentralized platform, which means:`,
      features: [
        "We do not collect, store, or process any personal user data.",
        "Users interact directly with the blockchain without intermediaries, ensuring full control and ownership of their data.",
        
      ],
    },
    {
      id: 3,
      title: "No Data Collection or Retention",
      features: [
        "We do not store any personal information such as names, addresses, or payment details.",
        "Transactions are recorded on the blockchain, which is public and immutable, but no identifiable personal information is associated with these records.",
        
      ],
    },
    {
      id: 4,
      title: "User Rights",
      details: `Given the decentralized nature of InfinixChain, users retain full control over their data. Since we do not store or process personal data, traditional rights such as data access, correction, or deletion do not apply.`,
      
    },
    {
      id: 5,
      title: "Third-Party Services",
      details: `While using InfinixChain, you may interact with third-party wallets or services (e.g., MetaMask, Trust Wallet, Phantom Wallet). These services operate independently, and their privacy policies govern how they handle your data. We recommend reviewing their policies before use.`,
      
    },
    {
      id: 6,
      title: "Security Measures",
      details: `InfinixChain is built with robust security protocols to protect users and their transactions. However, users are responsible for securing their wallets and private keys.`,
      
    },
    {
      id: 7,
      title: "Updates to the Privacy Policy",
      details: `This Privacy Policy may be updated periodically to reflect changes in our platform or legal requirements. We encourage users to review it regularly.`,
      
    },
    {
      id: 8,
      title: "Disclaimer",
      details: ``,
      features: [
        "InfinixChain is not responsible for any loss of funds or unauthorized access resulting from user negligence (e.g., sharing private keys).",
        "We operate in compliance with applicable laws and advise users to ensure they are not prohibited from participating in cryptocurrency activities in their jurisdiction.",
        
      ],
    },
    
  ];
  return (
    <main>
      <Banner headerData={headerData} />
      <section className="bg-primary-5 py-20">
        <div className="container">
          <div className="bg-BG-FFF-8 xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 my-rounded-20 border border-stroct-1">
            <div className="gap-mb-48">
              {policyData?.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx !== 0 &&
                    "border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8"
                  } ${policyData?.length - 1 !== idx && "gap-mb-40"}`}
                >
                  <FadeDown>
                    <h3 className="my-text-24 gap-mb-32 sm:max-w-[856px] w-full text-primary-0">
                      {item?.title}
                    </h3>
                    {item?.details && (<p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                      {item?.details}
                    </p>)}
                    {item?.features && (
                      <ul className="ml-5 list-outside list-disc grid gap-y-[2px] my-text-16 text-foundation-blue-30 gap-mb-24">
                        {item?.features?.map((feature, idx) => (
                          <li key={idx} className="">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </FadeDown>
                </div>
              ))}
            </div>
            <FadeDown>
              <p className="border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8 my-text-16 text-foundation-blue-30 text-center">
              By using InfinixChain, you acknowledge that you have read and understood this Privacy Policy. For any inquiries, contact us via email
                {" "}<span className="text-primary-0">support@infinixchain.com</span>
              </p>
            </FadeDown>
          </div>
        </div>
      </section>
      <FaqSection />
    </main>
  );
};

export default PrivacyPolicy;
