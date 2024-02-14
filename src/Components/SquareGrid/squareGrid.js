
const SquareGrid = ({ gridSize, startGame, hoveredSquare, setHoveredSquare }) => {

    const handleSquareHover = (index) => {
        const isReusedIndex = hoveredSquare.some(item => item === index);
        if (!isReusedIndex) {
            setHoveredSquare((hoveredSquare) => [...hoveredSquare, index]);
        } else {
            setHoveredSquare((hoveredSquare) => hoveredSquare.filter(value => value !== index));
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: 'fit-content' }}>
            {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        width: '40px',
                        boxSizing: 'border-box',
                        border: '1px solid black',
                        height: '40px',
                        background: hoveredSquare.some(item => item === index) ? '#FFFF00' : '#0000FF'
                    }}
                    onMouseEnter={startGame ? () => handleSquareHover(index) : () => {}}
                />
            ))}
        </div>
    );
}

export default SquareGrid;
