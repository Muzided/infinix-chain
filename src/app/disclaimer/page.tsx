import { Banner, FaqSection } from "@/components/Global";
import { headerProps } from "@/config/types";
import FadeDown from "@/motion/FadeDown";
import FadeUp from "@/motion/FadeUp";
import { features } from "process";

const Disclaimer = () => {
  const headerData: headerProps = {
    title: "Disclaimer",
    description:
      "The following disclaimer outlines critical information regarding the use of the InfinixChain platform, participation in its presale, and the purchase or use of FNX tokens. By engaging with the platform or purchasing FNX tokens, you agree to the terms outlined below.",
  };

  const disclaimerData = [
    {
      id: 1,
      title: "General Information",
      details:
        "InfinixChain operates as a decentralized blockchain ecosystem offering a variety of services and utilities, including token sales, decentralized applications, and staking. However, participating in any activity on the platform, including purchasing FNX tokens during the presale, involves risks inherent to cryptocurrency investments. It is imperative that users thoroughly understand these risks before proceeding.",
    },
    {
      id: 2,
      title: "Prohibited Jurisdictions",
      details: `Participation in the InfinixChain presale or the purchase of FNX tokens is strictly prohibited in jurisdictions where cryptocurrency transactions are restricted, banned, or otherwise regulated in a manner that would make participation unlawful.
This includes, but is not limited to, residents, citizens, or individuals located in the following countries:`,
      features: [
        "United States of America (USA)",
        "United Kingdom (UK)",
        "Canada",
        "China",
        "North Korea",
        "Iran",
        "Syria",
        "India (if applicable laws restrict crypto investments)",
        "Any other jurisdiction where cryptocurrency transactions are prohibited by law.",
      ],
      footNote: `If you reside in or are located in any of these jurisdictions, you must refrain from accessing the platform, participating in the presale, or purchasing FNX tokens. Failure to comply with this restriction may result in severe legal consequences under the applicable laws of your jurisdiction.`,
    },
    {
      id: 3,
      title: "Regulatory Compliance",
      details: `The regulatory environment for cryptocurrencies and blockchain technologies varies significantly across jurisdictions. InfinixChain is not responsible for ensuring compliance with local laws or regulations. It is the sole responsibility of the user to understand and adhere to the laws applicable in their jurisdiction before participating in the presale or using FNX tokens.`,
    },
    {
      id: 4,
      title: "Investment Risks",
      details: `Cryptocurrency investments are inherently speculative and carry significant risks, including but not limited to:`,
      features: [
        "Market Volatility: Cryptocurrency values are highly volatile and may experience substantial fluctuations.",
        "Regulatory Risks: Changes in laws or regulations could adversely affect the value or utility of FNX tokens.",
        "Security Risks: Despite best efforts, there is no guarantee against potential hacks, breaches, or losses due to third-party actions.",
        "Loss of Funds: Investments in FNX tokens may result in the loss of your entire investment.",
      ],
      footNote: `You are strongly advised to consult with financial, legal, or tax professionals before participating in the presale or purchasing FNX tokens.`,
    },
    {
      id: 5,
      title: "No Guarantee of Return",
      details: `Participation in the presale or purchase of FNX tokens does not guarantee any financial returns or benefits. The tokens are intended for utility purposes within the InfinixChain ecosystem and are not designed or marketed as investment products.`,
    },
    {
      id: 6,
      title: "Non-Refundable Transaction",
      details: `All purchases of FNX tokens during the presale are final and non-refundable. By proceeding with a transaction, you acknowledge and agree to this condition.`,
    },
    {
      id: 7,
      title: "Indemnification",
      details: `By using the InfinixChain platform or purchasing FNX tokens, you agree to indemnify and hold harmless InfinixChain, its team, affiliates, and partners from any claims, damages, or liabilities arising from your participation, including but not limited to losses incurred due to non-compliance with applicable laws.`,
    },
    {
      id: 8,
      title: "Acceptance of Term",
      details: `By accessing the InfinixChain platform or purchasing FNX tokens, you confirm that:`,
      features: [
        "You are not a resident, citizen, or located in a prohibited jurisdiction..",
        "You have conducted due diligence and understand the risks involved.",
        "You agree to comply with all applicable laws and regulations.",
      ],
      footNote: `You are strongly advised to consult with financial, legal, or tax professionals before participating in the presale or purchasing FNX tokens.`,
    },
    {
      id: 9,
      title: "Disclaimer Updates",
      details: `This disclaimer is subject to change at the discretion of InfinixChain to address new regulations, risks, or other developments. Users are encouraged to regularly review this disclaimer for updates.`,
    },
  ];

  return (
    <main>
      <Banner headerData={headerData} />
      <section className="bg-primary-5 py-20">
        <div className="container">
          <div className="bg-BG-FFF-8 xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 my-rounded-20 border border-stroct-1">
            <div className="gap-mb-48">
              {disclaimerData?.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx !== 0 &&
                    "border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8"
                  } ${disclaimerData?.length - 1 !== idx && "gap-mb-40"}`}
                >
                  <FadeDown>
                    <h3 className="my-text-24 gap-mb-32 sm:max-w-[856px] w-full text-primary-0">
                      {item?.title}
                    </h3>
                    <p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                      {item?.details}
                    </p>
                    {item?.features && (
                      <ul className="ml-5 list-outside list-disc grid gap-y-[2px] my-text-16 text-foundation-blue-30 gap-mb-24">
                        {item?.features?.map((feature, idx) => (
                          <li key={idx} className="">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item?.footNote && (
                      <p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                        {item?.footNote}
                      </p>
                    )}
                  </FadeDown>
                </div>
              ))}
            </div>
            <FadeDown>
              <p className="border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8 my-text-16 text-foundation-blue-30 text-center">
                For additional inquiries or clarifications, please contact us at
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

export default Disclaimer;
