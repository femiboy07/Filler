import React from "react";

interface cellProps {
    cell: number,
    value: string,
    rowIndex: number;
    colIndex: number;
    currentPosition: { x: number, y: number };
    gridSize: number

}

export const CellBox: React.FC<cellProps> = ({ rowIndex, colIndex, value, currentPosition }) => {


    const cellColor = currentPosition.x === rowIndex && currentPosition.y === colIndex ? 'bg-white rounded-full text-red-600' : 'text-white';
    console.log(value.split(','));



    return (
        <div style={{
            // flex: `0 0 calc(100% / ${gridSize})`,
            // width: `calc(100% - 8px)`
        }} className={` border ${cellColor}  flex justify-center items-center aspect-square z-20 relative text-[0.6rem] md:text-[0.9rem]  cursor-pointer`}>
            {`${value}`}
        </div>
    )
}