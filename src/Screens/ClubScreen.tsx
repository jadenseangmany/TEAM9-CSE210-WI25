import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {ClubCard} from './Views/Clubs/ClubCard';
import { AppContext } from "../Context/AppContext";
import ClubSearchBar from "./Views/Clubs/ClubSearchBar";
import {searchClubs} from "../Controller/ClubsController";

const ClubScreen = () => {
    const { clubList } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const renderItem = ({ item }: { item: any }) => (
        item.Name ? <ClubCard clubName={item.Name} /> : null
    );
  
    return (
      <View style={styles.container}>
        <ClubSearchBar query={searchQuery} setQuery={setSearchQuery} />
        <FlatList
          data={searchClubs(clubList, searchQuery)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} 
          initialNumToRender={10} // Render 10 items initially
          maxToRenderPerBatch={10} // Load 10 more per scroll batch
          windowSize={5} // Number of screens worth of items to keep in memory
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default ClubScreen;
