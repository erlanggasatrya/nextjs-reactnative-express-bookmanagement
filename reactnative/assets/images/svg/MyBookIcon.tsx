import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface IMyBookProps {
  fill?: string;
  width?: number;
  height?: number;
}

const MyBookIcon: React.FC<IMyBookProps> = ({
  fill = "#000",
  width = 24,
  height = 24,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 18" fill="none">
      <Path
        d="M10.3175 15H4.25V4.5H2.75V15C2.75 15.3978 2.90804 15.7794 3.18934 16.0607C3.47064 16.342 3.85218 16.5 4.25 16.5H10.8575C10.5817 16.0399 10.3982 15.5304 10.3175 15ZM14.75 1.5H11V5.25L9.5 4.125L8 5.25V1.5H7.25C6.85218 1.5 6.47064 1.65804 6.18934 1.93934C5.90804 2.22064 5.75 2.60218 5.75 3V12C5.75 12.3978 5.90804 12.7794 6.18934 13.0607C6.47064 13.342 6.85218 13.5 7.25 13.5H10.3175C10.4267 12.8532 10.676 12.2381 11.0479 11.6978C11.4198 11.1575 11.9054 10.705 12.4705 10.3721C13.0357 10.0392 13.6668 9.83378 14.3196 9.77037C14.9725 9.70696 15.6313 9.78704 16.25 10.005V3C16.25 2.60218 16.092 2.22064 15.8107 1.93934C15.5294 1.65804 15.1478 1.5 14.75 1.5ZM15.5 11.25V13.5H17.75V15H15.5V17.25H14V15H11.75V13.5H14V11.25H15.5Z"
        fill={fill}
      />
    </Svg>
  );
};

export default MyBookIcon;
