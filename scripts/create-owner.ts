 import fs from "fs";
import path from "path";

// Load .env.local if not already in process.env
if (!process.env.MONGODB_URI && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
      }
    }
  }
}

import { auth } from "../src/lib/auth";
import { MongoClient } from "mongodb";

async function createOwner() {
  const email = process.argv[2] || "admin@theluxetouch.com";
  const password = process.argv[3] || "LuxeTouch@2026!";
  const name = process.argv[4] || "Luxe Touch Owner";

  console.log(`Checking admin user: ${email}...`);

  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const db = client.db("theluxetouch");
  const existing = await db.collection("user").findOne({ email });

  if (existing) {
    console.log(`Admin user with email ${email} already exists.`);
    await client.close();
    process.exit(0);
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    // Update role to owner
    await db.collection("user").updateOne(
      { email },
      { $set: { role: "owner" } }
    );

    console.log("✓ Owner account successfully created!");
    console.log(`✓ Email: ${email}`);
    console.log("✓ Role: owner (full administrative access)");
  } catch (error) {
    console.error("Failed to create owner:", error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

createOwner();
