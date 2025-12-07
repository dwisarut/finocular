import { Link } from "react-router-dom";

interface AuthType {
  name: string;
  href: string;
}

const authItems: AuthType[] = [
  { name: "Sign up", href: "/signup" },
  { name: "Log in", href: "/login" },
];

const AuthButton = () => {
  return (
    <>
      <div className="flex text-white border rounded-4xl w-auto h-full">
        {authItems.map((item) => {
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex pl-2 pr-2 m-2 self-center lato"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default AuthButton;
