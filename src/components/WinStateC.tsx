import { RotaBoard } from "../core/rotaGame";
import { calcWinState } from "../core/calcWinState";

export function WinStateC({
    rotaBoard,
}: {
    rotaBoard: RotaBoard;
}): JSX.Element {
    const winState = calcWinState(rotaBoard);
    return (
        <h2>
            {winState.state === "unfinished" ? (
                <>To play: {rotaBoard.currentPlayer}</>
            ) : (
                <>Game Over: {winState.winner} won!</>
            )}
        </h2>
    );
}
