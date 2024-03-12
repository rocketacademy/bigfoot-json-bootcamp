import { readFile, writeFile } from "fs/promises";

const getSightings = async (newSighting = null) => {
  try {
    // Retrieve sightings.json file contents as string
    const sightingsData = await readFile("./sightings.json", "utf8");
    // Parse the existing data as an array
    let sightings = JSON.parse(sightingsData);

    // If a new sighting is provided, add it to the array
    if (newSighting) {
      sightings.push(newSighting);
      // Write the updated data back to the file
      await writeFile(
        "./sightings.json",
        JSON.stringify(sightings, null, 2),
        "utf8"
      );
    }

    // Return sightings as an object
    return sightings;
  } catch (error) {
    console.error("Error reading or writing sightings file:", error);
    throw error;
  }
};

export { getSightings };
