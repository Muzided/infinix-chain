import Image from "next/image";
import Link from "next/link";
import app1 from "@/../../public/images/Social.png";
import app2 from "@/../../public/images/Social-1.png";
import app3 from "@/../../public/images/Social-2.png";
import app4 from "@/../../public/images/Social-3.png";
import FadeLeft from "@/motion/FadeLeft";
import FadeRight from "@/motion/FadeRight";

const SaleBanner = () => {
  return (
    <section className="section-py bg-BG-2">
      <div className="container flex-center flex-col text-center w-full">
        <FadeLeft>
          <h2 className="section-title gap-mb-24">InfinixChain Token (<span className="text-primary-1">FNX</span>) Presale is Live!</h2>
          <p className="my-text-18 gap-mb-20 w-full">
          Join now and be part of the future of blockchain technology.
          </p>
          <p className="my-text-24 gap-mb-40 w-full">
          Hurry, limited spots available!
          </p>
        </FadeLeft>
        <FadeRight>
          <div>
            <Link className="btn btn-primary" href="#hero">
            Join the Presale Now
            </Link>
            {/* <div className="flex-centerY sm:gap-4 gap-3">
              <Link href="#">
                <Image width={24} height={24} src={app1} alt="app1" />
              </Link>
              <Link href="#">
                <Image width={24} height={24} src={app2} alt="app2" />
              </Link>
              <Link href="#">
                <Image width={24} height={24} src={app3} alt="app3" />
              </Link>
              <Link href="#">
                <Image width={24} height={24} src={app4} alt="app4" />
              </Link>
            </div> */}
          </div>
        </FadeRight>
      </div>
    </section>
  );
};

export default SaleBanner;
