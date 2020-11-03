import cssClasses from './Item.module.css';
import HeartIcon from './HeartIcon';

function Item({ foodTruck, onFavoriteToggle }) {
  const { id, name, goods, area, favorite } = foodTruck;

  return (
    <section>
      <div className={cssClasses.header}>
        <h2>{name}</h2>
        <button className={cssClasses["favorite-button"]} onClick={() => onFavoriteToggle(id)}>
          <HeartIcon className={favorite ? cssClasses.active : cssClasses.inactive} />
        </button>
      </div>
      <div className={cssClasses.body}>
        <span>{area}</span>
        <ul className={cssClasses['goods-list']}>
          {goods.map((good) => (
            <li key={`${id}-${name}-${good}`}>{good}</li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default Item;
