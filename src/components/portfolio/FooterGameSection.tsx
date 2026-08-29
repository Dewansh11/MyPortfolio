import { useState, useEffect, useRef, useCallback } from 'react'

const GRID_COLS = 24
const GRID_ROWS = 14
const TICK_MS = 175
const INITIAL_LENGTH = 3

type Point = { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const DIR_VECTORS: Record<Direction, Point> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
}

function buildInitialSnake(): Point[] {
  const midX = Math.floor(GRID_COLS / 2)
  const midY = Math.floor(GRID_ROWS / 2)
  return Array.from({ length: INITIAL_LENGTH }, (_, i) => ({ x: midX - i, y: midY }))
}

function pointsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y
}

function spawnFood(snake: Point[]): Point {
  const occupied = new Set(snake.map(s => `${s.x},${s.y}`))
  const open: Point[] = []
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLS; x++) {
      if (!occupied.has(`${x},${y}`)) open.push({ x, y })
    }
  }
  if (open.length === 0) return { x: 0, y: 0 }
  return open[Math.floor(Math.random() * open.length)]
}

function cellStyle(point: Point) {
  return {
    left: `${(point.x / GRID_COLS) * 100}%`,
    top: `${(point.y / GRID_ROWS) * 100}%`,
    width: `${100 / GRID_COLS}%`,
    height: `${100 / GRID_ROWS}%`,
  }
}

function SnakeArcade() {
  const [snake, setSnake] = useState<Point[]>(buildInitialSnake)
  const [food, setFood] = useState<Point>(() => spawnFood(buildInitialSnake()))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [foodSpin, setFoodSpin] = useState(45)

  const directionRef = useRef<Direction>('RIGHT')
  const pendingDirRef = useRef<Direction>('RIGHT')
  const foodRef = useRef(food)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    foodRef.current = food
  }, [food])

  const resetGame = useCallback(() => {
    const initial = buildInitialSnake()
    directionRef.current = 'RIGHT'
    pendingDirRef.current = 'RIGHT'
    setSnake(initial)
    setFood(spawnFood(initial))
    setScore(0)
    setGameOver(false)
    setFoodSpin(45)
    boardRef.current?.focus()
  }, [])

  useEffect(() => {
    if (gameOver) return

    const tick = window.setInterval(() => {
      directionRef.current = pendingDirRef.current
      const dir = DIR_VECTORS[directionRef.current]

      setSnake(prev => {
        const head = prev[0]
        const nextHead = { x: head.x + dir.x, y: head.y + dir.y }

        if (
          nextHead.x < 0 ||
          nextHead.x >= GRID_COLS ||
          nextHead.y < 0 ||
          nextHead.y >= GRID_ROWS
        ) {
          setGameOver(true)
          return prev
        }

        const currentFood = foodRef.current
        const willGrow = pointsEqual(nextHead, currentFood)
        const bodyToCheck = willGrow ? prev : prev.slice(0, -1)
        if (bodyToCheck.some(seg => pointsEqual(seg, nextHead))) {
          setGameOver(true)
          return prev
        }

        const nextSnake = [nextHead, ...prev]
        if (willGrow) {
          setScore(s => s + 1)
          const newFood = spawnFood(nextSnake)
          foodRef.current = newFood
          setFood(newFood)
          setFoodSpin(spin => (spin + 45) % 360)
        } else {
          nextSnake.pop()
        }

        return nextSnake
      })
    }, TICK_MS)

    return () => window.clearInterval(tick)
  }, [gameOver])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const keyMap: Partial<Record<string, Direction>> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      }

      if (gameOver) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          resetGame()
        }
        return
      }

      const next = keyMap[e.key]
      if (!next) return

      e.preventDefault()
      if (next === OPPOSITE[directionRef.current]) return
      pendingDirRef.current = next
    },
    [gameOver, resetGame],
  )

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <p className="shrink-0 border-b-2 border-black bg-white px-6 py-3 text-center font-mono text-xs font-black uppercase tracking-widest text-zinc-500">
        SYSTEM_CORE: ACTIVE // SCORE: {score}
      </p>

      <div
        ref={boardRef}
        role="application"
        tabIndex={0}
        aria-label="Snake game. Use arrow keys to move. Press Enter or Space to restart after game over."
        onKeyDown={handleKeyDown}
        className="relative min-h-0 flex-1 w-full overflow-hidden border-b-[3px] border-black bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] p-4 [background-size:16px_16px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
      >
        <p className="sr-only">
          Focus this board and use arrow keys to steer the snake toward the orange food block.
          {gameOver ? ' Game over. Press Enter or Space to play again.' : ''}
        </p>

        <div className="relative h-full w-full">
          {snake.map((segment, index) => (
            <div
              key={`${segment.x}-${segment.y}-${index}`}
              className="absolute box-border border-2 border-black bg-black"
              style={cellStyle(segment)}
              aria-hidden="true"
            />
          ))}

          <div className="absolute" style={cellStyle(food)} aria-hidden="true">
            <div
              className="h-full w-full border-2 border-black bg-orange-500"
              style={{ transform: `rotate(${foodSpin}deg)` }}
            />
          </div>
        </div>

        {gameOver && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/90"
            aria-live="polite"
          >
            <p className="border-[3px] border-black bg-yellow-400 px-5 py-3 font-mono text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              GAME OVER — PRESS ENTER
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FooterGameSection() {
  return (
    <section
      id="game-footer"
      className="relative flex h-dvh max-h-dvh w-full flex-col select-none overflow-hidden border-t-[3px] border-black bg-[#f6f8fa] snap-start"
    >
      <SnakeArcade />
    </section>
  )
}
