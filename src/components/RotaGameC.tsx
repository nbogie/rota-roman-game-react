import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import {
    handleClickRotaSlot,
    isSlotSelected,
    makeEmptyBoard,
    RotaBoard,
    RotaSlot,
    RotaSlotState,
    SlotId,
} from "../core/rotaGame";

export function RotaGameC() {
    const [rotaBoard, setRotaBoard] = useImmer(makeEmptyBoard());

    function handleClickOnSlot(slotId: SlotId): void {
        toast("clicked slot: " + slotId);
        setRotaBoard(handleClickRotaSlot(slotId));
    }

    const slotPairs = [
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
    ];

    const radius = 45;
    const holeRadius = 2;
    type SlotColour = "beige" | "red" | "blue";

    function colourForSlotState(state: RotaSlotState): SlotColour {
        const lookup: Record<RotaSlotState, SlotColour> = {
            empty: "beige",
            p1: "red",
            p2: "blue",
        };
        return lookup[state];
    }

    return (
        <div className="game">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
                {rotaBoard.outer.map((slot, ix) => (
                    <circle
                        key={ix}
                        cx={calcPosition(ix, radius).x + 50}
                        cy={calcPosition(ix, radius).y + 50}
                        r={
                            holeRadius *
                            (isSlotSelected(slot, rotaBoard) ? 1.5 : 1)
                        }
                        stroke={
                            isSlotSelected(slot, rotaBoard) ? "white" : "black"
                        }
                        fill={colourForSlotState(slot.state)}
                        strokeWidth="1"
                        onClick={() => handleClickOnSlot(ix as SlotId)}
                    />
                ))}
                <circle
                    cx={50}
                    cy={50}
                    r={holeRadius}
                    stroke="black"
                    fill={colourForSlotState(rotaBoard.centre.state)}
                    strokeWidth="1"
                    onClick={() => handleClickOnSlot("centre")}
                />
            </svg>
        </div>
    );
}
export interface Position {
    x: number;
    y: number;
}

export function calcPosition(ix: number, radius: number): Position {
    const angle = (ix * Math.PI) / 4;
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}
