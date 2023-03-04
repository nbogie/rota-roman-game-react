export interface RotaBoard {
    currentPlayer: PlayerMarker;
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
    return { outer, centre, currentPlayer: "p1", selectedSlot: null };
}

export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function allPieces(rotaBoard: RotaBoard): RotaSlot[] {
    return [...rotaBoard.outer, rotaBoard.centre];
}

export function currentPlayer(rotaBoard: RotaBoard): PlayerMarker {
    return rotaBoard.currentPlayer;
}

export function getSlotById(slotId: SlotId, board: RotaBoard): RotaSlot {
    if (slotId === "centre") {
        return board.centre;
    } else {
        return board.outer[slotId];
    }
}

export function togglePlayerTurn(rotaBoard: RotaBoard): void {
    rotaBoard.currentPlayer = rotaBoard.currentPlayer === "p1" ? "p2" : "p1";
    rotaBoard.selectedSlot = null;
}

export function handleClickRotaSlot(slotId: SlotId) {
    return (draft: RotaBoard) => {
        const currentP = currentPlayer(draft);
        const slot = getSlotById(slotId, draft);

        //first three moves are always to be placements not moves
        if (countOf(currentP, draft) < 3) {
            if (slot.state === "empty") {
                slot.state = currentP;
                togglePlayerTurn(draft);
            }
            //else, it's a later move
        } else {
            if (slot.state === "empty") {
                if (draft.selectedSlot?.state === currentP) {
                    //TODO: check we are allowed to move from-to
                    moveFromTo(draft.selectedSlot.id, slot.id, draft);
                    draft.selectedSlot = null;
                    togglePlayerTurn(draft);
                }
                //else it's not an empty cell
            } else {
                if (slot.state === currentP) {
                    draft.selectedSlot = slot;
                }
            }
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

export function isSlotSelected(slot: RotaSlot, rotaBoard: RotaBoard): boolean {
    return rotaBoard.selectedSlot?.id === slot.id;
}
function moveFromTo(id1: SlotId, id2: SlotId, board: RotaBoard) {
    const [fromSlot, toSlot] = [id1, id2].map((id) => getSlotById(id, board));
    toSlot.state = fromSlot.state;
    fromSlot.state = "empty";
}
