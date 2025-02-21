//@ts-nocheck

import { useEffect, useState } from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";

const ConnectButton = () => {
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const [blockchain, setBlockchain] = useState<string | null>(null);

  useEffect(() => {
    setBlockchain(localStorage.getItem('blockchain'));
  }, []);

  const getBlockchainNetwork = (chain: string | null): string => {
    const networks = {
      'SOL': 'solana',
      'ETH': 'ethereum',
      'POL': 'polygon',
      'BNB': 'bsc',
      'BASE': 'BASE',
      'BITCOIN': 'bitcoin',
      'TRON': 'TRON',
    };
    return networks[chain as keyof typeof networks] || 'solana';
  };

  const handleConnectClick = async () => {
    try {
       await open();

      // if (address) {
      //   await disconnect();
      // } else {
      //   open();
      // }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <button
      onClick={handleConnectClick}
      className="flex-nowrap  w-full my-transition text-center cursor-pointer md:py-3 sm:py-2.5 py-2 lg:px-6 md:px-5 sm:px-4 px-3 sm:rounded-lg rounded-md my-text-16 font-semibold leading-[150%] bg-gradient-to-r from-primary-0 to-primary-1 hover:bg-primary-4 hover:text-white text-primary-4 border border-primary-0  "
    >
      {/* <span className="text-[14px] font-bold text-white PixelOperatorbold"> */}
        {address 
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : 'Connect Wallet'
        }
      {/* </span> */}
    </button>
  );
};

export default ConnectButton;