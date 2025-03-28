import { useState, useEffect, useCallback, useRef } from 'react';
import buildingsData from '../data/buildings.json';
import achievementsData from '../data/achievements.json';

// Define the hardcoded prestige bonus value for all buildings
const PRESTIGE_BONUS = 0.1; // 10% bonus per prestige level

// Helper function to safely merge saved data with default structure
const deepMerge = (defaultObj, savedObj) => {
  // If saved object doesn't exist, use default
  if (!savedObj) return defaultObj;
  
  const result = { ...defaultObj };
  
  // Iterate through properties of default object
  Object.keys(defaultObj).forEach(key => {
    // If saved object has this key
    if (key in savedObj) {
      // Handle arrays specially (like buildings and achievements)
      if (Array.isArray(defaultObj[key])) {
        // If we have default array items with IDs, merge them individually by ID
        if (defaultObj[key].length > 0 && defaultObj[key][0] && 'id' in defaultObj[key][0]) {
          result[key] = defaultObj[key].map(defaultItem => {
            // Try to find corresponding saved item by id
            const savedItem = savedObj[key].find(item => item.id === defaultItem.id);
            // If found, merge them, otherwise use default
            return savedItem ? { ...defaultItem, ...savedItem } : defaultItem;
          });
          
          // Add any saved items that don't exist in default (for backward compatibility)
          const defaultIds = result[key].map(item => item.id);
          const newItems = savedObj[key]
            .filter(item => item.id && !defaultIds.includes(item.id));
          
          result[key] = [...result[key], ...newItems];
        } else {
          // For regular arrays without IDs, use saved array if it exists
          result[key] = savedObj[key];
        }
      } 
      // Handle nested objects with recursive merge
      else if (typeof defaultObj[key] === 'object' && defaultObj[key] !== null) {
        result[key] = deepMerge(defaultObj[key], savedObj[key]);
      } 
      // For primitive values, use the saved value
      else {
        result[key] = savedObj[key];
      }
    }
    // If key doesn't exist in saved object, default value remains
  });
  
  return result;
};

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
    totalPrestiges: 0,
    buildingInteractions: {} // Track interactions for each building
  },
  multipliers: {
    clickMultiplier: 1,
    passiveMultiplier: 1,
  },
  // Store only essential building data instead of full building objects
  buildingsState: buildingsData.map(building => ({
    id: building.id,
    level: 0,
    prestigeLevel: 0,
    unlocked: building.unlocked || false,
    stats: building.stats ? { ...building.stats } : {}
  })),
  // Store only IDs of unlocked achievements instead of full achievement data
  unlockedAchievements: [],
  notifications: [],
  settings: {
    soundEnabled: true,
    particlesEnabled: true,
  },
  lastSaved: null,
  lastAutoSave: null,
};

// Calculate building cost based on base cost, current level, and prestige level
const calculateBuildingCost = (baseCost, level, prestigeLevel) => {
  // Increase base cost by 50% for each prestige level
  const prestigedBaseCost = baseCost * Math.pow(1.5, prestigeLevel);
  return Math.floor(prestigedBaseCost * Math.pow(1.15, level));
};

// Calculate the total points per second from passive buildings
const calculatePointsPerSecond = (buildings, multipliers) => {
  if (!Array.isArray(buildings)) return 0;
  if (!multipliers) multipliers = { passiveMultiplier: 1 };
  
  return buildings
    .filter(building => (building.type === 'passive' || building.type === 'hybrid') && building.level > 0)
    .reduce((sum, building) => {
      // Include prestige bonus in calculation - use hardcoded value
      const prestigeBonus = 1 + (building.prestigeLevel * PRESTIGE_BONUS);
      return sum + (building.baseEffect * building.level * prestigeBonus);
    }, 0) * multipliers.passiveMultiplier;
};

// Calculate the click value based on buildings
const calculateClickValue = (buildings, multipliers) => {
  const baseClick = 1;
  
  if (!Array.isArray(buildings)) return baseClick;
  if (!multipliers) multipliers = { clickMultiplier: 1 };
  
  const clickBonus = buildings
    .filter(building => (building.type === 'click' || building.type === 'hybrid') && building.level > 0)
    .reduce((sum, building) => {
      // Include prestige bonus in calculation - use hardcoded value
      const prestigeBonus = 1 + (building.prestigeLevel * PRESTIGE_BONUS);
      // Use clickEffect for hybrid buildings, baseEffect for click buildings
      const effect = building.type === 'hybrid' ? building.clickEffect : building.baseEffect;
      return sum + (effect * building.level * prestigeBonus);
    }, 0);
  
  return (baseClick + clickBonus) * multipliers.clickMultiplier;
};

// Helper function to merge building state with full building data from JSON
const mergeFullBuildingData = (buildingsState) => {
  return buildingsData.map(buildingData => {
    // Find the saved state for this building
    const buildingState = buildingsState.find(b => b.id === buildingData.id) || {
      id: buildingData.id,
      level: 0,
      prestigeLevel: 0,
      unlocked: buildingData.unlocked || false,
      stats: buildingData.stats ? { ...buildingData.stats } : {}
    };
    
    // Merge the full building data with the saved state
    return {
      ...buildingData,
      level: buildingState.level,
      prestigeLevel: buildingState.prestigeLevel,
      unlocked: buildingState.unlocked,
      stats: buildingState.stats
    };
  });
};

// Check if an achievement should be unlocked
const checkAchievementCondition = (achievement, gameState) => {
  const buildings = gameState.buildings || [];
  
  switch (achievement.conditionType) {
    case 'totalClicks':
      return gameState.stats.totalClicks >= achievement.conditionValue;
    case 'totalEcoPoints':
      return gameState.stats.totalEcoPoints >= achievement.conditionValue;
    case 'totalBuildings':
      const totalBuildings = buildings.reduce((sum, building) => sum + building.level, 0);
      return totalBuildings >= achievement.conditionValue;
    case 'totalPrestiges':
      return gameState.stats.totalPrestiges >= achievement.conditionValue;
    case 'treesPlanted':
      return gameState.stats.treesPlanted >= achievement.conditionValue;
    case 'co2Reduced':
      return gameState.stats.co2Reduced >= achievement.conditionValue;
    case 'buildingLevel':
      const building = buildings.find(b => b.id === achievement.conditionBuilding);
      return building && building.level >= achievement.conditionValue;
    case 'buildingInteractions':
      // Check interactions with a specific building
      const interactions = gameState.stats.buildingInteractions[achievement.conditionBuilding] || 0;
      return interactions >= achievement.conditionValue;
    default:
      return false;
  }
};

const useGameState = () => {
  // Add shouldReset state to track reset requests
  const [shouldReset, setShouldReset] = useState(false);
  // Add ref for tracking if there are pending changes to save
  const hasPendingChanges = useRef(false);
  // Add ref for tracking when the last auto-save happened
  const lastAutoSaveTime = useRef(new Date());
  // Add ref for storing the previous state to compare for changes
  const prevStateRef = useRef(null);
  
  const [gameState, setGameState] = useState(() => {
    // Try to load the game state from localStorage
    const savedState = localStorage.getItem('ecoClickerSave');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        
        // Add any missing fields from the initial state (for compatibility)
        const mergedState = deepMerge(initialState, parsedState);
        
        // Convert legacy saves that have full building data to the new format
        if (mergedState.buildings && !mergedState.buildingsState) {
          // Extract just the dynamic data from buildings
          mergedState.buildingsState = mergedState.buildings.map(building => ({
            id: building.id,
            level: building.level || 0,
            prestigeLevel: building.prestigeLevel || 0,
            unlocked: building.unlocked || false,
            stats: building.stats || {}
          }));
          
          // Delete the old buildings array
          delete mergedState.buildings;
        }
        
        // Combine building state with full building data
        const fullState = {
          ...mergedState,
          // Merge the minimal building state with full building definitions
          buildings: mergeFullBuildingData(mergedState.buildingsState || [])
        };
        
        // Initialize the previous state ref
        prevStateRef.current = JSON.stringify({
          ...fullState,
          lastSaved: null,
          lastAutoSave: null
        });
        
        return fullState;
      } catch (error) {
        console.error('Failed to parse saved game state:', error);
        // Delete corrupted save data
        localStorage.removeItem('ecoClickerSave');
        
        // Initialize with default state including full building data
        const fullState = {
          ...initialState,
          buildings: mergeFullBuildingData(initialState.buildingsState)
        };
        prevStateRef.current = JSON.stringify({
          ...fullState,
          lastSaved: null,
          lastAutoSave: null
        });
        return fullState;
      }
    }
    
    // Initialize with default state including full building data
    const fullState = {
      ...initialState,
      buildings: mergeFullBuildingData(initialState.buildingsState)
    };
    prevStateRef.current = JSON.stringify({
      ...fullState,
      lastSaved: null,
      lastAutoSave: null
    });
    return fullState;
  });

  // Compare current state with previous state to detect actual changes
  const hasStateChanged = useCallback((currentState) => {
    // Skip timestamp fields in comparison
    const stateForComparison = { 
      ...currentState,
      lastSaved: null,
      lastAutoSave: null 
    };
    
    const currentStateStr = JSON.stringify(stateForComparison);
    const hasChanged = currentStateStr !== prevStateRef.current;
    
    if (hasChanged) {
      // Update the reference for future comparisons
      prevStateRef.current = currentStateStr;
    }
    
    return hasChanged;
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    // Only mark changes as pending if actual game state has changed
    if (hasStateChanged(gameState)) {
      hasPendingChanges.current = true;
    }
    
    // Auto-save function
    const saveGame = () => {
      // Check if we should reset the game first
      if (shouldReset) {
        // Create a proper initial state with buildings included
        const fullInitialState = {
          ...initialState,
          buildings: mergeFullBuildingData(initialState.buildingsState),
          lastSaved: new Date().toISOString(),
          lastAutoSave: new Date().toISOString()
        };
        
        // Create a state for saving that omits the full building data
        const stateToSave = {
          ...initialState,
          lastSaved: new Date().toISOString(),
          lastAutoSave: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('ecoClickerSave', JSON.stringify(stateToSave));
        
        // Reset the flag
        setShouldReset(false);
        
        // Update the current state with buildings included
        setGameState(fullInitialState);
        
        // Reset pending changes flag to prevent further saves after reset
        hasPendingChanges.current = false;
        
        // Reset the previous state reference to match the new initial state
        prevStateRef.current = JSON.stringify({
          ...fullInitialState,
          lastSaved: null,
          lastAutoSave: null
        });
        
        // Reset the auto-save timer
        lastAutoSaveTime.current = new Date();
        
        console.log('Game has been reset and saved with default values');
        
        // Reload the window for a completely fresh state
        window.location.reload();
      }
      
      // Only save if there are pending changes
      if (hasPendingChanges.current) {
        // Update timestamps
        const now = new Date();
        
        // Extract only essential building data for saving
        const buildingsState = gameState.buildings && Array.isArray(gameState.buildings) ? 
          gameState.buildings.map(building => ({
            id: building.id,
            level: building.level,
            prestigeLevel: building.prestigeLevel,
            unlocked: building.unlocked,
            stats: building.stats || {}
          })) : 
          initialState.buildingsState;
        
        // Create state object with minimal data for saving
        const stateToSave = {
          ...gameState,
          // Replace full buildings with minimal buildingsState
          buildings: undefined, // Remove full building data
          buildingsState, // Store minimal building data
          lastSaved: now.toISOString(),
          lastAutoSave: now.toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('ecoClickerSave', JSON.stringify(stateToSave));
        
        // Reset the pending changes flag
        hasPendingChanges.current = false;
        
        // Update the last auto-save time
        lastAutoSaveTime.current = now;
        
        // Update game state with the new timestamps without triggering another save
        setGameState(prevState => {
          const newState = {
            ...prevState,
            lastSaved: now.toISOString(),
            lastAutoSave: now.toISOString()
          };
          // We've already saved this state, so update prevStateRef to avoid detecting this as a change
          prevStateRef.current = JSON.stringify({...newState, lastSaved: null, lastAutoSave: null});
          return newState;
        });
      }
    };

    // Auto-save every 30 seconds
    const saveInterval = setInterval(() => {
      // Calculate time since last auto-save
      const now = new Date();
      const timeSinceLastSave = now.getTime() - lastAutoSaveTime.current.getTime();
      const THIRTY_SECONDS = 30 * 1000;
      
      // Only save if enough time has passed or if there are pending changes
      if (timeSinceLastSave >= THIRTY_SECONDS && hasPendingChanges.current) {
        saveGame();
      }
    }, 1000); // Check every second, but only save if needed
    
    // Manual save on unmount
    return () => {
      clearInterval(saveInterval);
      if (hasPendingChanges.current) {
        saveGame();
      }
    };
  }, [gameState, shouldReset]);

  // Passive income effect - runs every second
  useEffect(() => {
    const pointsPerSecond = calculatePointsPerSecond(gameState.buildings, gameState.multipliers);
    
    if (pointsPerSecond > 0) {
      const timer = setInterval(() => {
        setGameState(prevState => {
          // Find the tree plantation building
          const treePlantation = prevState.buildings.find(b => b.id === 'tree_plantation');
          
          // Calculate points generated by tree plantation only, with prestige bonus
          let treesPlanted = 0;
          if (treePlantation && treePlantation.level > 0) {
            const prestigeBonus = 1 + (treePlantation.prestigeLevel * PRESTIGE_BONUS);
            // Plant 1 tree for each level of tree plantation per second
            treesPlanted = treePlantation.level * 1;
          }
          
          // CO2 reduction is still based on all eco points (0.05kg per point)
          const co2ToReduce = pointsPerSecond * 0.05;
          
          // Update the building's stats
          let updatedBuildings = [...prevState.buildings];
          if (treePlantation) {
            const treeIndex = updatedBuildings.findIndex(b => b.id === 'tree_plantation');
            if (treeIndex !== -1) {
              updatedBuildings[treeIndex] = {
                ...updatedBuildings[treeIndex],
                stats: {
                  ...updatedBuildings[treeIndex].stats,
                  treesPlanted: (updatedBuildings[treeIndex].stats?.treesPlanted || 0) + treesPlanted
                }
              };
            }
          }
          
          return {
            ...prevState,
            buildings: updatedBuildings,
            resources: {
              ...prevState.resources,
              ecoPoints: prevState.resources.ecoPoints + pointsPerSecond,
            },
            stats: {
              ...prevState.stats,
              totalEcoPoints: prevState.stats.totalEcoPoints + pointsPerSecond,
              treesPlanted: prevState.stats.treesPlanted + treesPlanted,
              co2Reduced: prevState.stats.co2Reduced + co2ToReduce,
            },
          };
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState.buildings, gameState.multipliers]);

  // Notification management - auto-remove after 5 seconds
  useEffect(() => {
    if (gameState.notifications.length > 0) {
      const timer = setTimeout(() => {
        setGameState(prevState => ({
          ...prevState,
          notifications: prevState.notifications.slice(1), // Remove the oldest notification
        }));
      }, 5000); // Changed back from 1000 to 5000 milliseconds
      
      return () => clearTimeout(timer);
    }
  }, [gameState.notifications]);

  // Listen for building interactions
  useEffect(() => {
    const handleBuildingInteraction = (event) => {
      const { buildingId } = event.detail;
      
      // Update interactions count for this specific building
      setGameState(prevState => {
        const buildingInteractions = {
          ...prevState.stats.buildingInteractions,
          [buildingId]: (prevState.stats.buildingInteractions[buildingId] || 0) + 1
        };
        
        return {
          ...prevState,
          stats: {
            ...prevState.stats,
            buildingInteractions
          }
        };
      });
    };

    // Add event listener
    document.addEventListener('buildingInteraction', handleBuildingInteraction);
    
    // Clean up
    return () => {
      document.removeEventListener('buildingInteraction', handleBuildingInteraction);
    };
  }, []);

  // Check for newly unlocked buildings and achievements
  useEffect(() => {
    let hasChanges = false;
    const newState = { ...gameState };
    const newNotifications = [...gameState.notifications];

    // Check for buildings to unlock
    newState.buildings = gameState.buildings.map(building => {
      if (!building.unlocked && building.unlockAt && gameState.resources.ecoPoints >= building.unlockAt) {
        hasChanges = true;
        // Add notification for unlocked building at the beginning of the array
        newNotifications.unshift({
          id: `building-${building.id}`,
          type: 'building',
          title: 'New Building Unlocked!',
          message: `${building.name} (${building.icon}) is now available for purchase!`,
          icon: building.icon,
        });
        return { ...building, unlocked: true };
      }
      return building;
    });

    // Check for achievements to unlock
    // Loop through all achievements in achievementsData
    for (const achievement of achievementsData) {
      // Check if the achievement is not already unlocked
      if (!gameState.unlockedAchievements.includes(achievement.id) && 
          checkAchievementCondition(achievement, gameState)) {
        hasChanges = true;
        
        // Add the achievement ID to the unlocked achievements list
        newState.unlockedAchievements = [...(newState.unlockedAchievements || []), achievement.id];
        
        // Add notification for unlocked achievement at the beginning of the array
        newNotifications.unshift({
          id: `achievement-${achievement.id}`,
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: `${achievement.name}: ${achievement.description}`,
          condition: achievement.conditionText,
          icon: achievement.icon,
        });
      }
    }

    if (hasChanges) {
      setGameState({
        ...newState,
        notifications: newNotifications,
      });
    }
  }, [gameState.resources, gameState.stats, gameState.buildings, gameState.unlockedAchievements]);

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
  const purchaseBuilding = (buildingId, quantity = 1) => {
    const buildingIndex = gameState.buildings.findIndex(b => b.id === buildingId);
    
    if (buildingIndex === -1) return false;
    
    const building = gameState.buildings[buildingIndex];
    
    // Check if we can purchase this building
    if (building.level >= building.maxLevel) return false;
    
    // Calculate how many buildings we can purchase based on quantity
    let actualQuantity = quantity;
    let totalCost = 0;
    let newLevel = building.level;
    let remainingPoints = gameState.resources.ecoPoints;
    let effectValue = 0;
    
    // Calculate the max buildings we can buy and the total cost
    if (quantity === "max") {
      // For "max" mode, we calculate how many buildings we can buy with current points
      while (newLevel < building.maxLevel && remainingPoints >= calculateBuildingCost(building.baseCost, newLevel, building.prestigeLevel)) {
        const currentCost = calculateBuildingCost(building.baseCost, newLevel, building.prestigeLevel);
        totalCost += currentCost;
        remainingPoints -= currentCost;
        newLevel++;
        
        // Calculate effect for multiplier buildings
        if (building.type === 'multiplier') {
          const prestigeBonus = 1 + (building.prestigeLevel * PRESTIGE_BONUS);
          effectValue += building.baseEffect * prestigeBonus;
        }
      }
      actualQuantity = newLevel - building.level;
    } else {
      // For numerical modes (1, 10, 100)
      const maxPurchase = building.maxLevel - building.level;
      actualQuantity = Math.min(quantity, maxPurchase);
      
      // Calculate total cost for the specified quantity
      for (let i = 0; i < actualQuantity; i++) {
        const levelCost = calculateBuildingCost(building.baseCost, building.level + i, building.prestigeLevel);
        totalCost += levelCost;
        
        // Calculate effect for multiplier buildings
        if (building.type === 'multiplier') {
          const prestigeBonus = 1 + (building.prestigeLevel * PRESTIGE_BONUS);
          effectValue += building.baseEffect * prestigeBonus;
        }
      }
    }
    
    // Check if we can afford all the buildings
    if (actualQuantity <= 0 || totalCost > gameState.resources.ecoPoints) {
      return false;
    }
    
    const newBuildings = [...gameState.buildings];
    newBuildings[buildingIndex] = {
      ...building,
      level: building.level + actualQuantity,
    };
    
    // Update multipliers if it's a multiplier building
    let newMultipliers = { ...gameState.multipliers };
    if (building.type === 'multiplier') {
      newMultipliers = {
        clickMultiplier: gameState.multipliers.clickMultiplier + effectValue,
        passiveMultiplier: gameState.multipliers.passiveMultiplier + effectValue,
      };
    }
    
    setGameState(prevState => ({
      ...prevState,
      resources: {
        ...prevState.resources,
        ecoPoints: prevState.resources.ecoPoints - totalCost,
      },
      buildings: newBuildings,
      multipliers: newMultipliers,
    }));
    
    return true;
  };

  // Handle prestiging a building
  const prestigeBuilding = (buildingId) => {
    const buildingIndex = gameState.buildings.findIndex(b => b.id === buildingId);
    
    if (buildingIndex === -1) return false;
    
    const building = gameState.buildings[buildingIndex];
    
    // Can only prestige if building is at max level
    if (building.level < building.maxLevel) return false;
    
    const newBuildings = [...gameState.buildings];
    newBuildings[buildingIndex] = {
      ...building,
      level: 0, // Reset level
      prestigeLevel: building.prestigeLevel + 1, // Increase prestige level
    };
    
    // Reset multipliers if it's a multiplier building
    let newMultipliers = { ...gameState.multipliers };
    if (building.type === 'multiplier') {
      // Remove old effect and add new effect with prestige bonus
      const oldEffect = building.baseEffect * building.level;
      const newPrestigeBonus = 1 + ((building.prestigeLevel + 1) * PRESTIGE_BONUS);
      
      newMultipliers = {
        clickMultiplier: gameState.multipliers.clickMultiplier - oldEffect,
        passiveMultiplier: gameState.multipliers.passiveMultiplier - oldEffect,
      };
    }
    
    // Add notification for prestige at the beginning of the array
    const newNotifications = [...gameState.notifications];
    newNotifications.unshift({
      id: `prestige-${building.id}-${Date.now()}`,
      type: 'prestige',
      title: 'Building Prestiged!',
      message: `${building.name} has been prestiged to level ${building.prestigeLevel + 1}!`,
      icon: '🌟',
    });
    
    setGameState(prevState => ({
      ...prevState,
      buildings: newBuildings,
      multipliers: newMultipliers,
      stats: {
        ...prevState.stats,
        totalPrestiges: prevState.stats.totalPrestiges + 1,
      },
      notifications: newNotifications,
    }));
    
    return true;
  };

  // Function to add cheat points - memoized to prevent unnecessary re-renders
  const addCheatPoints = useCallback((points) => {
    if (!isNaN(points) && points > 0) {
      setGameState(prevState => ({
        ...prevState,
        resources: {
          ...prevState.resources,
          ecoPoints: prevState.resources.ecoPoints + points,
        },
        stats: {
          ...prevState.stats,
          totalEcoPoints: prevState.stats.totalEcoPoints + points,
        },
      }));
    }
  }, []);

  // Dismiss a specific notification by ID
  const dismissNotification = useCallback((notificationId) => {
    setGameState(prevState => ({
      ...prevState,
      notifications: prevState.notifications.filter(n => n.id !== notificationId)
    }));
  }, []);

  // Reset the game
  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      // Clear any pending save interval
      hasPendingChanges.current = false;
      
      // Create a proper initial state with buildings included
      const fullInitialState = {
        ...initialState,
        buildings: mergeFullBuildingData(initialState.buildingsState),
        lastSaved: new Date().toISOString()
      };
      
      // Reset to initial state with proper building data
      setGameState(fullInitialState);
      
      // Create a state for saving that omits the full building data
      const stateToSave = {
        ...initialState,
        lastSaved: new Date().toISOString()
      };
      
      // Save the default state to localStorage
      localStorage.setItem('ecoClickerSave', JSON.stringify(stateToSave));
      
      // Reset the previous state reference to match the new initial state
      prevStateRef.current = JSON.stringify({
        ...fullInitialState,
        lastSaved: null,
        lastAutoSave: null
      });
      
      // Reset the auto-save timer
      lastAutoSaveTime.current = new Date();
      
      console.log('Game reset completed: Default values saved');
      
      // Reload the window for a completely fresh state
      window.location.reload();
    }
  };

  return {
    gameState,
    handleClick,
    purchaseBuilding,
    prestigeBuilding,
    resetGame,
    dismissNotification,
    pointsPerSecond: calculatePointsPerSecond(gameState.buildings, gameState.multipliers),
    clickValue: calculateClickValue(gameState.buildings, gameState.multipliers),
    getBuildingCost: (buildingId, specificLevel) => {
      const building = gameState.buildings.find(b => b.id === buildingId);
      if (!building) return null;
      
      // If a specific level is provided, use that instead of the building's current level
      const level = specificLevel !== undefined ? specificLevel : building.level;
      return calculateBuildingCost(building.baseCost, level, building.prestigeLevel);
    },
    checkCanPrestige: (buildingId) => {
      const building = gameState.buildings.find(b => b.id === buildingId);
      if (!building) return false;
      return building.level >= building.maxLevel;
    },
    getPrestigeBonus: (buildingId) => {
      // Return the hardcoded prestige bonus value instead of reading from building object
      return PRESTIGE_BONUS;
    },
    addCheatPoints,
  };
};

export default useGameState;