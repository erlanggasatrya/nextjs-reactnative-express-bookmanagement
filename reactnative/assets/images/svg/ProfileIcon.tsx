import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface IProfileProps {
  fill?: string;
  width?: number;
  height?: number;
}

const ProfileIcon: React.FC<IProfileProps> = ({
  fill = "#000",
  width = 24,
  height = 24,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 18" fill="none">
      <Path
        d="M9.5 16.5C5.35786 16.5 2 13.1421 2 9C2 4.85786 5.35786 1.5 9.5 1.5C13.6421 1.5 17 4.85786 17 9C17 13.1421 13.6421 16.5 9.5 16.5ZM9.5 15C12.8137 15 15.5 12.3137 15.5 9C15.5 5.68629 12.8137 3 9.5 3C6.18629 3 3.5 5.68629 3.5 9C3.5 12.3137 6.18629 15 9.5 15ZM5.75 9H7.25C7.25 10.2427 8.25733 11.25 9.5 11.25C10.7427 11.25 11.75 10.2427 11.75 9H13.25C13.25 11.071 11.571 12.75 9.5 12.75C7.42894 12.75 5.75 11.071 5.75 9Z"
        fill={fill}
      />
    </Svg>
  );
};

export default ProfileIcon;
