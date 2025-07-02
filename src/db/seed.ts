import { resetDatabase } from "./reset";
import { generateMockData } from "./mock-data";

async function main(){
    await resetDatabase();
    await generateMockData();
}

main();