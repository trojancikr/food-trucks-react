function asGoods(value) {
  const result = new Set();
  if (typeof value === 'string') {
    value
      .split(':')
      .flatMap((x) => x.split(';'))
      .map((s) => s.trim())
      .forEach((s) => result.add(s));
  }
  return Array.from(result);
}

export function transformPayloadToFoodTruckMap(data) {
  const result = new Map();
  data.forEach(({ objectid, applicant, fooditems, locationdescription, latitude, longitude }) => {
    result.set(objectid, {
      name: applicant,
      goods: asGoods(fooditems),
      area: locationdescription,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });
  });
  return result;
}

export function sortFoodTrucksByGoods(foodTruckMap) {
  const result = {};
  foodTruckMap.forEach(({ goods }, id) => {
    goods.forEach((good) => {
      if (result[good]) {
        result[good].add(id);
      } else {
        result[good] = new Set([id]);
      }
    });
  });
  return result;
}

export function getFoodTruckIdsByGoods(foodTruckByGoodsMap, searchedGoods) {
  const result = new Set();
  const searched = searchedGoods.toLowerCase();
  Object.entries(foodTruckByGoodsMap).forEach(([goods, ids]) => {
    if (goods.toLowerCase().search(searched) >= 0) {
      ids.forEach((id) => result.add(id));
    }
  });
  return result;
}

export function getFoodTruckIdsByName(foodTruckMap, searchedTruck) {
  const result = new Set();
  const searched = searchedTruck.toLowerCase();
  foodTruckMap.forEach(({ name }, id) => {
    if (name.toLowerCase().search(searched) >= 0) {
      result.add(id);
    }
  });
  return result;
}

export function searchFoodTrucks(foodTruckMap, foodTruckByGoodsMap, searched) {
  const idsByName = getFoodTruckIdsByName(foodTruckMap, searched);
  const idsByGoods = getFoodTruckIdsByGoods(foodTruckByGoodsMap, searched);
  const result = Array.from(new Set([...idsByName, ...idsByGoods]));
  return [result, idsByName.size, idsByGoods.size];
}

export function filterFoodTrucks(foodTruckMap, filteredIds) {
  const result = Array.from(filteredIds).map((id) => {
    const { name, goods, area, latitude, longitude } = foodTruckMap.get(id);
    return { id, name, goods, area, latitude, longitude };
  });
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

export function decorateFoodTrucksWithFavorites(foodTrucks, favoriteIds) {
  return foodTrucks.map(record => Object.assign({}, record, { favorite: favoriteIds.has(record.id) }))
}