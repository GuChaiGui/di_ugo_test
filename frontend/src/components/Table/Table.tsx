import { useState } from "react";
import "./Table.scss";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  pagination?: boolean; // ✅ AJOUT
}

export default function Table<T>({
  columns,
  data,
  pageSize = 5,
  pagination = true, // pagination activée par défaut
}: TableProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentData = pagination ? data.slice(start, start + pageSize) : data;

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={`header-${index}`}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {columns.map((col, colIndex) => {
                  const value = row[col.key];
                  return (
                    <td key={`cell-${rowIndex}-${colIndex}`}>
                      {col.render ? col.render(value, row) : value ?? "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
