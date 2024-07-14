import Navbar from "@/components/navbar/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Navbar />
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
}
