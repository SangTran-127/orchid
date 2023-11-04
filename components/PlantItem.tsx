import { View, Text } from "react-native";
import React, { FC } from "react";
import { AirbnbRating, Button, Card } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Plant } from "../db";
import { theme } from "../styles/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useAppContext } from "../context/Context";

interface PlantItemProps {
  item: Plant;
  type: "normal" | "favourite";
}

const PlantItem: FC<PlantItemProps> = ({ item, type }) => {
  const { addData, deleteData } = useAppContext();
  return (
    <Card>
      <TouchableOpacity onPress={() => router.push(`/(tabs)/${item.name}`)}>
        <Card.Image
          source={{
            uri: item.image,
          }}
        />
      </TouchableOpacity>

      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            color: theme.lightColors?.primary,
            fontWeight: "700",
            fontSize: 17,
          }}
        >{`${item.name} | ${item.price}$`}</Text>

        <View
          style={{
            marginTop: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AirbnbRating
            ratingContainerStyle={{ width: 100 }}
            selectedColor={theme.lightColors?.primary}
            showRating={false}
            isDisabled={true}
            defaultRating={+item.rating}
            size={15}
          />
          {type === "normal" ? (
            <Button
              color="secondary"
              containerStyle={{
                borderColor: theme.lightColors?.secondary,
                borderRadius: 10,
              }}
              onPress={() => addData(item)}
              icon={<FontAwesome name="plus" color="#FF621D" />}
            />
          ) : (
            <Button
              color="secondary"
              containerStyle={{
                borderColor: theme.lightColors?.secondary,
                borderRadius: 10,
              }}
              onPress={() => deleteData(item)}
              size="lg"
              icon={<FontAwesome name="remove" color="#FF621D" />}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default PlantItem;
