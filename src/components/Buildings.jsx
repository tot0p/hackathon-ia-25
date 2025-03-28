import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Buildings = ({ buildings, ecoPoints, onPurchase, getBuildingCost }) => {
  // Filter buildings to only show unlocked ones
  const availableBuildings = buildings.filter(building => building.unlocked);

  // Render a single building item
  const renderBuildingItem = (building) => {
    const cost = getBuildingCost(building.id);
    const canAfford = ecoPoints >= cost;
    const maxLevel = building.level >= building.maxLevel;
    
    return (
      <TouchableOpacity
        key={building.id}
        style={[
          styles.buildingItem,
          maxLevel ? styles.maxedBuilding : 
            canAfford ? styles.affordableBuilding : styles.unaffordableBuilding
        ]}
        onPress={() => onPurchase(building.id)}
        disabled={!canAfford || maxLevel}
      >
        <View style={styles.buildingIcon}>
          <Text style={styles.iconText}>{building.icon}</Text>
        </View>
        
        <View style={styles.buildingInfo}>
          <View style={styles.buildingHeader}>
            <Text style={styles.buildingName}>{building.name}</Text>
            <Text style={styles.buildingLevel}>Lvl {building.level}/{building.maxLevel}</Text>
          </View>
          
          <Text style={styles.buildingDescription}>{building.description}</Text>
          
          <View style={styles.buildingFooter}>
            <Text style={[
              styles.costText,
              maxLevel ? styles.maxedText : 
                canAfford ? styles.affordableText : styles.unaffordableText
            ]}>
              {maxLevel ? 'MAXED' : `Cost: ${cost} eco points`}
            </Text>
            
            {building.type === 'passive' && (
              <Text style={styles.effectText}>
                +{(building.baseEffect * (building.level + 1)).toFixed(2)} points/sec
              </Text>
            )}
            
            {building.type === 'click' && (
              <Text style={styles.effectText}>
                +{(building.baseEffect * (building.level + 1)).toFixed(2)} per click
              </Text>
            )}
            
            {building.type === 'multiplier' && (
              <Text style={styles.effectText}>
                +{(building.baseEffect * (building.level + 1) * 100).toFixed(2)}% bonus
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buildings</Text>
      
      {availableBuildings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No buildings available yet! Keep clicking to unlock more.</Text>
        </View>
      ) : (
        <ScrollView style={styles.buildingsList}>
          {availableBuildings.map(renderBuildingItem)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  buildingsList: {
    flex: 1,
  },
  buildingItem: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  affordableBuilding: {
    backgroundColor: '#C8E6C9',
    borderWidth: 1,
    borderColor: '#43A047',
  },
  unaffordableBuilding: {
    backgroundColor: '#DCEDC8',
    borderWidth: 1,
    borderColor: '#AED581',
    opacity: 0.8,
  },
  maxedBuilding: {
    backgroundColor: '#B3E5FC',
    borderWidth: 1,
    borderColor: '#29B6F6',
  },
  buildingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconText: {
    fontSize: 24,
  },
  buildingInfo: {
    flex: 1,
  },
  buildingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  buildingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  buildingLevel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#388E3C',
  },
  buildingDescription: {
    fontSize: 14,
    color: '#33691E',
    marginBottom: 6,
  },
  buildingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  affordableText: {
    color: '#2E7D32',
  },
  unaffordableText: {
    color: '#BF360C',
  },
  maxedText: {
    color: '#0288D1',
  },
  effectText: {
    fontSize: 13,
    color: '#33691E',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#689F38',
    textAlign: 'center',
  },
});

export default Buildings;