import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import achievementsData from '../data/achievements.json';

const Stats = ({ gameState }) => {
  const { stats, resources, unlockedAchievements } = gameState;
  
  // Get full achievement objects by joining unlockedAchievements array with achievementsData
  const unlockedAchievementObjects = unlockedAchievements
    ? achievementsData.filter(achievement => unlockedAchievements.includes(achievement.id))
    : [];
  
  // Get locked achievements by excluding unlocked ones
  const lockedAchievementObjects = achievementsData.filter(
    achievement => !unlockedAchievements || !unlockedAchievements.includes(achievement.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Resources</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total Eco Points Earned:</Text>
            <Text style={styles.statsValue}>{Math.floor(stats.totalEcoPoints).toLocaleString()}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total Clicks:</Text>
            <Text style={styles.statsValue}>{stats.totalClicks.toLocaleString()}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Trees Planted:</Text>
            <Text style={styles.statsValue}>{Math.floor(stats.treesPlanted).toLocaleString()}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>CO₂ Reduced:</Text>
            <Text style={styles.statsValue}>
              {stats.co2Reduced < 1000 
                ? `${Math.floor(stats.co2Reduced).toLocaleString()} kg` 
                : `${(stats.co2Reduced / 1000).toFixed(2).toLocaleString()} tonnes`}
            </Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Buildings Prestiged:</Text>
            <Text style={styles.statsValue}>{stats.totalPrestiges.toLocaleString()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Achievements ({unlockedAchievementObjects.length}/{achievementsData.length})</Text>
      
      <ScrollView style={styles.achievementsContainer}>
        {unlockedAchievementObjects.map(achievement => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          </View>
        ))}
        
        {lockedAchievementObjects.map(achievement => (
          <View key={achievement.id} style={[styles.achievementItem, styles.lockedAchievement]}>
            <Text style={styles.achievementIcon}>🔒</Text>
            <View style={styles.achievementInfo}>
              <Text style={styles.lockedAchievementName}>???</Text>
              <Text style={styles.lockedAchievementDescription}>Keep playing to unlock!</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  statsContainer: {
    marginBottom: 15,
  },
  statsCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#388E3C',
  },
  statsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  divider: {
    height: 1,
    backgroundColor: '#C8E6C9',
    marginVertical: 15,
  },
  achievementsContainer: {
    maxHeight: 400,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  lockedAchievement: {
    backgroundColor: '#F1F8E9',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#33691E',
  },
  lockedAchievementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#689F38',
  },
  lockedAchievementDescription: {
    fontSize: 12,
    color: '#689F38',
    fontStyle: 'italic',
  },
});

export default Stats;