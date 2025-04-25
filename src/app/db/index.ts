import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/app/db/schema"

const client = neon("postgres://neondb_owner:npg_BnTZJE8uH7yC@ep-round-truth-a55ks8oy-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(client , {schema});
