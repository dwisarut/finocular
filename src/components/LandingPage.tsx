import Navbar from "./Navbar";
import { ChevronRight } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col container">
        <Navbar />
        <h1 className="text-contrast-text text-7xl m-8 pb-4 w-2xl h-auto alata">
          Financial visualizer to track your transaction
        </h1>
        <p className="text-contrast-text text-xl lato ml-8 w-xl">
          Record your transaction history with the OCR's assistance for ease of
          use, with visualization to analyze your cash flow and spending
          behaviour.
        </p>
        <div className="flex flex-row mt-12">
          <button className="flex justify-center text-contrast-text w-40 text-xl lato ml-8 rounded-4xl border p-1 hover:cursor-pointer items-center">
            Start now
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
