import Image from "next/image";
import wallet1 from "@/../public/images/wallet1.png";
import wallet2 from "@/../public/images/wallet2.png";
import PhantomLogo from "@/../public/images/PhantomLogo.png";

const connectWalletHandler = (walletType: string) => {
  if(walletType === 'metaMask'){
    // connect metamask here
  }
  else if (walletType === 'walletConnect'){
    //connect WalletConnect here
  }
  else if(walletType==='phantom'){
    // connect phantom here
  }
}

const ConnectWallet = () => {
  return (
    <div>
      <h2 className="my-text-32 text-primary-1 gap-mb-60">
        Connect Your Wallet
      </h2>
      <button onClick={() => connectWalletHandler('metaMask')} className="btn w-full flex-centerY justify-between bg-BG-FFF-8 border border-stroct-1 gap-mb-24">
        <span className="my-text-16 font-medium">mask</span>
        <Image width={32} height={32} src={wallet1} alt="MetaMask" />
      </button>
      <button onClick={() => connectWalletHandler('walletConnect')} className="btn w-full flex-centerY justify-between bg-BG-FFF-8 border border-stroct-1 gap-mb-24">
        <span className="my-text-16 font-medium">Connect with WalletConnect</span>
        <Image width={32} height={32} src={wallet2} alt="WalletConnect" />
      </button>
      <button onClick={() => connectWalletHandler('phantom')} className="btn w-full flex-centerY justify-between bg-BG-FFF-8 border border-stroct-1">
        <span className="my-text-16 font-medium">Connect with Phantom</span>
        <Image width={32} height={32} src={PhantomLogo} alt="Phantom" />
      </button>
    </div>
  );
};

export default ConnectWallet;
