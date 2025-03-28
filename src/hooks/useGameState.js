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
  buildings: [
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
      id: 'building_master',
      name: 'Building Master',
      description: 'Purchase 10 buildings',
      unlocked: false,
      condition: (state) => {
        const totalBuildings = state.buildings.reduce((sum, building) => sum + building.level, 0);
        return totalBuildings >= 10;
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

// Calculate building cost based on base cost and current level
const calculateBuildingCost = (baseCost, level) => {
  return Math.floor(baseCost * Math.pow(1.15, level));
};

// Calculate the total points per second from passive buildings
const calculatePointsPerSecond = (buildings, multipliers) => {
  return buildings
    .filter(building => building.type === 'passive' && building.level > 0)
    .reduce((sum, building) => sum + (building.baseEffect * building.level), 0) 
    * multipliers.passiveMultiplier;
};

// Calculate the click value based on buildings
const calculateClickValue = (buildings, multipliers) => {
  const baseClick = 1;
  const clickBonus = buildings
    .filter(building => building.type === 'click' && building.level > 0)
    .reduce((sum, building) => sum + (building.baseEffect * building.level), 0);
  
  return (baseClick + clickBonus) * multipliers.clickMultiplier;
};

const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    // Try to load the game state from localStorage
    const savedState = localStorage.getItem('ecoClickerSave');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        
        // Ensure achievement condition functions are properly restored from initialState
        if (parsedState.achievements) {
          parsedState.achievements = parsedState.achievements.map(achievement => {
            const initialAchievement = initialState.achievements.find(a => a.id === achievement.id);
            if (initialAchievement) {
              // Keep the unlocked status from saved state but restore the condition function
              return {
                ...initialAchievement,
                unlocked: achievement.unlocked
              };
            }
            return achievement;
          });
        }
        
        return parsedState;
      } catch (error) {
        console.error('Failed to parse saved game state:', error);
        // Delete corrupted save data
        localStorage.removeItem('ecoClickerSave');
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
    const pointsPerSecond = calculatePointsPerSecond(gameState.buildings, gameState.multipliers);
    
    if (pointsPerSecond > 0) {
      const timer = setInterval(() => {
        setGameState(prevState => {
          // Find the tree plantation building
          const treePlantation = prevState.buildings.find(b => b.id === 'tree_plantation');
          
          // Calculate points generated by tree plantation only
          const treePlantationPoints = treePlantation && treePlantation.level > 0
            ? treePlantation.baseEffect * treePlantation.level * prevState.multipliers.passiveMultiplier
            : 0;
          
          // Plant 1 tree per 50 points generated by the tree plantation
          const treesToPlant = treePlantationPoints * (1/50);
          
          // CO2 reduction is still based on all eco points (0.05kg per point)
          const co2ToReduce = pointsPerSecond * 0.05;
          
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
  }, [gameState.buildings, gameState.multipliers]);

  // Check for newly unlocked buildings and achievements
  useEffect(() => {
    let hasChanges = false;
    const newState = { ...gameState };

    // Check for buildings to unlock
    newState.buildings = gameState.buildings.map(building => {
      if (!building.unlocked && building.unlockAt && gameState.resources.ecoPoints >= building.unlockAt) {
        hasChanges = true;
        return { ...building, unlocked: true };
      }
      return building;
    });

    // Check for achievements to unlock
    newState.achievements = gameState.achievements.map(achievement => {
      // Find the corresponding achievement in initialState to get the condition function
      const initialAchievement = initialState.achievements.find(a => a.id === achievement.id);
      
      // Use the condition from initialState since the function might have been lost in serialization
      if (!achievement.unlocked && initialAchievement && initialAchievement.condition && 
          initialAchievement.condition(gameState)) {
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
    const clickValue = calculateClickValue(gameState.buildings, gameState.multipliers);
    
    // CO2 reduction is still based on all eco points (0.05kg per point)
    const co2ToReduce = clickValue * 0.05;
    
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
        // No trees planted from clicking - only from Tree Plantation building
        co2Reduced: prevState.stats.co2Reduced + co2ToReduce,
      },
    }));
  };

  // Handle purchasing a building
  const purchaseBuilding = (buildingId) => {
    const buildingIndex = gameState.buildings.findIndex(b => b.id === buildingId);
    
    if (buildingIndex === -1) return false;
    
    const building = gameState.buildings[buildingIndex];
    
    // Check if we can purchase this building
    if (building.level >= building.maxLevel) return false;
    
    const cost = calculateBuildingCost(building.baseCost, building.level);
    
    if (gameState.resources.ecoPoints < cost) return false;
    
    const newBuildings = [...gameState.buildings];
    newBuildings[buildingIndex] = {
      ...building,
      level: building.level + 1,
    };
    
    // Update multipliers if it's a multiplier building
    let newMultipliers = { ...gameState.multipliers };
    if (building.type === 'multiplier') {
      newMultipliers = {
        clickMultiplier: gameState.multipliers.clickMultiplier + building.baseEffect,
        passiveMultiplier: gameState.multipliers.passiveMultiplier + building.baseEffect,
      };
    }
    
    setGameState(prevState => ({
      ...prevState,
      resources: {
        ...prevState.resources,
        ecoPoints: prevState.resources.ecoPoints - cost,
      },
      buildings: newBuildings,
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
    purchaseBuilding,
    resetGame,
    pointsPerSecond: calculatePointsPerSecond(gameState.buildings, gameState.multipliers),
    clickValue: calculateClickValue(gameState.buildings, gameState.multipliers),
    getBuildingCost: (buildingId) => {
      const building = gameState.buildings.find(b => b.id === buildingId);
      if (!building) return null;
      return calculateBuildingCost(building.baseCost, building.level);
    },
  };
};

export default useGameState;