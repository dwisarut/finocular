import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="flex flex-col container justify-center mt-24">
        <div className="flex flex-col border border-border rounded-2xl p-8 w-xl items-center self-center">
          <h1 className="flex text-contrast-text text-2xl">
            Sign up your account
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
            <input
              type="submit"
              className="self-center border border-border rounded-2xl h-8 w-3xs hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
