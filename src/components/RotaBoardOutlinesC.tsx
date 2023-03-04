import { RotaBoard } from "../core/rotaGame";
import { calcPosition } from "./RotaGameC";

export interface RotaBoardOutlinesCProps {
    radius: number;
    rotaBoard: RotaBoard;
}
export function RotaBoardOutlinesC({
    radius,
    rotaBoard,
}: RotaBoardOutlinesCProps): JSX.Element {
    const slotPairs = [
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
    ];

    return (
        <>
            <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="black"
                fill="none"
                strokeWidth="1"
            />
            {slotPairs.map(([ix1, ix2], keyIx) => (
                <line
                    key={keyIx}
                    x1={calcPosition(ix1, radius).x + 50}
                    y1={calcPosition(ix1, radius).y + 50}
                    x2={calcPosition(ix2, radius).x + 50}
                    y2={calcPosition(ix2, radius).y + 50}
                    stroke="black"
                />
            ))}
        </>
    );
}
