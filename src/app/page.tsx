import { FaqSection, SupportCompanies } from "@/components/Global";
import {
  CriptoTranding,
  CryptoExchange,
  DigitalWorld,
  DiscoverWeb3,
  EarnAndSavings,
  Exchange,
  CoreFeatures,
  GetStarted,
  HomeBanner,
  Markets,
  Roadmap,
  InfinixRoadmap,
  SaleBanner,
  InfinixChainToken,
  AboutUs,
  PlatformSolutions,
} from "@/components/Pages";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HomeBanner />
      <SupportCompanies />
      <AboutUs />
      <PlatformSolutions />
      {/* <Markets /> */}
      {/* <DigitalWorld /> */}
      <GetStarted />
      {/* <DiscoverWeb3 /> */}
      {/* <EarnAndSavings /> */}
      <CoreFeatures/>
      <InfinixChainToken/>
      {/* <CryptoExchange /> */}
      {/* <Roadmap/> */}
      <InfinixRoadmap/>
      {/* <CriptoTranding /> */}
      {/* <Exchange /> */}
      <SaleBanner/>
      <FaqSection />
    </main>
  );
}
