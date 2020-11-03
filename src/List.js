import { useEffect, useState } from 'react';
import Item from './Item';
import { useApi } from './useApi';
import cssClasses from './List.module.css';
import Search from './Search';
import { decorateFoodTrucksWithFavorites, filterFoodTrucks } from './data';
import MapView from './MapView';

function List() {
  const [foodTrucks] = useApi();
  const [filtered, setFiltered] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [list, setList] = useState([]);

  function handleFilterChanged(ids) {
    const result = filterFoodTrucks(foodTrucks, ids);
    setFiltered(result);
  }


  function handleFavoriteToggle(id) {
    const updatedFavorites = new Set(favorites)
    if (updatedFavorites.has(id)) {
      updatedFavorites.delete(id);
    } else {
      updatedFavorites.add(id);
    }
    setFavorites(updatedFavorites);
  }

  useEffect(() => {
    const result = decorateFoodTrucksWithFavorites(filtered, favorites);
    setList(result);
  }, [filtered, favorites]);

  const limited = list.slice(0, 20);
  console.log(limited)

  return (
    <div>
      <Search foodTrucks={foodTrucks} onFilterChanged={handleFilterChanged} />
      <div className={cssClasses["display-status"]}>
        Displaying {limited.length} of {filtered.length} your preferred from{' '}
        {foodTrucks.size} total food trucks.
      </div>
      <ul className={cssClasses.list}>
        {limited.map((foodTruck) => (
          <li key={foodTruck.id}>
            <Item
              foodTruck={foodTruck}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </li>
        ))}
      </ul>
      <MapView pins={limited} />
    </div>
  );
}

export default List;
