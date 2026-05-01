export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?action=files`
    );

    const data = await res.json();

    return Response.json(data);

  } catch (err) {
    return Response.json({
      error: String(err),
    });
  }
}