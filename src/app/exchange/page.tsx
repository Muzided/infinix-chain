import FadeUp from "@/motion/FadeUp";

const Exchange = () => {
  return (
    <main className="bg-BG">
      <section id="about" className="bg-BG-2 section-py xl:pt-52 lg:pt-42 md:pt-34 sm:pt-30 pt-32">
        <div className="container">
        <FadeUp>
          <h2 className="banner-title text-center gradient-text-primary lg:pb-6 md:pb-5 sm:pb-4 pb-3.5">
            Exchange
          </h2>
          <p className="my-text-20 text-center text-foundation-blue-20 w-full mt-8">
            The InfinixChain Token (FNX) is the native cryptocurrency powering
            the InfinixChain ecosystem. It plays a central role in transactions,
            governance, staking, and rewarding participants.
          </p>
        </FadeUp>
        </div>
      </section>
    </main>
  );
};

export default Exchange;
