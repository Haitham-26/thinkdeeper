import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

type IconProps = FontAwesomeIconProps;

export const Icon: React.FC<IconProps> = (props) => {
  return <FontAwesomeIcon {...props} />;
};
