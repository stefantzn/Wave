import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// List of Words in Word Search
const wordList = ['TREE', 'FLOWER', 'FAST', 'FANCY', 'THREAD'];

// Function to randomly generate a grid of letters based on size passed in
const generateGrid = (size) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define the alphabet

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  const grid = [];

  // Fill grid with random letters
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(getRandomLetter());
    }
    grid.push(row);
  }
  // Replace some letters with words from the wordList
  for (const word of wordList) {
    const wordLength = word.length;
    let row, col;
    do {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * (size - wordLength + 1));
    } while (row + wordLength > size || col + wordLength > size);

    for (let i = 0; i < wordLength; i++) {
      grid[row][col + i] = word[i];
    }
  }

  return grid;
};

const WordSearchGame = () => {
  const [gridSize] = useState(7); // Change grid size as needed
  const [grid, setGrid] = useState(generateGrid(gridSize));
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const handleWordSelection = (row, col) => {
    const cellIndex = selectedCoordinates.findIndex(
      ({ selectedRow, selectedCol }) => selectedRow === row && selectedCol === col
    );

    if (cellIndex !== -1) {
      // If already selected, deselect it
      const updatedSelection = [...selectedCoordinates];
      updatedSelection.splice(cellIndex, 1);
      setSelectedCoordinates(updatedSelection);
    } else {
      // If not selected, select it
      setSelectedCoordinates([...selectedCoordinates, { selectedRow: row, selectedCol: col }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Search Game</Text>
      <View style={styles.gridContainer}>
        <FlatList
          data={grid}
          renderItem={({ item: row, index: rowIndex }) => (
            <View style={styles.row}>
              {row.map((letter, colIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.gridCell,
                    selectedCoordinates.some(
                      ({ selectedRow, selectedCol }) =>
                        selectedRow === rowIndex && selectedCol === colIndex
                    ) && styles.selectedCell,
                  ]}
                  onPress={() => handleWordSelection(rowIndex, colIndex)}
                >
                  <Text>{letter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
      <View style={styles.foundWords}>
        {foundWords.map((word) => (
          <Text key={word} style={styles.foundWord}>
            {word}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  gridContainer: {
    marginTop: 40,
  },
  wordList: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  gridCell: {
    width: 40,
    height: 40,
    margin: 3,
    backgroundColor: 'white',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',    // Center horizontally
    borderRadius: '5'
  },
  selectedCell: {
    backgroundColor: 'lightblue',
  },
  selectedWord: {
    marginTop: 20,
    fontSize: 18,
  },
  foundWords: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  foundWord: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
});

export default WordSearchGame;
