import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform, Dimensions, ImageBackground } from 'react-native';
import carbonTips from '../data/carbonTips.json';

const ClickArea = ({ onPress, clickValue, ecoPoints, pointsPerSecond, formatNumber, buildings }) => {
  // Check if we're running on web
  const isWeb = Platform.OS === 'web';
  // Get screen dimensions to calculate responsive sizes
  const { width, height } = Dimensions.get('window');

  // Use the styles function with isWeb parameter
  const currentStyles = styles(isWeb);
  
  // State for the advertising banner
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isEcoEducationUnlocked, setIsEcoEducationUnlocked] = useState(false);
  
  // Check if eco_education is unlocked
  useEffect(() => {
    if (buildings) {
      const ecoEducation = buildings.find(building => building.id === 'eco_education');
      setIsEcoEducationUnlocked(ecoEducation && ecoEducation.unlocked);
    }
  }, [buildings]);
  
  // Change the tip every 40 seconds
  useEffect(() => {
    if (isEcoEducationUnlocked) {
      const tipInterval = setInterval(() => {
        setCurrentTipIndex(prevIndex => (prevIndex + 1) % carbonTips.length);
      }, 40000);
      
      return () => clearInterval(tipInterval);
    }
  }, [isEcoEducationUnlocked]);

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
      value: `+${Number(clickValue).toFixed(2)}`, // Format to 2 decimal places
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
    <ImageBackground 
      source={require('../../assets/background.png')}
      style={[
        currentStyles.backgroundImage,
        isWeb && currentStyles.webBackgroundImage
      ]}
      imageStyle={currentStyles.backgroundImageStyle}
    >
      <View style={[
        currentStyles.container,
        isWeb && currentStyles.webContainer
      ]}>
        {/* Carbon Tips Banner - Only shown when eco_education is unlocked */}
        {isEcoEducationUnlocked && (
          <View style={[
            currentStyles.bannerContainer,
            isWeb && currentStyles.webBannerContainer
          ]}>
            <Text style={[
              currentStyles.bannerTitle,
              isWeb && currentStyles.webBannerTitle
            ]}>💡 Carbon Reduction Tip:</Text>
            <Text style={[
              currentStyles.bannerText,
              isWeb && currentStyles.webBannerText
            ]}>{carbonTips[currentTipIndex].tip}</Text>
          </View>
        )}

        {/* Prominently displayed eco points at the top */}
        <View style={[
          currentStyles.pointsDisplay,
          isWeb && currentStyles.webPointsDisplay
        ]}>
          <Text style={[
            currentStyles.pointsValue,
            isWeb && currentStyles.webPointsValue
          ]}>{formatNumber(ecoPoints)}</Text>
          <Text style={[
            currentStyles.pointsLabel,
            isWeb && currentStyles.webPointsLabel
          ]}>Eco Points</Text>
        </View>

        {/* Animations for the click effect */}
        {animations.map(anim => (
          <Animated.Text
            key={anim.id}
            style={[
              currentStyles.floatingText,
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
            currentStyles.clickButton,
            isWeb && currentStyles.webClickButton
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <View style={[
            currentStyles.innerCircle,
            isWeb && currentStyles.webInnerCircle
          ]}>
            <Text style={[
              currentStyles.buttonText,
              isWeb && currentStyles.webButtonText
            ]}>🌍</Text>
            <Text style={[
              currentStyles.buttonSubtext,
              isWeb && currentStyles.webButtonSubtext
            ]}>Click to help!</Text>
          </View>
        </TouchableOpacity>

        {/* Points per second below the earth button */}
        <View style={[
          currentStyles.pointsPerSecondContainer,
          isWeb && currentStyles.webPointsPerSecondContainer
        ]}>
          <Text style={[
            currentStyles.pointsPerSecondValue,
            isWeb && currentStyles.webPointsPerSecondValue
          ]}>+{formatNumber(pointsPerSecond)}</Text>
          <Text style={[
            currentStyles.pointsPerSecondLabel,
            isWeb && currentStyles.webPointsPerSecondLabel
          ]}>points per second</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

// Convert styles to a function that takes isWeb as a parameter and calculates webScale internally
const styles = (isWeb) => {
  const webScale = isWeb ? 1.5 : 1;

  return StyleSheet.create({
    backgroundImage: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // Restricting the height to not influence other panels
      height: 'auto',
      overflow: 'hidden',
    },
    webBackgroundImage: {
      width: '100%', 
      marginHorizontal: 'auto',
    },
    backgroundImageStyle: {
      opacity: 0.3,
      // Change from 'cover' to 'contain' to prevent overflow
      resizeMode: 'contain',
      width: '100%',
      // Limit the height to prevent influencing other panels
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingTop: 30, // Increased top padding to create more space from header
      position: 'relative',
      height: 'auto', // Changed to auto to accommodate the banner
      minHeight: 340, // Minimum height
      backgroundColor: 'rgba(232, 245, 233, 0.8)', // Make it slightly transparent to show background
      borderRadius: 15,
      marginVertical: 15, // Increased vertical margin
      marginTop: 20, // Extra margin at the top
      width: '100%',
    },
    webContainer: {
      width: '80%',
      maxWidth: 600,
      height: 'auto',
      minHeight: 340,
      marginHorizontal: 'auto',
    },
    // New styles for the banner
    bannerContainer: {
      width: '100%',
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    webBannerContainer: {
      width: '100%',
      maxWidth: 550,
    },
    bannerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5,
    },
    webBannerTitle: {
      fontSize: 16 * webScale,
    },
    bannerText: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
    },
    webBannerText: {
      fontSize: 14 * webScale,
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
      zIndex : 1,
      fontSize: 30,
      fontWeight: 'bold',
      color: '#2f8032',
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
};

export default ClickArea;