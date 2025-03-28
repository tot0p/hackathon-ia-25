import React, { useState, useEffect, useCallback, memo, useMemo, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StatusBar,
  TouchableOpacity,
  Modal,
  Animated,
  FlatList,
  TextInput,
  Switch
} from 'react-native';

// Import components
import ClickArea from './components/ClickArea';
import Buildings from './components/Buildings';
import Stats from './components/Stats';

// Import game state hook
import useGameState from './hooks/useGameState';
// Import audio hook
import useAudio from './hooks/useAudio';

// Create a simple slider component since Slider is not available in React Native Web
const CustomSlider = ({ value, minimumValue, maximumValue, onValueChange, disabled, minimumTrackTintColor, maximumTrackTintColor, thumbTintColor }) => {
  return (
    <input
      type="range"
      min={minimumValue || 0}
      max={maximumValue || 1}
      step={0.01}
      value={value}
      onChange={(e) => onValueChange(parseFloat(e.target.value))}
      disabled={disabled}
      style={{ 
        flex: 2,
        accentColor: minimumTrackTintColor || '#4CAF50',
        opacity: disabled ? 0.5 : 1
      }}
    />
  );
};

const App = () => {
  const {
    gameState,
    handleClick,
    purchaseBuilding,
    prestigeBuilding,
    resetGame,
    pointsPerSecond,
    clickValue,
    getBuildingCost,
    checkCanPrestige,
    getPrestigeBonus,
    addCheatPoints,
    dismissNotification
  } = useGameState();

  // Initialize audio system
  const {
    audioSettings,
    playSound,
    toggleMusic,
    toggleSFX,
    updateMusicVolume,
    updateSFXVolume,
    updateMasterVolume
  } = useAudio();

  const [activeTab, setActiveTab] = useState('buildings');
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [cheatMenuVisible, setCheatMenuVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [pointsToAdd, setPointsToAdd] = useState('1000');
  
  // Memoize functions that will be passed to modals to prevent re-renders
  const handleCloseInfoModal = useCallback(() => setInfoModalVisible(false), []);
  const handleCloseCheatMenu = useCallback(() => setCheatMenuVisible(false), []);
  const handleCloseSettingsModal = useCallback(() => setSettingsModalVisible(false), []);
  
  const handleCheatPoints = useCallback(() => {
    const points = parseInt(pointsToAdd, 10);
    if (!isNaN(points) && points > 0) {
      addCheatPoints(points);
      setCheatMenuVisible(false);
    }
  }, [pointsToAdd, addCheatPoints]);
  
  // Custom click handler that integrates sound
  const handleGameClick = useCallback(() => {
    handleClick();
    // No sound on click to avoid too frequent sound playing
  }, [handleClick]);

  // Custom building purchase handler that integrates sound
  const handleBuildingPurchase = useCallback((buildingId) => {
    const success = purchaseBuilding(buildingId);
    if (success) {
      playSound('buy');
    }
    return success;
  }, [purchaseBuilding, playSound]);

  // Custom building prestige handler that integrates sound
  const handleBuildingPrestige = useCallback((buildingId) => {
    const success = prestigeBuilding(buildingId);
    if (success) {
      playSound('prestige');
    }
    return success;
  }, [prestigeBuilding, playSound]);
  
  // Create a ref to track played notification sounds
  const playedNotificationsRef = useRef(new Set());
  
  // Combined effect to handle all notification sounds in one place
  useEffect(() => {
    // Only play sound when a new notification is added (not when one is removed)
    const notificationCount = gameState.notifications.length;
    
    if (notificationCount > 0) {
      // Get the most recent notification
      const latestNotification = gameState.notifications[notificationCount - 1];
      
      // Use a unique ID to make sure we don't play sounds for the same notification twice
      const notificationId = latestNotification.id;
      
      // Only play if we haven't played this notification before
      if (!playedNotificationsRef.current.has(notificationId)) {
        // Play different sounds based on notification type
        if (latestNotification.type === 'achievement') {
          playSound('achievement');
        } else if (latestNotification.type === 'prestige') {
          playSound('prestige');
        } else {
          // For building unlocks and other general notifications
          playSound('notification');
        }
        
        // Mark this notification as played
        playedNotificationsRef.current.add(notificationId);
        
        // Clean up old notification IDs to prevent memory leaks
        if (playedNotificationsRef.current.size > 20) {
          const oldestIds = Array.from(playedNotificationsRef.current).slice(0, 10);
          oldestIds.forEach(id => playedNotificationsRef.current.delete(id));
        }
      }
    }
  }, [gameState.notifications.length, playSound]);
  
  // Function to handle key press for cheat code
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is '²' (keyCode 178)
      if (event.key === '²') {
        setCheatMenuVisible(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Function to format large numbers with K, M, B suffixes
  const formatNumber = useCallback((num) => {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (Math.floor(num / 100) / 10).toFixed(1) + 'K';
    if (num < 1000000000) return (Math.floor(num / 100000) / 10).toFixed(1) + 'M';
    return (Math.floor(num / 100000000) / 10).toFixed(1) + 'B';
  }, []);

  // Notification component
  const NotificationSystem = useCallback(() => {
    if (gameState.notifications.length === 0) return null;
    
    return (
      <View style={styles.notificationsContainer}>
        {gameState.notifications.map((item) => {
          let bgColor = '#4CAF50'; // default green
          let iconColor = '#E8F5E9';
          
          // Different styles for different notification types
          if (item.type === 'achievement') {
            bgColor = '#FFC107'; // amber
            iconColor = '#FFF9C4';
          } else if (item.type === 'prestige') {
            bgColor = '#FF9800'; // orange
            iconColor = '#FFF3E0';
          }
          
          return (
            <div 
              key={item.id}
              onClick={() => dismissNotification(item.id)}
              style={{
                cursor: 'pointer',
                marginBottom: 10
              }}
            >
              <View style={[styles.notification, { backgroundColor: bgColor }]}>
                <View style={[styles.notificationIconContainer, { backgroundColor: iconColor }]}>
                  <Text style={styles.notificationIcon}>{item.icon}</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                  {item.condition && (
                    <Text style={styles.notificationCondition}>
                      Condition: {item.condition}
                    </Text>
                  )}
                </View>
              </View>
            </div>
          );
        })}
      </View>
    );
  }, [gameState.notifications, dismissNotification]);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'buildings':
        return (
          <Buildings
            buildings={gameState.buildings}
            ecoPoints={gameState.resources.ecoPoints}
            onPurchase={handleBuildingPurchase}
            prestigeBuilding={handleBuildingPrestige}
            checkCanPrestige={checkCanPrestige}
            getPrestigeBonus={getPrestigeBonus}
            getBuildingCost={getBuildingCost}
          />
        );
      case 'stats':
        return (
          <Stats
            stats={gameState.stats}
            resources={gameState.resources}
            pointsPerSecond={pointsPerSecond}
            achievements={gameState.achievements}
          />
        );
      default:
        return <Buildings />;
    }
  }, [activeTab, gameState.buildings, gameState.resources.ecoPoints, gameState.stats, 
      gameState.resources, pointsPerSecond, gameState.achievements, handleBuildingPurchase, 
      handleBuildingPrestige, checkCanPrestige, getPrestigeBonus, getBuildingCost]);

  // Completely memoize the modal components to prevent re-renders
  const InfoModal = useMemo(() => (
    <Modal
      animationType="none"
      transparent={true}
      visible={infoModalVisible}
      onRequestClose={handleCloseInfoModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>About EcoClicker</Text>
          
          <ScrollView style={styles.modalScrollView}>
            <Text style={styles.sectionTitle}>How to Play</Text>
            <Text style={styles.modalText}>
              Click the Earth to generate eco points. Use your points to purchase buildings that 
              will help you generate more points automatically or increase your click value.
            </Text>
            
            <Text style={styles.sectionTitle}>Ecological Impact</Text>
            <Text style={styles.modalText}>
              While EcoClicker is just a game, it aims to raise awareness about ecological issues. 
              Each building represents real-world actions we can take to help our planet.
            </Text>
            
            <Text style={styles.sectionTitle}>Eco Facts</Text>
            <View style={styles.factContainer}>
              <Text style={styles.factTitle}>🌳 Trees</Text>
              <Text style={styles.factText}>
                A single mature tree can absorb up to 48 pounds of carbon dioxide per year.
              </Text>
            </View>
            
            <View style={styles.factContainer}>
              <Text style={styles.factTitle}>☀️ Solar Energy</Text>
              <Text style={styles.factText}>
                The sunlight that hits the Earth's surface in just one hour could power the entire world for a year.
              </Text>
            </View>
            
            <View style={styles.factContainer}>
              <Text style={styles.factTitle}>♻️ Recycling</Text>
              <Text style={styles.factText}>
                Recycling one aluminum can saves enough energy to run a TV for three hours.
              </Text>
            </View>
            
            <View style={styles.factContainer}>
              <Text style={styles.factTitle}>🌬️ Wind Energy</Text>
              <Text style={styles.factText}>
                Wind turbines can reduce carbon dioxide emissions by 2,000 tons per year compared to fossil fuels.
              </Text>
            </View>
          </ScrollView>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseInfoModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ), [infoModalVisible, handleCloseInfoModal]);

  // Memoize the cheat menu
  const CheatMenu = useMemo(() => (
    <Modal
      animationType="none"
      transparent={true}
      visible={cheatMenuVisible}
      onRequestClose={handleCloseCheatMenu}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cheat Menu</Text>
          
          <View style={styles.cheatOption}>
            <Text style={styles.cheatLabel}>Add EcoPoints:</Text>
            <TextInput
              style={styles.cheatInput}
              value={pointsToAdd}
              onChangeText={setPointsToAdd}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.cheatButtonsRow}>
            <TouchableOpacity
              style={styles.cheatButton}
              onPress={handleCheatPoints}
            >
              <Text style={styles.cheatButtonText}>Add Points</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.cheatButton, styles.cancelButton]}
              onPress={handleCloseCheatMenu}
            >
              <Text style={styles.cheatButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ), [cheatMenuVisible, handleCloseCheatMenu, pointsToAdd, handleCheatPoints]);

  // Settings modal for audio controls
  const SettingsModal = useMemo(() => (
    <Modal
      animationType="none"
      transparent={true}
      visible={settingsModalVisible}
      onRequestClose={handleCloseSettingsModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Settings</Text>
          
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Audio</Text>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Master Volume</Text>
              <CustomSlider
                value={audioSettings.masterVolume}
                minimumValue={0}
                maximumValue={1}
                onValueChange={updateMasterVolume}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#D8D8D8"
                thumbTintColor="#2E7D32"
              />
              <Text style={styles.volumeValue}>{Math.round(audioSettings.masterVolume * 100)}%</Text>
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Music Volume</Text>
              <CustomSlider
                value={audioSettings.musicVolume}
                minimumValue={0}
                maximumValue={1}
                onValueChange={updateMusicVolume}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#D8D8D8"
                thumbTintColor="#2E7D32"
                disabled={!audioSettings.musicEnabled}
              />
              <Text style={styles.volumeValue}>{Math.round(audioSettings.musicVolume * 100)}%</Text>
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Sound Effects Volume</Text>
              <CustomSlider
                value={audioSettings.sfxVolume}
                minimumValue={0}
                maximumValue={1}
                onValueChange={updateSFXVolume}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#D8D8D8"
                thumbTintColor="#2E7D32"
                disabled={!audioSettings.sfxEnabled}
              />
              <Text style={styles.volumeValue}>{Math.round(audioSettings.sfxVolume * 100)}%</Text>
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Music</Text>
              <Switch
                trackColor={{ false: "#D8D8D8", true: "#81C784" }}
                thumbColor={audioSettings.musicEnabled ? "#4CAF50" : "#f4f3f4"}
                ios_backgroundColor="#D8D8D8"
                onValueChange={toggleMusic}
                value={audioSettings.musicEnabled}
              />
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Sound Effects</Text>
              <Switch
                trackColor={{ false: "#D8D8D8", true: "#81C784" }}
                thumbColor={audioSettings.sfxEnabled ? "#4CAF50" : "#f4f3f4"}
                ios_backgroundColor="#D8D8D8"
                onValueChange={toggleSFX}
                value={audioSettings.sfxEnabled}
              />
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseSettingsModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ), [
    settingsModalVisible, 
    handleCloseSettingsModal, 
    audioSettings, 
    updateMasterVolume, 
    updateMusicVolume, 
    updateSFXVolume, 
    toggleMusic, 
    toggleSFX
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />
      
      <View style={styles.header}>
        <Text style={styles.title}>EcoClicker</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setSettingsModalVisible(true)}
          >
            <Text style={styles.headerButtonText}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setInfoModalVisible(true)}
          >
            <Text style={styles.headerButtonText}>ℹ️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <NotificationSystem />
      
      <ClickArea 
        onPress={handleGameClick} 
        clickValue={clickValue} 
        ecoPoints={gameState.resources.ecoPoints}
        pointsPerSecond={pointsPerSecond}
        formatNumber={formatNumber}
        buildings={gameState.buildings}
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'buildings' && styles.activeTab]}
          onPress={() => setActiveTab('buildings')}
        >
          <Text style={[styles.tabText, activeTab === 'buildings' && styles.activeTabText]}>Buildings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}
        >
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>Stats</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
      
      {InfoModal}
      {CheatMenu}
      {SettingsModal}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 10,
  },
  headerButtonText: {
    fontSize: 24,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#81C784',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#689F38',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  resetButton: {
    padding: 10,
  },
  resetButtonText: {
    color: '#BF360C',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed', // Add fixed position for modals
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1100, // Higher z-index than notifications
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    zIndex: 1200, // Even higher z-index
  },
  notificationsContainer: {
    position: 'fixed',
    top: 70, // Position below the header
    right: 10, // Changed from left to right
    zIndex: 1000, // Ensure it's above everything else
    maxWidth: '80%',
    maxHeight: 500,
    // Removed duplicate position: fixed property
  },
  notificationsList: {
    // No horizontal padding needed since we have left margin
  },
  notification: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  notificationMessage: {
    color: 'white',
    fontSize: 14,
  },
  notificationCondition: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  cheatOption: {
    marginBottom: 15,
    width: '100%',
  },
  cheatLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  cheatInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  cheatButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cheatButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cheatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScrollView: {
    width: '100%',
    maxHeight: 400,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginTop: 15,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  factContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: '100%',
  },
  factTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  factText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsSection: {
    width: '100%',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  slider: {
    flex: 2,
  },
  volumeValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
  },
});

export default App;