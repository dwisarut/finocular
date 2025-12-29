import { Button } from "./ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Plus, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";

function AddButton() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-2xl w-24 hover:cursor-pointer"
            >
              Add
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add transaction record</DialogTitle>
              <DialogDescription>
                Record your latest transaction, with manual input or OCR.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Label htmlFor="receipt-image">Receipt image for OCR</Label>
                <Input
                  id="receipt-image"
                  type="file"
                  className="rounded-[0.5rem]"
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger
                      id="type"
                      className="w-[140px] rounded-[0.5rem] hover:cursor-pointer"
                    >
                      <SelectValue placeholder="Select types" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[0.5rem] w-[140px]">
                      <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        <SelectItem value="Revenue">Revenue</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="px-1">
                    Transaction Date
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
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
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Input
                type="text"
                placeholder="Sender name"
                className="rounded-[0.5rem]"
              />
              <Input
                type="text"
                placeholder="Recipient name"
                className="rounded-[0.5rem]"
              />
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select>
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
                className="rounded-[0.5rem]"
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
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default AddButton;
