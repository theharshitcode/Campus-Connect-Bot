"use client";
import React, { useState, useEffect, useRef } from "react";

const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/admin/files");
      const data = await res.json();
      if (data.success) setFiles(data.files);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/files", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) setFiles((prev) => [...prev, data.file]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      const res = await fetch(`/api/admin/files/${fileId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (err) {
      console.error(err);
    }
  };

  const copyFile = (file) => {
    navigator.clipboard.writeText(file.url);
    alert(`Copied file link: ${file.url}`);
  };

  const selectFileForUpdate = (file) => {
    setSelectedFile(file);
    fileInputRef.current.click();
  };

  const handleFileUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedFile) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`/api/admin/files/${selectedFile.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFiles((prev) => prev.map((f) => (f.id === selectedFile.id ? data.file : f)));
        setSelectedFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 bg-gray-50 rounded-2xl shadow-inner overflow-auto mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Admin File Dashboard</h2>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={selectedFile ? handleFileUpdate : handleFileUpload}
      />

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow font-medium transition-all duration-200"
        >
          Upload File
        </button>
      </div>

      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200"
          >
            <span>{file.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => selectFileForUpdate(file)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg font-medium"
              >
                Update
              </button>
              <button
                onClick={() => copyFile(file)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg font-medium"
              >
                Copy
              </button>
              <button
                onClick={() => deleteFile(file.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
