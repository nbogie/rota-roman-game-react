import {
    RotaBoard,
    ArcSlotId,
    SlotId,
    rotaOpposingSlotPairs,
    RotaSlot,
    getSlotById,
    PlayerMarker,
} from "./rotaGame";

//no ties are possible, unlike tictactoe
export type WinState =
    | { state: "unfinished" }
    | { state: "won"; winner: PlayerMarker };

export function calcWinState(rotaBoard: RotaBoard): WinState {
    const winningArcs: [ArcSlotId, ArcSlotId, ArcSlotId][] = [
        [0, 1, 2],
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7],
        [6, 7, 0],
        [7, 0, 1],
    ];
    const winningLines: [SlotId, SlotId, SlotId][] = rotaOpposingSlotPairs.map(
        ([a, b]) => [a, "centre", b]
    );

    const winningCombos: [RotaSlot, RotaSlot, RotaSlot][] = [
        ...winningLines,
        ...winningArcs,
    ].map(
        (ids) =>
            ids.map((id) => getSlotById(id, rotaBoard)) as [
                RotaSlot,
                RotaSlot,
                RotaSlot
            ]
    );

    function allSamePlayer([a, b, c]: [RotaSlot, RotaSlot, RotaSlot]): boolean {
        return (
            a.state === b.state && b.state === c.state && a.state !== "empty"
        );
    }

    const firstWinCombo = winningCombos.find(allSamePlayer);
    if (firstWinCombo) {
        return { state: "won", winner: firstWinCombo[0].state as PlayerMarker };
    } else {
        return { state: "unfinished" };
    }
}
