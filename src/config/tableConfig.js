// tableConfig.js
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";

// Columns configuration
export const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "actions",
    label: "Actions",
    isAction: true, 
  },
];

// Sample data
export const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Admin" },
  { id: 6, name: "Eve Wilson", email: "eve@example.com", role: "Editor" },
];


export const actionsConfig = [
  {
    label: "Edit",
    icon: FaEdit,     
    className: "text-blue-600",
  },
  {
    label: "Delete",
    icon: FaTrash,
    className: "text-red-600",
  },
];
