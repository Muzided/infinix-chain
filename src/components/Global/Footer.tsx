import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandX,
  IconBrandTiktok
} from "@tabler/icons-react";
import FadeUp from "@/motion/FadeUp";
import FadeDown from "@/motion/FadeDown";
import { Subscribe } from "./";

const Footer = () => {
  // Get the current year using JavaScript's Date object
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-primary-8">
        <div className="container section-py ">
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-start-1 lg:col-end-6 col-span-12">
              <FadeUp>
                <h2 className="section-title gap-mb-24">
                  <Link href="#" className="text-white">
                    InfinixChain
                  </Link>
                </h2>
              </FadeUp>
              <FadeDown>
                <p className="my-text-16 lg: gap-mb-40">
                  Welcome to InfinixChain, your gateway to the world of Web3 trading!
                  Our user-friendly platform empowers you to explore a wide
                  range of popular cryptocurrencies
                </p>
              </FadeDown>
              <div className="hidden lg:flex justify-center items-center bg-BG-FFF-8 border border-stroct-1 rounded-[4px] lg:pl-6 pl-2 py-2 pr-2 gap-mb-48">
                <Subscribe />
              </div>
              <div className="flex-centerY gap-2">
                <Link
                  href="https://www.facebook.com/share/1HWunBEsJs/?mibextid=wwXIfr"
                  target="_blank"
                  className="btn-outline-round hover:bg-primary-1 border-primary-1 hover:border-transparent text-primary-1 hover:text-primary-4"
                  aria-label="socal-facebook"
                >
                  <IconBrandFacebook className="xxl:w-6 xxl:h-6 w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/infinix_chain/"
                  target="_blank"
                  className="btn-outline-round hover:bg-primary-1 border-primary-1 hover:border-transparent text-primary-1 hover:text-primary-4"
                  aria-label="socal-instagram"
                >
                  <IconBrandInstagram className="xxl:w-6 xxl:h-6 w-5 h-5" />
                </Link>
                <Link
                  href="https://x.com/infinixchain"
                  target="_blank"
                  className="btn-outline-round hover:bg-primary-1 border-primary-1 hover:border-transparent text-primary-1 hover:text-primary-4"
                  aria-label="socal-twitter"
                >
                  <IconBrandX className="xxl:w-6 xxl:h-6 w-5 h-5" />
                </Link>
                <Link
                  href="https://discord.gg/p8trHWsdpv"
                  target="_blank"
                  className="btn-outline-round hover:bg-primary-1 border-primary-1 hover:border-transparent text-primary-1 hover:text-primary-4"
                  aria-label="socal-linkedin"
                >
                  <IconBrandDiscord className="xxl:w-6 xxl:h-6 w-5 h-5" />
                </Link>
                <Link
                  href="https://t.me/InfinixChainOfficial"
                  target="_blank"
                  className="btn-outline-round hover:bg-primary-1 border-primary-1 hover:border-transparent text-primary-1 hover:text-primary-4"
                  aria-label="socal-linkedin"
                >
                  <IconBrandTelegram className="xxl:w-6 xxl:h-6 w-5 h-5" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@infinix.chain"
                  target="_blank"
                  className="btn-outline-round hover:bg-primary-1 border-primary-1 hover:border-transparent text-primary-1 hover:text-primary-4"
                  aria-label="socal-linkedin"
                >
                  <IconBrandTiktok className="xxl:w-6 xxl:h-6 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="lg:col-start-7 lg:col-end-9 sm:col-span-4 col-span-4">
              <FadeDown>
                <h4 className="my-text-24 gap-mb-40">Information</h4>
              </FadeDown>
              <FadeUp>
                <ul className="grid lg:gap-3 md:gap-2.5 gap-1.5 list-inside list-none text-primary ">
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/how-to-buy"
                    >
                      How to Buy
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/crypto-buy"
                    >
                      Whitepapers
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/blogs"
                    >
                      Docs
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="#"
                    >
                      Announcement
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="#"
                    >
                      Audit
                    </Link>
                  </li>
                </ul>
              </FadeUp>
            </div>
            <div className="lg:col-start-9 lg:col-end-11  sm:col-span-4 col-span-4">
              <FadeDown>
                <h4 className="my-text-24 gap-mb-40">Legal</h4>
              </FadeDown>
              <FadeUp>
                <ul className="grid lg:gap-3 md:gap-2.5 gap-1.5 list-inside list-none text-primary ">
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/risk"
                    >
                      Risk Disclosures
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/disclaimer"
                    >
                      Disclaimer
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/terms-conditions"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </FadeUp>
            </div>
            <div className="lg:col-start-11 lg:col-end-13  sm:col-span-4 col-span-4">
              <FadeDown>
                <h4 className="my-text-24 gap-mb-40">Support</h4>
              </FadeDown>
              <FadeUp>
                <ul className="grid lg:gap-3 md:gap-2.5 gap-1.5 list-inside list-none text-primary ">
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="#faq"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="hover:translate-x-2 my-transition">
                    <Link
                      className="my-text-16 hover:text-primary-1 my-transition"
                      href="#"
                    >
                      Customer Support
                    </Link>
                  </li>
                </ul>
              </FadeUp>
            </div>
          </div>
          <div className="gap-mt-40 lg:hidden flex justify-center items-center bg-BG-FFF-8 border border-stroct-1 rounded-[4px] md:pl-5 pl-2 py-2 pr-2">
            <Subscribe />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-primary-0 to-primary-1 lg:py-6 md:py-5 sm:py-4 py-3">
        <div className="container text-center flex md:flex-row flex-col-reverse md:justify-between justify-center items-center gap-x-6 gap-y-1">
          <h6 className="text-primary-4 my-text-16">
            Copyright ©{currentYear} - All Rights Reserved
          </h6>
          <div className="flex items-center">
            <Link
              href="/privacy-policy"
              className="block text-primary-4 my-text-16"
            >
              Privacy Policy
            </Link>
            <h6 className="block mx-2 text-primary-4 my-text-16">|</h6>
            <Link
              href="/terms-conditions"
              className="block text-primary-4 my-text-16"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
