import { Text, makeStyles } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Plant } from "../../db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import PlantItem from "../../components/PlantItem";
import { useAppContext } from "../../context/Context";

export default function TabTwoScreen() {
  const styles = useStyles();
  const { favourites } = useAppContext();
  return (
    <SafeAreaView style={styles.container}>
      {favourites?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favourites || []}
          keyExtractor={(plant) => plant.name}
          renderItem={({ item }) => <PlantItem item={item} type="favourite" />}
        />
      ) : (
        <Text h3 style={{ textAlign: "center" }}>
          Dont have any favourite plant
        </Text>
      )}
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
}));
