import {
  AirbnbRating,
  Button,
  FAB,
  Image,
  Text,
  makeStyles,
} from "@rneui/themed";
import { Stack, useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { theme } from "../../styles/theme";
import { useAppContext } from "../../context/Context";
import { Plant } from "../../db";
import { getPlantByName } from "../../utils";

function renderCountries(countries: string[] | string) {
  const countryList = {
    Taiwan: "https://cdn.britannica.com/62/4562-004-C04E54C5/Flag-Taiwan.jpg",
    Vietname:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
    Thailand:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1280px-Flag_of_Thailand.svg.png",
  };
  let res;
  if (typeof countries === "string") {
    res = (
      <Image
        containerStyle={{
          width: 70,
          height: 35,
        }}
        style={{
          resizeMode: "contain",
        }}
        source={{
          uri: countryList[countries as keyof typeof countryList],
        }}
      />
    );
  } else {
    {
      res = countries.map((country) => (
        <Image
          style={{
            width: "100%",
            height: 200,
          }}
          source={{
            uri: countryList[country as keyof typeof countryList],
          }}
        />
      ));
    }
  }
  return res;
}

export default function Page() {
  const { id } = useGlobalSearchParams();
  const styles = useStyles();
  const { favourites, addData, deleteData } = useAppContext();
  const plant = getPlantByName(id as string);

  const isFavourite = favourites.includes(
    favourites.find((p) => p.name === plant?.name) || ({} as Plant),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.title}>
        {id}({plant?.price}$)
      </Text>
      <Text style={{ marginTop: 10 }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam vel
        veniam corrupti libero dolores, sequi illo quia. In consequuntur velit
        eius aspernatur ut fuga necessitatibus sit odit quia quibusdam.
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Weight: </Text>
        <FAB
          title={`${plant?.weight.toString()}G`}
          color={theme.lightColors?.primary}
          size="small"
          style={{
            width: 100,
            height: 50,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Color: </Text>
        <FAB
          title={plant?.color}
          color={plant?.color}
          size="small"
          style={{
            width: 100,
            height: 50,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Origin: </Text>
        <View style={{ marginVertical: 5 }}>
          {renderCountries(plant?.origin || "")}
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Rating: </Text>
        <AirbnbRating
          ratingContainerStyle={{ width: 100 }}
          selectedColor={theme.lightColors?.primary}
          showRating={false}
          isDisabled={true}
          defaultRating={Number(plant?.rating) || 0}
          size={15}
        />
      </View>
      <Image
        style={{
          width: "100%",
          height: 200,
        }}
        source={{
          uri: plant?.image,
        }}
      />
      {/* <Button title="Back" onPress={() => addData(plant || ({} as Plant))} /> */}
      {isFavourite ? (
        <Button
          title="Delete"
          onPress={() => deleteData(plant || ({} as Plant))}
        />
      ) : (
        <Button title="Add" onPress={() => addData(plant || ({} as Plant))} />
      )}
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: "800",
    textAlign: "center",
  },
}));
