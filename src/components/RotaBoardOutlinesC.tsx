import { rotaOpposingSlotPairs } from "../core/rotaGame";
import { calcPosition } from "./RotaCircleC";

export interface RotaBoardOutlinesCProps {
    radius: number;
    colour: string;
    strokeWidth: number;
}
export function RotaBoardOutlinesC({
    radius,
    colour,
    strokeWidth,
}: RotaBoardOutlinesCProps): JSX.Element {
    return (
        <>
            <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={colour}
                fill="none"
                strokeWidth={strokeWidth}
            />
            <circle
                cx="50"
                cy="50"
                r={radius * 1.25}
                stroke={colour}
                fill="none"
                strokeWidth={strokeWidth}
            />
            {rotaOpposingSlotPairs.map(([ix1, ix2], keyIx) => (
                <line
                    key={keyIx}
                    x1={calcPosition(ix1, radius).x + 50}
                    y1={calcPosition(ix1, radius).y + 50}
                    x2={calcPosition(ix2, radius).x + 50}
                    y2={calcPosition(ix2, radius).y + 50}
                    stroke={colour}
                    strokeWidth={strokeWidth}
                />
            ))}
        </>
    );
}
