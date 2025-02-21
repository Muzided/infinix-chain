import { Banner, FaqSection } from "@/components/Global";
import { TermsAndConditionsSection } from "@/components/Pages";
import { headerProps } from "@/config/types";
import FadeDown from "@/motion/FadeDown";
import FadeUp from "@/motion/FadeUp";

const HowToBuy = () => {
  const stepsData = [
    {
      id: 1,
      title: "Prepare Your Wallet",
      features: [
        "Compatible Wallets: Use a decentralized wallet like MetaMask or Trust Wallet for Ethereum (ETH), Binance Smart Chain (BSC), or Polygon. For Solana, use Phantom Wallet.",
        "Network Setting: Ensure your wallet is set to the appropriate network (ETH, BSC, Polygon, or Solana).",
      ],
    },
    {
      id: 2,
      title: "Fund Your Wallet",
      features: [
        "Required Currency: Ethereum (ETH), Binance Coin (BNB), or Polygon (MATIC) is required for transaction gas fees. If you want to buy using BTC, ensure you have BTC in your wallet.",
      ],
    },
    {
      id: 3,
      title: "Visit the InfinixChain Presale Platform",
      features: [
        "Website: Go to InfinixChain.com.",
        "Connect Wallet: Click the 'Connect Wallet' button to link your wallet to the platform.",
      ],
    },
    {
      id: 4,
      title: "Select Payment Method",
      features: [
        "Payment Options: Choose to pay with ETH, BNB, MATIC, or BTC by selecting the respective button on the presale dashboard.",
      ],
    },
    {
      id: 5,
      title: "Enter Purchase Amount",
      features: [
        "Enter Amount: Input the amount of ETH, BNB, MATIC, or BTC you want to spend.",
        "Token Preview: The dashboard will show how many FNX tokens you’ll receive.",
      ],
    },
    {
      id: 6,
      title: "Approve and Confirm the Transaction",
      features: [
        "Verify: Double-check transaction details in your wallet, including the amount and recipient address.",
        "Confirm: Approve the transaction and wait for the network to validate it.",
        "For BTC payments: Ensure the transaction is confirmed on the Bitcoin network.",
      ],
    },
    {
      id: 7,
      title: "Success!",
      features: [
        "Once confirmed, wait for the presale to end. Stay active on social media for announcements.",
        "After the presale ends, connect your wallet on InfinixChain and follow the instructions to claim your FNX tokens.",
      ],
    },
  ];

  const cardData = [
    {
      id: 1,
      title: "Buy ETH, BNB, MATIC, or BTC Using a Card",
      detail: "Use trusted on-ramp services such as:",
      features: ["Ramp Network", "Transak", "MoonPay"],
      footNote:
        "Follow the platform’s steps to purchase ETH, BNB, MATIC, or BTC and transfer it directly to your wallet.",
    },
    {
      id: 2,
      title: "Purchase FNX",
      detail:
        "Once the funds are in your wallet, proceed with the steps above starting from Step 3.",
      features: [],
    },
  ];

  const headerData: headerProps = {
    title: "Step-by-Step Guide to Buying FNX Tokens (InfinixChain)",
    description:
      "InfinixChain (FNX) tokens are currently available exclusively during the presale on InfinixChain.com. They are not yet listed on decentralized exchanges (DEXs) like Uniswap or PancakeSwap, and the smart contract has not been deployed yet. Be cautious of counterfeit FNX tokens on DEXs claiming to be authentic.",
  };

  return (
    <main className="bg-primary-5">
      <section className="w-full max-h-[541px] bg-BG">
        <div className="section-pb">
          <div className="container flex flex-col justify-center items-center xl:pt-52 lg:pt-42 md:pt-34 sm:pt-30 pt-32">
            <FadeUp>
              <h2 className="banner-title text-center gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5">
                {headerData?.title}
              </h2>
            </FadeUp>
            <FadeDown>
              <p className="my-text-20 text-center text-foundation-blue-20 w-full">
                {headerData?.description}
              </p>
            </FadeDown>
          </div>
        </div>
      </section>
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
                      Step {item?.id}: {item?.title}
                    </h3>
                    {/* <p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                {item?.details}
              </p> */}
                    <ul className="ml-5 list-outside list-disc grid gap-y-[2px] my-text-16 text-foundation-blue-30">
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
          </div>
        </div>
      </section>
      <section id="card" className="bg-primary-5 py-20">
        <div className="container">
          <div className="bg-BG-FFF-8 xl:p-[60px] lg:p-12 md:p-10 sm:p-8 p-5 my-rounded-20 border border-stroct-1">
            <div className="container flex flex-col justify-center items-center mb-8">
              <FadeUp>
                <h2 className="my-text-32 text-center gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5">
                  Buying FNX Using a Credit/Debit Card
                </h2>
              </FadeUp>
              <FadeDown>
                <p className="my-text-16 text-center text-foundation-blue-20 w-full">
                  For users unfamiliar with DeFi, you can purchase FNX without
                  navigating complex blockchain setups
                </p>
              </FadeDown>
            </div>
            <div className="gap-mb-48">
              {cardData?.map((item, idx) => (
                <div
                  key={idx}
                  className={`${"border-t border-primary-0 xl:pt-[52px] lg:pt-12 md:pt-10 sm:pt-9 pt-8"} ${
                    cardData?.length - 1 !== idx && "gap-mb-40"
                  }`}
                >
                  <FadeDown>
                    <h3 className="my-text-24 gap-mb-32 sm:max-w-[856px] w-full text-primary-0">
                      Step {item?.id}: {item?.title}
                    </h3>
                    <p className="my-text-16 text-foundation-blue-30 gap-mb-24">
                      {item?.detail}
                    </p>
                    <ul className="ml-5 list-outside list-disc grid gap-y-[2px] my-text-16 text-foundation-blue-30">
                      {item?.features?.map((feature, idx) => (
                        <li key={idx} className="">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {item.footNote && (
                      <p className="my-text-16 text-foundation-blue-30 gap-mt-24">
                        {item?.footNote}
                      </p>
                    )}
                  </FadeDown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full max-h-[541px] bg-BG">
        <div className="pb-20">
          <div className="container flex flex-col pt-20">
            <FadeUp>
              <h2 className="my-text-32 gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5">
                Important Notes
              </h2>
            </FadeUp>
            <FadeDown>
              <ul className="ml-5 list-outside list-disc grid gap-y-[2px] my-text-18 text-foundation-blue-30">
                  <li className="">
                  Double-check all wallet addresses and payment details to avoid errors.
                  </li>
                  <li className="">
                  When paying with BTC, ensure the transaction is fully confirmed before proceeding.
                  </li>
                  <li className="">
                  For Solana, make sure your Phantom wallet is properly connected.
                  </li>
                  <li className="">
                  Remember to claim your FNX tokens after the presale ends by connecting your wallet on the platform.
                  </li>
              </ul>
              <p className="my-text-18 text-foundation-blue-30 gap-mt-24">
              By following these simple steps, you can secure your FNX tokens during this exclusive presale phase and claim them once the presale concludes.
              </p>
            </FadeDown>
          </div>
        </div>
      </section>
      <FaqSection />
    </main>
  );
};

export default HowToBuy;
