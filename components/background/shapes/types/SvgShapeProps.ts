import Point2D from "@/types/Point2D";
import { SVGProps } from "react";

export default interface SVGShapeProps<T> extends SVGProps<T> {
    position?: Point2D;
    originCoord?: Point2D;
}