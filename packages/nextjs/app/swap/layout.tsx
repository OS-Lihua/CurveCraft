import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Swap Tokens",
  description: "Swap tokens using custom curve contracts",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
