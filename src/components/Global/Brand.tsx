import Image from "next/image";
import brandLogo from "@/../public/images/InfinixChain.png";

const Brand = () => {
  return <Image width={138} height={58} src={brandLogo} alt="brand" />;
};

export default Brand;
