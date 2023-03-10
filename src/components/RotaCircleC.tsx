import {
    isSlotSelected,
    RotaBoard,
    RotaSlot,
    RotaSlotState,
    SlotId,
} from "../core/rotaGame";

interface RotaCircleCProps {
    radius: number;
    holeRadius: number;
    slot: RotaSlot;
    rotaBoard: RotaBoard;
    strokeColour: string;
    strokeWidth: number;
    onClick: (slotId: SlotId) => void;
}

export function RotaCircleC({
    radius,
    holeRadius,
    slot,
    rotaBoard,
    strokeColour,
    strokeWidth,
    onClick,
}: RotaCircleCProps): JSX.Element {
    const pos =
        slot.id === "centre" ? { x: 0, y: 0 } : calcPosition(slot.id, radius);
    return (
        <circle
            key={slot.id}
            cx={pos.x + 50}
            cy={pos.y + 50}
            r={holeRadius * (isSlotSelected(slot, rotaBoard) ? 1.5 : 1)}
            stroke={isSlotSelected(slot, rotaBoard) ? "white" : strokeColour}
            fill={colourForSlotState(slot.state)}
            strokeWidth={strokeWidth}
            onClick={() => onClick(slot.id)}
        />
    );
}

export type SlotColour = "beige" | "tomato" | "steelblue";

export function colourForSlotState(state: RotaSlotState): SlotColour {
    const lookup: Record<RotaSlotState, SlotColour> = {
        empty: "beige",
        p1: "tomato",
        p2: "steelblue",
    };
    return lookup[state];
}

export interface Position {
    x: number;
    y: number;
}

export function calcPosition(ix: number, radius: number): Position {
    const angle = (ix * Math.PI) / 4;
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}
