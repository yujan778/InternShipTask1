import React, { forwardRef } from "react";

const PrintableTable = forwardRef(({ columns, data, title = "Selected Records" }, ref) => {
    const printableColumns = columns.filter((col) => !col.isAction);

    return (
        <div ref={ref} className="p-6 bg-white flex flex-col min-h-screen">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">{title}</h2>

            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        {printableColumns.map((col) => (
                            <th
                                key={col.key}
                                className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id || rowIndex}
                            className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            {printableColumns.map((col) => (
                                <td
                                    key={`${row.id || rowIndex}-${col.key}`}
                                    className="border border-gray-300 px-4 py-2 text-gray-800"
                                >
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-auto pt-6 text-sm text-gray-500 italic text-center">
                Printed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
        </div>
    );
});

export default PrintableTable;
