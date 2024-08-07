import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "25vh",
  },
  cube: {
    width: "90px",
    height: "90px",
    position: "relative",
    transformStyle: "preserve-3d",
    transform: "rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) translateX(50%)",
  },
  face: {
    width: "90px",
    height: "90px",
    position: "absolute",
    boxShadow: "inset 0px 0 1px 2px black",
    border: "0.0001px solid black",
  },
});
//sdadasdadas
const Cube = ({ frontColor, topColor, rightColor }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.cube}>
        <div className={`${classes.face}`} style={{ background: frontColor, transform: 'translateZ(45px)', filter: 'brightness(0.9)' }}></div>
        <div className={`${classes.face}`} style={{ background: topColor, transform: 'rotateX(90deg) translateZ(45px)', filter: 'brightness(1.36)' }}></div>
        <div className={`${classes.face}`} style={{ background: rightColor, transform: 'rotateY(90deg) translateZ(45px)', filter: 'brightness(0.9)' }}></div>
      </div>
    </div>
  );
};

export default Cube;
