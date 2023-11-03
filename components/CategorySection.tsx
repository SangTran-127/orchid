import React, { FC } from "react";
import { Categories } from "../db";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import PlantItem from "./PlantItem";
import { theme } from "../styles/theme";

interface CategorySectionProps {
  item: (typeof Categories)[number];
}

const CategorySection: FC<CategorySectionProps> = ({ item }) => {
  return (
    <View style={{ width: "100%" }}>
      <Text h4 style={{ color: theme.lightColors?.primary, fontSize: 700 }}>
        {item.name}
      </Text>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={item.items}
        keyExtractor={(plant) => plant.name}
        renderItem={({ item }) => <PlantItem item={item} type="normal" />}
      />
    </View>
  );
};

export default CategorySection;
