import { Link } from "react-router-dom";

interface NavbarItem {
  name: string;
  href: string;
}

const navItems: NavbarItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Ledger", href: "/ledger" },
];

function Navbar() {
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
            return (
              <Link
                className="text-contrast-text pl-4 pr-4 self-center lato hover:text-amber-300"
                key={item.name}
                to={item.href}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Navbar;
