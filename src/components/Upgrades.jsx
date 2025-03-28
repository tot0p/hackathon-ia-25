import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Upgrades = ({ upgrades, ecoPoints, onPurchase, getUpgradeCost }) => {
  // Filter upgrades to only show unlocked ones
  const availableUpgrades = upgrades.filter(upgrade => upgrade.unlocked);

  // Render a single upgrade item
  const renderUpgradeItem = (upgrade) => {
    const cost = getUpgradeCost(upgrade.id);
    const canAfford = ecoPoints >= cost;
    const maxLevel = upgrade.level >= upgrade.maxLevel;
    
    return (
      <TouchableOpacity
        key={upgrade.id}
        style={[
          styles.upgradeItem,
          maxLevel ? styles.maxedUpgrade : 
            canAfford ? styles.affordableUpgrade : styles.unaffordableUpgrade
        ]}
        onPress={() => onPurchase(upgrade.id)}
        disabled={!canAfford || maxLevel}
      >
        <View style={styles.upgradeIcon}>
          <Text style={styles.iconText}>{upgrade.icon}</Text>
        </View>
        
        <View style={styles.upgradeInfo}>
          <View style={styles.upgradeHeader}>
            <Text style={styles.upgradeName}>{upgrade.name}</Text>
            <Text style={styles.upgradeLevel}>Lvl {upgrade.level}/{upgrade.maxLevel}</Text>
          </View>
          
          <Text style={styles.upgradeDescription}>{upgrade.description}</Text>
          
          <View style={styles.upgradeFooter}>
            <Text style={[
              styles.costText,
              maxLevel ? styles.maxedText : 
                canAfford ? styles.affordableText : styles.unaffordableText
            ]}>
              {maxLevel ? 'MAXED' : `Cost: ${cost} eco points`}
            </Text>
            
            {upgrade.type === 'passive' && (
              <Text style={styles.effectText}>
                +{upgrade.baseEffect * (upgrade.level + 1)} points/sec
              </Text>
            )}
            
            {upgrade.type === 'click' && (
              <Text style={styles.effectText}>
                +{upgrade.baseEffect * (upgrade.level + 1)} per click
              </Text>
            )}
            
            {upgrade.type === 'multiplier' && (
              <Text style={styles.effectText}>
                +{(upgrade.baseEffect * (upgrade.level + 1) * 100).toFixed(0)}% bonus
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrades</Text>
      
      {availableUpgrades.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No upgrades available yet! Keep clicking to unlock more.</Text>
        </View>
      ) : (
        <ScrollView style={styles.upgradesList}>
          {availableUpgrades.map(renderUpgradeItem)}
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
  upgradesList: {
    flex: 1,
  },
  upgradeItem: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  affordableUpgrade: {
    backgroundColor: '#C8E6C9',
    borderWidth: 1,
    borderColor: '#43A047',
  },
  unaffordableUpgrade: {
    backgroundColor: '#DCEDC8',
    borderWidth: 1,
    borderColor: '#AED581',
    opacity: 0.8,
  },
  maxedUpgrade: {
    backgroundColor: '#B3E5FC',
    borderWidth: 1,
    borderColor: '#29B6F6',
  },
  upgradeIcon: {
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
  upgradeInfo: {
    flex: 1,
  },
  upgradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  upgradeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  upgradeLevel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#388E3C',
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#33691E',
    marginBottom: 6,
  },
  upgradeFooter: {
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

export default Upgrades;