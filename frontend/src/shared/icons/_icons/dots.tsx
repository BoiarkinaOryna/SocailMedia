import Svg, { Path } from "react-native-svg"

function SvgDots() {
  return (
    <Svg
      width={5}
      height={17}
      viewBox="0 0 5 17"
    >
      <Path
        d="M4.375 8.438a2.187 2.187 0 11-4.375 0 2.187 2.187 0 014.375 0zM2.187 4.375a2.187 2.187 0 100-4.375 2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.374 2.187 2.187 0 000-4.374z"
      />
    </Svg>
  )
}

export default SvgDots
