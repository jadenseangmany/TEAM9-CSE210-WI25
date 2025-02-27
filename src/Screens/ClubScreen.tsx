import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {ClubInfoTag} from './Views/Clubs/ClubInfoScreen';
import { AppContext } from "../Context/AppContext";


const ClubScreen = () => {
    const { clubList } = useContext(AppContext);
    console.log(clubList._j);

    const renderItem = ({ item }: { item: any }) => (
        item.Name ? <ClubInfoTag clubName={item.Name} /> : null
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={clubList._j}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Use a unique key if item has no ID
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