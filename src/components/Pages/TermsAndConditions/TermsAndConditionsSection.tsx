import FadeDown from "@/motion/FadeDown";

const TermsAndConditionsSection = () => {
  const TermsData = [
    {
      id: 1,
      title: "Acceptance of Terms",
      features: [
        "By using InfinixChain, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree, please refrain from using our platform.",
      ],
    },
    {
      id: 2,
      title: "Decentralized Platform Usage",
      features: [
        "InfinixChain operates as a decentralized platform, meaning users are solely responsible for their actions, including transactions and wallet security.",
        "We do not store, manage, or have access to user funds or private keys.",
      ],
    },
    {
      id: 3,
      title: "Prohibited Jurisdictions",
      features: [
        "Users from jurisdictions where cryptocurrency usage, trading, or investment is prohibited (e.g., the USA, UK, or others) are not permitted to use our platform.",
        "It is the user’s responsibility to ensure compliance with local laws and regulations.",
      ],
    },
    {
      id: 4,
      title: "User Responsibilities",
      features: [
        "Users must secure their wallets and private keys. InfinixChain is not liable for any loss due to negligence or unauthorized access.",
        "Users agree not to use the platform for illegal activities, including money laundering, fraud, or any prohibited transactions.",
      ],
    },
    {
      id: 5,
      title: "Transactions and Fees",
      features: [
        "All transactions on InfinixChain are final and recorded on the blockchain.",
        "Users are responsible for paying transaction fees associated with their activities.",
      ],
    },
    {
      id: 6,
      title: "Disclaimer of Warranties",
      features: [
        "InfinixChain is provided on an 'as is' and 'as available' basis without warranties of any kind, either expressed or implied.",
        "We do not guarantee uninterrupted access, error-free functionality, or complete security of the platform.",
      ],
    },
    {
      id: 7,
      title: "Limitation of Liability",
      features: [
        "InfinixChain is not liable for any loss, damages, or claims arising from the use of our platform, including but not limited to financial losses, unauthorized access, or technical issues.",
        "Users assume full responsibility for their actions on the platform.",
      ],
    },
    {
      id: 8,
      title: "Updates to Terms and Conditions",
      features: [
        "These Terms and Conditions may be updated periodically to reflect changes in our platform or legal requirements.",
        "Continued use of the platform constitutes acceptance of the revised terms.",
      ],
    },
    {
      id: 9,
      title: "Governing Law",
      features: [
        "These Terms and Conditions are governed by and construed in accordance with the laws applicable to decentralized platforms.",
        "Any disputes must be resolved in accordance with applicable jurisdictional laws.",
      ],
    },
    {
      id: 10,
      title: "Contact Information",
      features: [
        "For any questions or concerns about these Terms and Conditions, please contact us via email at [support@infinixchain.com](mailto:support@infinixchain.com).",
      ],
    },
  ];
  return (
    <div className="bg-BG-FFF-8 xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 my-rounded-20 border border-stroct-1">
      <div className="gap-mb-48">
        {TermsData?.map((item, idx) => (
          <div
            key={idx}
            className={`${
              idx !== 0 &&
              "border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8"
            } ${TermsData?.length - 1 !== idx && "gap-mb-40"}`}
          >
            <FadeDown>
              <h3 className="my-text-24 gap-mb-32 sm:max-w-[856px] w-full text-primary-0">
                {item?.title}
              </h3>
              {/* <p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                {item?.details}
              </p> */}
              <ul className="ml-5 list-outside list-decimal grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                {item?.features?.map((feature, idx) => (
                  <li key={idx} className="">
                    {feature}
                  </li>
                ))}
              </ul>
            </FadeDown>
          </div>
        ))}
      </div>
      <FadeDown>
        <p className="border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8 my-text-16 text-foundation-blue-30 text-center">
          By using InfinixChain, you agree to abide by these Terms and
          Conditions and acknowledge that you are solely responsible for your
          actions on the platform.
        </p>
      </FadeDown>
    </div>
  );
};

export default TermsAndConditionsSection;
