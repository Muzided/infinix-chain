import { Banner, FaqSection } from "@/components/Global";
import { headerProps } from "@/config/types";
import FadeDown from "@/motion/FadeDown";

const Risk = () => {
  const stepsData = [
    {
      id: 1,
      title: "General Cryptocurrency Risks",
      features: [
        "Volatility: Cryptocurrencies, including FNX, are highly volatile. Prices may experience rapid and significant fluctuations due to market demand, regulatory changes, and other external factors.",
        "Loss of Investment: There is no guarantee of profitability, and you may lose all or part of your investment.",
        "Market Liquidity: Cryptocurrencies may face low liquidity in certain market conditions, making it difficult to buy or sell tokens at desired prices.",
      ],
    },
    {
      id: 2,
      title: "Regulatory Risks",
      features: [
        "Legal Restrictions: Cryptocurrency activities may be restricted or prohibited in certain jurisdictions. Users must ensure they comply with all applicable laws and regulations in their country.",
        "Government Actions: Regulatory actions or changes in laws could impact the availability, functionality, or value of cryptocurrencies.",
      ],
    },
    {
      id: 3,
      title: "Security Risks",
      features: [
        "Private Key Management: Users are solely responsible for securing their private keys. Loss or theft of private keys may result in the permanent loss of funds.",
        "Cybersecurity Threats: Cryptocurrencies are susceptible to hacking, phishing attacks, and other forms of cybercrime. Ensure you use secure wallets and trusted platforms.",
        "Smart Contract Vulnerabilities: Although InfinixChain takes measures to ensure the security of smart contracts, vulnerabilities may exist that could be exploited by malicious actors.",
      ],
    },
    {
      id: 4,
      title: "Platform-Specific Risks",
      features: [
        "Decentralized Nature: InfinixChain operates as a decentralized platform. Transactions are irreversible, and there is no recourse for recovering funds sent to incorrect addresses.",
        "Platform Updates: Updates to the InfinixChain network or ecosystem may affect the performance, accessibility, or functionality of your assets.",
        "Presale Participation: Participation in the FNX presale carries additional risks, including delays in token distribution and changes in presale terms.",
      ],
    },
    {
      id: 5,
      title: "Taxation Risks",
      features: [
        "Tax Obligations: Cryptocurrency transactions may be subject to taxation. It is the user's responsibility to comply with tax obligations in their jurisdiction. Consult with a qualified tax advisor if needed.",
      ],
    },
    {
      id: 6,
      title: "Technology Risks",
      features: [
        "Blockchain Failures: The blockchain infrastructure may experience bugs, technical failures, or network outages, potentially impacting transactions and token accessibility.",
        "Compatibility Issues: Ensure that your wallet and other tools are compatible with the InfinixChain platform to avoid transaction errors.",
      ],
    },
    {
      id: 7,
      title: "Third-Party Risks",
      features: [
        "Wallet Providers: Interactions with third-party wallet providers, such as MetaMask or Trust Wallet, are governed by their terms and conditions. InfinixChain is not responsible for issues arising from their use.",
        "Exchanges: If you trade FNX tokens on third-party exchanges, you are subject to the risks and terms associated with those platforms.",
      ],
    },
    {
      id: 8,
      title: "No Guarantees or Warranties",
      features: [
        "Performance: InfinixChain does not guarantee any specific performance, return, or value of FNX tokens.",
        "No Refunds: Cryptocurrency transactions are final and cannot be reversed or refunded.",
      ],
    },
    {
      id: 9,
      title: "User Responsibility",
      features: [
        "Due Diligence: Users must conduct their own research and understand the risks associated with cryptocurrencies and blockchain technology before participating.",
        "Risk Tolerance: Only invest funds that you can afford to lose without impacting your financial stability.",
      ],
    },
    {
      id: 10,
      title: "Acknowledgment of Risks",
      details: `By using the InfinixChain platform or participating in the FNX token presale, you acknowledge and accept the risks outlined in this disclosure.`,
    },
  ];

  const headerData: headerProps = {
    title: "Risk Disclosures",
    description:
      "Investing in cryptocurrencies, including the FNX token, involves significant risks. This Risk Disclosure statement is designed to inform you of the potential risks associated with engaging in cryptocurrency-related activities on the InfinixChain platform. Please read this document carefully before participating in any transactions.",
  };

  return (
    <main className="bg-primary-5">
      <Banner headerData={headerData} />
      <section className="bg-primary-5 py-20">
        <div className="container">
          <div className="bg-BG-FFF-8 xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 my-rounded-20 border border-stroct-1">
            <div className="gap-mb-48">
              {stepsData?.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx !== 0 &&
                    "border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8"
                  } ${stepsData?.length - 1 !== idx && "gap-mb-40"}`}
                >
                  <FadeDown>
                    <h3 className="my-text-24 gap-mb-32 sm:max-w-[856px] w-full text-primary-0">
                      {item?.title}
                    </h3>
                    {item?.details && (
                      <p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                        {item?.details}
                      </p>
                    )}
                    {item?.features && (<ul className="ml-5 list-outside list-disc grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                      {item?.features?.map((feature, idx) => (
                        <li key={idx} className="">
                          {feature}
                        </li>
                      ))}
                    </ul>)}
                  </FadeDown>
                </div>
              ))}
            </div>
            <FadeDown>
              <p className="border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8 my-text-16 text-foundation-blue-30 text-center">
              For any questions or concerns, contact us at
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

export default Risk;
