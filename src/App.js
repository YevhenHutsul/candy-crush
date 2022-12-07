import { useEffect, useState } from "react";

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

    const checkOfColumnOfThree = () =>{
        for(let i = 0; i < 48; i++){
            const colorOfThree = [i, i + width, i + width * 2];
            const currentColor = currentColorArrangement[i];

            if(colorOfThree.every(colorId => currentColorArrangement[colorId] === currentColor)){
                colorOfThree.forEach(colorId => currentColorArrangement[colorId] = "")
            }
        }
            //if(colorOfThree.every(colorId => currentColorArrangement[colorId] === currentColor)){
            //    colorOfThree.forEach(colorId => setColorArrangement(prev => {
            //        const arrOfColors = [...prev];
            //        arrOfColors[colorId] = "Hello"
            //    }));
            //}
    }

    const createBoard = () => {
        const randomColorArrangement = [];

        for(let i = 0; i < width * width; i++){
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }
        setColorArrangement(randomColorArrangement);
    }
    
    useEffect(() => {
        createBoard();
    }, [])
    
    useEffect(() => {
        const timer = setInterval(()=> {
            checkOfColumnOfThree();
            setColorArrangement([...currentColorArrangement]);
        },100);
        

        return () => clearInterval(timer)
    }, [checkOfColumnOfThree,currentColorArrangement])
    

    return (
        <div className="app">
            <div className="game">
                {currentColorArrangement.map((color, index) => (
                    <img
                        key={index}
                        style={{backgroundColor:color}}
                        alt={color}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
