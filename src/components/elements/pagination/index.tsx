// "use client";

// import { PaginationInterface } from "@/types/interface";
// import { useState } from "react";

// const Pagination: React.FC<PaginationInterface> = ({
//   totalPages,
//   currentPage,
//   onPageChange,
// }) => {
//   const [visiblePages, setVisiblePages] = useState<number[]>([]);

//   // Update visible pages whenever currentPage changes
//   useState(() => {
//     const pagesToShow = calculatePagesToShow();
//     setVisiblePages(pagesToShow);
//   }, [currentPage]);

//   const calculatePagesToShow = (): number[] => {
//     const pages: number[] = [];
//     const delta = 2; // Number of pages to show around the current page

//     // Show at least 1 and max totalPages, while adding "..." where appropriate
//     for (
//       let i = Math.max(1, currentPage - delta);
//       i <= Math.min(totalPages, currentPage + delta);
//       i++
//     ) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   return (
//     <div className="flex justify-center items-center space-x-2 mt-4">
//       <button
//         className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}>
//         ❮
//       </button>

//       {/* Page numbers */}
//       {visiblePages.map((page) => (
//         <button
//           key={page}
//           className={`px-3 py-1 border rounded ${page === currentPage ? "bg-gray-800 text-white" : ""}`}
//           onClick={() => onPageChange(page)}>
//           {page}
//         </button>
//       ))}

//       {/* Ellipsis (if applicable) */}
//       {currentPage < totalPages - 3 && <span className="px-3">...</span>}

//       <button
//         className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}>
//         ❯
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

export default function PaginationScreen() {
  return (
    <div>
      <div>
        <div>
          <div>hello world</div>
        </div>
      </div>
    </div>
  );
}
