import ReviewList from './ReviewList';
import items from '../mock.json';

// 별점이 높은 순으로 정렬하는 것
function App() {
  const sortedItems = items.sort((a, b) => b.rating - a.rating)
  return (
    <div>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
