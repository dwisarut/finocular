import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ButtonComponent {
  name: string;
  to: string;
  icon: LucideIcon;
}

const Button = ({ name, to, icon: Icon }: ButtonComponent) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(to);
  };
  return (
    <>
      <div className="flex flex-row mt-12">
        <button
          onClick={handleNav}
          className="flex justify-center text-contrast-text w-40 text-xl lato ml-8 rounded-4xl border p-1 hover:cursor-pointer items-center"
        >
          {name}
          <Icon />
        </button>
      </div>
    </>
  );
};
export default Button;
