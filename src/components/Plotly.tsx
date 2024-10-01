import React, { SetStateAction, useRef } from 'react';
import Plotly from 'react-plotly.js'



interface plotlyProps {
    board: number[][];
    selectedGridSize: number;
    setBoard: React.Dispatch<SetStateAction<number[][]>>
}

type Layout = {
    title: string,
    autosize: boolean,
    responsive: boolean
    scene: {
        aspectmode: 'data' | 'auto' | 'cube' | 'manual' | undefined
    }

}


const PlotlyWrapper: React.FC<plotlyProps> = ({ board }) => {
    const plotContainerRef = useRef<HTMLDivElement | null>(null);
    const zData = React.useMemo(() =>
        board.map(row => row.map(value => value)), [board]);

    const layout: Layout = {
        title: 'Elevation View of the Mountain',
        autosize: true,
        responsive: true,
        scene: {
            aspectmode: "data"
        },
        // width: window.innerWidth,
        // height: window.innerHeight
    };


    return (
        <div ref={plotContainerRef} className='z-50 h-full'>
            <Plotly data={[{
                z: zData,
                type: 'surface'
            }]} layout={layout} config={{ autosizable: true }} useResizeHandler={true} style={{ width: '100%', height: '100%' }} className='z-50' />
        </div>


    );
}

export default PlotlyWrapper;