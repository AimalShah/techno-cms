import {seed} from "drizzle-seed";
import { db } from "./index";
import * as schema from "@/db/schema"

async function main(){
    await seed(db , schema, {count : 400});
}

main();