import React from "react";
import { StyleSheet, TextInput, } from "react-native";


const ClubSearchBar = ({ query, setQuery }: { query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search for clubs"
      placeholderTextColor={'black'}
      value={query}
      onChangeText={setQuery}
    />
  );
};

const styles = StyleSheet.create({
    searchBar: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 8,
      fontSize: 16,
      color:'black',
      margin: 10,
      borderBlockColor: 'black',
    },
  });
export default ClubSearchBar;