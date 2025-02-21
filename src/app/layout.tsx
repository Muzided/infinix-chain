// app/layout.tsx
import { Providers } from '../app/providers';
import { CustomCursor, Footer, NavBar, ScrollToTop } from "@/components/Global";
import type { Metadata } from "next";
import "./globals.css";
import { lexend, poppins, roboto } from "@/config/font";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from './context/GlobalState';
import { headers } from "next/headers"; // added

export const metadata: Metadata = {
  title: "InfinixChain",
  description: "InfinixChain – Empowering the Future with Our Own Layer 2 Blockchain.",
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={`${lexend?.variable} ${roboto?.variable} ${poppins?.variable}`}>
        <GlobalProvider>  
          <Providers cookies={cookies}>
            <ToastContainer />
            <NavBar />
            {children}
            <Footer />
            <CustomCursor />
            <ScrollToTop />
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}



// app/layout.tsx
// import { Providers } from '../app/providers';
// import { CustomCursor, Footer, NavBar, ScrollToTop } from "@/components/Global";
// import type { Metadata } from "next";
// import "./globals.css";
// import { lexend, poppins, roboto } from "@/config/font";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const metadata: Metadata = {
//   title: "InfinixChain",
//   description: "InfinixChain – Empowering the Future with Our Own Layer 2 Blockchain.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${lexend?.variable} ${roboto?.variable} ${poppins?.variable}`}>
//         <Providers>
//           <ToastContainer />
//           <NavBar />
//           {children}
//           <Footer />
//           <CustomCursor />
//           <ScrollToTop />
//         </Providers>
//       </body>
//     </html>
//   );
// }
