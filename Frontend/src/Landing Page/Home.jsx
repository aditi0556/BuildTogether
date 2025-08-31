import Background from "./Background";
import { Spotlight } from "@/components/ui/spotlight-new";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen">
                <Navbar className="fixed top-0  w-full z-50 left-0" />
              </div>
      <div className="flex flex-col min-h-screen ">

        <div className="flex-grow flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight />
          <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-5">
              BUILD TOGETHER
            </h1>
            <p className="mt-6 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              A vibrant space where creators submit and showcase their hackathon
              projects.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
