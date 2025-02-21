import currencyCategory1 from "@/../public/images/currencyCategory1.png";
import currencyCategory2 from "@/../public/images/currencyCategory2.png";
import currencyCategory3 from "@/../public/images/currencyCategory3.png";
import currencyCategory4 from "@/../public/images/cryptocurrency10.png";
import currencyCategory5 from "@/../public/images/currencyCategory5.png";
import currencyCategory6 from "@/../public/images/currencyCategory6.png";
import currencyCategory7 from "@/../public/images/currencyCategory7.png";
import BtcLogo from "@/../public/images/BtcLogo.png"
import tron from "@/../public/images/tron.png"
import solanaLogo from "@/../public/images/solanaLogo.png"
import usdtLogo from "@/../public/images/usdtLogo.svg"
import ethLogo from "@/../public/images/ethLogo.svg"
import usdcLogo from "@/../public/images/usdcLogo.png"
import polygonLogo from "@/../public/images/polygon.png"
import baseLogo from "@/../public/images/base.png"

export const preSaleCardCurrencies = [
    {
        id: "1",
        chainTitle: "Ethereum",
        sortTitle: "Ethereum",
        image: ethLogo,
        tokens: [
            {
                id: "1a",
                tokenTitle: "ETH",
                image: ethLogo,
                usdRate: 3226.12,
            },
            {
                id: "1b",
                tokenTitle: "USDT",
                image: usdtLogo,
                usdRate: 1,
            },
            {
                id: "1c",
                tokenTitle: "USDC",
                image: usdcLogo,
                usdRate: 1,
            }
        ]
    },
    {
        id: "2",
        chainTitle: "Binance Smart Chain",
        sortTitle: "BSC",
        image: currencyCategory2,
        tokens: [
            {
                id: "2a",
                tokenTitle: "BNB",
                image: currencyCategory2,
                usdRate: 695.80,
            },
            {
                id: "2b",
                tokenTitle: "USDT",
                image: usdtLogo,
                usdRate: 1,
            },
            {
                id: "2c",
                tokenTitle: "USDC",
                image: usdcLogo,
                usdRate: 1,
            }
        ]
    },
    {
        id: "3",
        chainTitle: "Tron",
        sortTitle: "Tron",
        image: tron,
        tokens: [
            {
                id: "3a",
                tokenTitle: "TRX",
                image: tron,
                usdRate: 0.22,
            },
            {
                id: "3b",
                tokenTitle: "USDT",
                image: usdtLogo,
                usdRate: 1,
            },
            {
                id: "3c",
                tokenTitle: "USDC",
                image: usdcLogo,
                usdRate: 1,
            }
        ]
    },
    {
        id: "4",
        chainTitle: "Solana",
        sortTitle: "Solana",
        image: solanaLogo,
        tokens: [
            {
                id: "4a",
                tokenTitle: "SOL",
                image: solanaLogo,
                usdRate: 188.02,
            },
            {
                id: "4b",
                tokenTitle: "USDT",
                image: usdtLogo,
                usdRate: 1,
            },
            {
                id: "4c",
                tokenTitle: "USDC",
                image: usdcLogo,
                usdRate: 1,
            }
        ]
    },
    {
        id: "5",
        chainTitle: "Bitcoin",
        sortTitle: "Bitcoin",
        image: BtcLogo,
        tokens: [
            {
                id: "5a",
                tokenTitle: "BTC",
                image: BtcLogo,
                usdRate: 96556.99,
            }
        ]
    },
    {
        id: "6",
        chainTitle: "Polygon",
        sortTitle: "Polygon",
        image: polygonLogo,
        tokens: [
            {
                id: "6a",
                tokenTitle: "POL",
                image: polygonLogo,
                usdRate: 0.22,
            },
            {
                id: "6b",
                tokenTitle: "USDT",
                image: usdtLogo,
                usdRate: 1,
            },
            {
                id: "6c",
                tokenTitle: "USDC",
                image: usdcLogo,
                usdRate: 1,
            }
        ]
    },
    {
        id: "7",
        chainTitle: "Base",
        sortTitle: "Base",
        image: baseLogo,
        tokens: [
            {
                id: "7a",
                tokenTitle: "Base",
                image: baseLogo,
                usdRate: 0.22,
            },
            {
                id: "7b",
                tokenTitle: "USDT",
                image: usdtLogo,
                usdRate: 1,
            },
            {
                id: "7c",
                tokenTitle: "USDC",
                image: usdcLogo,
                usdRate: 1,
            }
        ]
    },

];