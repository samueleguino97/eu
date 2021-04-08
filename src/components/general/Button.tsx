import { makeStyles } from "@material-ui/core";
import * as React from "react";
const useStyles = makeStyles({
  container: {
    backgroundColor: "#2b5829",
    padding: 8,
    borderRadius: 8,
    cursor: "pointer",
    "& button": {
      height: "100%",
      cursor: "pointer",
      width: "100%",
      backgroundColor: "transparent",
      color: "white",
      fontWeight: "bold",
      border: "none",
      "&:focus,&:active": {
        border: "none",
        outline: "none",
      },
    },
  },
});
export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function Button({ children, onClick }: ButtonProps) {
  const classes = useStyles();
  return (
    <div onClick={onClick} className={classes.container}>
      <button>{children}</button>
    </div>
  );
}

export default Button;
