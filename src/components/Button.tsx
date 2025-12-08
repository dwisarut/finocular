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
          className="customBtn hover:bg-[hsl(0_0_12%)]"
        >
          {name}
          <Icon />
        </button>
      </div>
    </>
  );
};
export default Button;
