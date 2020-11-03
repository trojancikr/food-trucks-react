import { useEffect, useState } from 'react';
import { searchFoodTrucks, sortFoodTrucksByGoods } from './data';
import cssClasses from './Search.module.css';

function Search({ foodTrucks, onFilterChanged }) {
  const [searched, setSearched] = useState('');
  const [foodTrucksByGoods, setFoodTrucksByGoods] = useState({});
  const [filteredByName, setFilteredByName] = useState(0);
  const [filteredByGoods, setFilteredByGoods] = useState(0);

  useEffect(() => {
    setFoodTrucksByGoods(sortFoodTrucksByGoods(foodTrucks));
  }, [foodTrucks]);

  useEffect(() => {
    const [ids, byName, byGoods] = searched
      ? searchFoodTrucks(foodTrucks, foodTrucksByGoods, searched)
      : [ foodTrucks.keys(), 0, 0];
    setFilteredByName(byName);
    setFilteredByGoods(byGoods);
    onFilterChanged(ids);
  }, [foodTrucks, foodTrucksByGoods, searched]);

  return (
    <section className={cssClasses.container}>
      <input type="search" onChange={(e) => setSearched(e.target.value)} />
      {searched && (
        <div>
          Found {filteredByName} food trucks matching by name and{' '}
          {filteredByGoods} food trucks by offered goods.
        </div>
      )}
    </section>
  );
}

export default Search;
