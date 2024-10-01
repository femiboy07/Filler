import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import Modal from 'react-modal'

interface directionProps {
    x: number;
    y: number;
    steps: number;
    setSteps: React.Dispatch<SetStateAction<number>>;
    restartGame: () => void;
    maxSteps: number
    currentPosition: { x: number, y: number };
    setCurrentPosition: React.Dispatch<SetStateAction<{ x: number, y: number }>>;
    maxPosition: { x: number, y: number };
    gridSize: number;
    change: { up: number | null, down: number | null, left: number | null, right: number | null } | null;
    board: number[][];
    maxReached: boolean;
    setMaxReached: React.Dispatch<SetStateAction<boolean>>;
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
}


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '455555555555555555555555'
    },
};

export const Directions: React.FC<directionProps> = ({ gridSize, setCurrentPosition, setMaxReached, board, currentPosition, maxReached, maxPosition, setIsModalOpen, restartGame, steps, maxSteps, setSteps }) => {
    const [moveAmount, setMoveAmount] = useState(1);
    const [hint, setHint] = useState('');
    const [isOpenHint, setIsOpenHint] = useState(false)

    const displayGraph = useCallback(() => {
        setIsModalOpen(true);
        alert('Congratulations! You found the maximum value!');
    }, [setIsModalOpen]);

    function Move(direction: string) {

        setCurrentPosition((prevPosition) => {
            let newX = prevPosition.x;
            let newY = prevPosition.y;

            switch (direction) {
                case 'up':
                    if (newY - moveAmount < 0) {
                        alert("You can't move that many gridblocks up!");
                        return prevPosition; // Return the previous position without any changes
                    }
                    newY -= moveAmount;
                    break;

                case 'down':
                    if (newY + moveAmount >= gridSize) {
                        alert("You can't move that many gridblocks down!");
                        return prevPosition;
                    }
                    newY += moveAmount;
                    break;

                case 'left':
                    if (newX - moveAmount < 0) {
                        alert("You can't move that many gridblocks left!");
                        return prevPosition;
                    }
                    newX -= moveAmount;
                    break;

                case 'right':
                    if (newX + moveAmount >= gridSize) {
                        alert("You can't move that many gridblocks right!");
                        return prevPosition;
                    }
                    newX += moveAmount;
                    break;

                default:
                    return prevPosition;
            }

            setSteps((prev) => prev + 1);
            checkWarnings()

            if (newX === maxPosition.x && newY === maxPosition.y) {
                if (!maxReached) {

                    setMaxReached(true);
                    displayGraph();
                }
            }
            // Update the position with the new values
            return { x: newX, y: newY };
        });

    }

    const checkWarnings = useCallback(() => {
        if (steps >= maxSteps) {
            alert("You've reached the maximum number of steps! Game Over!");
            restartGame()
        }
    }, [maxSteps, restartGame, steps])

    useEffect(() => {
        checkWarnings()
    }, [checkWarnings])

    const showHint = useCallback(() => {
        const { x, y } = currentPosition;
        let steepestSlope = -Infinity;
        let bestDirection = '';

        if (x > 0 && board[y - 1][x] - board[y][x] > steepestSlope) {
            steepestSlope = board[y - 1][x] - board[y][x];
            bestDirection = 'Up';
        }
        if (y < gridSize - 1 && board[y + 1][x] - board[y][x] > steepestSlope) {
            steepestSlope = board[y + 1][x] - board[y][x];
            bestDirection = 'Down';
        }
        if (x > 0 && board[y][x - 1] - board[y][x] > steepestSlope) {
            steepestSlope = board[y][x - 1] - board[y][x];
            bestDirection = 'Left';
        }
        if (x < gridSize - 1 && board[y][x + 1] - board[y][x] > steepestSlope) {
            steepestSlope = board[y][x + 1] - board[y][x];
            bestDirection = 'Right';
        }

        setHint(`Best direction to move: ${bestDirection}`)

        // hint = `Best direction to move: ${bestDirection}`;
        // document.getElementById('hint').textContent = hint;
    }, [board, currentPosition, gridSize]);

    const closeHint = () => {
        setIsOpenHint(false);
    }

    useEffect(() => {
        if (isOpenHint) {
            showHint()
        }
    }, [showHint, isOpenHint])


    return (
        <div className="w-full flex items-center h-full relative justify-between">
            <div className=" flex-grow-0 flex items-center h-full ml-5">
                <div className="ml-5">
                    <label htmlFor="amountNumber" className="text-black font-bold">No of steps</label>
                    <input id="amountNumber" type="number" max={4} min={1} placeholder="Steps" value={moveAmount} className="w-full text-black border rounded-md  py-5 pl-7 " onChange={(e) => setMoveAmount(e.target.valueAsNumber)} />
                </div>
                <div className="grid grid-cols-3 grid-rows-3 gap-5 relative  rounded-full  bg-white w-24 md:w-52 h-full  ">
                    <button style={{ color: 'white' }} className="  border-none outline-none focus:outline-none col-start-2 row-start-1 flex justify-center items-center  button-1-up bg-transparent text-white " onClick={() => Move("up")}>
                        {/* <span className=" flex  text-black">{change && change.up || null}</span> */}
                    </button>
                    <button className="  button-1-left bg-transparent border-none col-start-1 col-end-1 row-start-2 " onClick={() => Move("left")} >
                        {/* {change && change.left || null} */}
                    </button>
                    <button className=" button-1-right bg-transparent border-none col-start-3 row-start-2 " onClick={() => Move("right")}></button>
                    <button className=" button-1-down bg-transparent border-none col-start-2 col-end-2 row-start-3 " onClick={() => Move("down")}></button>
                </div>
            </div>
            {/* <div className="ml-auto fixed  gap-3  border">
                <span className="text-white">up:{change && change.up || null}</span>
                <span className="text-white">down:{change && change.down || null}</span>
                <span className="text-white">left:{change && change.left || null}</span>
                <span className="text-white">right:{change && change.right || null}</span>
            </div> */}
            {/* <div className="absolute top-0 left-1/2 text-[1rem] font-bold -translate-x-1/2 flex justify-center   text-black">
                <h2>Steps:</h2>
                <p>{steps}</p>
            </div> */}
            <div className="md:flex gap-2 text-black ml-auto md:space-y-0 space-y-2 flex-wrap pl-5 ">
                <button onClick={() => restartGame()} className=" md:p-5 p-2">restartGame</button>
                <button onClick={() => setIsOpenHint(true)} className="md:p-5 p-2"> get Hint</button>
            </div>

            <Modal isOpen={isOpenHint} onRequestClose={closeHint} style={customStyles} >
                <div className="w-full relative flex flex-col items-center justify-center">
                    <p>{hint}</p>
                    <button className="text-center p-2 " disabled={!board} onClick={closeHint}>close</button>
                </div>
            </Modal>
        </div>
    )
} 