import React, { useState } from "react";

import ReplaceDialog from "../components/ReplaceDialog";
import { uploadStatement } from "../services/api";

export default function UploadPage() {
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [file, setFile] = useState<File | null>(null);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReplace, setShowReplace] = useState(false);
  const [replacePending, setReplacePending] = useState(false);

  const onUpload = async (replace = false) => {
    if (!file) {
      setError("Please select a file");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await uploadStatement(file, month, year, replace);
      setReplacePending(false);
      alert("Statement uploaded and processed.");
    } catch (err: any) {
      if (err?.status === 409 && !replace) {
        setReplacePending(true);
        setShowReplace(true);
      } else {
        setError(err?.message || "Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Upload Statement</h2>
      <div className="form-row">
        <label className="muted">
          Month
          <select className="select" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {monthOptions.map((label, index) => (
              <option key={label} value={index + 1}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="muted">
          Year
          <input
            className="input"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min={2000}
            max={2100}
          />
        </label>
      </div>
      <div className="file-upload">
        <label className="file-button" htmlFor="statement-file">
          Choose statement
        </label>
        <span className="file-name muted">{file ? file.name : "No file selected"}</span>
        <input
          id="statement-file"
          className="file-input"
          type="file"
          accept=".pdf,.csv,.xlsx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <button className="button primary" onClick={() => onUpload(false)} disabled={loading}>
        {loading ? "Processing..." : "Upload"}
      </button>
      {error && <p className="error">{error}</p>}

      <ReplaceDialog
        open={showReplace}
        onCancel={() => {
          setShowReplace(false);
          setReplacePending(false);
        }}
        onConfirm={() => {
          setShowReplace(false);
          if (replacePending) {
            onUpload(true);
          }
        }}
      />
    </div>
  );
}
