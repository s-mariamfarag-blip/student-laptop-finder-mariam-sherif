

export async function getLaptops() {
  try {
    const response = await fetch("data/laptops.json");
    if (!response.ok) throw new Error("File not found");
    return await response.json();
  } catch (error) {
    console.log(error);
    return null; 
  }
}
