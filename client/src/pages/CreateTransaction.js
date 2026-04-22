import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
const CreateTransaction = () => {
    // form state (you can replace with react-hook-form if needed)
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    // ✅ FILE STATE (your code)
    const [file, setFile] = useState(null);
    // ✅ SUBMIT FUNCTION (your FormData code goes here)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("type", type);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("amount", amount);
        formData.append("date", date);
        if (file) {
            formData.append("file", file); // ✅ important
        }
        try {
            await axios.post("http://localhost:5000/api/transaction", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Transaction created");
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { placeholder: "Type", value: type, onChange: (e) => setType(e.target.value) }), _jsx("input", { placeholder: "Category", value: category, onChange: (e) => setCategory(e.target.value) }), _jsx("input", { placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value) }), _jsx("input", { placeholder: "Amount", value: amount, onChange: (e) => setAmount(e.target.value) }), _jsxs("label", { children: [_jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value) }), _jsx("input", { type: "file", onChange: (e) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        } })] }), _jsx("button", { type: "submit", children: "Submit" })] }));
};
export default CreateTransaction;
