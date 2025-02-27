// SearchBar.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  query: string;
  setQuery: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search events..."
      value={query}
      onChangeText={setQuery}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default SearchBar;