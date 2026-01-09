import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import SummarySection from "./SummaryDB";
import TransactionSection from "./RecentTransaction";
import RevenueGraph from "./RevenueGraph";
import ExpenseGraph from "./ExpenseGraph";
import DonutRevenue from "./DonutRevenue";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col container gap-8">
        <h1 className="text-contrast-text text-6xl m-8 ml-0 pb-4 w-3xl h-auto alata">
          Dashboard
        </h1>
        <SummarySection />
        <TransactionSection />
        <div className="flex flex-row justify-between">
          <RevenueGraph />
          <DonutRevenue />
        </div>
        <div className="flex flex-row justify-between">
          <ExpenseGraph />
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
              <LinkedInLogoIcon className="text-contrast-text w-5 h-auto hover:text-amber-300" />
            </Link>
            <Link
              to="https://github.com/dwisarut"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit h-fit self-center"
            >
              <GitHubLogoIcon className="text-contrast-text w-5 h-auto hover:text-amber-300" />
            </Link>
            <p className="text-contrast-text text-sm lato w-xl">
              © 2025 dwisarut - All right reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Dashboard;
