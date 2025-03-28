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

  // Calculate achievements percentage
  const achievementPercentage = Math.round((unlockedAchievementObjects.length / achievementsData.length) * 100);

  // Format a large number with appropriate suffixes (K, M, B, T)
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    
    if (num < 1000) return Math.floor(num).toLocaleString();
    if (num < 1000000) return (Math.floor(num / 100) / 10).toFixed(1) + 'K';
    if (num < 1000000000) return (Math.floor(num / 100000) / 10).toFixed(1) + 'M';
    if (num < 1000000000000) return (Math.floor(num / 100000000) / 10).toFixed(1) + 'B';
    return (Math.floor(num / 100000000000) / 10).toFixed(1) + 'T';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Main Stats Dashboard */}
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardCard}>
          <View style={styles.dashboardHeader}>
            <Text style={styles.dashboardTitle}>🌎 Eco Impact Dashboard</Text>
          </View>
          
          <View style={styles.statsGridContainer}>
            <View style={styles.statsGridItem}>
              <Text style={styles.statIcon}>🌱</Text>
              <Text style={styles.statTitle}>Eco Points</Text>
              <Text style={styles.statValue}>{formatNumber(stats.totalEcoPoints)}</Text>
            </View>
            
            <View style={styles.statsGridItem}>
              <Text style={styles.statIcon}>👆</Text>
              <Text style={styles.statTitle}>Total Clicks</Text>
              <Text style={styles.statValue}>{formatNumber(stats.totalClicks)}</Text>
            </View>
            
            <View style={styles.statsGridItem}>
              <Text style={styles.statIcon}>🌳</Text>
              <Text style={styles.statTitle}>Trees Planted</Text>
              <Text style={styles.statValue}>{formatNumber(stats.treesPlanted)}</Text>
            </View>
            
            <View style={styles.statsGridItem}>
              <Text style={styles.statIcon}>☁️</Text>
              <Text style={styles.statTitle}>CO₂ Reduced</Text>
              <Text style={styles.statValue}>
                {stats.co2Reduced < 1000 
                  ? `${formatNumber(stats.co2Reduced)} kg` 
                  : `${(stats.co2Reduced / 1000).toFixed(1)} t`}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Game Progress */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleIcon}>🏆</Text>
          <Text style={styles.sectionTitle}>Game Progress</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>🔄 Buildings Prestiged:</Text>
            <Text style={styles.statsValue}>{formatNumber(stats.totalPrestiges)}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>🏅 Achievements Unlocked:</Text>
            <Text style={styles.statsValue}>{unlockedAchievementObjects.length}/{achievementsData.length}</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${achievementPercentage}%` }
              ]} 
            />
            <Text style={styles.progressPercentage}>{achievementPercentage}%</Text>
          </View>
        </View>
      </View>

      {/* Environmental Impact */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleIcon}>🌿</Text>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={styles.impactItem}>
            <View style={styles.impactIconContainer}>
              <Text style={styles.impactIcon}>🌳</Text>
            </View>
            <View style={styles.impactContent}>
              <Text style={styles.impactTitle}>{formatNumber(stats.treesPlanted)} Trees Planted</Text>
              <Text style={styles.impactDescription}>
                Equivalent to cleaning air for {formatNumber(stats.treesPlanted * 48)} people annually
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.impactItem}>
            <View style={styles.impactIconContainer}>
              <Text style={styles.impactIcon}>☁️</Text>
            </View>
            <View style={styles.impactContent}>
              <Text style={styles.impactTitle}>
                {stats.co2Reduced < 1000 
                  ? `${formatNumber(stats.co2Reduced)} kg` 
                  : `${(stats.co2Reduced / 1000).toFixed(2)} tonnes`} CO₂ Offset
              </Text>
              <Text style={styles.impactDescription}>
                Equivalent to {formatNumber(stats.co2Reduced / 4200)} cars off the road for a year
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.impactItem}>
            <View style={styles.impactIconContainer}>
              <Text style={styles.impactIcon}>💧</Text>
            </View>
            <View style={styles.impactContent}>
              <Text style={styles.impactTitle}>Water Savings</Text>
              <Text style={styles.impactDescription}>
                Your eco actions saved approximately {formatNumber(stats.totalEcoPoints * 0.25)} liters of water
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Player Activity */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleIcon}>📊</Text>
          <Text style={styles.sectionTitle}>Player Activity</Text>
        </View>
        
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>👆 Clicks Per Day (avg):</Text>
            <Text style={styles.statsValue}>
              {stats.totalClicks > 0 ? Math.round(stats.totalClicks / (gameState.lastSaved ? 
                Math.max(1, (new Date() - new Date(gameState.lastSaved)) / (1000 * 60 * 60 * 24)) : 1)).toLocaleString() : 0}
            </Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>💰 Eco Points Per Click:</Text>
            <Text style={styles.statsValue}>
              {stats.totalClicks > 0 ? (stats.totalEcoPoints / stats.totalClicks).toFixed(2) : 0}
            </Text>
          </View>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>⏱️ Time Since First Click:</Text>
            <Text style={styles.statsValue}>
              {gameState.lastSaved ? 
                Math.round((new Date() - new Date(gameState.lastSaved)) / (1000 * 60 * 60 * 24)) : 0} days
            </Text>
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleIcon}>🏅</Text>
          <Text style={styles.sectionTitle}>
            Achievements ({unlockedAchievementObjects.length}/{achievementsData.length})
          </Text>
        </View>
        
        <View style={styles.achievementsContainer}>
          {unlockedAchievementObjects.map(achievement => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{achievement.icon || '🏆'}</Text>
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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8FBF8',
  },
  // Dashboard styling
  dashboardContainer: {
    marginBottom: 20,
  },
  dashboardCard: {
    backgroundColor: '#43A047',
    borderRadius: 12,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dashboardHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statsGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsGridItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#388E3C',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  
  // Section styling
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statsCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  
  // Progress bar
  progressBarContainer: {
    height: 12,
    backgroundColor: '#C8E6C9',
    borderRadius: 6,
    marginVertical: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  progressPercentage: {
    position: 'absolute',
    right: 5,
    top: -1,
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Environmental Impact
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  impactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#81C784',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  impactIcon: {
    fontSize: 20,
  },
  impactContent: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 3,
  },
  impactDescription: {
    fontSize: 12,
    color: '#558B2F',
  },
  divider: {
    height: 1,
    backgroundColor: '#C8E6C9',
    marginVertical: 10,
  },
  
  // Achievements
  achievementsContainer: {
    marginTop: 5,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lockedAchievement: {
    backgroundColor: '#F1F8E9',
    opacity: 0.7,
  },
  achievementIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 3,
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