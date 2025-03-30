import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Deploy Contracts",
  description: "Deploy your custom curve contracts to the blockchain",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
