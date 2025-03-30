import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Craft Curve",
  description: "Design custom mathematical curves for DeFi protocols",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
