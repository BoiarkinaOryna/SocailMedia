import Svg, { Path } from "react-native-svg"

function SvgCross() {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
    >
      <Path
        d="M9.495 11.025L5.671 7.201l-3.825 3.824a1.082 1.082 0 11-1.53-1.53l3.825-3.824L.317 1.847a1.082 1.082 0 011.53-1.53L5.67 4.14 9.495.317a1.082 1.082 0 111.53 1.53L7.201 5.67l3.824 3.825a1.082 1.082 0 01-1.53 1.53z"
        fill="#000"
        fillOpacity={1}
      />
    </Svg>
  )
}

export default SvgCross
