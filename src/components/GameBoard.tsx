import React, { SetStateAction } from "react";
import { CellBox } from "./CellBox";

interface boardProps {
    board: number[][];
    gridSize: number[];
    currentPosition: { x: number, y: number };
    setCurrentPosition: React.Dispatch<SetStateAction<{ x: number, y: number }>>;
    setSelectedGridSize: React.Dispatch<SetStateAction<number>>
    maxPosition: { x: number, y: number };
    selectedGridSize: number;
}



export const GameBoard: React.FC<boardProps> = ({ board, currentPosition, selectedGridSize }) => {





    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, 1fr)`, // Repeat columns based on user input
        gridTemplateRows: `repeat(auto-fill, 1fr)`,    // Repeat rows based on user input
        rowGap: "2px", // Adjust gap between grid items
        width: "100%", // Responsive width;
        // maxWidth: '100px',
        margin: '0 auto',
        // padding: '10px'
        // overflowX: 'auto'
    };

    return (
        <div>
            <div className="flex flex-col  w-full max-w-md mx-auto overflow-x-auto  justify-center items-center">
                <div className=" w-full border flex justify-center    items-center relative  ">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex}
                            // id="grid-container"
                            style={gridStyle}
                            className={`w-full  `}>
                            {row.map((cell, colIndex) => (
                                <CellBox
                                    key={colIndex}
                                    value={`${rowIndex},${colIndex}`}
                                    gridSize={selectedGridSize}
                                    cell={cell}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    currentPosition={currentPosition}
                                />
                            ))}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}