import SVGShapeProps from "./types/SvgShapeProps";

const SvgTriangle: React.FC<SVGShapeProps<SVGSVGElement>> = ({
    height,
    width,
    position,
    originCoord,
    style,
    rotate,
    ...props
}) => {
    return (
        <svg
            height={86.6025}
            width={100}
            style={{
                ...style,
                position: "absolute",
                transformOrigin: `${originCoord?.x}px ${originCoord?.y}px`,
                transform: `${rotate ? `rotate(${rotate})` : ''}`,
                left: `${(position?.x ?? 0) - (originCoord?.x ?? 0)}px`,
                top: `${(position?.y ?? 0) - (originCoord?.y ?? 0)}px`,
            }}
            {...props}
        >
            <polygon points={`0,0 100,0 50,86.6025`} />
        </svg>
    );
};

export default SvgTriangle;
