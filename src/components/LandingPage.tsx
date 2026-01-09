import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div className="flex flex-col container gap-12">
        <h1 className="text-[hsl(0,0%,90%)] text-6xl md:text-8xl mt-8 ml-6 md:ml-0 pb-4 w-xs md:w-3xl h-auto alata">
          Financial visualizer to track your{" "}
          <span className="text-amber-300">transaction</span>
        </h1>
        <p className="text-[hsl(0,0%,90%)] text-xl lato ml-6 md:ml-0 w-full lg:w-xl">
          Record your transaction history with the OCR's assistance for ease of
          use, with visualization to analyze your cash flow and spending
          behaviour.
        </p>
        <Button
          variant="outline"
          className="flex flex-row w-42 rounded-2xl lato text-base items-center ml-6 md:ml-0 hover:cursor-pointer"
          onClick={() => handleNavigate("/ledger")}
        >
          Start here
          <ArrowRight />
        </Button>

        <div className="flex flex-col gap-64 mt-48">
          <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row justify-start lg:justify-between">
            <div className="flex flex-col justify-start gap-16 w-130">
              <h2 className="text-xl alata">Transaction records</h2>
              <h3 className="text-5xl alata">
                In-depth record with customized tags
              </h3>
              <p className="text-xl lato">
                Tagging each transaction for chart visualization in order to
                view your statistics
              </p>
            </div>
            <img
              className="border rounded-2xl w-full lg:w-140"
              src="/ledger-preview.svg"
              alt="Ledger preview"
            />
          </div>
          <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row justify-start lg:justify-between">
            <div className="flex flex-col justify-start gap-16 w-130">
              <h2 className="text-xl alata">Dashboard & Visualization</h2>
              <h3 className="text-5xl alata">
                Visualization to aid with analyzing spending habits
              </h3>
              <p className="text-xl lato">
                Summarize and visualize transactions as a line chart, and
                categorize the spending habit as a donut chart.
              </p>
            </div>
            <img
              className="border rounded-2xl w-full lg:w-140"
              src="/dashboard-preview.svg"
              alt="Dashboard preview"
            />
          </div>
        </div>
      </div>
      <footer className="border-t border-border mt-24">
        <div className="flex container flex-col mt-8 mb-8">
          <a href="/" className="flex w-fit h-fit">
            <img src="/finocular_dark.svg" className="w-32 m-8" />
          </a>
          <div className="flex flex-row ml-8 gap-4">
            <Link
              to="https://www.linkedin.com/in/wisarut-donsri/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit h-fit self-center"
            >
              <LinkedInLogoIcon className="w-5 h-auto hover:text-amber-300" />
            </Link>
            <Link
              to="https://github.com/dwisarut"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit h-fit self-center"
            >
              <GitHubLogoIcon className="w-5 h-auto hover:text-amber-300" />
            </Link>
            <p className="text-sm lato w-xl">
              © 2025 dwisarut - All right reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default LandingPage;
