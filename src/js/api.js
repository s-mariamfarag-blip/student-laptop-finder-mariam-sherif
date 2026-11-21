// api.js - loads the laptop data from the JSON file

export async function getLaptops() {
  try {
    const response = await fetch("data/laptops.json");
    if (!response.ok) throw new Error("File not found");
    return await response.json();
  } catch (error) {
    console.log(error);
    return null; // the page shows an error message when this is null
  }
}
