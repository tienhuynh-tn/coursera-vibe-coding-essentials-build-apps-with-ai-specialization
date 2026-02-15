"use client";

import { useEffect, useMemo, useReducer } from "react";

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GameState = {
  snake: Point[];
  food: Point;
  direction: Direction;
  isGameOver: boolean;
  isStarted: boolean;
  score: number;
  highScore: number;
};
type GameAction =
  | { type: "TURN"; direction: Direction }
  | { type: "TOGGLE_START" }
  | { type: "TICK" }
  | { type: "RESET" };

const GRID_SIZE = 20;
const TICK_MS = 130;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION: Direction = "RIGHT";
const INITIAL_FOOD: Point = { x: 12, y: 10 };

const DELTAS: Record<Direction, Point> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITES: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

function spawnFood(snake: Point[]): Point | null {
  const occupied = new Set(snake.map((segment) => `${segment.x}-${segment.y}`));
  const freeCells: Point[] = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (!occupied.has(`${x}-${y}`)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return null;
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)];
}

function makeInitialGameState(highScore = 0): GameState {
  return {
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: INITIAL_DIRECTION,
    isGameOver: false,
    isStarted: false,
    score: 0,
    highScore,
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === "TURN") {
    if (OPPOSITES[state.direction] === action.direction) {
      return state;
    }
    return {
      ...state,
      direction: action.direction,
      isStarted: true,
    };
  }

  if (action.type === "TOGGLE_START") {
    if (state.isGameOver) {
      return state;
    }
    return {
      ...state,
      isStarted: !state.isStarted,
    };
  }

  if (action.type === "RESET") {
    return makeInitialGameState(state.highScore);
  }

  if (action.type === "TICK") {
    if (!state.isStarted || state.isGameOver) {
      return state;
    }

    const head = state.snake[0];
    const nextHead = {
      x: head.x + DELTAS[state.direction].x,
      y: head.y + DELTAS[state.direction].y,
    };

    const hitsWall =
      nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE;
    const hitsSelf = state.snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

    if (hitsWall || hitsSelf) {
      return { ...state, isGameOver: true, isStarted: false };
    }

    const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
    const grownSnake = [nextHead, ...state.snake];
    const nextSnake = ateFood ? grownSnake : grownSnake.slice(0, -1);

    if (ateFood) {
      const nextScore = state.score + 1;
      const nextFood = spawnFood(nextSnake);
      return {
        ...state,
        snake: nextSnake,
        food: nextFood ?? state.food,
        score: nextScore,
        highScore: Math.max(state.highScore, nextScore),
        isGameOver: nextFood === null,
        isStarted: nextFood !== null,
      };
    }

    return { ...state, snake: nextSnake };
  }

  return state;
}

export default function Home() {
  const [game, dispatch] = useReducer(gameReducer, undefined, () => makeInitialGameState());
  const turn = (direction: Direction) => dispatch({ type: "TURN", direction });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const keyToDirection: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };
      const next = keyToDirection[event.key];
      if (!next) {
        return;
      }

      event.preventDefault();
      dispatch({ type: "TURN", direction: next });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!game.isStarted || game.isGameOver) {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch({ type: "TICK" });
    }, TICK_MS);

    return () => clearInterval(intervalId);
  }, [game.isStarted, game.isGameOver]);

  const cellMap = useMemo(() => {
    const map = new Map<string, "snake" | "food">();
    game.snake.forEach((segment) => map.set(`${segment.x}-${segment.y}`, "snake"));
    map.set(`${game.food.x}-${game.food.y}`, "food");
    return map;
  }, [game.snake, game.food]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950 px-4 text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight">Snake Game</h1>
      <div className="flex items-center gap-6 text-sm sm:text-base">
        <p>Score: {game.score}</p>
        <p>High Score: {game.highScore}</p>
      </div>

      <div
        className="grid rounded-lg border-2 border-slate-700 bg-slate-900 p-1 shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          width: 420,
          maxWidth: "90vw",
          aspectRatio: "1 / 1",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const cell = cellMap.get(`${x}-${y}`);
          const isHead = game.snake[0]?.x === x && game.snake[0]?.y === y;
          let cellClass = "bg-slate-800";
          if (cell === "food") {
            cellClass = "bg-rose-500";
          } else if (cell === "snake") {
            cellClass = isHead ? "bg-emerald-300" : "bg-emerald-500";
          }

          return (
            <div key={`${x}-${y}`} className={`${cellClass} border border-slate-900/40`}>
              {cell === "food" && <div className="h-full w-full rounded-sm border border-rose-200/80" />}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2" style={{ width: 180 }}>
        <div />
        <button
          type="button"
          aria-label="Move up"
          onClick={() => turn("UP")}
          className="rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-xl font-bold text-slate-100"
        >
          ↑
        </button>
        <div />
        <button
          type="button"
          aria-label="Move left"
          onClick={() => turn("LEFT")}
          className="rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-xl font-bold text-slate-100"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Move down"
          onClick={() => turn("DOWN")}
          className="rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-xl font-bold text-slate-100"
        >
          ↓
        </button>
        <button
          type="button"
          aria-label="Move right"
          onClick={() => turn("RIGHT")}
          className="rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-xl font-bold text-slate-100"
        >
          →
        </button>
      </div>

      <p className="text-center text-sm text-slate-300">Use arrow keys or tap arrow buttons to move.</p>

      {game.isGameOver && <p className="font-semibold text-rose-400">Game over. Press Restart to play again.</p>}

      <button
        type="button"
        onClick={() => {
          if (game.isGameOver) {
            dispatch({ type: "RESET" });
            return;
          }
          dispatch({ type: "TOGGLE_START" });
        }}
        className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400"
      >
        {game.isGameOver ? "Restart" : game.isStarted ? "Pause" : "Start"}
      </button>
    </main>
  );
}
