export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        Memories
      </h1>

      <div className="flex gap-4 mb-8">
        <button className="border px-4 py-2 rounded">
          Upload
        </button>

        <button className="border px-4 py-2 rounded">
          Refresh Gallery
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Gallery
        </h2>

        <p>No files yet.</p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Visits
        </h2>

        <p>No visits yet.</p>
      </div>
    </main>
  );
}