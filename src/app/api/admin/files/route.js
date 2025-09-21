import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Directory to store files
const FILES_DIR = path.join(process.cwd(), "public", "admin-files");

// Ensure directory exists
if (!fs.existsSync(FILES_DIR)) fs.mkdirSync(FILES_DIR, { recursive: true });

export async function GET(req) {
  // List all files
  const files = fs.readdirSync(FILES_DIR).map((name) => ({
    id: name,
    name,
    url: `/admin-files/${name}`,
  }));
  return new Response(JSON.stringify({ success: true, files }), { status: 200 });
}

export async function POST(req) {
  // Upload file
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) return new Response(JSON.stringify({ success: false, error: "No file" }), { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${uuidv4()}-${file.name}`;
  fs.writeFileSync(path.join(FILES_DIR, fileName), buffer);

  return new Response(JSON.stringify({ success: true, file: { id: fileName, name: file.name, url: `/admin-files/${fileName}` } }), { status: 200 });
}

export async function PUT(req) {
  // Update file
  const fileId = req.url.split("/").pop();
  const filePath = path.join(FILES_DIR, fileId);

  if (!fs.existsSync(filePath)) return new Response(JSON.stringify({ success: false, error: "File not found" }), { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) return new Response(JSON.stringify({ success: false, error: "No file uploaded" }), { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(filePath, buffer);

  return new Response(JSON.stringify({ success: true, file: { id: fileId, name: file.name, url: `/admin-files/${fileId}` } }), { status: 200 });
}

export async function DELETE(req) {
  // Delete file
  const fileId = req.url.split("/").pop();
  const filePath = path.join(FILES_DIR, fileId);
  if (!fs.existsSync(filePath)) return new Response(JSON.stringify({ success: false, error: "File not found" }), { status: 404 });

  fs.unlinkSync(filePath);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
