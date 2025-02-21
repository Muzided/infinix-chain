import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGlobalState } from "./context/GlobalState";

const NILE_CONFIG = {
    fullNode: "https://api.trongrid.io",
    solidityNode: "https://api.trongrid.io",
    eventServer: "https://api.trongrid.io",
    networkId: 1, // Mainnet network ID is 1
};

const TronNileWallet = () => {
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(0);
    const { tronAddressWall, setTronAddressWall } = useGlobalState();

    const connectWallet = async () => {
        try {
            if (!window.tronLink) {
                toast.error("Please install TronLink wallet.");
                return;
            }

            if (!window.tronLink.ready) {
                toast.error("Please unlock and connect your Tron wallet first.");
                return;
            }

            const response = await window.tronLink.request({
                method: "tron_requestAccounts",
            });

            if (response.code === 200) {
                const tronWeb = window.tronLink.tronWeb;

                // Set FullNode configurations
                await tronWeb.setFullNode(NILE_CONFIG.fullNode);
                await tronWeb.setSolidityNode(NILE_CONFIG.solidityNode);
                await tronWeb.setEventServer(NILE_CONFIG.eventServer);

                const userAddress = tronWeb.defaultAddress.base58;
                setAddress(userAddress);
                setTronAddressWall(userAddress);

                // Fetch balance
                const balanceInSun = await tronWeb.trx.getBalance(userAddress);
                setBalance(balanceInSun / 1_000_000); // Convert Sun to TRX
            }
        } catch (error) {
            console.error("Connection error:", error);
            toast.error("Failed to connect wallet.");
        }
    };

    const disconnectWallet = () => {
        setAddress(null);
        setTronAddressWall("");
        setBalance(0);
    };

    useEffect(() => {
        console.log("addressTron", address);
        console.log("tronAddressWall", tronAddressWall);
    }, [address, tronAddressWall]);

    return (
        <div>
            <button
                onClick={address ? disconnectWallet : connectWallet}
                className="flex-nowrap w-full my-transition text-center cursor-pointer md:py-3 sm:py-2.5 py-2 lg:px-6 md:px-5 sm:px-4 px-3 sm:rounded-lg rounded-md my-text-16 font-semibold leading-[150%] bg-gradient-to-r from-primary-0 to-primary-1 hover:bg-primary-4 hover:text-white text-primary-4 border border-primary-0"
            >
                {tronAddressWall
                    ? `${tronAddressWall.slice(0, 6)}...${tronAddressWall.slice(-4)}`
                    : "Connect Wallet"}
            </button>
        </div>
    );
};

export default TronNileWallet;



// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from './context/GlobalState';

// // const NILE_CONFIG = {
// //     fullNode: 'https://nile.trongrid.io',
// //     solidityNode: 'https://nile.trongrid.io',
// //     eventServer: 'https://nile.trongrid.io',
// //     networkId: 3
// // };
// const NILE_CONFIG = {
//     fullNode: 'https://api.trongrid.io',
//     solidityNode: 'https://api.trongrid.io',
//     eventServer: 'https://api.trongrid.io',
//     networkId: 1 // Mainnet network ID is 1
// };

// const TronNileWallet = () => {
//     const [address, setAddress] = useState(null);
//     const [balance, setBalance] = useState(0);
//     const { tronAddressWall, setTronAddressWall } = useGlobalState();

//     const connectWallet = async () => {
//         try {
//             if (window.tronLink) {
//                 const response = await window.tronLink.request({
//                     method: 'tron_requestAccounts'
//                 });

//                 if (response.code === 200) {
//                     const tronWeb = window.tronLink.tronWeb;

//                     // Set Nile testnet configuration
//                     await tronWeb.setFullNode(NILE_CONFIG.fullNode);
//                     await tronWeb.setSolidityNode(NILE_CONFIG.solidityNode);
//                     await tronWeb.setEventServer(NILE_CONFIG.eventServer);

//                     const userAddress = tronWeb.defaultAddress.base58;
//                     setAddress(userAddress);
//                     setTronAddressWall(userAddress)

//                     // Fetch balance
//                     const balanceInSun = await tronWeb.trx.getBalance(userAddress);
//                     setBalance(balanceInSun / 1_000_000); // Convert sun to TRX
//                 }
//             } else {
//                 toast.error('Connect Tron wallet');
//             }
//         } catch (error) {
//             console.error('Connection error:', error);
//         }
//     };

//     const disconnectWallet = () => {
//         setAddress(null);
//         setTronAddressWall('')
//         setBalance(0);
//     };

//     useEffect(() => {
//         console.log("addressTron", address)
//         console.log("tronAddressWall", tronAddressWall)
//     }, [address, tronAddressWall])


//     return (
//         <div className="">
//             <button
//                 onClick={address ? disconnectWallet : connectWallet}
//                 className={`
//           flex-nowrap  w-full my-transition text-center cursor-pointer md:py-3 sm:py-2.5 py-2 lg:px-6 md:px-5 sm:px-4 px-3 sm:rounded-lg rounded-md my-text-16 font-semibold leading-[150%] bg-gradient-to-r from-primary-0 to-primary-1 hover:bg-primary-4 hover:text-white text-primary-4 border border-primary-0
//         `}
//             >
//                 {tronAddressWall
//                     ? `${tronAddressWall.slice(0, 6)}...${tronAddressWall.slice(-4)}`
//                     : 'Connect Wallet'
//                 }
//             </button>
//         </div>
//     );
// };

// export default TronNileWallet;