import React, { useRef } from "react";

export default function UploadPanel() {
  const fileInput = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileInput.current?.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", fileInput.current.files[0]);
    await fetch("/api/ingest", { method: "POST", body: formData });
    alert("File uploaded!");
  };

  return (
    <form onSubmit={handleUpload} className="mb-4">
      <input type="file" ref={fileInput} className="mr-2" />
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Ingest</button>
    </form>
  );
}