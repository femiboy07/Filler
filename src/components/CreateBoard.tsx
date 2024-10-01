import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { GameBoard } from "./GameBoard";
import PlotlyWrapper from "./Plotly";
import { Directions } from "./Directions";
import SelectGridSize from "./SelectGridSize";
import ModalPloty from "./ModalPloty";

interface createBoardProps {
    startGame: boolean;
    setGridSize: React.Dispatch<SetStateAction<number[]>>;
    gridSize: number[];
    selectedGridSize: number;
    setSelectedGridSize: React.Dispatch<SetStateAction<number>>;
}

const CreateBoard: React.FC<createBoardProps> = ({ gridSize, selectedGridSize, setSelectedGridSize }) => {
    const [board, setBoard] = useState(Array.from({ length: selectedGridSize }, () => new Array(selectedGridSize).fill(null)));
    const [steps, setSteps] = useState<number>(0)
    const [maxReached, setMaxReached] = useState(false);
    const getRandomCorner = useCallback((): { x: number, y: number } => {
        const corners = [{ x: 0, y: 0 }, { x: 0, y: selectedGridSize - 1 }, { x: selectedGridSize - 1, y: 0 }, { x: selectedGridSize - 1, y: selectedGridSize - 1 }];
        return corners[Math.floor(Math.random() * corners.length)];
    }, [selectedGridSize])
    const [currentPosition, setCurrentPosition] = useState(getRandomCorner);
    const [isLoading, setIsLoading] = useState(false)
    const maxPosition = { x: 3, y: 3 };
    const maxSteps = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(selectedGridSize, "selectedgridsize")

    const { x, y } = currentPosition;
    const calculateChanges = useCallback(() => {
        if (!currentPosition || !board || board.length === 0 || board[0].length === 0) {
            return null;  // Return null if the board or currentPosition are not properly initialized
        }
        if (!board[y] || !board[y][x]) {
            return null;  // Handle case where board is not fully initialized
        }

        if (y >= selectedGridSize || x >= selectedGridSize || y < 0 || x < 0) {
            return null;  // Return null if currentPosition is out of bounds
        }

        const change = {
            up: y > 0 ? board[y - 1][x] - board[y][x] : null,
            down: y < selectedGridSize - 1 ? board[y + 1][x] - board[y][x] : null,
            left: x > 0 ? board[y][x - 1] - board[y][x] : null,
            right: x < selectedGridSize - 1 ? board[y][x + 1] - board[y][x] : null
        };

        return change;
    }, [board, currentPosition, selectedGridSize, x, y]);
    const [changePosi, setChangePos] = useState(calculateChanges)

    const createSmoothGrid = useCallback((rows: number, cols: number) => {
        const centerValue = 10;
        const peakDistance = Math.max(rows, cols) / 2;
        const newBoard = []
        for (let y = 0; y < rows; y++) {
            const row = [];
            for (let x = 0; x < cols; x++) {
                // Calculate the elevation based on distance from the center
                const distance = Math.sqrt(Math.pow(x - (cols - 1) / 2, 2) + Math.pow(y - (rows - 1) / 2, 2));
                const elevation = centerValue - (distance / peakDistance) * centerValue; // Smooth decrease
                row.push(Math.max(0, Math.round(elevation))); // Ensure non-negative elevations
            }
            newBoard.push(row)
        }
        setBoard(newBoard)
    }, []);


    const restartPuzzle = useCallback(() => {
        setCurrentPosition(getRandomCorner());
        setSteps(0)
        setMaxReached(false)
        // document.getElementById('steps').textContent = `Steps: ${steps}`;
        createSmoothGrid(selectedGridSize, selectedGridSize)
        calculateChanges()
        window.scrollTo({ top: 0 })
        // document.getElementById('hint').textContent = '';
        // document.getElementById('warning').textContent = '';
    }, [calculateChanges, createSmoothGrid, getRandomCorner, selectedGridSize])











    //function for creating board;


    useEffect(() => {
        setIsLoading(true);  // Start loading

        // Simulate loading delay or board creation process
        setTimeout(() => {
            createSmoothGrid(selectedGridSize, selectedGridSize);
            setCurrentPosition(getRandomCorner());

            setSteps(0)
            setIsLoading(false);  // End loading
        }, 1000);

    }, [createSmoothGrid, setSelectedGridSize, selectedGridSize, getRandomCorner, setCurrentPosition, setSteps])



    const closeModal = () => {
        setIsModalOpen(false);
        restartPuzzle()
    };





    useEffect(() => {
        setChangePos(calculateChanges());
    }, [calculateChanges]);






    return (
        <div className="w-full flex flex-col flex-wrap relative">
            {
                !isLoading &&
                <div className="flex items-center justify-center top-5 bg-transparent fixed shadow-md  rounded-full left-1/2 -translate-x-1/2 z-20 ">
                    <SelectGridSize gridSize={gridSize} selectedGridSize={selectedGridSize} setSelectedGridSize={setSelectedGridSize} />
                </div>
            }
            <div>
                {/* <ZoomComponent gridSize={selectedGridSize} setSelectedGridSize={setSelectedGridSize} /> */}
            </div>
            <div className="fixed left-0 top-0">
                <div className="flex flex-col bg-white rounded-full px-2 h-full  text-black">
                    <h4>Steps.</h4>
                    <span className="text-xl">{steps}</span>
                </div>

            </div>

            <motion.div className=" w-full  h-full flex  flex-col mx-auto mt-5 mb-10  justify-center items-center " animate={{ x: [50, 0] }} >
                <div className={` flex flex-col  w-full  h-full justify-center items-center `}>
                    <div className={` w-full h-full `}>
                        {isLoading ? 'Loading...' :
                            <GameBoard
                                board={board}
                                gridSize={gridSize}
                                selectedGridSize={selectedGridSize}
                                currentPosition={currentPosition}
                                setCurrentPosition={setCurrentPosition}
                                maxPosition={maxPosition}
                                setSelectedGridSize={setSelectedGridSize}
                            />}
                    </div>

                </div>



            </motion.div >
            <div className="fixed bottom-0  p-4 h-28  w-full max-w-full left-1/2 -translate-x-1/2    rounded-tr-md rounded-tl-md bg-white">
                <Directions x={currentPosition.x} y={currentPosition.y}
                    currentPosition={currentPosition}
                    restartGame={restartPuzzle}
                    board={board}
                    setCurrentPosition={setCurrentPosition}
                    maxPosition={maxPosition}
                    steps={steps}
                    setSteps={setSteps}
                    maxSteps={maxSteps}
                    gridSize={selectedGridSize}
                    change={changePosi}
                    maxReached={maxReached}
                    setMaxReached={setMaxReached}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
            <ModalPloty isOpen={isModalOpen} onRequestClose={closeModal}>
                <PlotlyWrapper board={board} selectedGridSize={selectedGridSize} setBoard={setBoard} />
            </ModalPloty>
        </div >
    )
}

export default CreateBoard;