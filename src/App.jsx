import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./logic/board"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  
  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {

    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) 

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)


    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset del Juego</button>
        <section className="game">
          {
            board.map((square, index) => {
              return (
                <Square 
                  key={index} 
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>
        <section className="turn">
            <Square isSelected={turn === TURNS.X}>
              {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O}>
              {TURNS.O}
            </Square>
        </section>
        {
          winner != null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner == false
                    ? 'Empate'
                    : 'Ganó: '
                  }
                </h2>
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>
                    Empezar de nuevo
                  </button>
                </footer>
              </div>
            </section>
          )
        }
      </main>
    </>
  )
}

export default App;
