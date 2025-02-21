



// import { useState } from 'react';
// import { toast } from 'react-toastify';
// // Assuming OKX provides an SDK or method for connecting wallets
// import { OkxWallet } from 'okx-wallet-sdk'; // Hypothetical import based on OKX SDK

// export const useBitcoinTransaction = () => {
//     const [walletAddress, setWalletAddress] = useState('');
//     const [isConnected, setIsConnected] = useState(false);

//     // Function to connect the wallet using OKX Wallet
//     const connectWallet = async () => {
//         try {
//             // Initialize the OKX wallet provider
//             const okxWallet = new OkxWallet();

//             // Check if OKX wallet is available
//             if (!window.okx) {
//                 toast.error("OKX wallet not found. Please install it.");
//                 return;
//             }

//             // Connect the wallet and get the address
//             const address = await okxWallet.connect();
//             setWalletAddress(address);
//             setIsConnected(true);
//             toast.success("Wallet connected successfully!");
//         } catch (error) {
//             console.error("Error connecting wallet:", error);
//             toast.error(`Error connecting wallet: ${error.message}`);
//         }
//     };

//     // Function to send Bitcoin transaction via OKX wallet
//     const payAmountBitcoin = async (recipientAddress, amountInSatoshis, isTestnet = false) => {
//         try {
//             if (!isConnected) {
//                 toast.info("Wallet is not connected. Connecting...");
//                 await connectWallet(); // Connect the wallet dynamically
//             }

//             if (!walletAddress) {
//                 toast.error("Failed to get wallet address. Please reconnect the wallet.");
//                 return { success: false, error: "No wallet address available." };
//             }

//             // Validate recipient address
//             if (!recipientAddress || !recipientAddress.startsWith("1") && !recipientAddress.startsWith("3") && !recipientAddress.startsWith("bc1")) {
//                 toast.error("Invalid Bitcoin recipient address.");
//                 return { success: false, error: "Invalid recipient address." };
//             }

//             // Validate transaction amount
//             if (amountInSatoshis <= 0) {
//                 toast.error("The amount must be greater than 0 satoshis.");
//                 return { success: false, error: "Invalid amount." };
//             }

//             // Use OKX wallet to send Bitcoin transaction
//             const transaction = await okxWallet.sendTransaction({
//                 to: recipientAddress, // Recipient address
//                 value: amountInSatoshis, // Amount in satoshis
//                 chain: 'bitcoin', // Chain type (Bitcoin)
//                 isTestnet, // Use testnet or mainnet
//             });

//             console.log("Transaction successful! TXID:", transaction.txid);
//             toast.success(`Transaction successful! TXID: ${transaction.txid}`);

//             return { success: true, txid: transaction.txid };
//         } catch (error) {
//             console.error("Transaction failed:", error);
//             toast.error(`Transaction failed: ${error.message || "Unknown error occurred"}`);
//             return { success: false, error: error.message || "Unknown error occurred" };
//         }
//     };

//     return { connectWallet, payAmountBitcoin, walletAddress, isConnected };
// };











// import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
// import type { BitcoinConnector } from '@reown/appkit-adapter-bitcoin';
// import { toast } from 'react-toastify';

// export const useBitcoinTransaction = () => {
//     const { walletProvider, connectWallet } = useAppKitProvider<BitcoinConnector>('bip122');
//     const { allAccounts, address, isConnected } = useAppKitAccount();

//     // Function to send a transaction
//     const payAmountBitcoinUSDC = async (recipientAddress: string, amountInSatoshis: number, isTestnet: boolean = false) => {
//         try {
//             // Check if the wallet is connected
//             if (!isConnected) {
//                 toast.info("Wallet is not connected. Connecting...");
//                 await connectWallet(); // Connect the wallet dynamically
//             }

//             if (!address) {
//                 toast.error("Failed to get wallet address. Please reconnect the wallet.");
//                 return { success: false, error: "No wallet address available." };
//             }

//             // Validate the recipient address
//             if (!recipientAddress || !recipientAddress.startsWith("1") && !recipientAddress.startsWith("3") && !recipientAddress.startsWith("bc1")) {
//                 toast.error("Invalid Bitcoin recipient address.");
//                 return { success: false, error: "Invalid recipient address." };
//             }

//             // Validate the transaction amount
//             if (amountInSatoshis <= 0) {
//                 toast.error("The amount must be greater than 0 satoshis.");
//                 return { success: false, error: "Invalid amount." };
//             }

//             // Send the transaction
//             const signature = await walletProvider.sendTransfer({
//                 recipient: recipientAddress,
//                 amount: amountInSatoshis.toString(), // Amount in satoshis
//             });

//             console.log("Transaction successful! Signature:", signature);

//             // Fetch the updated balance
//             const balance = await handleGetBalance(address, isTestnet);
//             console.log("Updated Balance:", balance);

//             return { success: true, signature, balance };
//         } catch (error) {
//             console.error("Transaction failed:", error);
//             toast.error(`Transaction failed: ${error.message || "Unknown error occurred"}`);
//             return { success: false, error: error.message || "Unknown error occurred" };
//         }
//     };

//     // Function to get balance
//     const handleGetBalance = async (address: string, isTestnet: boolean = false): Promise<number> => {
//         const utxos = await getUTXOs(address, isTestnet);
//         const balance = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
//         return balance;
//     };

//     // Helper function to fetch UTXOs
//     const getUTXOs = async (address: string, isTestnet: boolean = false): Promise<UTXO[]> => {
//         const response = await fetch(
//             `https://mempool.space${isTestnet ? '/testnet' : ''}/api/address/${address}/utxo`
//         );
//         if (!response.ok) {
//             throw new Error("Failed to fetch UTXOs from the API.");
//         }
//         return await response.json();
//     };

//     return { payAmountBitcoinUSDC };
// };

// // UTXO Type Definition
// type UTXO = {
//     txid: string;
//     vout: number;
//     value: number;
//     status: {
//         confirmed: boolean;
//         block_height: number;
//         block_hash: string;
//         block_time: number;
//     };
// };







import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
import type { BitcoinConnector } from '@reown/appkit-adapter-bitcoin';
import { toast } from 'react-toastify';

export const useBitcoinTransaction = () => {
    const { walletProvider } = useAppKitProvider<BitcoinConnector>('bip122');
    const { allAccounts, address, isConnected } = useAppKitAccount();

    // Function to send a transaction
    // const payAmountBitcoinUSDC = async (recipientAddress: string, amountInSatoshis: number, isTestnet: boolean = false) => {
    //     try {
    //         if (!isConnected || !address) {
    //             toast.error("Wallet is not connected");
    //         }

    //         if (!recipientAddress || !recipientAddress.startsWith("1") && !recipientAddress.startsWith("3") && !recipientAddress.startsWith("bc1")) {
    //             toast.error("Invalid Bitcoin recipient address.");
    //         }

    //         if (amountInSatoshis <= 0) {
    //             toast.error("The amount must be greater than 0 satoshis.");
    //         }

    //         const signature = await walletProvider.sendTransfer({
    //             recipient: recipientAddress,
    //             amount: amountInSatoshis.toString(), // Amount in satoshis
    //         });

    //         console.log("Transaction successful! Signature:", signature);

    //         const balance = await handleGetBalance(address, isTestnet);
    //         console.log("Updated Balance:", balance);

    //         return { success: true, signature, balance };
    //     } catch (error) {
    //         // console.error("Transaction failed:", error.message || error);
    //         console.error("Transaction failed:", error);
    //         return { success: false, error: error || "Unknown error occurred" };
    //         // return { success: false, error: error.message || "Unknown error occurred" };
    //     }
    // };
    const payAmountBitcoinUSDC = async (recipientAddress: string, amountInSatoshis: number, isTestnet: boolean = false) => {
        try {
            if (!isConnected || !address) {
                toast.error("Wallet is not connected");
                return { success: false, error: "Wallet not connected" };
            }

            if (!recipientAddress || !recipientAddress.startsWith("1") && !recipientAddress.startsWith("3") && !recipientAddress.startsWith("bc1")) {
                toast.error("Invalid Bitcoin recipient address.");
                return { success: false, error: "Invalid recipient address" };
            }

            if (amountInSatoshis <= 0) {
                toast.error("The amount must be greater than 0 satoshis.");
                return { success: false, error: "Invalid amount" };
            }

            const signature = await walletProvider.sendTransfer({
                recipient: recipientAddress,
                amount: amountInSatoshis.toString(),
            });

            console.log("Transaction successful! Signature:", signature);

            if (address) {
                const balance = await handleGetBalance(address, isTestnet);
                console.log("Updated Balance:", balance);
                return { success: true, signature, balance };
            } else {
                console.error("Wallet address is undefined after transaction.");
                return { success: true, signature, balance: 0 };
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            return { success: false, error: error || "Unknown error occurred" };
        }
    };


    // Function to get balance
    const handleGetBalance = async (address: string, isTestnet: boolean = false): Promise<number> => {
        const utxos = await getUTXOs(address, isTestnet);
        const balance = utxos.reduce((sum, utxo) => sum + utxo.value, 0);
        return balance;
    };

    // Helper function to fetch UTXOs
    const getUTXOs = async (address: string, isTestnet: boolean = false): Promise<UTXO[]> => {
        const response = await fetch(
            `https://mempool.space${isTestnet ? '/testnet' : ''}/api/address/${address}/utxo`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch UTXOs from the API.");
        }
        return await response.json();
    };

    return { payAmountBitcoinUSDC };
};

// UTXO Type Definition
type UTXO = {
    txid: string;
    vout: number;
    value: number;
    status: {
        confirmed: boolean;
        block_height: number;
        block_hash: string;
        block_time: number;
    };
};
