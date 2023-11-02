import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Plant } from "../db";
import { getAllCategories, getAllFlowerFromDb } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

interface AppContextType {
  categories: string[];
  plants: Plant[];
  favourites: Plant[];
  addData: (plant: Plant) => Promise<void>;
  deleteData: (plant: Plant) => Promise<void>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext<AppContextType>(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories] = useState<string[]>(getAllCategories());
  const [plants] = useState<Plant[]>(getAllFlowerFromDb());
  const [favourites, setFavourites] = useState<Plant[]>([]);

  const getData = async () => {
    let data = await AsyncStorage.getItem("favourites");

    if (data === null) {
      data = JSON.stringify([]);
      setFavourites([]);
      await AsyncStorage.setItem("favourites", data);
    }
    const favourites = JSON.parse(data);
    setFavourites(favourites);
  };

  const addData = async (plant: Plant) => {
    try {
      const fav = favourites?.find((item) => item.name === plant.name);
      if (fav) {
        Toast.show(`${fav.name} already in favourite`, {
          duration: Toast.durations.SHORT,
        });

        return;
      }
      setFavourites((prev) => {
        const newValue = [...prev!, plant];
        AsyncStorage.setItem("favourites", JSON.stringify(newValue));
        Toast.show(`${plant.name} added successfully`, {
          duration: Toast.durations.SHORT,
        });
        return newValue;
      });
    } catch (error) {}
  };
  const deleteData = async (plant: Plant) => {
    try {
      setFavourites((prev) => {
        const fav = favourites?.filter((item) => item.name !== plant.name);
        AsyncStorage.setItem("favourites", JSON.stringify(fav));
        Toast.show(`${plant.name} deleted successfully`, {
          duration: Toast.durations.SHORT,
        });
        return fav;
      });
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    // @ts-ignore
    <AppContext.Provider
      value={{ plants, categories, favourites, addData, deleteData }}
    >
      {children}
    </AppContext.Provider>
  );
}
