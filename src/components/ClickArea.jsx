import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ClickArea = ({ onPress, clickValue }) => {
  const [animations, setAnimations] = useState([]);
  const [nextId, setNextId] = useState(0);

  // Handle the click action
  const handlePress = () => {
    // Call the onPress from props
    onPress();

    // Create a new animation for visual feedback
    const newAnim = {
      id: nextId,
      position: {
        x: Math.random() * 80 - 40, // Random position near the click area
        y: -20 - Math.random() * 30, // Start slightly above the click
      },
      opacity: new Animated.Value(1),
      translateY: new Animated.Value(0),
      value: `+${clickValue}`,
    };

    setNextId(nextId + 1);
    setAnimations([...animations, newAnim]);

    // Animate the point value floating up and fading
    Animated.parallel([
      Animated.timing(newAnim.opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(newAnim.translateY, {
        toValue: -100,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Remove this animation from the array once it's done
      setAnimations(animations => animations.filter(a => a.id !== newAnim.id));
    });
  };

  return (
    <View style={styles.container}>
      {/* Animations for the click effect */}
      {animations.map(anim => (
        <Animated.Text
          key={anim.id}
          style={[
            styles.floatingText,
            {
              opacity: anim.opacity,
              transform: [
                { translateX: anim.position.x },
                { translateY: anim.translateY },
              ],
            },
          ]}
        >
          {anim.value}
        </Animated.Text>
      ))}

      {/* Main click button */}
      <TouchableOpacity
        style={styles.clickButton}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.innerCircle}>
          <Text style={styles.buttonText}>🌍</Text>
          <Text style={styles.buttonSubtext}>Click to help!</Text>
        </View>
      </TouchableOpacity>

      {/* Click value indicator */}
      <Text style={styles.valueText}>+{clickValue} eco points per click</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    height: 250,
  },
  clickButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  innerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#81C784',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#388E3C',
  },
  buttonText: {
    fontSize: 48,
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 12,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  floatingText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  valueText: {
    marginTop: 15,
    fontSize: 16,
    color: '#1B5E20',
    fontWeight: '500',
  },
});

export default ClickArea;