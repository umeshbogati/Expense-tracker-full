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
  const [file, setFile] = useState<File | null>(null);

  // ✅ SUBMIT FUNCTION (your FormData code goes here)
  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* ✅ FILE INPUT (your code) */}
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTransaction;
