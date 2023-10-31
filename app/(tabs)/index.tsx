import { Text, makeStyles } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { useAppContext } from "../../context/Context";

import PlantItem from "../../components/PlantItem";

export default function TabOneScreen() {
  const styles = useStyles();
  const { plants } = useAppContext();
  return (
    <SafeAreaView style={styles.container}>
      <Text h2 style={styles.title}>
        New arrivals
      </Text>
      <View
        style={{
          height: "100%",
        }}
      >
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={plants}
          keyExtractor={(plant) => plant.name}
          renderItem={({ item }) => <PlantItem item={item} type="normal" />}
        />
      </View>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.white,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 700,
  },
}));
