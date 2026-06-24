import Svg, { Path } from "react-native-svg"

function SvgOpenMenu() {
  return (
    <Svg
      width={13}
      height={8}
      viewBox="0 0 13 8"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.297.316a.992.992 0 010 1.402l-5.29 5.29a.992.992 0 01-1.401 0l-5.29-5.29A.992.992 0 111.718.316l4.589 4.589 4.589-4.59a.992.992 0 011.401 0z"
      />
    </Svg>
  )
}

export default SvgOpenMenu
