// PLACEHOLDER: NEED TO MAP EACH ELEMENT ACCORDING TO THE TABLE

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PagePagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-[0.5rem]" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-[0.5rem]">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-[0.5rem]" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-[0.5rem]">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-[0.5rem]" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PagePagination;
