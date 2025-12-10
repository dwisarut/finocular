import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavbarItem {
  name: string;
  href: string;
}

const navItems: NavbarItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Ledger", href: "/ledger" },
  { name: "Log in", href: "/login" },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <div className="flex container bg-background m-4 justify-between">
        <a className="flex self-center" href="/">
          <img
            src="/finocular_dark.svg"
            className="flex self-center ml-6 w-24 md:ml-0 md:w-36 h-auto"
          />
        </a>
        <div className="flex self-center">
          {navItems.map((item) => {
            const isLogin = item.name === "Log in";
            const isInLogin =
              location.pathname === "/login" || location.pathname === "/signup";

            const className = isLogin
              ? "text-contrast-text ml-8 pl-4 pr-4 self-center lato hover:bg-[hsl(0_0_12%)] border border-border rounded-2xl"
              : "text-contrast-text pl-4 pr-4 self-center lato hover:text-amber-300";

            if (isInLogin) {
              return null;
            }

            return (
              <Link className={className} key={item.name} to={item.href}>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Navbar;
