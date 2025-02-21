// @ts-nocheck
"use client";

import Link from "next/link";

import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { FKeypair, ParsedAccountData } from "@solana/web3.js";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Token,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
// import { currencyNetworkCategorys } from "@/../../public/data/currencyNetworkCategorys";
// import {
//   SystemProgram,
//   PublicKey,
//   Transaction,
//   LAMPORTS_PER_SOL,
//   clusterApiUrl,
//   Connection
// } from '@solana/web3.js'
import { useAppKitAccount, useAppKitProvider, useDisconnect } from "@reown/appkit/react";
// import { useAppKitAccount, useAppKitProvider, useDisconnect } from "@reown/appkit/react";
import {
  useAppKitConnection,
  type Provider,
} from "@reown/appkit-adapter-solana/react";

import { preSaleCardCurrencies } from "@/../../public/data/preSaleCardCurrencies";
import {
  IconCaretDownFilled,
  IconExchange,
  IconWallet,
} from "@tabler/icons-react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState, useEffect, use } from "react";
import { Listbox } from "@headlessui/react";
import { useDropdown } from "@/hooks";
import { ConnectWallet, Modal } from "./";

import { useAppKit, useAppKitNetwork, useAppKitState } from "@reown/appkit/react";
import ConnectButton from "@/web3/ConnectButton";

import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useContractWrite,
  useWaitForTransaction,
  useWriteContract,
} from "wagmi";
import { parseEther, parseUnits } from "viem";
import { toast } from "react-toastify";
import { adminAddress, USDTContract, USDCContract, BSCUSDTContract, BSCUSDCContract, SolanaUSDTContract, adminAddressSOl, adminAddressTron, TronUSDTContract, adminAddressTronUSDT, REACT_APP_IV_KEY, SolanaUSDCContract, BitcoinAdminAddress, PolygonUSDCContract, PolygonUSDTContract, BaseUSDTContract, BaseUSDCContract } from '../../app/config/server'
import EthUSDTAbi from '../../app/config/EthUSDTAbi.json'
import EthUSDCAbi from '../../app/config/EthUSDCAbi.json'
import BscUSDTAbi from '../../app/config/BscUSDTAbi.json'
import BscUSDCAbi from '../../app/config/BscUSDCAbi.json'
import tronAbi from '../../app/config/tronAbi.json'

import CountDownTimer from "@/components/Global/CountDownTimer";

import {
  TronWeb,
  utils as TronWebUtils,
  Trx,
  TransactionBuilder,
  Contract,
  Event,
  Plugin,
} from "tronweb";
import axios from "axios";
// import { buffer } from "stream/consumers";
import * as buffer from 'buffer'
// import { base, baseSepolia, bsc, bscTestnet, mainnet, polygon, polygonAmoy, sepolia, solanaDevnet } from "viem/chains";
// import { base, bsc, , polygon } from "viem/chains";
// import { solana } from "@reown/appkit/networks";


// import { solana, bsc } from "@reown/appkit/networks";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { solana, bsc, polygon, tron, base, bitcoin } from "@reown/appkit/networks";


import { BitcoinConnector } from "@reown/appkit-adapter-bitcoin";
import { useBitcoinTransaction } from "@/app/Transactions/BtcTransction";
import TronNileWallet from "@/app/TronNileWallet";
import { useGlobalState } from "@/app/context/GlobalState";
// import { disconnect } from "process";
// import { disconnect } from "process";

// import { solanaDevnet } from "@reown/appkit/networks";

// Define the props type
type PropsType = {
  valueUsdt: number;
  nextStageValue: number;
  usdRaised: number;
  tokenSold: number;
  totalUsd: number;
  totalToken: number;
};

type currencyType = {
  id: string;
  title: string;
  sortTitle: string;
  image: any;
  usdRate: number;
};

type Token = {
  id: string;
  tokenTitle: string;
  image: string;
  usdRate: number;
};

type Chain = {
  id: string;
  chainTitle: string;
  sortTitle: string;
  image: string;
  tokens: Token[];
};



export default function PreSaleCard({
  valueUsdt,
  nextStageValue,
  usdRaised,
  tokenSold,
  totalUsd,
  totalToken,
}: PropsType) {
  // const currencyNetworks = preSaleCardCurrencies?.slice(0, 5);
  // const usdCurrencies = preSaleCardCurrencies?.slice(5);
  // const { address } = useAppKitAccount()
  //const { connection } = useAppKitConnection()
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const { openModal } = useAppKit();
  const { tronAddressWall, setTronAddressWall, tronCheck, setTronCheck } = useGlobalState();
  const { disconnect } = useDisconnect();
  // console.log("tronCheck Preslae", tronCheck)

  // const tronWeb = new TronWeb({
  //   fullHost: 'https://api.trongrid.io',
  //   headers: { "TRON-PRO-API-KEY": 'your api key' },
  //   privateKey: 'your private key'
  // })

  const { isConnected, address } = useAccount();
  // console.log("isConnected", isConnected, 'address', address)

  const [valueEntered, setValueEntered] = useState<number>(0);
  const [tokensReceivable, setTokensReceivable] = useState<number | 0>(0);

  const [error, setError] = useState<string>("");
  // const storedChain = localStorage.getItem("blockChain");

  const [tronTransctionHash, setTronTransctionHash] = useState("");
  const [ethTransctionHash, setEthTransctionHash] = useState("");
  const [tronTXRHash, setTronTXRHash] = useState("");
  const [solanaSolHash, setSolanaSolHash] = useState("");
  const [solanaUsdtHash, setSolanaUsdtHash] = useState("");
  const [solanaUsdcHash, setSolanaUsdcHash] = useState("");
  const [price, setPrice] = useState(null);



  const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork()
  // console.log("appp kit info", caipNetwork, caipNetworkId, chainId)





  // useEffect(()=>{
  //   switchToConnectedNetwork()
  // },[]
  // )
  // const selectedAdapter =
  //   storedChain === "Ethereum"
  //     ? sepolia
  //     : storedChain === "BSC"
  //       ? bscTestnet
  //       : storedChain === "solana"
  //         ? solanaDevnet
  //         : storedChain === "polygon"
  //           ? polygonAmoy
  //           : storedChain === "base"
  //             ? baseSepolia
  //             : null;

  // const [selectedChain, setSelectedChain] = useState<Chain>(() => {
  // Get the stored blockchain name from localStorage
  // const storedChain = localStorage.getItem("blockChain");

  // Find the matching chain based on `sortTitle`
  // const matchingChain = preSaleCardCurrencies.find(
  //   (chain) => chain.sortTitle === storedChain
  // );


  // Return the matching chain or default to the first one
  //   return matchingChain || preSaleCardCurrencies[0];
  // });
  const [selectedChain, setSelectedChain] = useState<Chain>(preSaleCardCurrencies[0]);
  console.log("selectedChain", selectedChain)
  const selectedAdapter =
    selectedChain?.sortTitle === "Ethereum"
      ? mainnet
      : selectedChain?.sortTitle === "BSC"
        ? bsc
        : selectedChain?.sortTitle === "Polygon"
          ? polygon
          : selectedChain?.sortTitle === "Base"
            ? base
            : selectedChain?.sortTitle === "Bitcoin"
              ? bitcoin
              : selectedChain?.sortTitle === "Solana"
                ? solana
                // : selectedChain?.sortTitle === "Tron"
                //   ? tron
                : null;
  // const selectedAdapter =
  //   selectedChain?.sortTitle === "Ethereum"
  //     ? mainnet
  //     : selectedChain?.sortTitle === "BSC"
  //       ? bsc
  //       : selectedChain?.sortTitle === "solana"
  //         ? solana
  //         : selectedChain?.sortTitle === "polygon"
  //           ? polygon
  //           : selectedChain?.sortTitle === "base"
  //             ? base
  //             : null;
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (selectedAdapter) {
      switchToConnectedNetwork(selectedAdapter);
    }
  }, [selectedAdapter]);
  // }, []);

  const switchToConnectedNetwork = (adapter) => {
    // console.log("Switching to network:", adapter);
    // console.log("Switching to network:", adapter)
    switchNetwork(adapter); // Ensure this function accepts the adapter as an argument
  };


  const [claimableAmount, setClaimableAmount] = useState(null);
  const fetchClaimableAmount = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/user-claim-amount`, {
        wallet_address: selectedChain?.sortTitle === 'Solana' ? walletProvider?.publicKey : selectedChain?.sortTitle === 'Tron' ? tronAddressWall : address,
      });
      const { claimable_amount } = response.data;
      setClaimableAmount(claimable_amount);
      // console.log("claimable_amountss", response.data);
    } catch (error) {
      console.error("Error fetching claimable amount:", error);
      setClaimableAmount(null);
    }
  }
  // const soladdrs = walletProvider.publicKey
  useEffect(() => {
    // if (!address) return;
    if (!address && !isConnected || !tronAddressWall || !walletProvider?.publicKey) {
      setLoading(false)
    }

    if (address && isConnected || tronAddressWall || walletProvider?.publicKey) {
      fetchClaimableAmount();
      setLoading(true)


      let detectedChain: Chain | null = null;

      // Regex-based network detection
      // if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
      //   // Ethereum-like networks (Ethereum, BSC, Polygon, Base)
      //   detectedChain = preSaleCardCurrencies.find(
      //     (chain) => ["Ethereum", "BSC", "Polygon", "Base"].includes(chain.sortTitle)
      //   );
      // }

      // if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address)) {
      // if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,90}$/.test(address)) {
      //   detectedChain = preSaleCardCurrencies.find((chain) => chain.sortTitle === "Bitcoin");
      //   console.log("Check BTC", detectedChain)
      // }
      if (address && selectedChain?.sortTitle === "Bitcoin") {
        detectedChain = preSaleCardCurrencies.find((chain) => chain.sortTitle === "Bitcoin");
        console.log("Check BTC", detectedChain)
      }




      else if (/^T[a-zA-Z0-9]{33}$/.test(tronAddressWall)) {
        // Tron addresses start with "T"
        detectedChain = preSaleCardCurrencies.find((chain) => chain.sortTitle === "Tron");
      } else if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletProvider?.publicKey)) {
        // Solana addresses (32-44 base58 characters)
        detectedChain = preSaleCardCurrencies.find((chain) => chain.sortTitle === "Solana");
      }


      else if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
        if (selectedChain && ["Ethereum", "BSC", "Polygon", "Base"].includes(selectedChain.sortTitle)) {
          detectedChain = selectedChain;
        } else {
          detectedChain = preSaleCardCurrencies.find((chain) =>
            ["Ethereum", "BSC", "Polygon", "Base"].includes(chain.sortTitle)
          );
        }
      }

      if (detectedChain) {
        setSelectedChain(detectedChain)
        // handleChainChange(detectedChain);
      } else {
        console.warn("Unsupported blockchain address:", address);
      }


    }
    // fetchClaimableAmount();

    // }, []);
  }, [address, isConnected, claimableAmount, walletProvider?.publicKey, tronAddressWall, selectedChain, loading]);



  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/fetch-price`);
        let priceValue = response.data.price;

        if (
          typeof priceValue === "string" &&
          priceValue.startsWith('"') &&
          priceValue.endsWith('"')
        ) {
          priceValue = priceValue.slice(1, -1);
        }

        setPrice(priceValue);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();
  }, [price]);
  // }, []);

  // console.log("price Admin", price);
  ////////////////Ethereum USDT////////////////
  // const { data: writecallhash, isPending, writeContract } = useContractWrite();
  const {
    data: writecallhash,
    isPending: isPendingETH,
    writeContract: writeContractETH,
  } = useContractWrite();
  // Setup transaction receipt hook
  // console.log("writecallhash", writecallhash);
  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: writecallhash,
    onSettled(data, error) {
      // Clear any existing toasts first
      toast.dismiss();

      if (error) {
        toast.error(
          "Transaction failed: " + (error?.message || "Unknown error"),
          {
            duration: 5000,
            position: "top-right",
          }
        );
      } else {
        toast.success("Transaction successful! 🎉", {
          duration: 5000,
          position: "top-right",
        });
      }
    },
  });
  ////////////////Ethereum USDT////////////////
  ////////////////Ethereum USDC////////////////
  const {
    data: writecallhashUSDC,
    isPending: isPendingUSDC,
    writeContract: writeContractUSDC,
  } = useContractWrite();
  // Setup transaction receipt hook
  // const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
  //   hash: writecallhashUSDC?.hash,
  //   onSettled(data, error) {
  //     // Clear any existing toasts first
  //     toast.dismiss();

  //     if (error) {
  //       toast.error('Transaction failed: ' + (error?.message || 'Unknown error'), {
  //         duration: 5000,
  //         position: 'top-right',
  //       });
  //     } else {
  //       toast.success('Transaction successful! 🎉', {
  //         duration: 5000,
  //         position: 'top-right',
  //       });
  //     }
  //   },
  // });
  ////////////////Ethereum USDC////////////////

  // Wallet Modal

  const [open, setOpen] = useState(false);

  // const [selectedChain, setSelectedChain] = useState<Chain>(
  //   preSaleCardCurrencies[0]
  // );

  // const { open1, selectedNetworkId } = useAppKitState();
  // console.log("caipNetwork", caipNetwork)
  // console.log("caipNetworkId", caipNetworkId)
  // console.log("chainId", chainId)
  // console.log("switchNetwork", switchNetwork)
  // const [addresses, setAddresses] = useState([]);
  // const ivKey = REACT_APP_IV_KEY;

  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://192.168.18.39:8000/api/users/fetch-addresses",
  //         { IV_KEY: ivKey }
  //       );
  //       console.log('address Data', response.data.addresses)
  //       setAddresses(response.data.addresses);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };

  //   fetchAddresses();
  // }, [ivKey]); // Make sure to run once when component mounts

  ////
  const [addresses, setAddresses] = useState({
    eth: [],
    bsc: [],
    solana: [],
    tron: [],
    polygon: [],
    base: [],
    bitcoin: [],
  });
  // console.log("all addresses", addresses);

  const ivKey = REACT_APP_IV_KEY; // Access the IV_KEY from env variables

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/fetch-addresses`,
          { IV_KEY: ivKey }
        );

        // Log the fetched addresses to check the data structure
        // console.log("Address Data:", response.data.addresses);

        // Initialize a new addresses object to store them by type
        const newAddresses = {
          eth: [],
          bsc: [],
          solana: [],
          tron: [],
          polygon: [],
          base: [],
          bitcoin: []
        };

        // Categorize addresses by their type
        response?.data?.addresses.forEach((address) => {
          if (address?.blockchain === "eth") {
            newAddresses.eth.push(address);
          } else if (address?.blockchain === "bsc") {
            newAddresses.bsc.push(address);
          } else if (address?.blockchain === "solana") {
            newAddresses.solana.push(address);
          } else if (address?.blockchain === "tron") {
            newAddresses.tron.push(address);
          } else if (address?.blockchain === "polygon") {
            newAddresses.polygon.push(address);
          } else if (address?.blockchain === "base") {
            newAddresses.base.push(address);
          } else if (address?.blockchain === "bitcoin") {
            newAddresses.bitcoin.push(address);
          }
        });

        // Update state with categorized addresses
        setAddresses(newAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
    // }, []); 
  }, [ivKey]);

  const handleTokenChange = (token: Token | null) => {
    if (token) {
      console.log("check token", token)
      let networkToken = selectedChain.tokens.find(
        (tok) => tok.tokenTitle === token?.tokenTitle
      );
      if (networkToken) {
        console.log("networkToken", networkToken)
        // console.log("networkToken token",token)
        // setSelectedToken(networkToken);
        // updateTokensReceivable(networkToken);
        setSelectedToken(token);
        updateTokensReceivable(token);
      }
    }
  };



  useEffect(() => {
    const storedChain = localStorage.getItem("blockChain");

    if (selectedChain?.sortTitle === "Ethereum") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "BSC") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "Tron") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "Polygon") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "Base") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "Solana") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "Solana") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }
    if (selectedChain?.sortTitle === "Bitcoin") {
      setSelectedToken(selectedChain.tokens[0]);
      updateTokensReceivable(selectedChain.tokens[0]);
    }

    // Log the selected chain for debugging
    // console.log("Selected Chain:", selectedChain);
    // }, []);
  }, [selectedChain]);


  const [bitcoinTransction, setBitcoinTransction] = useState('');
  const { data: hash, sendTransaction } = useSendTransaction();


  ////////////////////////Ethereum fo ETH//////////////////////////
  const {
    data: evmHash,
    error: evmError,
    isPending: isEvmPending,
    reset: resetEvm,
    sendTransaction: sendEvmTransaction,
  } = useSendTransaction();

  const {
    isLoading: isEvmConfirming,
    isSuccess: isEvmConfirmed,
    data: evmtxData
  } = useWaitForTransactionReceipt({
    hash: evmHash,
  });

  useEffect(() => {
    console.log('evmtxData', evmtxData)
    console.log('isEvmConfirmed', isEvmConfirmed)

    if (isEvmConfirmed && evmtxData.status === 'success') {
      console.log('evmtxData inside', evmtxData)
      console.log('isEvmConfirmed inside', isEvmConfirmed)
      toast.dismiss();
      toast.success(`Transaction successful: ${evmHash}`);

      const payload = {
        wallet_address: address,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: tokensReceivable.toString(),
        // received_amount: valueEntered.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: evmHash,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
          // const reset = evmReset();
          console.log("Reset function:", resetEvm); // Logs the function itself
          resetEvm(); // Call the reset function
          console.log("Reset function called");
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add record! " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
          // const reset = evmReset();
          console.log("Reset function:", resetEvm); // Logs the function itself
          resetEvm(); // Call the reset function
          console.log("Reset function called");
        });

    }

    if (evmError) {
      toast.dismiss();
      toast.error(`${evmError}`);
    }
    // }, []);
  }, [isEvmConfirmed, evmtxData, evmError]);
  ////////////////////////Ethereum fo ETH//////////////////////////






  ////////////////////////EVM fo USDT//////////////////////////
  const {
    data: evmUsdtHash,
    error: evmUsdtError,
    isPending: isEvmUsdtPending,
    reset: resetEvmUsdt,
    writeContract: writeContractEvmUsdt,
  } = useContractWrite();

  const {
    isLoading: isEvmUsdtConfirming,
    isSuccess: isEvmUsdtConfirmed,
    data: evmUsdttxData
  } = useWaitForTransactionReceipt({
    hash: evmUsdtHash,
  });

  useEffect(() => {
    // console.log('evmUsdttxData isEvmUsdtConfirmed', evmUsdttxData, isEvmUsdtConfirmed)





    if (isEvmUsdtConfirmed && evmUsdttxData.status === 'success') {
      // console.log('evmUsdttxData isEvmUsdtConfirmed inside', evmUsdttxData, isEvmUsdtConfirmed)

      console.log('evmtxData inside', evmtxData)
      toast.dismiss();
      toast.success(`Transaction successful: ${evmUsdtHash}`);

      const payload = {
        wallet_address: address,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: tokensReceivable.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: evmUsdtHash,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
          resetEvmUsdt()
          console.log("resetEvmUsdt done")
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add record! " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
          resetEvmUsdt()
        });




    }

    if (evmUsdtError) {
      toast.dismiss();
      toast.error(`${evmUsdtError}`);
    }
    // }, []);
  }, [isEvmUsdtConfirmed, evmUsdttxData, evmUsdtError]);
  ////////////////////////EVM fo USDT//////////////////////////




  ////////////////////////EVM fo USDC//////////////////////////
  const {
    data: evmUsdcHash,
    error: evmUsdcError,
    isPending: isEvmUsdcPending,
    writeContract: writeContractEvmUsdc,
    reset: resetEvmUsdc,
  } = useContractWrite();

  const {
    isLoading: isEvmUsdcConfirming,
    isSuccess: isEvmUsdcConfirmed,
    data: evmUsdctxData
  } = useWaitForTransactionReceipt({
    hash: evmUsdcHash,
  });

  useEffect(() => {
    console.log('evmUsdctxData', evmUsdctxData)
    if (isEvmUsdcConfirmed && evmUsdctxData.status === 'success') {
      toast.dismiss();
      toast.success(`Transaction successful: ${evmUsdcHash}`);

      const payload = {
        wallet_address: address,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: tokensReceivable.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: evmUsdcHash,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
          resetEvmUsdc()
          console.log("resetEvmUsdc done");
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add record! " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
          resetEvmUsdc()
        });
    }

    if (evmUsdcError) {
      toast.dismiss();
      toast.error(`${evmUsdcError}`);
    }
  }, [isEvmUsdcConfirmed, evmUsdctxData, evmUsdcError]);
  // }, []);
  ////////////////////////EVM fo USDC//////////////////////////



  useEffect(() => {
    if (writecallhash) {
      toast.success(`Transction Successfull ${writecallhash}`);

      const payload = {
        wallet_address: address,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: tokensReceivable.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: writecallhash,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add record! " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
        });
    }

    if (tronTransctionHash) {
      toast.success(`Transction Successfull ${tronTransctionHash}`)


      const payload = {
        wallet_address: tronAddressWall,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered,
        // received_amount: tokensReceivable,
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: tronTransctionHash,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log('API Response:', response.data);
          fetchTotalSoldAmount()
          fetchPresaleData()
          fetchClaimableAmount()
        })
        .catch((error) => {
          console.error('API Error:', error);
          toast.error(
            'Failed to add record tron: ' + (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: 'top-right',
            }
          );
        });

      fetchTotalSoldAmount()
      fetchPresaleData()
    }

    // if (hash) {
    //   toast.success(`Transction Successfull ${hash}`)

    //   const payload = {
    //     wallet_address: address,
    //     blockchain: storedChain?.toLowerCase(),
    //     amount: valueEntered.toString(),
    //     received_amount: "1.2571428571428573",
    //     hash: hash,
    //   };
    //   axios
    //     .post('http://192.168.18.39:8000/api/users/add-record', payload)
    //     .then((response) => {
    //       console.log('API Response:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('API Error:', error);
    //       toast.error(
    //         'Failed to add record: ' + (error.response?.data?.message || error.message),
    //         {
    //           duration: 5000,
    //           position: 'top-right',
    //         }
    //       );
    //     });

    // }

    if (bitcoinTransction) {
      // toast.success(`Transction Successfull ${bitcoinTransction}`)


      const payload = {
        wallet_address: address,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered,
        // received_amount: tokensReceivable,
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: bitcoinTransction,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log('API Response:', response.data);
          fetchTotalSoldAmount()
          fetchPresaleData()
          fetchClaimableAmount()
        })
        .catch((error) => {
          console.error('API Error:', error);
          toast.error(
            'Failed to add bitcoin record: ' + (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: 'top-right',
            }
          );
        });

      fetchTotalSoldAmount()
      fetchPresaleData()
    }


    // }, [])
  }, [writecallhash, tronTransctionHash, bitcoinTransction])

  // useEffect(() => {

  //   if (
  //     tronTXRHash &&
  //     selectedChain.chainTitle === "Tron" &&
  //     selectedToken.tokenTitle === "TRX"
  //   ) {
  //     toast.success(`Transction Successfullsss ${tronTXRHash.txid}`);

  //     const payload = {
  //       wallet_address: address,
  //       blockchain: storedChain?.toLowerCase(),
  //       amount: valueEntered.toString(),
  //       received_amount: tokensReceivable.toString(),
  //       hash: tronTXRHash.txid,
  //     };
  //     // Call the API endpoint
  //     axios
  //       .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
  //       .then((response) => {
  //         console.log("API Response:", response.data);
  //         fetchTotalSoldAmount();
  //         fetchPresaleData();
  //         fetchClaimableAmount();
  //       })
  //       .catch((error) => {
  //         console.error("API Error:", error);
  //         toast.error(
  //           "Failed to add Tron record: " +
  //           (error.response?.data?.message || error.message),
  //           {
  //             duration: 5000,
  //             position: "top-right",
  //           }
  //         );
  //       });
  //   }
  // }, [tronTXRHash]);

  const [isTronTxPending, setIsTronTxPending] = useState(false);
  const [isTronTxConfirmed, setIsTronTxConfirmed] = useState(false);
  // Modified useEffect
  useEffect(() => {
    if (
      tronTXRHash &&
      selectedChain.chainTitle === "Tron" &&
      selectedToken.tokenTitle === "TRX" &&
      isTronTxConfirmed // Only proceed if transaction is confirmed
    ) {
      const payload = {
        wallet_address: tronAddressWall,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: tokensReceivable.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: tronTXRHash.txid,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
          // Reset states after successful API call
          setIsTronTxConfirmed(false);
          setTronTXRHash(null);
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add Tron record: " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
        });
    }
    // }, []);
  }, [tronTXRHash, isTronTxConfirmed, tronAddressWall]);


  useEffect(() => {
    // console.log("Select chain: " + selectedChain.sortTitle);
    // console.log("Select token: " + selectedToken.tokenTitle);
    // console.log("Entered Amount: " + valueEntered);
    // console.log("Tokens Receiveable: " + tokensReceivable);
    // console.log("solanaSolHash", solanaSolHash);
    if (solanaSolHash) {
      toast.success(`Transction Successfullsss ${solanaSolHash}`);

      const payload = {
        wallet_address: walletProvider.publicKey,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: valueEntered.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: solanaSolHash,
        // price:c,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add sol record: " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
        });

      fetchTotalSoldAmount();
      fetchPresaleData();
    }



    // }, []);
  }, [solanaSolHash]);



  useEffect(() => {
    if (solanaUsdtHash) {
      // toast.success(`Transction Successfullsss ${solanaUsdtHash}`);

      const payload = {
        wallet_address: walletProvider.publicKey,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: valueEntered.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: solanaUsdtHash,
        // price:c,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
          setSolanaUsdtHash('')
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add sol record: " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
          setSolanaUsdtHash('')
        });

      fetchTotalSoldAmount();
      fetchPresaleData();
    }

    // }, []);
  }, [solanaUsdtHash]);

  useEffect(() => {

    if (solanaUsdcHash) {
      // toast.success(`Transction Successfullsss ${solanaUsdcHash}`);

      const payload = {
        wallet_address: walletProvider.publicKey,
        blockchain: selectedChain?.sortTitle?.toLowerCase(),
        currency: selectedToken?.tokenTitle?.toLowerCase(),
        // amount: valueEntered.toString(),
        // received_amount: valueEntered.toString(),
        amount: tokensReceivable.toString(),
        received_amount: valueEntered.toString(),
        hash: solanaUsdcHash,
        // price:c,
      };
      // Call the API endpoint
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-record`, payload)
        .then((response) => {
          console.log("API Response:", response.data);
          fetchTotalSoldAmount();
          fetchPresaleData();
          fetchClaimableAmount();
          setSolanaUsdcHash('')
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error(
            "Failed to add sol record: " +
            (error.response?.data?.message || error.message),
            {
              duration: 5000,
              position: "top-right",
            }
          );
          setSolanaUsdcHash('')
        });

      fetchTotalSoldAmount();
      fetchPresaleData();
    }

    // }, []);
  }, [solanaUsdcHash]);


  const [selectedToken, setSelectedToken] = useState<Token>(
    preSaleCardCurrencies[0].tokens[0]
  );
  // console.log("selectedToken", selectedToken);
  // console.log("selectedChain", selectedChain);

  // const [selectedPayCurrency, setSelectedPayCurrency] = useState<currencyType>(
  //   usdCurrencies[0]
  // );

  // const [selectedCoinNetwork, setSelectedCoinNetwork] =
  //   useState<currencyType | null>(null);
  // const [selectedUsdCurrency, setSelectedUsdCurrency] =
  //   useState<currencyType | null>(usdCurrencies[0]);
  const [presaleData, setPresaleData] = useState();
  const [totalSoldAmount, setTotalSoldAmount] = useState();
  const [remainingTime, setRemainingTime] = useState();

  const fetchPresaleData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/presale-data`);
      setPresaleData(response?.data?.data)
      setRemainingTime(response?.data?.remaining_time)
      console.log("Presale Data ss:", response?.data);
    } catch (error) {
      console.error("Error fetching presale data:", error);
    }
  };
  useEffect(() => {
    fetchPresaleData();
  }, []);
  // console.log("Presale Data:", presaleData);
  // console.log("remainingTime", remainingTime);

  const fetchTotalSoldAmount = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/total-sold-amount`);
      setTotalSoldAmount(response.data)
      console.log("Total Sold Amount:", response.data);
    } catch (error) {
      console.error("Error fetching total sold amount:", error);
    }
  };
  useEffect(() => {
    fetchTotalSoldAmount();
  }, []);
  // console.log("totalSoldAmount:", totalSoldAmount);


  const handleEmptyValue = () => {
    console.log("handleEmptyValue")
    setTokensReceivable('');

    setValueEntered('')
  }

  const {
    open: openCoinNetworks,
    handleOption: handleCoinNetworksOption,
    ref: coinNetworksRef,
  } = useDropdown();

  const {
    open: openChainTokens,
    handleOption: handleChainTokenOptions,
    ref: chainTokensRef,
  } = useDropdown();

  // let soldPercent = (
  //   (totalSoldAmount?.total_amount / presaleData?.total_amount) *
  //   100
  // );
  let soldPercent = ((totalSoldAmount?.received_usd / 1000000) * 100);


  // console.log("soldPercent", soldPercent)
  // let soldPercent = ((tokenSold / totalToken) * 100).toFixed(2);
  const handleChainChange = (chain: Chain | null) => {
    localStorage.setItem("blockChain", chain.sortTitle || "");

    console.log("Switching to chain:", chain);
    if (!chain) return;
    console.log("new chain", chain)
    setSelectedChain(chain);
    if (chain?.sortTitle === 'Tron') {
      setTronCheck(chain?.sortTitle)
    } else {
      setTronCheck('')
    }


    if (chain.tokens?.length > 0) {
      setSelectedToken(chain.tokens[0]);
      updateTokensReceivable(chain.tokens[0]);
    }
  };


  // const handleChainChange = (chain: Chain | null) => {
  //   console.log("chain log", chain);

  //   if (!chain) {
  //     console.warn("No chain provided.");
  //     return;
  //   }
  //   // Save the blockchain to localStorage
  //   localStorage.setItem("blockChain", chain.sortTitle || "");

  //   // Find the matching network and update states
  //   const network = preSaleCardCurrencies.find(
  //     (net) => net.chainTitle === chain.chainTitle
  //   );

  //   if (network) {
  //     setSelectedChain(chain);

  //     if (chain.tokens?.length > 0) {
  //       setSelectedToken(chain.tokens[0]);
  //       updateTokensReceivable(chain.tokens[0]);
  //     } else {
  //       console.warn("No tokens available for the selected chain.");
  //     }
  //   } else {
  //     console.warn("No matching network found for the selected chain.");
  //   }

  //   // Reload the page to apply changes
  //   // window.location.reload();
  // };

  // const handleChainChange = (chain: Chain | null) => {
  //   console.log("chain log", chain)
  //   localStorage.setItem('blockChain', chain.sortTitle || '');
  //   if (chain) {
  //     let network = preSaleCardCurrencies.find(
  //       (net) => net.chainTitle === chain?.chainTitle
  //     );
  //     if (network) {
  //       setSelectedChain(chain);
  //       setSelectedToken(chain.tokens[0]);
  //       updateTokensReceivable(chain.tokens[0]);
  //     }
  //   }
  // };

  const updateTokensReceivable = (tok: Token, amountEnt?: number) => {
    // let value = amountEnt ? amountEnt : valueEntered;

    // setTokensReceivable((value * tok.usdRate) / valueUsdt);
  };

  // if (selectedChain.chainTitle === 'Ethereum' && selectedChain.sortTitle === 'ETH') {
  // const [valueEntered, setValueEntered] = useState<number | null>(null);
  // const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [solPrice, setSolPrice] = useState<number | null>(null);
  // console.log("all Prices", ethPrice, solPrice);

  const [cryptoPrices, setCryptoPrices] = useState<{
    ethereum?: number;
    solana?: number;
    binancecoin?: number;
    bitcoin?: number;
    tron?: number;
    polygon?: number;
    base?: number;
  }>({});
  console.log("cryptoPrices", cryptoPrices);
  // console.log("Test Loop");

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        // const response = await axios.get(
        //   "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum,tron,solana,matic-network,base&vs_currencies=usd"
        // );
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "binancecoin,bitcoin,ethereum,tron,solana,matic-network,base",
              vs_currencies: "usd",
            },
          }
        );

        setCryptoPrices({
          ethereum: response.data.ethereum.usd,
          solana: response.data.solana.usd,
          binancecoin: response.data.binancecoin.usd,
          bitcoin: response.data.bitcoin.usd,
          tron: response.data.tron.usd,
          polygon: response?.data?.["matic-network"]?.usd,
          base: response.data.base.usd,
        });
      } catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
      }
    };

    fetchCryptoPrices();
  }, []);



  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    console.log("New Value entered:", value);

    setValueEntered(value);

    const ethereumChain =
      selectedChain.chainTitle === "Ethereum" &&
      selectedToken.tokenTitle === "ETH";
    const solanaChain =
      selectedChain.chainTitle === "Solana" && selectedToken.tokenTitle === "SOL";
    const bscChain =
      selectedChain.chainTitle === "Binance Smart Chain" &&
      selectedToken.tokenTitle === "BNB";
    const tronChain =
      selectedChain.chainTitle === "Tron" && selectedToken.tokenTitle === "TRX";
    const bitcoinChain =
      selectedChain.chainTitle === "Bitcoin" && selectedToken.tokenTitle === "BTC";
    const polygonChain =
      selectedChain.chainTitle === "Polygon" && selectedToken.tokenTitle === "POL";
    const baseChain =
      selectedChain.chainTitle === "Base" && selectedToken.tokenTitle === "Base";

    if (
      // (value !== "" && ethereumChain) ||
      value !== "" && (ethereumChain ||
        solanaChain ||
        bscChain ||
        tronChain ||
        bitcoinChain ||
        polygonChain ||
        baseChain)
    ) {
      const sortPriceNetwork = ethereumChain
        ? cryptoPrices.ethereum
        : solanaChain
          ? cryptoPrices.solana
          : bscChain
            ? cryptoPrices.binancecoin
            : tronChain
              ? cryptoPrices.tron
              : bitcoinChain
                ? cryptoPrices.bitcoin
                : polygonChain
                  ? cryptoPrices.polygon
                  : baseChain
                    ? cryptoPrices.base
                    : null;

      console.log("sortPriceNetwork", sortPriceNetwork);
      const calculatedValue = parseFloat(sortPriceNetwork / price) * value;
      setTokensReceivable(calculatedValue);
      console.log("Calculated Value:", calculatedValue);
      console.log("Calculated Value token:", tokensReceivable);
    } else if (
      value !== "" ||
      (selectedChain.chainTitle === "Ethereum" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Ethereum" &&
        selectedToken.tokenTitle === "USDC") ||
      (selectedChain.chainTitle === "Solana" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Solana" &&
        selectedToken.tokenTitle === "USDC") ||
      (selectedChain.chainTitle === "Binance Smart Chain" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Binance Smart Chain" &&
        selectedToken.tokenTitle === "USDC") ||
      (selectedChain.chainTitle === "Tron" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Tron" &&
        selectedToken.tokenTitle === "USDC") ||
      (selectedChain.chainTitle === "Bitcoin" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Bitcoin" &&
        selectedToken.tokenTitle === "USDC") ||
      (selectedChain.chainTitle === "Polygon" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Polygon" &&
        selectedToken.tokenTitle === "USDC") ||
      (selectedChain.chainTitle === "Base" &&
        selectedToken.tokenTitle === "USDT") ||
      (selectedChain.chainTitle === "Base" &&
        selectedToken.tokenTitle === "USDC")
    ) {
      const calculatedValue = value / price;
      // console.log("Calculated Value:", calculatedValue);
      setTokensReceivable(calculatedValue);
    }
  };

  const handleTokenQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    console.log("New Token Quantity entered:", value);

    setTokensReceivable(value); // Set token quantity
    // setValueEntered(); // Clear or reset the value entered (you can define how you'd like this)

    // Reverse the calculation to find the corresponding chain value
    const ethereumChain =
      selectedChain.chainTitle === "Ethereum" &&
      selectedToken.tokenTitle === "ETH";
    const solanaChain =
      selectedChain.chainTitle === "Solana" && selectedToken.tokenTitle === "SOL";
    const bscChain =
      selectedChain.chainTitle === "Binance Smart Chain" &&
      selectedToken.tokenTitle === "BNB";
    const tronChain =
      selectedChain.chainTitle === "Tron" && selectedToken.tokenTitle === "TRX";
    const bitcoinChain =
      selectedChain.chainTitle === "Bitcoin" && selectedToken.tokenTitle === "BTC";
    const polygonChain =
      selectedChain.chainTitle === "Polygon" && selectedToken.tokenTitle === "MATIC";
    const baseChain =
      selectedChain.chainTitle === "Base" && selectedToken.tokenTitle === "Base";

    if (
      value !== "" &&
      (ethereumChain ||
        solanaChain ||
        bscChain ||
        tronChain ||
        bitcoinChain ||
        polygonChain ||
        baseChain)
    ) {
      const sortPriceNetwork = ethereumChain
        ? cryptoPrices.ethereum
        : solanaChain
          ? cryptoPrices.solana
          : bscChain
            ? cryptoPrices.binancecoin
            : tronChain
              ? cryptoPrices.tron
              : bitcoinChain
                ? cryptoPrices.bitcoin
                : polygonChain
                  ? cryptoPrices.polygon
                  : baseChain
                    ? cryptoPrices.base
                    : null;

      // Reverse calculation: value of token quantity based on network price
      const calculatedValue = (value * price) / sortPriceNetwork;
      // console.log("Calculated Value in Chain's Currency:", calculatedValue);

      setValueEntered(calculatedValue); // Set the value in the corresponding chain's currency (ETH, SOL, etc.)
    } else if (
      (value !== "" &&
        selectedChain.chainTitle === "Ethereum" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC")) ||
      (selectedChain.chainTitle === "Solana" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC")) ||
      (selectedChain.chainTitle === "Binance Smart Chain" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC")) ||
      (selectedChain.chainTitle === "Tron" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC")) ||
      (selectedChain.chainTitle === "Bitcoin" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC")) ||
      (selectedChain.chainTitle === "Polygon" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC")) ||
      (selectedChain.chainTitle === "Base" &&
        (selectedToken.tokenTitle === "USDT" || selectedToken.tokenTitle === "USDC"))
    ) {
      // Reverse calculation for USDT/USDC
      const calculatedValue = price * value;
      console.log("Calculated Value in Chain's Currency:", calculatedValue);
      setValueEntered(calculatedValue);
    }
  };




  // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   console.log("New Value enter", value)
  //   setValueEntered(parseFloat(value));

  // }

  // const handleTokenQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  //   const value = parseFloat(event.target.value);
  //   setTokensReceivable();
  //   setValueEntered();

  // }

  // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setValueEntered(parseFloat(value));
  //   if (value !== "") {
  //     let usdRec = parseFloat(value) * selectedToken.usdRate;
  //     setTokensReceivable(usdRec / valueUsdt);
  //   }
  // };

  // const handleTokenQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(event.target.value);
  //   let totalCost = value * valueUsdt;
  //   let totalTokensReq = totalCost / selectedToken.usdRate;
  //   setTokensReceivable(value);
  //   setValueEntered(totalTokensReq);
  //   // if (value !== "") {
  //   //   let usdRec = parseFloat(value) * selectedToken.usdRate;
  //   //   setTokensReceivable(usdRec / valueUsdt);
  //   // }
  // };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (valueEntered <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (tokensReceivable <= 0) {
      setError("Invalid token calculation");
      return;
    }
    setError("");
    setOpen(!open);
    // handle the wallet connect here
    console.log("Select chain: " + selectedChain.sortTitle);
    console.log("Select token: " + selectedToken.tokenTitle);
    console.log("Entered Amount: " + valueEntered);
    console.log("Tokens Receiveable: " + tokensReceivable);

    console.log("Connecting wallet...");
  };

  /////////////////////////////
  // console.log("address",address)

  const beforePayMentCheckChain = async () => {
    try {


      if (selectedChain?.sortTitle === 'Ethereum') {
        // const ethToken = selectedChain.tokens.find((tok) => tok.tokenTitle === 'ETH');
        // const usdtToken = selectedChain.tokens.find((tok) => tok.tokenTitle === 'USDT');

        // console.log("ethToken", ethToken.tokenTitle)
        // console.log("ethToken", usdtToken.tokenTitle)

        if (selectedToken.tokenTitle === "ETH") {
          console.log("done ha");
          payAmount(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDT") {
          console.log("New Log");
          payAmountUsdt(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDC") {
          console.log("New USDC");
          payAmountUsdc(valueEntered);
          return;
        }
      } else if (selectedChain?.sortTitle === "BSC") {
        if (selectedToken.tokenTitle === "BNB") {
          console.log("BSC ha BSC");
          payAmountBND(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDT") {
          console.log("BSC ha USDT");
          payAmountBscUsdt(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDC") {
          console.log("BSC ha USDC");
          payAmountBscUsdc(valueEntered);
          return;
        }
      } else if (selectedChain?.sortTitle === "Polygon") {
        if (selectedToken.tokenTitle === "POL") {
          console.log("Polygon ha Polygon");
          payAmountPolygon(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDT") {
          console.log("Polygon ha USDT");
          payAmountPolygonUsdt(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDC") {
          console.log("Polygon ha USDc");
          payAmountPolygonUsdc(valueEntered);
          return;
        }
      } else if (selectedChain?.sortTitle === "Base") {
        if (selectedToken.tokenTitle === "Base") {
          console.log("Base ha Base");
          payAmountBase(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDT") {
          console.log("Base ha USDT");
          payAmountBaseUsdt(valueEntered);
          return;
        }

        if (selectedToken.tokenTitle === "USDC") {
          console.log("Base ha USDc");
          payAmountBaseUsdc(valueEntered);
          return;
        }
      } else if (selectedChain?.sortTitle === "Solana") {
        if (selectedToken.tokenTitle === "SOL") {
          console.log("BSC ha Solana");
          payAmountSolana(valueEntered);
          return;
        }
        if (selectedToken.tokenTitle === "USDT") {
          console.log("Solana ha USDT");
          payAmountSolanaUsdt(valueEntered);
          return;
        }
        if (selectedToken.tokenTitle === "USDC") {
          console.log("Solana ha USDC");
          payAmountSolanaUsdc(valueEntered);
          return;
        }
      } else if (selectedChain?.sortTitle === "Tron") {
        if (selectedToken.tokenTitle === "TRX") {
          console.log("Tron ha TRX");
          payAmountTron(valueEntered);
          return;
        }
        if (selectedToken.tokenTitle === "USDT") {
          console.log("Tron ha USDT");
          payAmountTronUSDT(valueEntered);
          return;
        }
        if (selectedToken.tokenTitle === "USDC") {
          console.log("Tron ha USDT");
          payAmountTronUSDC(valueEntered);
          return;
        }
      }

      else if (selectedChain?.sortTitle === 'Bitcoin') {
        if (selectedToken.tokenTitle === 'BTC') {
          console.log("BTC ha BTC");
          // payAmountBitcoinUSDC(valueEntered)
          // useBitcoinTransaction()
          // payAmountBitcoin()
          handleBitcoinSendTransaction()
          return;
        }
      }



      // If no valid condition is met, show an error
      toast.error("Chain not identified");
    } catch (error) {
      console.error("An error occurred in beforePayMentCheckChain:", error);
      toast.error("An unexpected error occurred");
    }
  };

  //********************** Ethereum **********************/
  // Ethereum with USDT


  const payAmount = async (valueEntered) => {
    try {
      setLoading(false);
      if (!isConnected) {
        toast.error("Please connect your wallet");
        setLoading(false);
        return;
      }

      // let newval;
      sendEvmTransaction({
        // to: adminAddress,
        to: addresses?.eth[0].address,
        value: parseEther(valueEntered.toString()),
        // value: parseEther(0.001.toString()),
      });
      // console.log("valueEntered.toString()",valueEntered.toString())
      toast.loading('Transaction pending...')
      // const transaction = await sendTransaction({
      // const transaction = await sendTransaction({
      //   // to: adminAddress,
      //   to: addresses?.eth[0].address,
      //   value: parseEther(valueEntered.toString()),
      //   // value: parseEther(0.001.toString()),
      // });



      // Access the hash from the transaction object
      // const transactionHash = transaction?.hash;

      // if (transactionHash) {
      //   console.log("Transaction successful, hash:", transactionHash);
      //   toast.success(
      //     `Transaction sent successfully! Hash: ${transactionHash}`
      //   );
      // } else {
      //   console.warn("Transaction sent, but hash is unavailable.");
      // }
      // toast.success(`Transaction sent successfully!`);
    } catch (error) {
      console.error("Error while sending transaction:", error);
      toast.error("Transaction failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // console.log("addresses?.eth[0].address", addresses?.eth[0]?.address);
  // const payAmount = async () => {
  //   try {
  //     setLoading(true)
  //     if (!isConnected) {
  //       toast.error("Please connect your wallet");
  //       return
  //     }
  //     sendTransaction({
  //       to: adminAddress,
  //       value: parseEther(0.001.toString()),
  //       // value: parseEther("0.05"),
  //     });

  //   } catch (error) {
  //     console.log("error while sending transaction", error)
  //     setLoading(false)

  //   }
  // }

  // Ethereum with USDT
  const payAmountUsdt = async () => {
    const abi = EthUSDTAbi;
    const address = USDTContract;

    try {
      const value = valueEntered;
      // const value = 0.001;
      // const parsedAmount = parseUnits(value.toString(), 18);
      const parsedAmount = parseUnits(value.toString(), 6);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      // const result = await writeContractETH({
      writeContractEvmUsdt({
        address,
        abi,
        functionName: "transfer",
        args: [addresses?.eth[0].address, parsedAmount],
        // args: [adminAddress, parsedAmount],
      });

      toast.loading('Transaction pending...')

      // console.log("result", result);
      // if (result?.hash) {
      //   toast.loading("Transaction submitted, waiting for confirmation...", {
      //     position: "top-right",
      //   });
      // }
    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };
  // Ethereum with USDT
  const payAmountUsdc = async () => {
    const abi = EthUSDCAbi;
    const address = USDCContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      // const parsedAmount = parseUnits(value.toString(), 18);
      const parsedAmount = parseUnits(value.toString(), 6);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      // const result = await writeContractETH({
      writeContractEvmUsdc({
        address,
        abi,
        functionName: "transfer",
        args: [addresses?.eth[0].address, parsedAmount],
        // args: [adminAddress, parsedAmount],
      });

      toast.loading('Transaction pending...')


    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };
  //********************** Ethereum **********************/
  //********************** BSC **********************/
  const payAmountBND = async () => {
    try {
      setLoading(true);
      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }


      sendEvmTransaction({
        to: addresses?.bsc[0].address,
        value: parseEther(valueEntered.toString()),
        // value: parseEther(0.001.toString()),
      });

      toast.loading('Transaction pending...')
      // sendTransaction({
      //   to: addresses?.bsc[0].address,
      //   value: parseEther(valueEntered.toString()),
      //   // value: parseEther(0.001.toString()),
      // });
    } catch (error) {
      console.log("error while sending transaction", error);
      setLoading(false);
    }
  };


  const payAmountBscUsdt = async () => {
    const abi = BscUSDTAbi;
    const address = BSCUSDTContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      const parsedAmount = parseUnits(value.toString(), 18);
      // const parsedAmount = parseUnits(value.toString(), 18);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      writeContractEvmUsdt({
        address,
        abi,
        functionName: "transfer",
        args: [addresses?.bsc[0].address, parsedAmount],
      });
      toast.loading('Transaction pending...')


    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };

  const payAmountBscUsdc = async () => {
    const abi = BscUSDCAbi;
    const address = BSCUSDCContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      const parsedAmount = parseUnits(value.toString(), 18);
      // const parsedAmount = parseUnits(value.toString(), 18);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      writeContractEvmUsdc({
        address,
        abi,
        functionName: "transfer",
        args: [addresses?.bsc[0].address, parsedAmount],
      });

      toast.loading('Transaction pending...')


    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };
  //********************** BSC **********************/

  //********************** Polygon **********************/
  const payAmountPolygon = async () => {
    try {
      setLoading(true);
      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }
      sendEvmTransaction({
        // to: adminAddress,
        to: addresses?.polygon[0].address,
        value: parseEther(valueEntered.toString()),
        // value: parseEther(0.001.toString()),
        // value: parseEther("0.05"),
      });
      toast.loading('Transaction pending...')



    } catch (error) {
      console.log("error while sending transaction", error);
      setLoading(false);
    }
  };

  const payAmountPolygonUsdt = async () => {
    const abi = BscUSDTAbi;
    const address = PolygonUSDTContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      const parsedAmount = parseUnits(value.toString(), 18);
      // const parsedAmount = parseUnits(value.toString(), 6);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      writeContractEvmUsdt({
        address,
        abi,
        functionName: "transfer",
        // args: [adminAddress, parsedAmount],
        args: [addresses?.polygon[0].address, parsedAmount],
      });
      toast.loading('Transaction pending...')


    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };

  const payAmountPolygonUsdc = async () => {
    const abi = BscUSDCAbi;
    const address = PolygonUSDCContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      const parsedAmount = parseUnits(value.toString(), 18);
      // const parsedAmount = parseUnits(value.toString(), 6);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      writeContractEvmUsdc({
        address,
        abi,
        functionName: "transfer",
        // args: [adminAddress, parsedAmount],
        args: [addresses?.polygon[0].address, parsedAmount],
      });

      toast.loading('Transaction pending...')

    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };
  //********************** Polygon **********************/

  //********************** Base **********************/
  const payAmountBase = async () => {
    try {
      setLoading(true);
      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }
      sendEvmTransaction({
        to: addresses?.base[0].address,
        value: parseEther(valueEntered.toString()),
        // value: parseEther(0.001.toString()),
        // value: parseEther("0.05"),
      });

      toast.loading('Transaction pending...')

    } catch (error) {
      console.log("error while sending transaction", error);
      setLoading(false);
    }
  };

  const payAmountBaseUsdt = async () => {
    const abi = BscUSDTAbi;
    const address = BaseUSDTContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      // const parsedAmount = parseUnits(value.toString(), 18);
      const parsedAmount = parseUnits(value.toString(), 6);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      writeContractEvmUsdt({
        address,
        abi,
        functionName: "transfer",
        args: [addresses?.base[0].address, parsedAmount],
      });

      toast.loading('Transaction pending...')


    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };

  const payAmountBaseUsdc = async () => {
    const abi = BscUSDCAbi;
    const address = BaseUSDCContract;

    try {
      // const value = 0.001;
      const value = valueEntered;
      // const parsedAmount = parseUnits(value.toString(), 18);
      const parsedAmount = parseUnits(value.toString(), 6);
      console.log("Parsed amount:", parsedAmount);

      // Clear any existing toasts before starting
      toast.dismiss();

      writeContractEvmUsdc({
        address,
        abi,
        functionName: "transfer",
        args: [addresses?.base[0].address, parsedAmount],
      });

      toast.loading('Transaction pending...')


    } catch (error) {
      toast.dismiss();
      toast.error(
        "Transaction failed: " + (error?.message || "Unknown error"),
        {
          duration: 5000,
          position: "top-right",
        }
      );
      console.error("Transaction failed:", error);
    }
  };
  //********************** Base **********************/

  //********************** Solana **********************/
  const payAmountSolana = async () => {
    try {
      // const connection = new Connection(
      //   clusterApiUrl("mainnet-beta", true),
      //   "confirmed"
      // );

      const connection = new Connection("https://go.getblock.io/23d2dbf8dbe44a109200929f7abb4534", { commitment: "finalized" });
      // Check if wallet provider exists and is connected
      if (!walletProvider) {
        toast.error("Wallet provider not found. Please connect your wallet.");
        return null;
      }

      if (!walletProvider.publicKey) {
        toast.error("Wallet not connected. Please connect your wallet.");
        return null;
      }

      // Check if connection exists
      if (!connection) {
        toast.error("No connection to Solana network");
        return null;
      }

      // const recipientAddress = new PublicKey('EiAPbr54HvKkxsRHYJJWqhD8Fjrc5wWsso265QUF2NvK');
      const recipientAddress = new PublicKey(addresses?.solana[0].address);
      // const recipientAddress = new PublicKey('EW6g7ZPmpqi4BYcpF1J6RhZWPHUkENjaamukqUcqT1Ea');
      const amount = valueEntered * LAMPORTS_PER_SOL;

      // Check wallet balance
      // const balance = await connection.getBalance(walletProvider?.publicKey);
      // console.log("balance", balance)
      // if (balance < amount) {
      //   toast.error("Not enough SOL in wallet");
      //   return null;
      // }

      // Create transfer instruction
      const transferIx = SystemProgram.transfer({
        fromPubkey: walletProvider.publicKey,
        toPubkey: recipientAddress,
        lamports: amount,
      });

      // Create and setup transaction
      const tx = new Transaction().add(transferIx);
      tx.feePayer = walletProvider.publicKey;
      tx.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;

      // try {
      //   const { blockhash } = await connection.getLatestBlockhash('confirmed');
      //   tx.recentBlockhash = blockhash;
      // } catch (error) {
      //   console.error('Failed to get recent blockhash:', error);
      //   toast.error('Failed to get recent blockhash');
      //   return null;
      // }

      // Show loading toast
      const loadingToast = toast.loading("Processing transaction...");

      try {
        // Sign and send transaction
        const signature = await walletProvider.signAndSendTransaction(tx);
        console.log("signature", signature);

        // Wait for confirmation
        //  await connection.confirmTransaction(signature.signature || signature);

        // toast.success('Transaction successful!');
        toast.dismiss(loadingToast);

        setSolanaSolHash(signature);
        console.log(
          `Transaction signature: ${signature.signature || signature}`
        );
        return signature;
      } catch (error) {
        console.error("Transaction failed:", error);
        toast.error(
          "Transaction failed: " + (error.message || "Unknown error")
        );
        toast.dismiss(loadingToast);
        return null;
      }
    } catch (error) {
      console.error("Setup failed:", error);
      toast.error("Setup failed: " + (error.message || "Unknown error"));
      return null;
    }
  };

  const payAmountSolanaUsdt = async () => {
    try {
      window.Buffer = buffer.Buffer;
      // const connection = new Connection(clusterApiUrl('devnet', true), 'confirmed');

      const connection = new Connection(
        clusterApiUrl("mainnet-beta", true),
        "confirmed"
      );
      // Check if wallet provider exists and is connected
      if (!walletProvider) {
        toast.error("Wallet Not Connected");
        return null;
      }

      if (!walletProvider.publicKey) {
        toast.error("Wallet Not Connected");
        return null;
      }

      // Check if connection exists
      if (!connection) {
        toast.error("Wallet Not Connected");
        return null;
      }

      const usdtMintAddress = new PublicKey(SolanaUSDTContract);
      // const publicownerkey = new PublicKey('Bed325SFr9uUneCSidBxLtGVW26myc2QHV9cJ3RViiu1');
      const reciever = new PublicKey(addresses?.solana[0].address);
      // const reciever = new PublicKey(adminAddressSOl);
      console.log("first", usdtMintAddress);

      const senderTokenAccount = await getAssociatedTokenAddress(
        usdtMintAddress,
        walletProvider.publicKey
        // usdtMintAddress, publicownerkey
      );

      const receiverTokenAccount = await getAssociatedTokenAddress(
        usdtMintAddress,
        reciever
      );

      const accountInfo = await connection.getAccountInfo(receiverTokenAccount);
      const tx = new Transaction();

      if (!accountInfo) {
        tx.add(
          createAssociatedTokenAccountInstruction(
            // publicownerkey,
            walletProvider.publicKey,
            receiverTokenAccount,
            reciever,
            usdtMintAddress
          )
        );
      }

      tx.add(
        createTransferInstruction(
          senderTokenAccount,
          receiverTokenAccount,
          // publicownerkey,
          walletProvider.publicKey,
          // valueEntered * 1000000000000000000
          valueEntered * 1000000,
        )
      );
      tx.feePayer = walletProvider.publicKey;
      tx.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;
      const signature = await walletProvider.signAndSendTransaction(tx);
      console.log("signature", signature);
      if (signature) {
        toast.success(`Transction Successful: ${signature}`);
        setSolanaUsdtHash(signature)
      }

      return { tx };
    } catch (error) {
      console.error("Transfer preparation failed:", error);
      throw error;
    }
  };

  const payAmountSolanaUsdc = async () => {
    try {
      window.Buffer = buffer.Buffer;
      // const connection = new Connection(clusterApiUrl('devnet', true), 'confirmed');

      const connection = new Connection(
        clusterApiUrl("mainnet-beta", true),
        "confirmed"
      );
      // Check if wallet provider exists and is connected
      if (!walletProvider) {
        toast.error("Wallet Not Connected");
        return null;
      }

      if (!walletProvider.publicKey) {
        toast.error("Wallet Not Connected");
        return null;
      }

      // Check if connection exists
      if (!connection) {
        toast.error("Wallet Not Connected");
        return null;
      }

      const usdtMintAddress = new PublicKey(SolanaUSDCContract);
      // const publicownerkey = new PublicKey('Bed325SFr9uUneCSidBxLtGVW26myc2QHV9cJ3RViiu1');
      const reciever = new PublicKey(addresses?.solana[0].address);
      // const reciever = new PublicKey(adminAddressSOl);
      console.log("first", usdtMintAddress);

      const senderTokenAccount = await getAssociatedTokenAddress(
        usdtMintAddress,
        walletProvider.publicKey
        // usdtMintAddress, publicownerkey
      );

      const receiverTokenAccount = await getAssociatedTokenAddress(
        usdtMintAddress,
        reciever
      );

      const accountInfo = await connection.getAccountInfo(receiverTokenAccount);
      const tx = new Transaction();

      if (!accountInfo) {
        tx.add(
          createAssociatedTokenAccountInstruction(
            // publicownerkey,
            walletProvider.publicKey,
            receiverTokenAccount,
            reciever,
            usdtMintAddress
          )
        );
      }

      tx.add(
        createTransferInstruction(
          senderTokenAccount,
          receiverTokenAccount,
          // publicownerkey,
          walletProvider.publicKey,
          // valueEntered * 1000000000000000000
          valueEntered * 100000000,
        )
      );
      tx.feePayer = walletProvider.publicKey;
      tx.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;
      const signature = await walletProvider.signAndSendTransaction(tx);
      console.log("signature", signature);
      setSolanaUsdcHash(signature)
      if (signature) {
        toast.success(`Transction Successful: ${signature}`);
      }

      return { tx };
    } catch (error) {
      console.error("Transfer preparation failed:", error);
      throw error;
    }
  };

  //********************** Solana **********************/

  //********************** Tron **********************/
  // const payAmountTron = async () => {
  //   try {
  //     const tronWeb = window.tronLink.tronWeb;
  //     const fromAddress = tronWeb.defaultAddress.base58;
  //     const toAddress = addresses?.tron[0].address;
  //     // const toAddress = adminAddressTron;
  //     const amountInTrx = valueEntered;
  //     // const amountInTrx = 1;

  //     // Convert TRX to sun (1 TRX = 1,000,000 sun)
  //     const amountInSun = amountInTrx * 1_000_000;

  //     // Send transaction
  //     const transaction = await tronWeb.trx.sendTransaction(
  //       toAddress,
  //       amountInSun
  //     );

  //     console.log("Transaction successful:", transaction);
  //     setTronTXRHash(transaction);
  //     return transaction;
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //   }
  // };
  // const payAmountTron = async () => {
  //   try {
  //     // Ensure TronLink is available
  //     if (!window.tronLink || !window.tronLink.tronWeb) {
  //       console.error("TronLink is not installed or not initialized.");
  //       toast.error("TronLink wallet is not installed or not connected.");
  //       return;
  //     }

  //     const tronWeb = window.tronLink.tronWeb;

  //     // Ensure the wallet is connected and an address is available
  //     if (!tronWeb.defaultAddress || !tronWeb.defaultAddress.base58) {
  //       console.error("TronLink wallet is not connected.");
  //       toast.error("Please connect your TronLink wallet.");
  //       return;
  //     }

  //     const fromAddress = tronWeb.defaultAddress.base58;
  //     const toAddress = addresses?.tron?.[0]?.address; // Ensure toAddress exists
  //     const amountInTrx = valueEntered;

  //     if (!toAddress) {
  //       console.error("Recipient address is missing.");
  //       toast.error("Invalid recipient address.");
  //       return;
  //     }

  //     if (!amountInTrx || amountInTrx <= 0) {
  //       console.error("Invalid transaction amount.");
  //       toast.error("Please enter a valid amount.");
  //       return;
  //     }

  //     // Convert TRX to sun (1 TRX = 1,000,000 sun)
  //     const amountInSun = amountInTrx * 1_000_000;

  //     // Send transaction
  //     const transaction = await tronWeb.trx.sendTransaction(toAddress, amountInSun);

  //     console.log("Transaction successful:", transaction);
  //     setTronTXRHash(transaction);


  //     return transaction;
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //     toast.error("Transaction failed. Please try again.");
  //   }
  // };

  const checkTronTransactionStatus = async (txId) => {
    try {
      const tronWeb = window.tronLink.tronWeb;
      const result = await tronWeb.trx.getTransaction(txId);

      if (result && result.ret && result.ret[0]) {
        const status = result.ret[0].contractRet;
        return status === 'SUCCESS';
      }
      return false;
    } catch (error) {
      console.error("Error checking transaction status:", error);
      return false;
    }
  };

  const payAmountTron = async () => {
    try {
      // Previous wallet checks remain the same
      if (!window.tronLink || !window.tronLink.tronWeb) {
        console.error("TronLink is not installed or not initialized.");
        toast.error("TronLink wallet is not installed or not connected.");
        return;
      }

      const tronWeb = window.tronLink.tronWeb;

      if (!tronWeb.defaultAddress || !tronWeb.defaultAddress.base58) {
        console.error("TronLink wallet is not connected.");
        toast.error("Please connect your TronLink wallet.");
        return;
      }

      const fromAddress = tronWeb.defaultAddress.base58;
      const toAddress = addresses?.tron?.[0]?.address;
      const amountInTrx = valueEntered;

      if (!toAddress) {
        console.error("Recipient address is missing.");
        toast.error("Invalid recipient address.");
        return;
      }

      if (!amountInTrx || amountInTrx <= 0) {
        console.error("Invalid transaction amount.");
        toast.error("Please enter a valid amount.");
        return;
      }

      const amountInSun = amountInTrx * 1_000_000;

      setIsTronTxPending(true);
      toast.loading("Transaction pending...");

      // Send transaction
      const transaction = await tronWeb.trx.sendTransaction(toAddress, amountInSun);

      if (transaction?.txid) {
        setTronTXRHash(transaction);

        // Start polling for transaction confirmation
        let confirmationAttempts = 0;
        const maxAttempts = 20; // Adjust as needed

        const checkConfirmation = async () => {
          if (confirmationAttempts >= maxAttempts) {
            toast.dismiss()
            setIsTronTxPending(false);
            toast.error("Transaction confirmation timeout");
            return;
          }

          const isConfirmed = await checkTronTransactionStatus(transaction.txid);

          if (isConfirmed) {
            toast.dismiss()
            setIsTronTxPending(false);
            setIsTronTxConfirmed(true);
            toast.success(`Transaction Successfull:${transaction.txid}`);
          } else {
            confirmationAttempts++;
            setTimeout(checkConfirmation, 3000);
          }
        };

        checkConfirmation();
      }

      return transaction;
    } catch (error) {
      toast.dismiss()
      console.error("Payment failed:", error);
      toast.error("Transaction failed. Please try again.");
      setIsTronTxPending(false);
    }
  };


  const [tronWallet, setTronWallet] = useState("");

  const connectTron = async () => {
    console.log("h1");
    let tronWeb;
    if (window.tronLink && window.tronLink.ready) {
      // console.log('h12')
      tronWeb = window.tronLink.tronWeb;
    } else {
      // console.log('h13')
      //console.log('h123')
      try {
        // console.log('h14')
        const res = await window?.tronLink?.request({
          method: "tron_requestAccounts",
        });
        if (res?.code === 200) {
          //console.log('h145')
          // console.log('h1333')
          tronWeb = window.tronLink.tronWeb;
        } else {
          //console.log('h134')
          toast.error(
            "Please unlock your tron wallet or install it and try again"
          );
          //   SetInstuctionModal(true)
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    if (tronWeb) {
      const tronAddress = await tronWeb.defaultAddress.base58;
      setTronWallet(tronAddress);
      // setSelectUsdt("TUSDT")
    }
    // console.log("troneb", tronWeb)
    return tronWeb;
  };

  const payAmountTronUSDT = async () => {
    // console.log("tokenPrice", tokenPriceInUsd)
    connectTron();

    if (window.tronLink.ready) {
      try {
        // const amount = 1;
        const amount = valueEntered;
        const tronweb = window.tronLink.tronWeb;
        const tronAddress = await tronweb.defaultAddress.base58;

        console.log("address", tronAddress);
        const usdtContractAddress = TronUSDTContract;
        const toAddress = addresses?.tron[0].address;
        // const toAddress = adminAddressTronUSDT;

        // Create an instance of the USDT contract
        const usdtContract = await tronweb.contract(
          tronAbi,
          usdtContractAddress
        );
        const hasBalance = await usdtContract
          .balanceOf(tronAddress.toString())
          .call();
        if (
          parseInt(hasBalance.toString()) <= 0 ||
          parseInt(hasBalance.toString()) < amount
        ) {
          return toast.error("You dont have enought usdt for this transaction");
        }

        // Convert the amount to the smallest unit (Sun)
        // const usdtAmountInSun = amount * parseInt('1000000');
        const usdtAmountInSun = amount * parseInt("1000000000000000000");
        // console.log("usdtAmountInSun", usdtAmountInSun.toString())

        // Call the transfer function to send USDT
        const result = await usdtContract
          .transfer(toAddress, usdtAmountInSun.toString())
          .send({
            shouldPollResponse: false,
          });
        // console.log("tx hash of usdt", result)
        const txHash = result;
        const price = parseInt(amount);

        console.log("USDT Transaction sent:", result);
        setTronTransctionHash(result);

        // Handle the transaction result here.
      } catch (error) {
        console.error("Error sending USDT transaction:", error);
        // Handle the error here.
      }
    }
  };

  const payAmountTronUSDC = async () => {
    // console.log("tokenPrice", tokenPriceInUsd)
    connectTron();

    if (window.tronLink.ready) {
      try {
        // const amount = 1;
        const amount = valueEntered;
        const tronweb = window.tronLink.tronWeb;
        const tronAddress = await tronweb.defaultAddress.base58;

        console.log("address", tronAddress);
        const usdtContractAddress = TronUSDTContract;
        const toAddress = addresses?.tron[0].address;
        // const toAddress = adminAddressTronUSDT;

        // Create an instance of the USDT contract
        const usdtContract = await tronweb.contract(
          tronAbi,
          usdtContractAddress
        );
        const hasBalance = await usdtContract
          .balanceOf(tronAddress.toString())
          .call();
        if (
          parseInt(hasBalance.toString()) <= 0 ||
          parseInt(hasBalance.toString()) < amount
        ) {
          return toast.error("You dont have enought usdt for this transaction");
        }

        // Convert the amount to the smallest unit (Sun)
        // const usdtAmountInSun = amount * parseInt('1000000');
        const usdtAmountInSun = amount * parseInt("1000000000000000000");
        // console.log("usdtAmountInSun", usdtAmountInSun.toString())

        // Call the transfer function to send USDT
        const result = await usdtContract
          .transfer(toAddress, usdtAmountInSun.toString())
          .send({
            shouldPollResponse: false,
          });
        // console.log("tx hash of usdt", result)
        const txHash = result;
        const price = parseInt(amount);

        console.log("USDT Transaction sent:", result);
        setTronTransctionHash(result);

        // Handle the transaction result here.
      } catch (error) {
        console.error("Error sending USDT transaction:", error);
        // Handle the error here.
      }
    }
  };
  //********************** Tron **********************/
  //********************** Bitcoin **********************/
  // const { payAmountBitcoin } = useBitcoinTransaction();
  const { payAmountBitcoinUSDC } = useBitcoinTransaction();
  // const [recipientAddress, setRecipientAddress] = useState();

  // const [amount, setAmount] = useState("");


  const handleBitcoinSendTransaction = async () => {
    // const amount = 2;
    if (!valueEntered) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const amountInSatoshis = parseFloat(valueEntered) * 100000000; // Convert BTC to Satoshis

    const result = await payAmountBitcoinUSDC(addresses?.bitcoin[0]?.address, amountInSatoshis);
    // const result = await payAmountBitcoinUSDC(recipientAddress, amountInSatoshis);

    if (result.success) {
      toast.success(`Transaction successful: ${result.signature}`);
      setBitcoinTransction(result.signature)
    } else {
      // toast.error(`Transaction failed`);
    }
  };


  // const payAmountBitcoinUSDC = async () => {

  //   // function to send a TX
  //   const { walletProvider } = useAppKitProvider<BitcoinConnector>('bip122');

  //   const payAmountBitcoinUSDC = async () => {
  //     const signature = await walletProvider.sendTransfer({
  //       recipient: recipientAddress,
  //       amount: "1000" // amount in satoshis
  //     })

  //     // print the Transaction Signature in console
  //     console.log('bitcoin signature', signature);
  //   }

  // }


  // const { payAmountBitcoin } = useBitcoinTransaction();

  // const handleBitcoinSendTransaction = async () => {
  //   const recipient = bc1pfzmlkl9xsrw0533dnak3f60uqdh5xjm5qprllzf7sdefva8l4z7szuksja
  //   const result = await useBitcoinTransaction(recipient, valueEntered, false);
  //   // const result = await payAmountBitcoinUSDC(recipient, valueEntered, false);
  //   // const result = await payAmountBitcoinUSDC(recipient, valueEntered, isTestnet);
  //   if (result.success) {
  //     toast.success(`Transaction sent successfully: ${result.signature}`)
  //     console.log("Transaction sent successfully:", result.signature);
  //   } else {
  //     console.error("Error:", result.error);
  //   }
  // };

  //********************** Bitcoin **********************/




  const [timeLeft, setTimeLeft] = useState(remainingTime);

  // Function to calculate remaining days, hours, minutes, and seconds
  const calculateTimeLeft = () => {
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    setTimeLeft(Number(remainingTime) || 0);
  }, [remainingTime]); // This will update timeLeft when remainingTime changes

  const { days, hours, minutes, seconds } = calculateTimeLeft();
  // console.log("remaining timeLeft", timeLeft)



  const formatSoldPercent = (soldPercent, decimals) => {
    const fixedValue = parseFloat(soldPercent.toFixed(decimals));
    return fixedValue % 1 === 0 ? fixedValue.toString() : fixedValue.toFixed(decimals);
  };




  return (
    <div className="w-full bg-BG text-white p-6 sm:p-8 rounded-3xl border-2 border-transparent relative">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">
              <span
                className="gradient-text-primary text-transparent bg-clip-text"
              // onClick={switchToConnectedNetwork}
              >
                Infinix
              </span>{" "}
              Presale
            </h1>
            <h2 className="text-2xl font-bold">
              Stage{" "}
              <span className="text-primary-1">{presaleData?.stage_no}</span>
            </h2>
            <p className="text-xl">
              1 FNX = $ {price}
              {/* 1 FNX = $ {Intl.NumberFormat().format(valueUsdt).toString()} */}
            </p>
            {/* <p className="text-gray-400">Next Stage Price = $ {price * 1.2}</p> */}
            <p className="text-gray-400">Next Stage Price = $ {price + 0.002}</p>
          </div>

          {/* CountDown Timer */}
          <div className="flex space-x-4">
            <div className="bg-white rounded-lg w-24">
              <div className="p-1 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-[#0A061D]">
                  {days}
                </span>
                <span className="text-sm text-[#0A061D] mt-1">Days</span>
              </div>
            </div>

            <div className="bg-white rounded-lg w-24">
              <div className="p-1 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-[#0A061D]">
                  {hours}
                </span>
                <span className="text-sm text-[#0A061D] mt-1">Hours</span>
              </div>
            </div>

            <div className="bg-white rounded-lg w-24">
              <div className="p-1 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-[#0A061D]">
                  {minutes}
                </span>
                <span className="text-sm text-[#0A061D] mt-1">Minutes</span>
              </div>
            </div>

            <div className="bg-white rounded-lg w-24">
              <div className="p-1 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-[#0A061D]">
                  {seconds}
                </span>
                <span className="text-sm text-[#0A061D] mt-1">Seconds</span>
              </div>
            </div>
          </div>
          {/* <CountDownTimer timerStart={remainingTime} /> */}
          {/* Progress Bar */}
          {/* {soldPercent > 30 ? (
            <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-primary-0 to-primary-1 transition-all duration-300 rounded-full"
                style={{ width: `${soldPercent}%` }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-black font-medium">
                  {soldPercent}%
                </span>
              </div>
            </div>
          ) : ( */}
          <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-primary-0 to-primary-1 transition-all duration-300 rounded-full"
              style={{ width: `${soldPercent}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
              {soldPercent > 0 ? soldPercent?.toFixed(3) : 0}%
              {/* {soldPercent > 0 ? soldPercent?.toFixed(3) : 0}% */}
            </span>
          </div>
          {/* // )} */}

          {/* Stats */}
          <div className="space-y-2">
            <p className="text-gray-300">
              USD Raised:{" "}
              <span className="text-yellow-200">
                ${Intl.NumberFormat().format(parseFloat(totalSoldAmount?.received_usd).toFixed(2))} /
                ${Intl.NumberFormat().format(parseFloat(1000000))}
              </span>
            </p>
            <p className="text-gray-300">
              Tokens Solds:{" "}
              {/* <span className="text-yellow-200">
                {totalSoldAmount?.total_amount.toFixed(6)} /{" "}
                {presaleData?.total_amount.toFixed(6)}
              </span> */}
              <span className="text-yellow-200">
                {totalSoldAmount?.total_amount
                  ? Intl.NumberFormat().format(parseFloat(totalSoldAmount.total_amount).toFixed(2))
                  : "0.00"}{" "}
                /{" "}
                {presaleData?.total_amount
                  ? Intl.NumberFormat().format(parseFloat(presaleData.total_amount))
                  : "0.00"}
              </span>

            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex justify-between items-stretch gap-2 md:gap-3 min-w-[300px]">
            {/* <button
              className={`btn btn-outline ${selectedPayCurrency === 'eth'? 'btn-primary':'btn-outline'} p-2 w-[30%] `}
              onClick={() => handleCurrencyChange("eth")}
            >
              <img
                src={"/images/eth.svg"}
                alt="ETH"
                width={24}
                height={24}
                className="mx-auto w-[80%]"
              />
            </button> */}
            <div className="btn btn-outline p-1.5">
              <Listbox
                value={selectedChain}
                onChange={(value) => {
                  disconnect();
                  setTronAddressWall('')
                  setTokensReceivable('')
                  setValueEntered('')
                  // handleChainChange(value);
                  setTimeout(() => {
                    handleChainChange(value);
                  }, 1000);
                  // console.log("valeuzzz",value)
                }}
              >
                <div className="relative z-[5]">
                  <div ref={coinNetworksRef}>
                    <Listbox.Button
                      className="flex justify-between items-center sm:2 gap-1 relative cursor-pointer sm:min-w-[125px] w-[105px]"
                      onClick={() => { handleCoinNetworksOption() }}
                    >
                      {selectedChain ? (
                        <span className="flex-centerY sm:gap-2 gap-1.5">
                          <Image
                            className={`sm:w-6 sm:h-6 w-5 h-5 rounded-full ${selectedChain.sortTitle.toLowerCase() == "solana"
                              ? "border-2 border-primary-0"
                              : ""
                              }`}
                            width={24}
                            height={24}
                            src={selectedChain?.image}
                            alt="curencyNetwork"
                          />
                          <span className="block my-text-16 md:my-text-17 hover:text-primary-1 my-transition leading-7">
                            {selectedChain.sortTitle}
                          </span>
                        </span>
                      ) : (
                        <span className="block my-text-16 md:my-text-17 hover:text-primary-1 my-transition leading-7">
                          Select Chain
                        </span>
                      )}
                      <IconCaretDownFilled
                        className={`text-primary-1 icon-24 text-2xl block ${openCoinNetworks
                          ? "rotate-180 duration-500"
                          : "duration-500"
                          }`}
                      />
                    </Listbox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Listbox.Options className="my-shadow-1 w-full min-w-[135px] h-[232px] bg-BG text-secondary p-2 absolute grid gap-1 overflow-y-auto scrollbar scrollbar-sm rounded-md">
                      {preSaleCardCurrencies?.map((item, idx) => (
                        <Listbox.Option key={idx} value={item}>
                          <li className="group rounded-md  hover:bg-primary-1 cursor-pointer my-transition">
                            <span className="flex-centerY gap-2 py-1 px-1.5 w-full">
                              <Image
                                className={`w-6 h-6  rounded-full group-hover:bg-primary-4 ${item.sortTitle.toLowerCase() == "solana"
                                  ? "border-2 border-primary-0"
                                  : ""
                                  }`}
                                width={32}
                                height={32}
                                src={item?.image}
                                alt="coin"
                              />
                              <span className="block my-text-18 group-hover:text-primary-4 whitespace-nowrap">
                                {item?.sortTitle}
                              </span>
                            </span>
                          </li>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            {/* <button
              className={`btn btn-outline ${selectedPayCurrency === 'usdt'? 'btn-primary':''} p-2 w-[30%]`}
              onClick={() => handleCurrencyChange("usdt")}
            >
              <img
                src="/images/usdt.svg"
                alt="USDT"
                width={24}
                height={24}
                className="mx-auto w-[80%]"
              />
            </button> */}
            <div className="btn btn-outline p-1.5">
              <Listbox
                value={selectedToken}
                onChange={(value) => {
                  handleTokenChange(value)
                  handleEmptyValue()
                  setTokensReceivable('');
                  setValueEntered('')
                }
                }
              >
                <div className="relative z-[5] ">
                  <div ref={chainTokensRef}>
                    <Listbox.Button
                      className="flex justify-between items-center sm:2 gap-1.5 relative cursor-pointer sm:min-w-[100px] w-[80px]"
                      onClick={handleChainTokenOptions}
                    >
                      {selectedToken ? (
                        <span className="flex-centerY sm:gap-2 gap-1.5">
                          <Image
                            className={`sm:w-6 sm:h-6 w-5 h-5 rounded-full ${selectedToken.tokenTitle.toLowerCase() == "sol"
                              ? "border-2 border-primary-0"
                              : ""
                              }`}
                            width={24}
                            height={24}
                            src={selectedToken?.image}
                            alt="curencyNetwork"
                          />
                          <span className="block my-text-16 md:my-text-17 hover:text-primary-1 my-transition leading-7">
                            {selectedToken?.tokenTitle}
                          </span>
                        </span>
                      ) : (
                        <span className="block my-text-16 md:my-text-17 hover:text-primary-1 my-transition leading-7">
                          Select Token
                        </span>
                      )}
                      <IconCaretDownFilled
                        className={`text-primary-1 icon-24 text-2xl block ${openChainTokens
                          ? "rotate-180 duration-500"
                          : "duration-500"
                          }`}
                      />
                    </Listbox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Listbox.Options className="my-shadow-1 w-full min-w-[135px] h-[135px] bg-BG text-secondary p-2 absolute grid gap-1 overflow-y-auto scrollbar scrollbar-sm rounded-md">
                      {selectedChain.tokens.map((item, idx) => (
                        <Listbox.Option key={idx} value={item}>
                          <li className="group rounded-md  hover:bg-primary-1 cursor-pointer my-transition">
                            <span className="flex-centerY gap-2 py-1 px-1.5 w-full">
                              <Image
                                className={`w-6 h-6  rounded-full group-hover:bg-primary-4 ${item.tokenTitle.toLowerCase() == "sol"
                                  ? "border-2 border-primary-0"
                                  : ""
                                  }`}
                                width={32}
                                height={32}
                                src={item?.image}
                                alt="coin"
                              />
                              <span className="block my-text-18 group-hover:text-primary-4 whitespace-nowrap">
                                {item?.tokenTitle}
                              </span>
                            </span>
                          </li>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div
              onClick={() =>
                window.open(
                  "https://global.transak.com/",
                  // "https://buy-sandbox.moonpay.com/?apiKey=pk_test_B4ks0cBBFQ2H8j4GPgOKsQ3dvCdJsDW4",
                  "_blank"
                )
              }
              className="btn btn-outline flex items-center p-1.5 w-[30%] max-w-[75px] md:max-w-[85px] xl:md:max-w-[85px]">
              <div
                className={``}>
                <img
                  src="/images/card.png"
                  alt="CARD"
                  width={24}
                  height={24}
                  className="mx-auto w-full md:w-[90%] xxl:w-[80%]"
                />
              </div>
              {/* <div class="container"> */}
              {/* </div> */}
            </div>
            {/* <button
              onClick={() =>
                window.open(
                  "https://buy-sandbox.moonpay.com/?apiKey=pk_test_oxQY1qdAGKlItZrVIRQ9qpNwpfAPHjQ",
                  "_blank"
                )
              }
            >
              CreditCards
            </button> */}
          </div>

          {/* Input Fields */}
          <div className="flex gap-2 items-start">
            <div className="w-[50%]">
              <label className="text-gray-400">
                Pay with{" "}
                <span className="font-bold uppercase text-primary-1">
                  {selectedToken.tokenTitle}
                </span>
              </label>
              <div className="mt-2 flex items-center bg-gray-800 rounded-lg">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  disabled={!loading}
                  value={valueEntered}
                  onChange={handleAmountChange}
                  className="w-full bg-transparent p-3 outline-none"
                  // step="0.00001"
                  // min="0"
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "ArrowDown" && valueEntered <= 0) {
                      e.preventDefault();
                    }
                  }}
                />

                {/* <button
                  type="button"
                  className="btn btn-primary h-full"
                  onClick={() => {
                    // Set max amount logic here
                    const maxAmount = 0; // This should be dynamically set based on user's balance
                    setValueEntered(maxAmount);
                    updateTokensReceivable(selectedToken,maxAmount);
                  }}
                >
                  Max
                </button> */}
              </div>
            </div>
            <div className="w-[55%]">
              <label className="text-gray-400">
                <span className="font-bold text-primary-2">FNX</span> You
                Receive:
              </label>
              <div className="mt-2 flex items-center bg-gray-800 rounded-lg">
                <input
                  type="number"
                  disabled={!loading}
                  value={tokensReceivable}
                  onChange={handleTokenQtyChange}
                  // min="0"
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "ArrowDown" && valueEntered <= 0) {
                      e.preventDefault();
                    }
                  }}
                  className="w-full bg-transparent p-3 outline-none"
                />
                <Image
                  src="/images/fnxLogo.png"
                  alt="NFX"
                  width={24}
                  height={24}
                  className="mr-4 h-full"
                />
              </div>
            </div>
          </div>

          {/* {error && <p className="text-red-500">{error}</p>} */}

          {/* Connect Wallet Button */}
          {/* <button type="submit" className="w-full btn btn-primary">
            Connect Wallet
          </button> */}
          {/* <ConnectButton /> */}
          {isConnected && address || walletProvider?.publicKey || tronAddressWall ?
            <button
              className="flex-nowrap  w-full my-transition text-center cursor-pointer md:py-3 sm:py-2.5 py-2 lg:px-6 md:px-5 sm:px-4 px-3 sm:rounded-lg rounded-md my-text-16 font-semibold leading-[150%] bg-gradient-to-r from-primary-0 to-primary-1 hover:bg-primary-4 hover:text-white text-primary-4 border border-primary-0"
              // onClick={isConnected ? beforePayMentCheckChain : openModal}
              onClick={beforePayMentCheckChain}
            >
              Buy Now
              {/* {isConnected ? "Pay Amount" : "Connect Wallet"} */}
              {/* {isConnected ? "Pay Amount" : "Connect Wallet"} */}
            </button>
            : selectedChain?.sortTitle === 'Tron' ?
              <TronNileWallet />
              :
              <ConnectButton />
          }
          {/* <button
            // disabled={!reset}
            onClick={(e) => {
              e.preventDefault();

              resetEvm();

            }}
            className="btn btn-secondary btn-sm mb-2">
            Recarregars
          </button> */}

          {/* Footer Links */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-full flex justify-center gap-4">
              {preSaleCardCurrencies
                .filter((item) => item.sortTitle != "Tron")
                .map((curr, index) => (
                  <Image
                    key={index}
                    className={`w-10 h-10 rounded-full group-hover:bg-primary-4 ${curr.sortTitle.toLowerCase() == "solana"
                      ? "border-2 border-primary-0"
                      : ""
                      }`}
                    width={42}
                    height={32}
                    src={curr?.image}
                    alt="coin"
                  />
                ))}
              {preSaleCardCurrencies[0].tokens
                .filter((item) => item.tokenTitle != "ETH")
                .map((curr, index) => (
                  <Image
                    key={index}
                    className="w-10 h-10 rounded-full group-hover:bg-primary-4"
                    width={42}
                    height={32}
                    src={curr?.image}
                    alt="coin"
                  />
                ))}
            </div>
            <div className="w-full flex justify-center gap-6">
              <Link
                href={"#howtobuy"}
                className="text-gray-400 hover:text-primary-1"
              >
                {/* <HelpCircle className="w-4 h-4 mr-2" /> */}
                How To Buy?
              </Link>
              <Link
                href={"/rewards"}
                className="text-gray-400 hover:text-primary-1"
              >
                {/* <Rocket className="w-4 h-4 mr-2" /> */}
                $1 Million Giveaway
              </Link>
            </div>
            {/* Help Link */}
            <div className="text-center">
              <div
                // href={"/error"}
                className="text-gray-500 hover:text-primary-1 text-md"
              >
                {/* <HelpCircle className="w-4 h-4 mr-2" /> */}
                Your Claimable Amount: {claimableAmount?.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </form >
      {/* <Modal onClick={handleSubmit} open={open}>
        <ConnectWallet />
      </Modal> */}
    </div >
  );
}
