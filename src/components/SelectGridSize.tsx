import React, { SetStateAction } from 'react';

interface selectGridSizeProps {
    gridSize: number[];
    // setGridSize: React.Dispatch<SetStateAction<number[]>>;
    selectedGridSize: number;
    setSelectedGridSize: React.Dispatch<SetStateAction<number>>
}

const SelectGridSize: React.FC<selectGridSizeProps> = ({ gridSize, selectedGridSize, setSelectedGridSize }) => {
    return (
        <div data-testid="duration-selector" className='flex md:flex-row flex-col h-full  md:h-12 p-2 rounded-3xl border border-solid bg-white  items-center  justify-around'>
            {gridSize.map((size: number, index: number, array: number[]) => (
                <div key={`${size}-${index}`} onClick={() => setSelectedGridSize(array[index])} className={`${selectedGridSize === size ? 'bg-black text-white' : 'bg-transparent'} text-black mx-[0.5] rounded-3xl h-8 w-[75px] cursor-pointer items-center flex text-sm font-medium`}>
                    <span className='w-full text-center'>{`${size} x ${size}`}</span>
                </div>
            ))}

        </div>
    )

}

export default SelectGridSize;