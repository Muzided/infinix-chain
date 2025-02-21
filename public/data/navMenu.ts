import { link } from "fs";
import product1 from "@/../public/images/product1.png"; 
import product2 from "@/../public/images/product2.png"; 
import product3 from "@/../public/images/product3.png";
import product4 from "@/../public/images/product4.png";
import aboutUsImage from "@/../public/images/aboutUsImage.png";
import cube from "@/../public/images/cube.png";

export const navMenu = [
  {
    id: 100,
    name: "Home",
    isSubMenu: false,
    link: "/",
  },
  {
    id: 101,
    name: "About",
    isSubMenu: false,
    link: "/#about",
  },
  {
    id: 102,
    name: "Ecosystem",
    isSubMenu: false,
    link: "/#ecosystem"
  },
  {
    id: 103,
    name: "Tokenomics",
    isSubMenu: false,
    link: "/#tokenomics"
  },
  {
    id: 104,
    name: "Roadmap",
    isSubMenu: false,
    link: "/#roadmap"
  },
  {
    id: 105,
    name: "Products",
    isSubMenu: true,
    subMenu: [
      
      {
        id: 105.2,
        imageSrc: product1,
        name: "Staking",
        link: "/staking-pools",
      },
      {
        id: 105.3,
        imageSrc: product2,
        name: "Launchpad",
        link: "/ido",
      },
      {
        id: 105.4,
        imageSrc: product3,
        name: "Apex",
        link: "/apex",
      },
      {
        id: 105.5,
        imageSrc: product4,
        name: "Swap",
        link: "/swap",
      },
      {
        id: 105.6,
        imageSrc: aboutUsImage,
        name: "Exchange",
        link: "/crypto-buy",
      },
      {
        id: 105.7,
        imageSrc: cube,
        name: "Explorer",
        link: "/explorer",
      },
    ],
  },
  {
    id: 106,
    name: "1M$ Reward",
    isSubMenu: false,
    link: "/rewards"
  },
  {
    id: 107,
    name: "Docs",
    isSubMenu: false,
    link: "https://infinixchain.gitbook.io/infinixchain-docs",
  },
  {
    id: 108,
    name: "Audit",
    isSubMenu: false,
    link: "https://www.cyberscope.io/audits/3-fnx"
  },
];
// export const navMenu = [
//   {
//     id: 101,
//     name: "Home",
//     isSubMenu: false,
//     link: "/",
//   },
//   {
//     id: 102,
//     name: "Staking",
//     isSubMenu: true,
//     subMenu: [
//       {
//         id: 102.1,
//         name: "Staking Pools",
//         link: "/staking-pools",
//       },
//       {
//         id: 102.2,
//         name: "Pools Details",
//         link: "/staking-pools/24",
//       },
//     ],
//   },
//   {
//     id: 103,
//     name: "IDO",
//     isSubMenu: true,
//     subMenu: [
//       {
//         id: 103.1,
//         name: "IDO",
//         link: "/ido",
//       },
//       {
//         id: 103.2,
//         name: "IDO Details",
//         link: "/ido/1",
//       },
//     ],
//   },
//   {
//     id: 104,
//     name: "Swap",
//     isSubMenu: true,
//     subMenu: [
//       {
//         id: 104.1,
//         name: "Swap",
//         link: "/swap",
//       },
//       {
//         id: 104.2,
//         name: "Swap to Share",
//         link: "/swap-hold-share",
//       },
//     ],
//   },
//   {
//     id: 105,
//     name: "ApeX",
//     isSubMenu: false,
//     link: "/apex",
//   },
//   {
//     id: 106,
//     name: "Buy Crypto",
//     isSubMenu: true,
//     subMenu: [
//       {
//         id: 106.1,
//         name: "Buy Crypto",
//         link: "/crypto-buy",
//       },
//       {
//         id: 106.2,
//         name: "Pricing Plan",
//         link: "/pricing-plan",
//       },
//     ],
//   },
//   {
//     id: 107,
//     name: "Rewards",
//     isSubMenu: false,
//     link: "/rewards",
//   },
//   {
//     id: 108,
//     name: "Pages",
//     isSubMenu: true,
//     subMenu: [
//       {
//         id: 108.1,
//         name: "Blogs",
//         link: "/blogs",
//       },
//       {
//         id: 108.2,
//         name: "Blogs Details",
//         link: "/blogs/2",
//       },
//       {
//         id: 108.3,
//         name: "Contact Us",
//         link: "/contact",
//       },
//       {
//         id: 108.4,
//         name: "Terms & Conditions",
//         link: "/terms-conditions",
//       },
//       {
//         id: 108.5,
//         name: "Error",
//         link: "error",
//       },
//     ],
//   },
// ];
