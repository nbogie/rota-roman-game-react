import { calcWinState, RotaBoard } from "../core/rotaGame";

export function WinState({ rotaBoard }: { rotaBoard: RotaBoard }): JSX.Element {
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
