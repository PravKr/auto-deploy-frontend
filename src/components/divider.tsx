import React from "react";
import Divider from "@material-ui/core/Divider";
function Divide(props) {
  const { orientation, flexItem } = props;
  return <Divider orientation={orientation} flexItem={flexItem} />;
}
export default Divide;
