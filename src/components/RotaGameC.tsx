import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { handleClickRotaSlot, makeEmptyBoard, SlotId } from "../core/rotaGame";
import { RotaBoardOutlinesC } from "./RotaBoardOutlinesC";
import { RotaCircle } from "./RotaCircle";

export function RotaGameC() {
    const [rotaBoard, setRotaBoard] = useImmer(makeEmptyBoard());

    function handleClickOnSlot(slotId: SlotId): void {
        toast("clicked slot: " + slotId);
        setRotaBoard(handleClickRotaSlot(slotId));
    }

    const radius = 42;
    const holeRadius = 7;

    return (
        <div className="game">
            <h1>Rota / Terni Lapilli</h1>
            <h2>To play: {rotaBoard.currentPlayer}</h2>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <RotaBoardOutlinesC radius={radius} rotaBoard={rotaBoard} />

                {rotaBoard.outer.map((slot, ix) => (
                    <RotaCircle
                        radius={radius}
                        holeRadius={holeRadius}
                        slot={slot}
                        rotaBoard={rotaBoard}
                        onClick={handleClickOnSlot}
                    />
                ))}
                {/* Centre circle */}
                <RotaCircle
                    radius={radius}
                    holeRadius={holeRadius}
                    slot={rotaBoard.centre}
                    rotaBoard={rotaBoard}
                    onClick={handleClickOnSlot}
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
