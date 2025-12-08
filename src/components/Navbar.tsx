import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

interface NavbarItem {
  name: string;
  href: string;
}

const navItems: NavbarItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Ledger", href: "/ledger" },
];

const Navbar = () => {
  return (
    <>
      <div className="flex container bg-background m-4 justify-between">
        <a className="flex self-center" href="/">
          <img src="/finocular_dark.svg" className="flex self-center w-36" />
        </a>
        <div className="flex self-center">
          {navItems.map((item) => {
            return (
              <Link
                className="text-contrast-text pl-8 pr-8 self-center lato"
                key={item.name}
                to={item.href}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
          <AuthButton />
        </div>
      </div>
    </>
  );
};
export default Navbar;
