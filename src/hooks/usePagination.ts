import { useState, useMemo, useCallback } from "react";
import { PaginationConfig, PaginationResult } from "@/types";
import { calculateTotalPages } from "@/utils/pagination/calculateTotalPages";
import { getPaginatedItems } from "@/utils/pagination/getPaginatedItems";
import { getNextPage } from "@/utils/pagination/getNextPage";

interface ItemWithId {
  id: string; 
}

export const usePagination = <T extends ItemWithId>({
  items,
  itemsPerPage,
  initialPage = 1,
}: PaginationConfig<T>): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const totalPages = useMemo(
    () => calculateTotalPages(items.length, itemsPerPage),
    [items, itemsPerPage]
  );

  const paginatedItems = useMemo(
    () => getPaginatedItems(items, currentPage, itemsPerPage),
    [items, currentPage, itemsPerPage]
  );

  const handlePageChange = useCallback(
    (direction: "next" | "prev") => {
      setCurrentPage((prevPage) =>
        getNextPage(prevPage, direction, totalPages)
      );
    },
    [totalPages]
  );
    // setting current page based on product ID
    const setPageByProductId = useCallback(
      (productId: string) => {
        const productIndex = items.findIndex((item) => item.id === productId);
        if (productIndex !== -1) {
          const page = Math.floor(productIndex / itemsPerPage) + 1; 
          setCurrentPage(page); 
        }
      },
      [items, itemsPerPage]
    );

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    setPageByProductId
  };
};
