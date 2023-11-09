import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ color, isFlipped, onFlip }) => {
  return (
    <TouchableOpacity onPress={onFlip}>
      <View style={[styles.card, isFlipped && styles.cardFlipped, { backgroundColor: isFlipped ? color : 'gray' }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'gray',
  },
  cardFlipped: {
    backgroundColor: 'white',
  },
});

export default Card;