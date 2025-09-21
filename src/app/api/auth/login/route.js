import clientPromise from "../../../lib/mongodb";


export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });

    }

    const client = await clientPromise;
    const db = client.db("campusDB");
    const users = db.collection("users");
    console.log(email, password);

    const user = await users.findOne({ email, password });
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), { status: 401 });
    }

    return new Response(JSON.stringify({ success: true, user: { name: user.name, email: user.email, role: user.role } }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
