import { hashPassword } from "./auth.js";
import { db } from "./db.js";
import { users } from "../shared/schema.js";

export async function initializeDefaultAdmin() {
  const adminEmail = "manish@pashuAI.com";
  const adminPassword = "12345";

  try {
    const passwordHash = await hashPassword(adminPassword);
    
    await db.insert(users).values({
      email: adminEmail,
      passwordHash,
      name: "Admin",
      isAdmin: 1,
    });
    
    console.log(`✓ Default admin user created: ${adminEmail}`);
  } catch (error: any) {
    if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
      console.log(`✓ Admin user already exists: ${adminEmail}`);
    } else {
      console.error("Error initializing default admin:", error);
    }
  }
}
