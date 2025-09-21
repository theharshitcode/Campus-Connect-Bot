// import { NextResponse } from "next/server";
// import { franc } from "franc";
// // import { getMongoClient } from "@/app/lib/mongodb";

// import clientPromise from "@/app/lib/mongodb";
// const languageInstruction = (lang) => {
//   if (!lang) {
//     return "You are a helpful assistant. Reply in the same language as the user.";
//   }

//   switch (lang) {
//     // 🟢 Rajasthani Dialects
//     case "Marwari":
//       return `
// You are a helpful assistant.
// Always reply in **pure Marwari language** using Devanagari script.
// Do NOT use Hindi or mix Hindi words. 
// Use only authentic Marwari vocabulary spoken in Jodhpur, Bikaner, Jaisalmer, Pali region.

// Example:
// User: राम राम सा
// Bot: राम राम सा, थां कैसा हो?
// `;

//     case "Mewari":
//       return `
// You are a helpful assistant.
// Always reply in **pure Mewari dialect** using Devanagari script.
// Do NOT use Hindi words.
// This dialect is spoken in Udaipur, Chittorgarh, Rajsamand region.

// Example:
// User: राम राम
// Bot: राम राम, थारे हाल चाल कैसा?
// `;

//     case "Dhundhari":
//       return `
// You are a helpful assistant.
// Always reply in **pure Dhundhari dialect** using Devanagari script.
// Avoid Hindi completely.
// Dhundhari is spoken around Jaipur, Dausa, Tonk region.

// Example:
// User: राम राम
// Bot: राम राम, थारो हाल चाल कैसो?
// `;

//     case "Hadoti":
//       return `
// You are a helpful assistant.
// Always reply in **pure Hadoti dialect** using Devanagari script.
// Avoid Hindi words completely.
// Hadoti is spoken in Kota, Bundi, Jhalawar region.

// Example:
// User: राम राम
// Bot: राम राम, थारे हाल चाल कैसा?
// `;

//     case "Mewati":
//       return `
// You are a helpful assistant.
// Always reply in **pure Mewati dialect** using Devanagari script.
// Avoid Hindi words completely.
// Mewati is spoken in Alwar, Bharatpur region.

// Example:
// User: राम राम
// Bot: राम राम, तौ के हाल चाल सैं?
// `;

//     case "Wagdi":
//       return `
// You are a helpful assistant.
// Always reply in **pure Wagdi dialect** using Devanagari script.
// Avoid Hindi words completely.
// Wagdi is spoken in Dungarpur, Banswara region.

// Example:
// User: राम राम
// Bot: राम राम, थारो हाल चाल कैसो?
// `;

//     // 🟢 Other Indian Languages
//     case "Hindi":
//       return `
// You are a helpful assistant.
// Always reply **only in Hindi** using Devanagari script.
// Do NOT mix English or other languages.
// `;

//     case "Marathi":
//       return `
// You are a helpful assistant.
// Always reply **only in Marathi language** using Devanagari script.
// Do NOT mix Hindi or English words.
// `;

//     case "Bengali":
//       return `
// You are a helpful assistant.
// Always reply **only in Bengali language** using Bengali script.
// Do NOT mix Hindi or English.
// `;

//     case "Tamil":
//       return `
// You are a helpful assistant.
// Always reply **only in Tamil language** using Tamil script.
// Do NOT mix other languages.
// `;

//     case "Telugu":
//       return `
// You are a helpful assistant.
// Always reply **only in Telugu language** using Telugu script.
// Do NOT mix other languages.
// `;

//     case "Gujarati":
//       return `
// You are a helpful assistant.
// Always reply **only in Gujarati language** using Gujarati script.
// Do NOT mix Hindi or English words.
// `;

//     case "Punjabi":
//       return `
// You are a helpful assistant.
// Always reply **only in Punjabi language** using Gurmukhi script.
// Do NOT mix Hindi or English.
// `;

//     case "Kannada":
//       return `
// You are a helpful assistant.
// Always reply **only in Kannada language** using Kannada script.
// Do NOT mix Hindi or English.
// `;

//     case "Malayalam":
//       return `
// You are a helpful assistant.
// Always reply **only in Malayalam language** using Malayalam script.
// Do NOT mix Hindi or English.
// `;

//     case "Odia":
//       return `
// You are a helpful assistant.
// Always reply **only in Odia language** using Odia script.
// Do NOT mix Hindi or English.
// `;

//     case "English":
//       return `
// You are a helpful assistant.
// Always reply **only in English language**.
// Do NOT use any other language.
// `;

//     // 🟢 Default Fallback
//     default:
//       return `You are a helpful assistant. Reply only in ${lang} language strictly.`;
//   }
// };


// export async function POST(req) {
//   try {
//     const { messages, sessionId, language } = await req.json();

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json({ error: "No messages provided" }, { status: 400 });
//     }

//     // Agar user ne language manually select ki hai, wahi use karo
//     let selectedLang = language || "";

//     // Agar Auto hai, toh detect karo
//     if (!selectedLang || selectedLang === "Auto") {
//       const userMessage = messages[messages.length - 1]?.content || "";
//       const langCode = franc(userMessage);
//       if (langCode !== "und") {
//         selectedLang = langCode;
//       }
//     }

//     const systemPrompt = languageInstruction(selectedLang);

//     const messagesForSarvam = [{ role: "system", content: systemPrompt }, ...messages];

//     // Sarvam API call
//     const res = await fetch("https://api.sarvam.ai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "api-subscription-key": process.env.SARVAM_API_KEY,
//       },
//       body: JSON.stringify({
//         model: "sarvam-m",
//         messages: messagesForSarvam,
//         temperature: 0.2,
//       }),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Sarvam API error:", res.status, text);
//       return NextResponse.json({ error: `Sarvam API error: ${res.status}` }, { status: 502 });
//     }

//     const data = await res.json();
//     const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

//     // Save to MongoDB
//     try {
//       const client = await  clientPromise;
//       const db = client.db("chatbot");
//       const collection = db.collection("messages");
//       await collection.insertOne({
//         messages,
//         bot: reply,
//         language: selectedLang,
//         timestamp: new Date(),
//       });
//     } catch (mongoErr) {
//       console.error("Mongo save error:", mongoErr);
//     }

//     // Generate sessionId if not exists
//     const sid =
//       sessionId ||
//       (globalThis.crypto && globalThis.crypto.randomUUID
//         ? globalThis.crypto.randomUUID()
//         : Date.now().toString());

//     return NextResponse.json({ reply, sessionId: sid });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
//   }
// }


















// app/api/chat/route.js
import { NextResponse } from "next/server";
import { franc } from "franc";
import clientPromise from "@/app/lib/mongodb";

// 🔹 Language Instruction Function
const languageInstruction = (lang) => {
  if (!lang) {
    return "You are a helpful assistant. Reply in the same language as the user.";
  }

  switch (lang) {
    case "Marwari":
      return `
You are a helpful assistant.
Always reply in **pure Marwari language** using Devanagari script.
Do NOT use Hindi or mix Hindi words. 
Use only authentic Marwari vocabulary spoken in Jodhpur, Bikaner, Jaisalmer, Pali region.

Example:
User: राम राम सा
Bot: राम राम सा, थां कैसा हो?
`;

    case "Mewari":
      return `
You are a helpful assistant.
Always reply in **pure Mewari dialect** using Devanagari script.
Do NOT use Hindi words.
This dialect is spoken in Udaipur, Chittorgarh, Rajsamand region.

Example:
User: राम राम
Bot: राम राम, थारे हाल चाल कैसा?
`;

    case "Dhundhari":
      return `
You are a helpful assistant.
Always reply in **pure Dhundhari dialect** using Devanagari script.
Avoid Hindi completely.
Dhundhari is spoken around Jaipur, Dausa, Tonk region.

Example:
User: राम राम
Bot: राम राम, थारो हाल चाल कैसो?
`;

    case "Hadoti":
      return `
You are a helpful assistant.
Always reply in **pure Hadoti dialect** using Devanagari script.
Avoid Hindi words completely.
Hadoti is spoken in Kota, Bundi, Jhalawar region.

Example:
User: राम राम
Bot: राम राम, थारे हाल चाल कैसा?
`;

    case "Mewati":
      return `
You are a helpful assistant.
Always reply in **pure Mewati dialect** using Devanagari script.
Avoid Hindi words completely.
Mewati is spoken in Alwar, Bharatpur region.

Example:
User: राम राम
Bot: राम राम, तौ के हाल चाल सैं?
`;

    case "Wagdi":
      return `
You are a helpful assistant.
Always reply in **pure Wagdi dialect** using Devanagari script.
Avoid Hindi words completely.
Wagdi is spoken in Dungarpur, Banswara region.

Example:
User: राम राम
Bot: राम राम, थारो हाल चाल कैसो?
`;

    // 🔹 Other Indian Languages
    case "Hindi":
      return `Always reply **only in Hindi** using Devanagari script.`;
    case "Marathi":
      return `Always reply **only in Marathi** using Devanagari script.`;
    case "Bengali":
      return `Always reply **only in Bengali** using Bengali script.`;
    case "Tamil":
      return `Always reply **only in Tamil** using Tamil script.`;
    case "Telugu":
      return `Always reply **only in Telugu** using Telugu script.`;
    case "Gujarati":
      return `Always reply **only in Gujarati** using Gujarati script.`;
    case "Punjabi":
      return `Always reply **only in Punjabi** using Gurmukhi script.`;
    case "Kannada":
      return `Always reply **only in Kannada** using Kannada script.`;
    case "Malayalam":
      return `Always reply **only in Malayalam** using Malayalam script.`;
    case "Odia":
      return `Always reply **only in Odia** using Odia script.`;
    case "English":
      return `Always reply **only in English**.`;

    // Default fallback
    default:
      return `You are a helpful assistant. Reply only in ${lang} language strictly.`;
  }
};

// 🔹 POST API
export async function POST(req) {
  try {
    const { messages, sessionId, language } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // ✅ Select language (Manual > Auto detect)
    let selectedLang = language || "";
    if (!selectedLang || selectedLang === "Auto") {
      const userMessage = messages[messages.length - 1]?.content || "";
      const langCode = franc(userMessage);
      if (langCode !== "und") {
        selectedLang = langCode; // e.g. "hin", "eng"
      }
    }

    const systemPrompt = languageInstruction(selectedLang);

    const messagesForSarvam = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    // ✅ Call Sarvam API
    const res = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": process.env.SARVAM_API_KEY,
      },
      body: JSON.stringify({
        model: "sarvam-m",
        messages: messagesForSarvam,
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Sarvam API error:", res.status, text);
      return NextResponse.json(
        { error: `Sarvam API error: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    // ✅ Save to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db("chatbot");
      const collection = db.collection("messages");

      await collection.insertOne({
        messages,
        bot: reply,
        language: selectedLang,
        timestamp: new Date(),
      });
    } catch (mongoErr) {
      console.error("Mongo save error:", mongoErr);
    }

    // ✅ Generate sessionId if not exists
    const sid =
      sessionId ||
      (globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : Date.now().toString());

    return NextResponse.json({ reply, sessionId: sid });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
