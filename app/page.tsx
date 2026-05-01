"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function fetchFiles() {
    try {
      const res = await fetch("/api/files");

      const data = await res.json();

      if (Array.isArray(data)) {
        setFiles(data);
      } else {
        console.error("Invalid files response:", data);
        setFiles([]);
      }
    } catch (err) {
      console.error("Fetch files error:", err);
    }
  }

  async function logVisit() {
    if (!name) return;

    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      console.log(data);

      alert("Visit logged!");
    } catch (err) {
      console.error("Visit log error:", err);
    }
  }

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const base64 = reader.result
          ?.toString()
          .split(",")[1];

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            mimeType: file.type,
            base64,
          }),
        });

        const data = await res.json();

        console.log(data);

        alert(JSON.stringify(data));

        fetchFiles();

      } catch (err) {
        console.error("Upload error:", err);
      }
    };
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        Memories
      </h1>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={logVisit}
          className="border px-4 py-2 rounded"
        >
          Log Visit
        </button>
      </div>

      <input
        type="file"
        onChange={uploadFile}
        className="mb-6"
      />

      <button
        onClick={fetchFiles}
        className="border px-4 py-2 rounded mb-8"
      >
        Refresh Gallery
      </button>

      <div className="grid grid-cols-2 gap-4">
        {files.length === 0 && (
          <p>No files found.</p>
        )}

        {files.map((file, index) => (
          <div
            key={index}
            className="border p-2 rounded"
          >
            <p className="mb-2 break-words">
              {file.name}
            </p>

            {file.type?.includes("image") ? (
              <img
                src={file.url}
                alt={file.name}
                className="w-full rounded"
              />
            ) : (
              <video
                src={file.url}
                controls
                className="w-full rounded"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}