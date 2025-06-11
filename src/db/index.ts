import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema"

const db_url : string = process.env.DATABASE_URL!;
console.log("DATABASE URL : ", process.env.DATABASE_URL!)
const client = neon(db_url);
export const db = drizzle(client , {schema});
