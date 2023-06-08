import { useState } from "react";
import "../../styles/imageStack.css";
import settings from "../../settings.json";

/**
 *
 * @param {index} param0 The index of the image to be displayed out of all the available images
 * @param {image_details} param1  other details about the image
 * @returns
 */
function ImageDisplay({ index, image_details }) {
  const base_url = settings.base_url;
  const image = base_url + image_details.image;
  const alt = `image ${index}`;
  return (
    <div className="image-single">
      <img src={image} alt={alt} />
    </div>
  );
}

//images => List of urls of images
/**
 * Takes an array of images links and creates a slideable display component for the images
 * @param {images} param0
 *
 */
export default function ImageStack({ images }) {
  const imagesCount = images.length;
  const [counter, setCounter] = useState(0);

  const before = () => {
    setCounter((imagesCount + counter - 1) % imagesCount);
  };

  const after = () => {
    setCounter((counter + 1) % imagesCount);
  };

  return (
    <div className="image-stack">
      <i className="fa fa-angle-double-left fa-2x" onClick={() => before()}></i>
      <ImageDisplay index={counter} image_details={images[counter]} />
      <i className="fa fa-angle-double-right fa-2x" onClick={() => after()}></i>
    </div>
  );
}
