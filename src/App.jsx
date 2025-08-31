import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import "react-toastify/dist/ReactToastify.css";

import { Table, PrintableTable } from "./components/index";
import { countryOption, skillOption } from "./Data/index.data";
import { MyForm } from "./container/index";
import { columns, data as initialData, actionsConfig } from "./config";

function App() {
    const [tableData, setTableData] = useState(initialData);
    const [selectedRows, setSelectedRows] = useState([]);

    // ✅ ref for PrintableTable
    const printRef = useRef();

    const handleDelete = (ids) => {
        setTableData((prev) => prev.filter((row) => !ids.includes(row.id)));
        toast.success(`Deleted ${ids.length} row(s) out of ${tableData.length} rows successfully`);
    };

    const handlePrint = (ids) => {
        if (!ids || ids.length === 0) {
            toast.error("No rows selected to print!");
            return;
        }
        setSelectedRows(tableData.filter((row) => ids.includes(row.id)));
        setTimeout(() => {
            handleReactPrint();
        }, 0);
    };

    // ✅ useReactToPrint hook
    const handleReactPrint = useReactToPrint({
        contentRef: printRef, // notice: not content(), but contentRef
        documentTitle: "Printable Table",
    });

    return (
        <div className="max-w-4xl mx-auto p-4">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Form Section */}
            <div className="mb-8">
                <MyForm skills={skillOption} countries={countryOption} />
            </div>

            {/* Table Section */}
            <div className="p-4 max-w-4xl mx-auto">
                <Table
                    columns={columns}
                    data={tableData}
                    pageSize={5}
                    selectable={true}
                    onDelete={handleDelete}
                    onPrint={handlePrint}
                    actions={actionsConfig}
                />
            </div>

            {/* Hidden Printable Table */}
            <div style={{ display: "none" }}>
                <PrintableTable ref={printRef} columns={columns} data={selectedRows} />
            </div>
        </div>
    );
}

export default App;
