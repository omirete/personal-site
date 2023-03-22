import SVGShapeProps from "./types/SvgShapeProps";

const SvgCircle: React.FC<SVGShapeProps<SVGSVGElement>> = ({
    height,
    width,
    position,
    style,
    r,
    originCoord,
    ...props
}) => {
    return (
        <svg
            height={Number(r) * 2}
            width={Number(r) * 2}
            style={{
                position: "absolute",
                transformOrigin: `${originCoord?.x}px ${originCoord?.y}px`,
                left: `${(position?.x ?? 0) - (originCoord?.x ?? 0)}px`,
                top: `${(position?.y ?? 0) - (originCoord?.y ?? 0)}px`,
                ...style,
            }}
            {...props}
        >
            <circle cx={r} cy={r} r={r} />
        </svg>
    );
};

export default SvgCircle;
