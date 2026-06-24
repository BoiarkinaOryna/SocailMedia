import { ICONS } from "../../icons";
import type { Href } from "expo-router";

export interface LinksProps {
    text: string;
    link?: Href;
    logo?: boolean;
    logoComponent?: React.JSX.Element;
    disabeled?: boolean;
    linePosition?: boolean; // top = true, bottom = false
}
