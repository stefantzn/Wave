import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const GameScreen = () => {
  const [gridColors, setGridColors] = useState(shuffleArray([...colors, ...colors]));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const handleFlip = (index) => {
    if (flippedIndices.length === 2) {
      return; // If two tiles are already flipped, do nothing
    }

    if (flippedIndices.includes(index) || matchedPairs.includes(gridColors[index])) {
      return; // If the tile is already flipped or part of a matched pair, do nothing
    }

    // Flip the selected tile
    setFlippedIndices([...flippedIndices, index]);

    if (flippedIndices.length === 1) {
      // Check for a match when two tiles are flipped
      const [firstIndex] = flippedIndices;
      if (gridColors[firstIndex] === gridColors[index]) {
        // Matched pair, keep them solid
        setMatchedPairs([...matchedPairs, gridColors[firstIndex]]);
        setFlippedIndices([]);
      } else {
        // Not a match, reset the tiles after a short delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000); // 1 second delay
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {gridColors.map((color, index) => (
          <Tile
            key={index}
            color={color}
            isFlipped={flippedIndices.includes(index) || matchedPairs.includes(color)}
            onFlip={() => handleFlip(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameScreen;

const Tile = ({ color, isFlipped, onFlip }) => {
  return (
    <TouchableOpacity onPress={onFlip}>
      <View style={[tileStyles.tile, isFlipped && tileStyles.tileFlipped, { backgroundColor: isFlipped ? color : 'gray' }]} />
    </TouchableOpacity>
  );
};

const tileStyles = StyleSheet.create({
  tile: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'gray',
    
  },
  tileFlipped: {
    backgroundColor: 'white',
  },
});
