import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;

    if (editingIndex !== null) {
      const updatedGoals = [...courseGoals];
      updatedGoals[editingIndex] = {
        text: enteredGoalText,
        id: updatedGoals[editingIndex].id,
        isVisible: updatedGoals[editingIndex].isVisible,
      };
      setCourseGoals(updatedGoals);
      setEditingIndex(null);
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString(), isVisible: true },
      ]);
    }
    setEnteredGoalText('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...courseGoals];
    updatedGoals.splice(index, 1);
    setCourseGoals(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEnteredGoalText(courseGoals[index].text);
    setEditingIndex(index);
  };

  const toggleVisibility = (index) => {
    const updatedGoals = [...courseGoals];
    updatedGoals[index].isVisible = !updatedGoals[index].isVisible;
    setCourseGoals(updatedGoals);
  };

  const getRainbowColor = (index) => {
    const colors = ['#6495ed', '#7764ed', '#bc64ed', '#ed64da', '#D76C82', '#B03052'];
    return { backgroundColor: colors[index % colors.length] };
  };

  return (
    <View style={{ backgroundColor: 'pink', flex: 1, padding: 20 }}>
      <View>
        <TextInput
          placeholder="My Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
          style={styles.input}
        />
        <Button
          title={editingIndex !== null ? 'Edit Goal' : 'Add Goal'}
          onPress={addGoalHandler}
          color="teal" // Button color changed to blue-green
        />
      </View>
      <FlatList
        data={courseGoals}
        renderItem={({ item, index }) => (
          <View style={[styles.goalContainer, getRainbowColor(index)]}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => deleteGoal(index)}>
                <Ionicons name="trash-outline" size={20} color="black" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => startEditing(index)}>
                <Ionicons name="pencil-outline" size={20} color="black" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleVisibility(index)}>
                <Ionicons
                  name={item.isVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.goalText}>{item.isVisible ? item.text : '*******'}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  goalText: {
    textAlign: 'left',
    flex: 1,
    marginLeft: 10, // Adds spacing between icons and text
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, // Adds spacing between icons
  },
});
