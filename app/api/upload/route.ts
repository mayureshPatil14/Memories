export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?action=upload`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return Response.json(data);

  } catch (err) {
    return Response.json({
      error: String(err),
    });
  }
}