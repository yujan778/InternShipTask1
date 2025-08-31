// utils/printSelectedRows.js
export const printSelectedRows = ({ columns, data, selectedIds }) => {
    if (!selectedIds || selectedIds.length === 0) return false;

    const rowsToPrint = data.filter((row) => selectedIds.includes(row.id));
    if (rowsToPrint.length === 0) return false;

    // Skip action columns (since they don’t exist in data)
    const printableColumns = columns.filter((col) => !col.isAction);

    // Open new window
    const printWindow = window.open("", "", "width=800,height=600");

    // Build table HTML
    const tableHTML = `
        <html>
        <head>
            <title>Print Selected Rows</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f4f4f4; }
            </style>
        </head>
        <body>
            <h2>Selected Records</h2>
            <table>
                <thead>
                    <tr>
                        ${printableColumns.map((col) => `<th>${col.label}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${rowsToPrint
                        .map(
                            (row) =>
                                `<tr>${printableColumns
                                    .map((col) => `<td>${row[col.key]}</td>`)
                                    .join("")}</tr>`
                        )
                        .join("")}
                </tbody>
            </table>
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                }
            </script>
        </body>
        </html>
    `;

    // Write and close
    printWindow.document.open();
    printWindow.document.write(tableHTML);
    printWindow.document.close();

    return true;
};
