import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/app/db/schema"

const client = neon(process.env.DATABASE_URL!);
export const db = drizzle(client , {schema});
