import { useState } from 'react';
import './App.css'
import { motion } from 'framer-motion';
import CreateBoard from './components/CreateBoard';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [gridSize, setGridSize] = useState([4, 8, 9, 10]);
  const [selectedGridSize, setSelectedGridSize] = useState(8);





  return (
    <motion.div className='bg-black min-h-screen w-full flex justify-center text-white items-center' animate>
      {!startGame && <motion.div className=' leading-5 text-white font-roboto-slab space-y-3 max-w-md opacity-0' animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <h1>Help the Mouse Reach the Peak!</h1>
        <p className=' leading-7 underline text-lg'>A mouse needs to get to the top of a mountain to get some treats. The mouse can move in only four directions:
          left, right, up, and down. The mouse doesn't know how high he has climbed; he only knows his x and y location
          and the local changes in elevation in any direction he may want to go. Help the mouse navigate to the top of the
          mountain in at most 10 steps!</p>
        <button onClick={() => setStartGame(true)} className='text-black font-roboto-slab animate-pulse'>
          Start Game
        </button>
      </motion.div>}
      {startGame &&
        <div className='w-full h-full bg-black max-w-full '>
          <CreateBoard
            startGame={startGame}
            setGridSize={setGridSize}
            selectedGridSize={selectedGridSize}
            setSelectedGridSize={setSelectedGridSize}
            gridSize={gridSize} />
        </div>}
    </motion.div>
  )
}

export default App
