import { FaqSection, Banner } from "@/components/Global";
import {
  BuyCryptoSection,
  CryptoOffersAndDeal,
  Exchange,
  TopUpMethod,
} from "@/components/Pages";
import { headerProps } from "@/config/types";


const CryptoBuy = () => {
  const headerData: headerProps = {
    title: "Exchange (Testnet)",
    description: "Earn passive income easily with just one click!",
  };
  return (
    <main className="bg-BG-2">
      <Banner headerData={headerData} />
      <BuyCryptoSection />
      <TopUpMethod />
      <CryptoOffersAndDeal />
      <Exchange />
      <FaqSection />
    </main>
  );
};

export default CryptoBuy;
