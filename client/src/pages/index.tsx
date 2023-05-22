import Image from "next/image";
import { Inter } from "next/font/google";
import LandingPage from "@/components/LandingPage";
import Layout from "@/components/common/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}
