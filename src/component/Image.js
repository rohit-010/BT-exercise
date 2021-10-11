import React from "react";
import classes from "./Image.module.css";

// Component to Style Image
const Image = (props) => {
  const { name, url } = props;
  return (
    <div className={classes.image}>
      <img src={url} alt={name}></img>
      <p>Image Name: {name}</p>
    </div>
  );
};

export default Image;
