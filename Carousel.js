// Import the function for toggling favorite status from the axiosFunctions module
import { favourite } from "./index.js";

// Function to toggle favorite status of a dog image
export async function favourite(imgId) {
  try {
    // Send a GET request to check if the image is already favorited
    const response = await axios.get(`https://api.thedogapi.com/v1/favourites?image_id=${imgId}`);
    // If the image is already favorited, delete the favorite
    if (response.data.length > 0) {
      await axios.delete(`https://api.thedogapi.com/v1/favourites/${response.data[0].id}`);
      console.log(`Unfavorited image with ID: ${imgId}`);
    } 
    // If the image is not favorited, add it to favorites
    else {
      await axios.post("https://api.thedogapi.com/v1/favourites", { image_id: imgId });
      console.log(`Favorited image with ID: ${imgId}`);
    }
  } catch (error) {
    // If an error occurs during the request, log the error and throw it
    console.error("Error toggling favorite:", error);
    throw error;
  }
}

// Function to create a carousel item for displaying a dog image
export function createCarouselItem(imgSrc, imgAlt, imgId) {
  // Clone the template for a carousel item
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  // Set the image source and alt text
  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  // Add a click event listener to the favorite button to toggle favorite status
  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId);
  });

  // Return the cloned carousel item
  return clone;
}

// Function to clear all items from the carousel
export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}