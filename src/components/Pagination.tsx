import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PagePagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }

    return pages.filter((p) => p !== undefined);
  };

  const pageNumbers = getPageNumbers();
  console.log(
    "Current page:",
    page,
    "Total pages:",
    totalPages,
    "Page numbers:",
    pageNumbers
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={`rounded-[0.5rem] ${
              !hasPrev ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (hasPrev) {
                onPageChange(page - 1);
              }
            }}
          />
        </PaginationItem>

        {pageNumbers.map((pageNum, index) => {
          if (typeof pageNum === "string") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${index}`}>
              <PaginationLink
                href="#"
                className="rounded-[0.5rem]"
                isActive={pageNum === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            className={`rounded-[0.5rem] ${
              !hasNext ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (hasNext) {
                onPageChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PagePagination;
