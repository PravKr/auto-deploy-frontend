import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";

const btnColorsContained = {
  primary: "primary-contained",
  secondary: "secondary-contained",
};

const btnColorsOutlined = {
  primary: "primary-outlined",
  secondary: "secondary-outlined",
};
function Buttons(props) {
  const { color, label, variant, onClick, onChange, type, disabled, href } =
    props;
  return (
    <Fragment>
      {(variant == "contained" && (
        <Button
          size="small"
          type={type}
          className={btnColorsContained[color]}
          variant="contained"
          onClick={onClick}
          onChange={onChange}
          disabled={disabled}
          href={href}
        >
          {label}
        </Button>
      )) ||
        (variant == "outlined" && (
          <Button
          size="small"
            type={type}
            className={btnColorsOutlined[color]}
            variant="outlined"
            onClick={onClick}
            onChange={onChange}
            disabled={disabled}
            href={href}
          >
            {label}
          </Button>
        )) || (
          <Button
            size="small"
            className={btnColorsContained[color]}
            onClick={onClick}
            onChange={onChange}
            disabled={disabled}
            href={href}
          >
            {label}
          </Button>
        )}
    </Fragment>
  );
}
export default Buttons;
