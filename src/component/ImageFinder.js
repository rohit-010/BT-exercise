import React, { useState, useEffect } from "react";
import Image from "./Image";
import classes from "./ImageFinder.module.css";

const IMAGE_API = "https://images-api.nasa.gov/search?q=moon";
const ERROR_MSG = "Sorry something went wrong!";
const ERROR_EMPTY_MSG = "No images found!";
const ImageFinder = () => {
  const [images, setImages] = useState([]); // Initial empty array
  const [error, setError] = useState(null); // Initial error is NULL
  const [isLoading, setIsLoading] = useState(false);

  // To load data
  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const response = await fetch(IMAGE_API);
        if (!response.ok) {
          // throw error
          throw new Error(ERROR_MSG);
        }
        let imageData = [];
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.collection.items)) {
          imageData = data.collection.items
            .map((item) => {
              if (Array.isArray(item.links)) {
                //console.log(item.links);
                return item.links;
              }
            })
            .map((linkItem) => {
              if (Array.isArray(linkItem)) {
                return linkItem;
              }
            })
            .map((eachLink) => {
              if (Array.isArray(eachLink)) {
                return eachLink[0]; // return first item
              }
            })
            .filter((linkImage) => {
              if (linkImage?.render && linkImage?.render === "image") {
                return linkImage;
              }
            })
            .map((filterImage) => {
              let imageArray = filterImage.href.split("/");
              let imageName = imageArray[imageArray.length - 1];

              return {
                name: imageName,
                url: filterImage.href,
              };
            });
        }

        if (imageData.length) {
          setImages(imageData);
        } else {
          throw new Error(ERROR_EMPTY_MSG);
        }
      } catch (err) {
        console.log(err);
        setError(err.msg || ERROR_MSG);
      }
    };

    loadData();
    setIsLoading(false);
  }, []);

  const imageList =
    images.length > 0 ? (
      <ul>
        {images.map((imageItem) => (
          <li key={imageItem.name}>
            <Image url={imageItem.url} name={imageItem.name}></Image>
          </li>
        ))}
      </ul>
    ) : (
      <p>No images!</p>
    );

  return (
    <div className={classes.imagelist}>
      <h2>Image Finder</h2>
      {isLoading && <p>Loading........</p>}
      {!isLoading && error && <p>{error}</p>}

      {imageList}
    </div>
  );
};

export default ImageFinder;
