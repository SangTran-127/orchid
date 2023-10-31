import { Categories, Plant } from "../db";

export function getAllFlowerFromDb() {
  return Categories.reduce((acc, current) => {
    return [...acc, ...current.items];
  }, [] as Array<Plant>);
}

export function getAllCategories() {
  return Categories.map((cate) => cate.name);
}

export function getPlantByName(name: string) {
  return getAllFlowerFromDb().find((plant) => plant.name === name);
}
