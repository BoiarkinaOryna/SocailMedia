import Svg, { Path } from "react-native-svg"

function SvgReturn() {
  return (
    <Svg
      width={8}
      height={13}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.981 12.297a.992.992 0 01-1.402 0L.29 7.007a.992.992 0 010-1.401L5.58.316a.992.992 0 111.402 1.402L2.392 6.307l4.59 4.589a.992.992 0 010 1.401z"
      />
    </Svg>
  )
}

export default SvgReturn
