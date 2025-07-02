import { db } from "./index";
import * as schema from "./schema";

export async function resetDatabase() {
  const tableNames = Object.keys(schema).filter(key => typeof (schema as any)[key].$inferSelect === 'function');
  console.log("Deleting data from all tables...");

  for (const tableName of tableNames) {
    console.log(`Deleting data from ${tableName}...`);
    await db.delete((schema as any)[tableName]);
  }

  console.log("All tables have been cleared.");
}
