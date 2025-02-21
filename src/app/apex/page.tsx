import { Banner } from "@/components/Global";
import ApexDashboardSection from "@/components/Pages/Apex/ApexDashboardSection";
import { headerProps } from "@/config/types";

const Apex = () => {
  const headerData: headerProps = {
      title: "Apex (Testnet)",
      description: "Earn passive income easily with just one click!",
    };
  return (
    <main className="bg-BG-2">
      <Banner headerData={headerData} />
      <ApexDashboardSection />
    </main>
  );
};

export default Apex;
