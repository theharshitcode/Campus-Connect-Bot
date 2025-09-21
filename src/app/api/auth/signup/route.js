import clientPromise from "../../../lib/mongodb";


export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("campusDB"); // your DB name
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "User already exists" }), { status: 400 });
    }

    const result = await users.insertOne({ name, email, password, role: "student" }); // default role
    return new Response(JSON.stringify({ success: true, user: { name, email } }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
