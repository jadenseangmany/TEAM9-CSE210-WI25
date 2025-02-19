import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

const CustomSearchBar = ({ placeholder }) => {
  const [search, setSearch] = useState('');

  return (
    <SearchBar
      placeholder={placeholder || 'Search...'}
      onChangeText={setSearch}
      value={search}
      containerStyle={{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: 200, // Adjust width as needed
      }}
      inputContainerStyle={{
        backgroundColor: 'white',
      }}
    />
  );
};

export default CustomSearchBar;