"use client";
import party from "party-js";

const ButtonConfetti: React.FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ onClick, ...props }) => {
    return (
        <button
            onClick={(e) => {
                party.confetti(e.target as HTMLButtonElement, {
                    count: party.variation.range(20, 40),
                });
                if (onClick) {
                    onClick(e);
                }
            }}
            {...props}
        />
    );
};

export default ButtonConfetti;
