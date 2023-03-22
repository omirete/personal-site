import Point2D from "@/types/Point2D";
import SVGShapeProps from "./types/SvgShapeProps";

const SvgGrid: React.FC<
    SVGShapeProps<SVGSVGElement> & { angle: number; spacing: number, width: number, height: number }
> = ({
    height,
    width,
    position,
    style,
    r,
    spacing,
    angle,
    originCoord,
    ...props
}) => {
    const frame_side = Math.max(width, height);
    const lines = Math.ceil(frame_side/spacing);

    return (
        <svg
            height={height}
            width={width}
            style={{
                position: "absolute",
                transformOrigin: `${width/2}px ${height/2}px`,
                left: `${(width/2)}px`,
                top: `${(height/2)}px`,
                transform: `${angle ? `rotate(${-angle}deg)` : ''}`,
                ...style,
            }}
            {...props}
        >
            {/* {[...Array(lines + 2).keys()].map((x, i) => {
                const pointInLine: Point2D = {
                    x: width * (i / (lines + 1)),
                    y: height * (i / (lines + 1)),
                };
                const m = Math.tan(((180 - angle) * 180) / Math.PI);
                const b = pointInLine.y - m * pointInLine.x;

                const y1 = 0;
                const x1 = (y1 - b) / m;
                const y2 = height;
                const x2 = (y2 - b) / m;
                return (
                    <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        // style={{ stroke: "rgb(255,0,0)", strokeWidth: 1 }}
                    />
                );
            })} */}
            {[...Array(lines).keys()].map((x, i) => {
                const x1 = -(frame_side-width)/2;
                const y1 = frame_side * ((i) / (lines + 1)) - (frame_side-height)/2;
                const x2 = width +(frame_side-width)/2;
                const y2 = frame_side * ((i) / (lines + 1));
                return (
                    <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                    />
                );
            })}
        </svg>
    );
};

export default SvgGrid;
