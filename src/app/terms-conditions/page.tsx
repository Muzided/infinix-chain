import { Banner, FaqSection } from "@/components/Global";
import { TermsAndConditionsSection } from "@/components/Pages";
import { headerProps } from "@/config/types";

const TermsAndConditions = () => {
  const headerData: headerProps = {
    title: "Terms & Conditions",
    description: "Welcome to InfinixChain. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before engaging with our services.",
  };

  return (
    <main className="bg-primary-5">
      <Banner headerData={headerData} />
      <section className="bg-primary-5 section-py">
        <div className="container">
          <TermsAndConditionsSection />
        </div>
      </section>
      <FaqSection />
    </main>
  );
};

export default TermsAndConditions;
