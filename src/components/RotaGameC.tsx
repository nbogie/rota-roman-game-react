import { useImmer } from "use-immer";
import { handleClickRotaSlot, makeEmptyBoard, SlotId } from "../core/rotaGame";
import { RotaBoardOutlinesC } from "./RotaBoardOutlinesC";
import { RotaCircleC } from "./RotaCircleC";
import { WinStateC } from "./WinStateC";

export function RotaGameC() {
    const [rotaBoard, setRotaBoard] = useImmer(makeEmptyBoard());

    function handleClickOnSlot(slotId: SlotId): void {
        setRotaBoard(handleClickRotaSlot(slotId));
    }

    const radius = 42;
    const holeRadius = 7;

    return (
        <div className="game">
            <h1>Rota / Terni Lapilli</h1>
            <WinStateC rotaBoard={rotaBoard} />

            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <RotaBoardOutlinesC radius={radius} />

                {rotaBoard.outer.map((slot, ix) => (
                    <RotaCircleC
                        radius={radius}
                        holeRadius={holeRadius}
                        slot={slot}
                        rotaBoard={rotaBoard}
                        onClick={handleClickOnSlot}
                    />
                ))}
                {/* Centre circle */}
                <RotaCircleC
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
