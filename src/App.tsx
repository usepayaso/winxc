import React, { useEffect } from 'react';
import { Wheel } from './components/Wheel';
import { Controls } from './components/Controls';
import { History } from './components/History';
import { Stats } from './components/Stats';

function App() {
  useEffect(() => {
    // Initialize Telegram Mini App
    window.Telegram.WebApp.ready();
    
    // Expand to full height
    window.Telegram.WebApp.expand();

    // Set theme
    document.documentElement.className = window.Telegram.WebApp.colorScheme;
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Spin & Win</h1>
      <Wheel />
      <Controls />
      <History />
      <Stats />
    </div>
  );
}

export default App;