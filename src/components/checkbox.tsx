import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function CheckBoxCmp(props) {
  const { label, onChange, checked, id } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          className="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          name={label}
          color="primary"
          size="small"
        />
      }
      label={label}
    />
  );
}
export default CheckBoxCmp;
