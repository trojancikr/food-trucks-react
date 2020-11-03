import { useEffect, useState } from 'react';
import { transformPayloadToFoodTruckMap } from './data';

export function useApi() {
  const [foodTrucks, setFoodTrucks] = useState(new Map());

  useEffect(() => {
    fetch('https://data.sfgov.org/resource/rqzj-sfat.json', {
      headers: {
        'X-App-Token': 'nZcNOfEHAE5MWmuMxRuKE5GWR',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFoodTrucks(transformPayloadToFoodTruckMap(data));
      });
  }, []);

  return [foodTrucks];
}
