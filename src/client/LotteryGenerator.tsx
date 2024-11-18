import React, { useState } from 'react';

interface LotteryResult {
  numbers: number[];
  bonusBall?: number;
  timestamp: Date;
}

interface LotteryConfig {
  totalBalls: number;
  includeBonusBall: boolean;
  maxNumber: number;
}

const DEFAULT_CONFIG: LotteryConfig = {
  totalBalls: 6,
  includeBonusBall: false,
  maxNumber: 49
};

const LotteryGenerator: React.FC = () => {
  const [config, setConfig] = useState<LotteryConfig>(DEFAULT_CONFIG);
  const [currentDraw, setCurrentDraw] = useState<LotteryResult | null>(null);
  const [previousResults, setPreviousResults] = useState<LotteryResult[]>([]);

  const getColorForNumber = (num: number): string => {
    if (num >= 1 && num <= 9) return 'bg-gray-300';
    if (num >= 10 && num <= 19) return 'bg-blue-300';
    if (num >= 20 && num <= 29) return 'bg-pink-300';
    if (num >= 30 && num <= 39) return 'bg-green-300';
    return 'bg-yellow-300'; // 40-49
  };

  const generateLotteryNumbers = () => {
    const numbers = new Set<number>();
    const totalNumbers = config.includeBonusBall ? 
      config.totalBalls + 1 : 
      config.totalBalls;

    while(numbers.size < totalNumbers) {
      const randomNum = Math.floor(Math.random() * config.maxNumber) + 1;
      numbers.add(randomNum);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    const result: LotteryResult = {
      numbers: sortedNumbers.slice(0, config.totalBalls),
      timestamp: new Date()
    };

    if (config.includeBonusBall) {
      result.bonusBall = sortedNumbers[sortedNumbers.length - 1];
    }
    
    setCurrentDraw(result);
    setPreviousResults(prev => [result, ...prev]);
  };

  const toggleBonusBall = () => {
    setConfig(prev => ({
      ...prev,
      includeBonusBall: !prev.includeBonusBall
    }));
  };

  const NumberBall: React.FC<{ number: number; isBonusBall?: boolean }> = ({ number, isBonusBall }) => (
    <div 
      className={`
        w-14 h-14 
        flex items-center justify-center 
        rounded-full
        ${getColorForNumber(number)}
        ${isBonusBall ? 'border-2 border-red-500' : ''}
        text-lg font-bold
        shadow-md
        transform hover:scale-110 transition-transform
      `}
    >
      {number}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Lottery Number Generator
        </h1>
        
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={config.includeBonusBall}
                  onChange={toggleBonusBall}
                />
                <div className={`
                  w-10 h-6 rounded-full transition-colors
                  ${config.includeBonusBall ? 'bg-blue-500' : 'bg-gray-300'}
                `}></div>
                <div className={`
                  absolute left-1 top-1
                  w-4 h-4 bg-white rounded-full transition-transform
                  ${config.includeBonusBall ? 'translate-x-4' : 'translate-x-0'}
                `}></div>
              </div>
              <span className="ml-3 text-gray-700">Include Bonus Ball</span>
            </label>
          </div>

          <button 
            onClick={generateLotteryNumbers}
            className="
              bg-blue-500 text-white 
              px-6 py-3 rounded-lg
              font-semibold text-lg
              hover:bg-blue-600 
              transform hover:scale-105 
              transition-all
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          >
            Generate Numbers
          </button>
        </div>

        {currentDraw && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
              {currentDraw.numbers.map(num => (
                <NumberBall key={num} number={num} />
              ))}
              {currentDraw.bonusBall && (
                <>
                  <div className="text-gray-500 text-2xl font-bold">+</div>
                  <NumberBall number={currentDraw.bonusBall} isBonusBall />
                </>
              )}
            </div>
            <p className="text-center text-gray-500 text-sm">
              Generated at {currentDraw.timestamp.toLocaleTimeString()}
            </p>
          </div>
        )}

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Previous Results
          </h2>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {previousResults.map((result, index) => (
              <div 
                key={index} 
                className="
                  p-3 rounded-lg
                  bg-gray-50 hover:bg-gray-100
                  transition-colors
                "
              >
                <div className="text-sm text-gray-500 mb-1">
                  {result.timestamp.toLocaleString()}
                </div>
                <div className="font-medium">
                  <span>{result.numbers.join(', ')}</span>
                  {result.bonusBall && (
                    <span className="text-red-500 font-semibold"> + {result.bonusBall}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryGenerator;