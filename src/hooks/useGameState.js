import { useState, useEffect } from 'react';

// Define the initial game state
const initialState = {
  resources: {
    ecoPoints: 0,
    carbonOffset: 0,
    renewableEnergy: 0,
  },
  stats: {
    totalClicks: 0,
    totalEcoPoints: 0,
    treesPlanted: 0,
    co2Reduced: 0,
  },
  multipliers: {
    clickMultiplier: 1,
    passiveMultiplier: 1,
  },
  upgrades: [
    {
      id: 'solar_panel',
      name: 'Solar Panel',
      description: 'Generate 1 eco point per second',
      baseCost: 10,
      level: 0,
      maxLevel: 50,
      baseEffect: 1,
      type: 'passive',
      resource: 'ecoPoints',
      unlocked: true,
      icon: '☀️',
    },
    {
      id: 'recycling_center',
      name: 'Recycling Center',
      description: 'Increase click value by 1',
      baseCost: 25,
      level: 0,
      maxLevel: 30,
      baseEffect: 1,
      type: 'click',
      resource: 'ecoPoints',
      unlocked: true,
      icon: '♻️',
    },
    {
      id: 'tree_plantation',
      name: 'Tree Plantation',
      description: 'Plant trees and generate 5 eco points per second',
      baseCost: 100,
      level: 0,
      maxLevel: 20,
      baseEffect: 5,
      type: 'passive',
      resource: 'ecoPoints',
      unlocked: false,
      unlockAt: 50, // Unlock when player has 50 eco points
      icon: '🌳',
    },
    {
      id: 'wind_farm',
      name: 'Wind Farm',
      description: 'Generate 10 eco points per second',
      baseCost: 250,
      level: 0,
      maxLevel: 15,
      baseEffect: 10,
      type: 'passive',
      resource: 'ecoPoints',
      unlocked: false,
      unlockAt: 150,
      icon: '🌬️',
    },
    {
      id: 'eco_education',
      name: 'Eco Education',
      description: 'Increase all production by 10%',
      baseCost: 500,
      level: 0,
      maxLevel: 10,
      baseEffect: 0.1, // 10% increase
      type: 'multiplier',
      resource: 'ecoPoints',
      unlocked: false,
      unlockAt: 300,
      icon: '📚',
    },
  ],
  achievements: [
    {
      id: 'first_click',
      name: 'First Step to Change',
      description: 'Make your first eco-click',
      unlocked: false,
      condition: (state) => state.stats.totalClicks >= 1,
      icon: '👆',
    },
    {
      id: 'eco_warrior',
      name: 'Eco Warrior',
      description: 'Reach 100 eco points',
      unlocked: false,
      condition: (state) => state.stats.totalEcoPoints >= 100,
      icon: '🌱',
    },
    {
      id: 'environmental_hero',
      name: 'Environmental Hero',
      description: 'Reach 1000 eco points',
      unlocked: false,
      condition: (state) => state.stats.totalEcoPoints >= 1000,
      icon: '🦸',
    },
    {
      id: 'upgrade_master',
      name: 'Upgrade Master',
      description: 'Purchase 10 upgrades',
      unlocked: false,
      condition: (state) => {
        const totalUpgrades = state.upgrades.reduce((sum, upgrade) => sum + upgrade.level, 0);
        return totalUpgrades >= 10;
      },
      icon: '⬆️',
    },
  ],
  settings: {
    soundEnabled: true,
    particlesEnabled: true,
  },
  lastSaved: null,
};

// Calculate upgrade cost based on base cost and current level
const calculateUpgradeCost = (baseCost, level) => {
  return Math.floor(baseCost * Math.pow(1.15, level));
};

// Calculate the total points per second from passive upgrades
const calculatePointsPerSecond = (upgrades, multipliers) => {
  return upgrades
    .filter(upgrade => upgrade.type === 'passive' && upgrade.level > 0)
    .reduce((sum, upgrade) => sum + (upgrade.baseEffect * upgrade.level), 0) 
    * multipliers.passiveMultiplier;
};

// Calculate the click value based on upgrades
const calculateClickValue = (upgrades, multipliers) => {
  const baseClick = 1;
  const clickBonus = upgrades
    .filter(upgrade => upgrade.type === 'click' && upgrade.level > 0)
    .reduce((sum, upgrade) => sum + (upgrade.baseEffect * upgrade.level), 0);
  
  return (baseClick + clickBonus) * multipliers.clickMultiplier;
};

const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    // Try to load the game state from localStorage
    const savedState = localStorage.getItem('ecoClickerSave');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
        console.error('Failed to parse saved game state:', error);
        return initialState;
      }
    }
    return initialState;
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const saveGame = () => {
      const stateToSave = {
        ...gameState,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem('ecoClickerSave', JSON.stringify(stateToSave));
    };

    // Save every 30 seconds
    const saveInterval = setInterval(saveGame, 30000);
    
    // Save when the component unmounts
    return () => {
      clearInterval(saveInterval);
      saveGame();
    };
  }, [gameState]);

  // Passive income effect - runs every second
  useEffect(() => {
    const pointsPerSecond = calculatePointsPerSecond(gameState.upgrades, gameState.multipliers);
    
    if (pointsPerSecond > 0) {
      const timer = setInterval(() => {
        setGameState(prevState => {
          // Calculate environmental impact based on points generated
          const treesToPlant = pointsPerSecond * 0.01; // 1 tree per 100 points
          const co2ToReduce = pointsPerSecond * 0.05; // 0.05kg of CO2 per point
          
          return {
            ...prevState,
            resources: {
              ...prevState.resources,
              ecoPoints: prevState.resources.ecoPoints + pointsPerSecond,
            },
            stats: {
              ...prevState.stats,
              totalEcoPoints: prevState.stats.totalEcoPoints + pointsPerSecond,
              treesPlanted: prevState.stats.treesPlanted + treesToPlant,
              co2Reduced: prevState.stats.co2Reduced + co2ToReduce,
            },
          };
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState.upgrades, gameState.multipliers]);

  // Check for newly unlocked upgrades and achievements
  useEffect(() => {
    let hasChanges = false;
    const newState = { ...gameState };

    // Check for upgrades to unlock
    newState.upgrades = gameState.upgrades.map(upgrade => {
      if (!upgrade.unlocked && upgrade.unlockAt && gameState.resources.ecoPoints >= upgrade.unlockAt) {
        hasChanges = true;
        return { ...upgrade, unlocked: true };
      }
      return upgrade;
    });

    // Check for achievements to unlock
    newState.achievements = gameState.achievements.map(achievement => {
      if (!achievement.unlocked && achievement.condition(gameState)) {
        hasChanges = true;
        return { ...achievement, unlocked: true };
      }
      return achievement;
    });

    if (hasChanges) {
      setGameState(newState);
    }
  }, [gameState]);

  // Handle clicking on the main clicker area
  const handleClick = () => {
    const clickValue = calculateClickValue(gameState.upgrades, gameState.multipliers);
    
    // Calculate environmental impact based on points generated from clicking
    const treesToPlant = clickValue * 0.01; // 1 tree per 100 points
    const co2ToReduce = clickValue * 0.05; // 0.05kg of CO2 per point
    
    setGameState(prevState => ({
      ...prevState,
      resources: {
        ...prevState.resources,
        ecoPoints: prevState.resources.ecoPoints + clickValue,
      },
      stats: {
        ...prevState.stats,
        totalClicks: prevState.stats.totalClicks + 1,
        totalEcoPoints: prevState.stats.totalEcoPoints + clickValue,
        treesPlanted: prevState.stats.treesPlanted + treesToPlant,
        co2Reduced: prevState.stats.co2Reduced + co2ToReduce,
      },
    }));
  };

  // Handle purchasing an upgrade
  const purchaseUpgrade = (upgradeId) => {
    const upgradeIndex = gameState.upgrades.findIndex(u => u.id === upgradeId);
    
    if (upgradeIndex === -1) return false;
    
    const upgrade = gameState.upgrades[upgradeIndex];
    
    // Check if we can purchase this upgrade
    if (upgrade.level >= upgrade.maxLevel) return false;
    
    const cost = calculateUpgradeCost(upgrade.baseCost, upgrade.level);
    
    if (gameState.resources.ecoPoints < cost) return false;
    
    const newUpgrades = [...gameState.upgrades];
    newUpgrades[upgradeIndex] = {
      ...upgrade,
      level: upgrade.level + 1,
    };
    
    // Update multipliers if it's a multiplier upgrade
    let newMultipliers = { ...gameState.multipliers };
    if (upgrade.type === 'multiplier') {
      newMultipliers = {
        clickMultiplier: gameState.multipliers.clickMultiplier + upgrade.baseEffect,
        passiveMultiplier: gameState.multipliers.passiveMultiplier + upgrade.baseEffect,
      };
    }
    
    setGameState(prevState => ({
      ...prevState,
      resources: {
        ...prevState.resources,
        ecoPoints: prevState.resources.ecoPoints - cost,
      },
      upgrades: newUpgrades,
      multipliers: newMultipliers,
    }));
    
    return true;
  };

  // Reset the game
  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      localStorage.removeItem('ecoClickerSave');
      setGameState(initialState);
    }
  };

  return {
    gameState,
    handleClick,
    purchaseUpgrade,
    resetGame,
    pointsPerSecond: calculatePointsPerSecond(gameState.upgrades, gameState.multipliers),
    clickValue: calculateClickValue(gameState.upgrades, gameState.multipliers),
    getUpgradeCost: (upgradeId) => {
      const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
      if (!upgrade) return null;
      return calculateUpgradeCost(upgrade.baseCost, upgrade.level);
    },
  };
};

export default useGameState;