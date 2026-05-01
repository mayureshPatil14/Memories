export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?action=visit`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    return Response.json({
      success: true,
      response: text,
    });

  } catch (err) {
    return Response.json({
      error: String(err),
    });
  }
}