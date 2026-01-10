"use client";
import { useState } from "react";
import axios from "axios";

export default function BankDetailsForm() {
  const [form, setForm] = useState({
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });

  const [loadingIFSC, setLoadingIFSC] = useState(false);

  async function fetchIFSCDetails(ifsc: string) {
    try {
      setLoadingIFSC(true);
      const res = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);

      setForm((prev) => ({
        ...prev,
        bankName: res.data.BANK,
        branchName: res.data.BRANCH,
      }));
    } catch (err) {
      console.log("Invalid IFSC");
      setForm((prev) => ({
        ...prev,
        bankName: "",
        branchName: "",
      }));
    } finally {
      setLoadingIFSC(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Bank Details</h2>

      <label className="block mb-2">Account Number</label>
      <input
        type="text"
        className="w-full border p-2"
        value={form.accountNumber}
        onChange={(e) =>
          setForm({ ...form, accountNumber: e.target.value })
        }
      />

      <label className="block mt-4 mb-2">IFSC Code</label>
      <input
        type="text"
        className="w-full border p-2"
        value={form.ifscCode}
        onChange={(e) => {
          const val = e.target.value.toUpperCase();
          setForm({ ...form, ifscCode: val });
          if (val.length === 11) fetchIFSCDetails(val);
        }}
      />

      {loadingIFSC && (
        <p className="text-blue-500 text-sm mt-2">Fetching bank details...</p>
      )}

      <label className="block mt-4 mb-2">Bank Name</label>
      <input
        type="text"
        className="w-full border p-2 bg-gray-100"
        value={form.bankName}
        disabled
      />

      <label className="block mt-4 mb-2">Branch Name</label>
      <input
        type="text"
        className="w-full border p-2 bg-gray-100"
        value={form.branchName}
        disabled
      />

      <button className="mt-6 w-full p-2 bg-black text-white rounded">
        Save Bank Details
      </button>
    </div>
  );
}
