import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";

interface FormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) =>
    console.log("Receive the data!", data);

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");

  return (
    <>
      <div className="flex flex-col container justify-center mt-24">
        <div className="flex flex-col border border-border rounded-2xl p-8 w-xl items-center self-center">
          <h1 className="flex text-contrast-text text-2xl">
            Sign up to your account
          </h1>
          <form
            className="flex flex-col text-contrast-text w-3/4 m-4 mt-8 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("username", { required: true, minLength: 8 })}
              aria-invalid={errors.username ? "true" : "false"}
              placeholder="Username"
              className="h-8 border-b outline-0"
            />
            {errors.username?.type === "required" && (
              <p role="alert">Username is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Email"
              className="h-8 border-b outline-0"
            />
            {errors.email?.type === "required" && (
              <p role="alert">Email address is required</p>
            )}

            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Password"
              className="h-8 border-b outline-0"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500" role="alert">
                Password is required
              </p>
            )}

            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) =>
                  value === password || "Password do not match",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              placeholder="Confirm password"
              className="h-8 border-b outline-0"
            />
            {errors.confirmPassword && (
              <p className="text-red-500" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}

            <div className="flex flex-row items-center gap-4">
              <Checkbox className="hover:cursor-pointer" />
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
}
export default SignUp;
