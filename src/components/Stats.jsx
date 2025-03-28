import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Stats = ({ stats, resources, pointsPerSecond, achievements }) => {
  // Filter to only show unlocked achievements
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);
  const lockedAchievements = achievements.filter(achievement => !achievement.unlocked);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats & Achievements</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.floor(resources.ecoPoints)}</Text>
          <Text style={styles.statLabel}>Eco Points</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pointsPerSecond.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Points/sec</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.totalClicks}</Text>
          <Text style={styles.statLabel}>Total Clicks</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.floor(stats.totalEcoPoints)}</Text>
          <Text style={styles.statLabel}>Total Points</Text>
        </View>
      </View>

      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Environmental Impact</Text>
      <View style={styles.impactContainer}>
        <View style={styles.impactItem}>
          <Text style={styles.impactIcon}>🌳</Text>
          <View style={styles.impactTextContainer}>
            <Text style={styles.impactValue}>{stats.treesPlanted.toFixed(2)}</Text>
            <Text style={styles.impactLabel}>Trees Planted</Text>
          </View>
        </View>
        
        <View style={styles.impactItem}>
          <Text style={styles.impactIcon}>💨</Text>
          <View style={styles.impactTextContainer}>
            <Text style={styles.impactValue}>{stats.co2Reduced.toFixed(2)} kg</Text>
            <Text style={styles.impactLabel}>CO2 Reduced</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Achievements ({unlockedAchievements.length}/{achievements.length})</Text>
      
      <ScrollView style={styles.achievementsContainer}>
        {unlockedAchievements.map(achievement => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          </View>
        ))}
        
        {lockedAchievements.map(achievement => (
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
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: '22%',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  statLabel: {
    fontSize: 12,
    color: '#388E3C',
  },
  divider: {
    height: 1,
    backgroundColor: '#81C784',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 10,
  },
  impactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  impactTextContainer: {
    alignItems: 'flex-start',
  },
  impactValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  impactLabel: {
    fontSize: 12,
    color: '#388E3C',
  },
  achievementsContainer: {
    maxHeight: 200,
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