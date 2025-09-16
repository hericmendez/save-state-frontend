// components/ui/pagination.tsx
import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css" // ou estilize manualmente com Tailwind
import {FC} from "react"

interface CustomPaginationProps {
  current: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

const  CustomPagination : FC<CustomPaginationProps> = ({
  current,
  total,
  pageSize,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showLessItems
        className="flex gap-1"
        itemRender={(page, type, element) => {
          if (type === "page") {
            return (
              <button className="px-3 py-1 border rounded hover:bg-muted" key={page}>
                {page}
              </button>
            )
          }
          if (type === "prev" || type === "next") {
            return (
              <button className="px-2 py-1 border rounded text-sm" key={type}>
                {element}
              </button>
            )
          }
          return element
        }}
      />
    </div>
  )
}

export default CustomPagination;
