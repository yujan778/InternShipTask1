import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Table, Textfield } from "./components";
import { countryOption, skillOption, columns, data as initialData } from "./Data/index.data";
import { MyForm } from "./container/index";
import { printSelectedRows } from "./utils";

function App() {
    const [tableData, setTableData] = useState(initialData);

    const handleDelete = (ids) => {
        setTableData((prev) => prev.filter((row) => !ids.includes(row.id)));
        toast.success("Deleted successfully! " + ids.join(", "));
    };

    const handlePrint = (ids) => {
        const success = printSelectedRows({ columns, data: tableData, selectedIds: ids });

        if (success) {
            toast.success("Printed successfully! " + ids.join(", "));
        } else {
            toast.error("No rows selected to print!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Form Section */}
            <div className="mb-8">
                <MyForm skills={skillOption} countries={countryOption} />
            </div>

            {/* Table Section */}
            <div>
                <Table
                    columns={columns}
                    data={tableData}
                    pageSize={5}
                    onDelete={handleDelete}
                    onPrint={handlePrint}
                />
            </div>
        </div>
    );
}

export default App;
