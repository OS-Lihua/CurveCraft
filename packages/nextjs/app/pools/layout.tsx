import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Liquidity Pools",
  description: "Manage your liquidity in custom curve pools",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
