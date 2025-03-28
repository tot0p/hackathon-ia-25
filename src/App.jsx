import React, { useState } from 'react';
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
  FlatList
} from 'react-native';

// Import components
import ClickArea from './components/ClickArea';
import Buildings from './components/Buildings';
import Stats from './components/Stats';

// Import game state hook
import useGameState from './hooks/useGameState';

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
    getPrestigeBonus
  } = useGameState();

  const [activeTab, setActiveTab] = useState('buildings');
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  // Function to format large numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (Math.floor(num / 100) / 10).toFixed(1) + 'K';
    if (num < 1000000000) return (Math.floor(num / 100000) / 10).toFixed(1) + 'M';
    return (Math.floor(num / 100000000) / 10).toFixed(1) + 'B';
  };

  // Notification component
  const NotificationSystem = () => {
    if (gameState.notifications.length === 0) return null;
    
    const renderNotification = ({ item }) => {
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
        <Animated.View style={[styles.notification, { backgroundColor: bgColor }]}>
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
        </Animated.View>
      );
    };
    
    return (
      <View style={styles.notificationsContainer}>
        <FlatList
          data={gameState.notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'buildings':
        return (
          <Buildings
            buildings={gameState.buildings}
            ecoPoints={gameState.resources.ecoPoints}
            onPurchase={purchaseBuilding}
            prestigeBuilding={prestigeBuilding}
            checkCanPrestige={checkCanPrestige}
            getPrestigeBonus={getPrestigeBonus}
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
  };

  // Information modal with game explanation and ecological facts
  const InfoModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={infoModalVisible}
      onRequestClose={() => setInfoModalVisible(false)}
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
            onPress={() => setInfoModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />
      
      <View style={styles.header}>
        <Text style={styles.title}>EcoClicker</Text>
        <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
          <Text style={styles.infoButton}>ℹ️</Text>
        </TouchableOpacity>
      </View>
      
      <NotificationSystem />
      
      <ClickArea 
        onPress={handleClick} 
        clickValue={clickValue} 
        ecoPoints={gameState.resources.ecoPoints}
        pointsPerSecond={pointsPerSecond}
        formatNumber={formatNumber}
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
      
      <InfoModal />
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
  infoButton: {
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
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  modalScrollView: {
    width: '100%',
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
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
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
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationsContainer: {
    position: 'absolute',
    top: 70, // Position below the header
    left: 10,
    zIndex: 1000, // Ensure it's above everything else
    maxWidth: '80%',
    maxHeight: 150,
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
});

export default App;