import "./App.css";
function App() {
    return (
        <div className="App">
            <RotaGame />
        </div>
    );
}

export default App;

interface Position {
    x: number;
    y: number;
}

type RotaSlotState = "p1" | "p2" | "empty";

interface RotaSlot {
    state: RotaSlotState;
}

interface RotaBoard {
    outer: RotaSlot[];
    centre: RotaSlot;
}

function randomState(): RotaSlotState {
    return pick(["p1", "p2", "empty"]);
}

function makeRandomBoard(): RotaBoard {
    const outer: RotaSlot[] = [];
    for (let i = 0; i < 8; i++) {
        const slot: RotaSlot = { state: randomState() };
        outer.push(slot);
    }
    const centre: RotaSlot = { state: randomState() };
    return { outer, centre };
}

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function calcPosition(ix: number, radius: number): Position {
    const angle = (ix * Math.PI) / 4;
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}
function RotaGame() {
    const rotaBoard: RotaBoard = makeRandomBoard();

    const slotPairs = [
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
    ];

    const radius = 45;
    const holeRadius = 2;
    type SlotColour = "none" | "red" | "blue";
    function colourForSlotState(state: RotaSlotState): SlotColour {
        const lookup: Record<RotaSlotState, SlotColour> = {
            empty: "none",
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
                    stroke-width="1"
                />
                {slotPairs.map(([ix1, ix2]) => (
                    <line
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
                        r={holeRadius}
                        stroke="black"
                        fill={colourForSlotState(slot.state)}
                        stroke-width="1"
                        onClick={() => console.log("clicked: ", ix)}
                    />
                ))}
                <circle
                    cx={50}
                    cy={50}
                    r={holeRadius}
                    stroke="black"
                    fill={colourForSlotState(rotaBoard.centre.state)}
                    stroke-width="1"
                    onClick={() => console.log("clicked centre")}
                />
            </svg>
        </div>
    );
}
