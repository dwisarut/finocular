import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <div className="flex container justify-center mt-24">
        <div className="flex flex-col border border-border rounded-2xl p-8 w-4xl items-center">
          <h1 className="flex text-contrast-text text-2xl">
            Log in to your account
          </h1>
          <form
            className="flex flex-col text-contrast-text w-full m-4 mt-8 gap-8"
            onSubmit={handleSubmit((data) => {
              console.log("Receive the data!", data);
            })}
          >
            <input
              {...register("username", { required: true, minLength: 8 })}
              placeholder="Username or email"
              className="h-8 border-b outline-0"
            />
            <input
              {...register("password", { required: true, minLength: 8 })}
              placeholder="Password"
              className="h-8 border-b outline-0"
            />
            <input
              type="submit"
              className="self-center border border-border rounded-2xl h-8 w-3xs hover:cursor-pointer"
            />
            <p className="text-contrast-text self-center lato">
              New to Finocular?{" "}
              <Link to="/signup">
                <span className="text-contrast-text hover:text-amber-300">
                  Create account
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default LogIn;
