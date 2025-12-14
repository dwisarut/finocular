// NOTE: This is the summary component in dashboard
// COMPONENTS: Avatar, total earn or spend, net loss, net gain, cash flow visualization
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import summation from "./Summation";

function SummarySection() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="text-white text-3xl">Summary</h1>
        <div className="flex flex-row">
          <Avatar className="w-24 h-auto">
            <AvatarImage src="/Avatar.svg" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-8 text-xl justify-center gap-5 lato">
            <h1 className="font-bold">John Doe</h1>
            <h2>{summation()} THB</h2>
          </div>
        </div>
        <h3 className="lato">Today: +240 THB</h3>
      </div>
    </>
  );
}

export default SummarySection;
