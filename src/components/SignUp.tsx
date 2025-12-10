import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="flex flex-col container justify-center mt-24">
        <div className="flex flex-col border border-border rounded-2xl p-8 w-xl items-center self-center">
          <h1 className="flex text-contrast-text text-2xl">
            Sign up to your account
          </h1>
          <form
            className="flex flex-col text-contrast-text w-3/4 m-4 mt-8 gap-8"
            onSubmit={handleSubmit((data) => {
              console.log("Receive the data!", data);
            })}
          >
            <input
              {...register("username", { required: true, minLength: 8 })}
              placeholder="Username"
              className="h-8 border-b outline-0"
            />
            <input
              type="email"
              {...register("email-address", { required: true })}
              placeholder="Email"
              className="h-8 border-b outline-0"
            />
            <input
              type="password"
              {...register("password", { required: true, minLength: 8 })}
              placeholder="Password"
              className="h-8 border-b outline-0"
            />
            <input
              type="password"
              {...register("confirm-password", {
                required: true,
                minLength: 8,
              })}
              placeholder="Confirm password"
              className="h-8 border-b outline-0"
            />
            <div className="flex flex-row items-center -ml-3">
              <Checkbox className="w-fit" defaultChecked />
              <p>Remember me on this device</p>
            </div>
            <input
              type="submit"
              className="self-center border border-border rounded-2xl h-8 w-3xs hover:cursor-pointer"
            />
            <p className="text-contrast-text self-center lato text-sm">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-contrast-text hover:text-amber-300 text-sm">
                  Log in
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
