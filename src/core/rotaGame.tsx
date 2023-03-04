export interface RotaBoard {
    nextPlayer: PlayerMarker;
    outer: RotaSlot[];
    centre: RotaSlot;
    selectedSlot: RotaSlot | null;
}

export interface RotaSlot {
    state: RotaSlotState;
    id: SlotId;
}

export type PlayerMarker = "p1" | "p2";
export type RotaSlotState = PlayerMarker | "empty";
export type SlotId = "centre" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function makeEmptyBoard(): RotaBoard {
    const outer: RotaSlot[] = [];
    for (let i = 0; i < 8; i++) {
        const slot: RotaSlot = { state: "empty", id: i as SlotId };
        outer.push(slot);
    }
    const centre: RotaSlot = { state: "empty", id: "centre" };
    return { outer, centre, nextPlayer: "p1", selectedSlot: null };
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function allPieces(rotaBoard: RotaBoard): RotaSlot[] {
    return [...rotaBoard.outer, rotaBoard.centre];
}

export function calcNextPlayer(rotaBoard: RotaBoard): PlayerMarker {
    return rotaBoard.nextPlayer;
}

export function getSlotById(slotId: SlotId, board: RotaBoard): RotaSlot {
    if (slotId === "centre") {
        return board.centre;
    } else {
        return board.outer[slotId];
    }
}

export function togglePlayerTurn(rotaBoard: RotaBoard): void {
    rotaBoard.nextPlayer = rotaBoard.nextPlayer === "p1" ? "p2" : "p1";
}

export function handleClickRotaSlot(slotId: SlotId) {
    return (draft: RotaBoard) => {
        const nextPlayer = calcNextPlayer(draft);
        const slot = getSlotById(slotId, draft);
        if (slot.state === "empty") {
            slot.state = nextPlayer;
            togglePlayerTurn(draft);
        }
    };
}

export function countOf(playerMarker: PlayerMarker, board: RotaBoard): number {
    return piecesOf(playerMarker, board).length;
}

export function piecesOf(
    playerMarker: PlayerMarker,
    board: RotaBoard
): RotaSlot[] {
    return allPieces(board).filter((p) => p.state === playerMarker);
}
