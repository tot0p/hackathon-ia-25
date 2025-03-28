import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform, Dimensions } from 'react-native';

const ClickArea = ({ onPress, clickValue, ecoPoints, pointsPerSecond, formatNumber }) => {
  // Check if we're running on web
  const isWeb = Platform.OS === 'web';
  // Get screen dimensions to calculate responsive sizes
  const { width, height } = Dimensions.get('window');
  // Scale factor for web
  const webScale = isWeb ? 1.5 : 1;

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
    <View style={[
      styles.container,
      isWeb && styles.webContainer
    ]}>
      {/* Prominently displayed eco points at the top */}
      <View style={[
        styles.pointsDisplay,
        isWeb && styles.webPointsDisplay
      ]}>
        <Text style={[
          styles.pointsValue,
          isWeb && styles.webPointsValue
        ]}>{formatNumber(ecoPoints)}</Text>
        <Text style={[
          styles.pointsLabel,
          isWeb && styles.webPointsLabel
        ]}>Eco Points</Text>
      </View>

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
        style={[
          styles.clickButton,
          isWeb && styles.webClickButton
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={[
          styles.innerCircle,
          isWeb && styles.webInnerCircle
        ]}>
          <Text style={[
            styles.buttonText,
            isWeb && styles.webButtonText
          ]}>🌍</Text>
          <Text style={[
            styles.buttonSubtext,
            isWeb && styles.webButtonSubtext
          ]}>Click to help!</Text>
        </View>
      </TouchableOpacity>

      {/* Points per second below the earth button */}
      <View style={[
        styles.pointsPerSecondContainer,
        isWeb && styles.webPointsPerSecondContainer
      ]}>
        <Text style={[
          styles.pointsPerSecondValue,
          isWeb && styles.webPointsPerSecondValue
        ]}>+{formatNumber(pointsPerSecond)}</Text>
        <Text style={[
          styles.pointsPerSecondLabel,
          isWeb && styles.webPointsPerSecondLabel
        ]}>points per second</Text>
      </View>

      {/* Click value indicator */}
      <Text style={[
        styles.valueText,
        isWeb && styles.webValueText
      ]}>+{clickValue} eco points per click</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 30, // Increased top padding to create more space from header
    position: 'relative',
    height: 340, // Slightly increased height to accommodate bigger elements
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    marginVertical: 15, // Increased vertical margin
    marginTop: 20, // Extra margin at the top
  },
  webContainer: {
    width: '80%',
    maxWidth: 600,
    marginHorizontal: 'auto',
  },
  pointsDisplay: {
    alignItems: 'center',
    marginBottom: 25, // Increased bottom margin
    backgroundColor: '#4CAF50',
    paddingVertical: 14, // More vertical padding
    paddingHorizontal: 35, // More horizontal padding
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Stronger shadow
    shadowOpacity: 0.35, // More opaque shadow
    shadowRadius: 7, // Larger shadow radius
    elevation: 10, // Higher elevation for Android
    borderWidth: 2, // Add border
    borderColor: '#388E3C', // Border color
  },
  webPointsDisplay: {
    width: '100%',
    maxWidth: 500,
  },
  pointsValue: {
    fontSize: 38, // Larger font size
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Add text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  webPointsValue: {
    fontSize: 38 * webScale,
  },
  pointsLabel: {
    fontSize: 16, // Larger label font
    color: '#E8F5E9',
    fontWeight: '600', // Slightly bolder
    marginTop: 2, // Small space between value and label
  },
  webPointsLabel: {
    fontSize: 16 * webScale,
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
  webClickButton: {
    width: 150 * webScale,
    height: 150 * webScale,
    borderRadius: 75 * webScale,
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
  webInnerCircle: {
    width: 130 * webScale,
    height: 130 * webScale,
    borderRadius: 65 * webScale,
  },
  buttonText: {
    fontSize: 48,
    marginBottom: 5,
  },
  webButtonText: {
    fontSize: 48 * webScale,
  },
  buttonSubtext: {
    fontSize: 12,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  webButtonSubtext: {
    fontSize: 12 * webScale,
  },
  floatingText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  pointsPerSecondContainer: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#81C784',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  webPointsPerSecondContainer: {
    width: '100%',
    maxWidth: 500,
  },
  pointsPerSecondValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  webPointsPerSecondValue: {
    fontSize: 18 * webScale,
  },
  pointsPerSecondLabel: {
    fontSize: 12,
    color: '#E8F5E9',
  },
  webPointsPerSecondLabel: {
    fontSize: 12 * webScale,
  },
  valueText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1B5E20',
    fontWeight: '500',
  },
  webValueText: {
    fontSize: 16 * webScale,
  },
});

export default ClickArea;