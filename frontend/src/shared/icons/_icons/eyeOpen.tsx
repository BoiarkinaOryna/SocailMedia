import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"

function SvgEyeOpen() {
  return (
    <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
  >
    <G clipPath="url(#clip0_15022_3488)">
      <Path
        d="M1.66602 10.0001C1.66602 10.0001 4.16602 4.16675 9.99935 4.16675C15.8327 4.16675 18.3327 10.0001 18.3327 10.0001C18.3327 10.0001 15.8327 15.8334 9.99935 15.8334C4.16602 15.8334 1.66602 10.0001 1.66602 10.0001Z"
        stroke="#543C52"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99935 12.5001C11.3801 12.5001 12.4993 11.3808 12.4993 10.0001C12.4993 8.61937 11.3801 7.50008 9.99935 7.50008C8.61864 7.50008 7.49935 8.61937 7.49935 10.0001C7.49935 11.3808 8.61864 12.5001 9.99935 12.5001Z"
        stroke="#543C52"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_15022_3488">
        <Rect
          width={20}
          height={20}
          fill="white"
        />
      </ClipPath>
    </Defs>
  </Svg>
  )
}

export default SvgEyeOpen
