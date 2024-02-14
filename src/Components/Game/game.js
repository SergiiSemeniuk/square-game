import { useState } from 'react';
import { useGame } from '../../talons/useGame';
import styles from './game.module.css';
import SquareGrid from '../SquareGrid/squareGrid';


const Game = () => {
    const { data } = useGame();
    const [gridSize, setGridSize] = useState(0);
    const [startGame, setStartGame] = useState(false);
    const [hoveredSquare, setHoveredSquare] = useState([]);

    const handleChange = (value) => {
        setGridSize(value);
        setStartGame(false);
        setHoveredSquare([]);
    };

    const handleStart = () => {
        if(!startGame && gridSize > 0) {
            setStartGame(true);
        } else {
            setHoveredSquare([]);
        }
    };

    const hoverSquares = hoveredSquare.slice().sort((a, b) => a - b).map(item => {
        const hovered = (item + 1) < gridSize
            ? `row 1 col ${item + 1}`
            : `row ${Math.ceil((item + 1) / gridSize)} col ${(item + 1) - (Math.ceil((item + 1) / gridSize) - 1) * gridSize}`
        return <p key={item}>{hovered}</p>
    })

    const options = data ? data?.map(item => {
        return (
            <option key={item.id} value={item.field}>{item.name}</option>
        )
    }) : [];

    const selectOptions = [ <option key={0} value={null}>Pick mode</option> , ...options ];

    return (
        <div className={styles.game}>
            <div className={styles.wrapper}>
                <div className={styles.gridContainer}>
                    <span>
                        <select onChange={e => handleChange(e.target.value)}>
                            {selectOptions}
                        </select>
                        <button onClick={handleStart}>
                            {startGame ? (
                                <>RESET</>
                            ) : (
                                <>START</>
                            )}
                        </button>
                    </span>
                    <div className={styles.gameField}>
                        {gridSize ? (
                            <SquareGrid gridSize={gridSize} startGame={startGame} hoveredSquare={hoveredSquare} setHoveredSquare={setHoveredSquare} />
                        ) : null}
                    </div>
                </div>
                <div className={styles.hoverSquaresContainer}>
                    <h3>Hover squares</h3>
                    <div className={styles.hoverSquares}>
                        {hoverSquares}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
