import { useEffect, useState } from "react";

const frame = 500
const width = 8;
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
]

const App = () => {
    const [currentColorArrangement, setColorArrangement] = useState([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);



    const checkOfColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const colorOfThree = [i, i + width, i + width * 2];
            const currentColor = currentColorArrangement[i];

            if (colorOfThree.every(colorId => currentColorArrangement[colorId] === currentColor)) {
                colorOfThree.forEach(colorId => currentColorArrangement[colorId] = "")
                return true;
            }
        }
        //if(colorOfThree.every(colorId => currentColorArrangement[colorId] === currentColor)){
        //    colorOfThree.forEach(colorId => setColorArrangement(prev => {
        //        const arrOfColors = [...prev];
        //        arrOfColors[colorId] = "Hello"
        //    }));
        //}
    }

    const checkOfRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const colorOfThree = [i, i + 1, i + 2];
            const currentColor = currentColorArrangement[i];
            const notValide = [5, 6, 13, 14, 21, 22, 29, 30, 37, 38, 45, 46, 53, 45, 61, 62];

            if (notValide.includes(i)) continue;

            if (colorOfThree.every(colorId => currentColorArrangement[colorId] === currentColor)) {
                colorOfThree.forEach(colorId => currentColorArrangement[colorId] = "")
                return true
            }
        }
    }

    const checkOfRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const colorOfFour = [i, i + 1, i + 2, i + 3];
            const currentColor = currentColorArrangement[i];
            const notValide = [4, 5, 6, 12, 13, 14, 20, 21, 22, 28, 29, 30, 36, 37, 38, 44, 45, 46, 52, 53, 45, 60, 61, 62];

            if (notValide.includes(i)) continue;

            if (colorOfFour.every(colorId => currentColorArrangement[colorId] === currentColor)) {
                colorOfFour.forEach(colorId => currentColorArrangement[colorId] = "")
                return true
            }
        }
    }

    const checkOfColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const colorOfFour = [i, i + width, i + width * 2, i + width * 3];
            const currentColor = currentColorArrangement[i];

            if (colorOfFour.every(colorId => currentColorArrangement[colorId] === currentColor)) {
                colorOfFour.forEach(colorId => currentColorArrangement[colorId] = "")
                return true
            }
        }
    }

    const createBoard = () => {
        const randomColorArrangement = [];

        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }
        setColorArrangement(randomColorArrangement);
    }

    const moveIntoSquareBelow = () => {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

        for (let i = 0; i <= 55; i++) {
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentColorArrangement[i] === '') {
                const colorNumber = Math.floor(Math.random() * candyColors.length);
                currentColorArrangement[i] = candyColors[colorNumber];
            }

            if (currentColorArrangement[i + width] === '') {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = '';
            }
        }
    }

    const dragStart = (e) => {
        setSquareBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }


    const dragEnd = (e) => {
        //get the ID of current pictures
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

        //change the colors
        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor;
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor;

        //valid moves are up,down,left,right
        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width,
            squareBeingDraggedId - width
        ]
        const isAColumnOfFour = checkOfColumnOfFour();
        const isAColumnOfThree = checkOfColumnOfThree();
        const isARowOfThree = checkOfRowOfThree();
        const isARowOfFour = checkOfRowOfFour();
        
        const isValidMove = validMoves.includes(squareBeingReplacedId);
        console.log(isValidMove)
        
        if (squareBeingReplacedId && isValidMove && 
            (isAColumnOfFour || isAColumnOfThree || isARowOfThree || isARowOfFour)) {
            //set to default
            setSquareBeingDragged(null);
            setSquareBeingReplaced(null)
        }else{
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor;
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor;
            setColorArrangement([...currentColorArrangement])
        }
    }


    useEffect(() => {
        createBoard();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkOfColumnOfFour();
            checkOfRowOfFour();
            checkOfColumnOfThree();
            checkOfRowOfThree();
            moveIntoSquareBelow()

            setColorArrangement([...currentColorArrangement]);
        }, frame);


        return () => clearInterval(timer)
    }, [checkOfColumnOfFour, checkOfRowOfThree, checkOfColumnOfThree, checkOfRowOfFour, moveIntoSquareBelow, currentColorArrangement])




    return (
        <div className="app">
            <div className="game">
                {currentColorArrangement.map((color, index) => (
                    <img
                        key={index}
                        style={{ backgroundColor: color }}
                        alt={color}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
