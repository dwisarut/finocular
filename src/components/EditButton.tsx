import { ChevronDownIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState, type FormEvent } from "react";

type Transaction = {
  id: number;
  type: "revenue" | "expense";
  date: string;
  sender: string;
  recipient: string;
  category:
    | "income"
    | "saving_investment"
    | "shopping"
    | "entertainment"
    | "billing"
    | "drinking_food"
    | "vacation"
    | "others"
    | "";
  amount: string;
};

function EditButton({
  transaction,
  onSuccess,
}: {
  transaction: Transaction;
  onSuccess: () => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [type, setType] = useState<"revenue" | "expense" | "">(
    transaction.type
  );
  const [date, setDate] = useState<Date | undefined>(
    new Date(transaction.date)
  );
  const [sender, setSender] = useState(transaction.sender);
  const [recipient, setRecipient] = useState(transaction.recipient);
  const [category, setCategory] = useState<
    | "income"
    | "saving_investment"
    | "shopping"
    | "entertainment"
    | "billing"
    | "drinking_food"
    | "vacation"
    | "others"
    | ""
  >(transaction.category);
  const [amount, setAmount] = useState(transaction.amount);

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = {
        type,
        date: date ? date.toISOString() : null,
        sender,
        recipient,
        category,
        amount,
      };
      const response = await fetch(
        `http://localhost:3000/api/transactions/${transaction.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        onSuccess();
        setOpenDialog(false);
      } else {
        console.error("Failed to edit transaction");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Pencil2Icon className="hover:cursor-pointer bg-transparent hover:text-amber-300" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <form className="flex flex-col gap-5" onSubmit={onSubmitForm}>
            <DialogHeader>
              <DialogTitle>Edit transaction record</DialogTitle>
              <DialogDescription>
                Edit selected transaction, with manual input or OCR.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    onValueChange={(type) => {
                      if (type === "revenue" || type === "expense") {
                        setType(type);
                      }
                    }}
                    value={type}
                  >
                    <SelectTrigger
                      id="type"
                      className="w-[140px] rounded-[0.5rem] hover:cursor-pointer"
                    >
                      <SelectValue placeholder="Select types" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[0.5rem] w-[140px]">
                      <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="px-1">
                    Transaction Date
                  </Label>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-[200px] justify-between font-normal rounded-[0.5rem] hover:cursor-pointer"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 rounded-[0.5rem]"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpenCalendar(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Input
                type="text"
                placeholder="Sender name"
                name="sender_name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Recipient name"
                name="recipient_name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(category) => {
                    if (
                      category === "income" ||
                      category === "saving_investment" ||
                      category === "shopping" ||
                      category === "entertainment" ||
                      category === "billing" ||
                      category === "drinking_food" ||
                      category === "vacation" ||
                      category === "others"
                    ) {
                      setCategory(category);
                    }
                  }}
                  value={category}
                >
                  <SelectTrigger
                    id="category"
                    className="w-full rounded-[0.5rem] hover:cursor-pointer"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[0.5rem] w-full">
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="saving_investment">
                        Saving & Investment
                      </SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="drinking_food">
                        Drinking & food
                      </SelectItem>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="number"
                placeholder="Amount in THB"
                name="money_amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-[0.5rem] hover:cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="rounded-[0.5rem] hover:cursor-pointer"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default EditButton;
