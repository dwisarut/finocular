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
      <div className="flex flex-col container">
        <h1 className="text-[hsl(0,0%,90%)] text-6xl md:text-8xl m-8 ml-6 md:ml-0 pb-4 w-xs md:w-3xl h-auto alata">
          Financial visualizer to track your{" "}
          <span className="text-amber-300">transaction</span>
        </h1>
        <p className="text-[hsl(0,0%,90%)] text-xl lato ml-6 md:ml-0 m-8 w-[24rem] md:w-xl">
          Record your transaction history with the OCR's assistance for ease of
          use, with visualization to analyze your cash flow and spending
          behaviour.
        </p>
        <Button
          variant="outline"
          className="flex flex-row w-42 rounded-2xl lato text-base items-center gap-4 ml-6 md:ml-0 hover:cursor-pointer"
          onClick={() => handleNavigate("/ledger")}
        >
          Start here
          <ArrowRight />
        </Button>
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
