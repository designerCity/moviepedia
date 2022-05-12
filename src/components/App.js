import ReviewList from './ReviewList';
import { useEffect, useState } from 'react';
import { getReviews } from '../api';
import ReviewForm from './ReviewForm';

const LIMIT = 6;  


// 별점이 높은 순으로 정렬하는 것

function App() {
  // mockItems를 여러 부분으로 사용할 수 있게 미리 clone 을 만들어둔다. 
  // items state 는 현재 페이지의 배열을 나타냄.
  const [items, setItems] = useState([]);
  // offSet state 를 만들고, 배열의 첫 번째 index 인 0을 초기값으로 설정해준다. 
  const [offset, setOffset] = useState(0);
  // 정렬 기준을 선택할 수 있게끔 state 를 활용하는 방법.
  const [order, setOrder] = useState('createdAt')
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  // hasNext state : 더 보기란이 없을때를 초기값으로
  const [hasNext, setHasNext] = useState(false)
  // network loading 을 처리할 state
  const [isLoading, setIsLoading] = useState(false)
  // network error 를 처히라 state 
  const [loadingError, setLoadingError] = useState(null)
  // button 태그를 통해 최신순이나 별점순을 선택할 수 있게끔 하는 것. // 표현에 주의하자 // 즉시실행함수로 표현해야함.
  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');
  


  // ReviewList component 에서 handleDeleteClcik 함수는 item 의 id 를 삭제하면, 
  // 그 div 의 id 가 사라진거지, 모든 것이 사라진 것이 아닌데, 원래의 items 의 각 id 와 삭제된 id 가 같지 않으면,
  // filter method 를 통해서 true 인 값만은 callback 하는 함수 를 통해서 삭제한 state 를 nextItems 에 저장하여, browser 에 보여준다. 
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  
  // click 하면 network 로 data 를 받아와서 items state 를 변경할 버튼
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true)
      setLoadingError(null)
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error)
      return
    } finally {
      setIsLoading(false);
    }
    // response body 에 있는 reviews 라는 값을 destructuring 
    const { reviews, paging } = result;
    if (options.offset === 0) {
      // state 를 변경 
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length );
    setHasNext(paging.hasNext);
  }
  // 다음 페이지를 불러올 handleLoadMore 함수 
  const handleLoadMore = () => {
    // 객체 안에 있는 것들을 request 로 보냄
    handleLoad({ order, offset: offset, LIMIT });
  }
  
  const handleSubmitSuccess = (review) => {
    setItems((prevItems) => [review, prevItems])
  }

// handleLoad; 이렇게 작성하면 무한루프에 걸린다. 이럴때 useEffect 함수 사용하여 초기 데이터를 가져올 수 있다. 
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button className='btn' onClick={handleNewestClick}>최신순</button>
        <button className='btn' onClick={handleBestClick}>별점순</button>
      </div>
      <ReviewForm onSubmitSuccess={handleSubmitSuccess} />
      <ReviewList items={sortedItems} onDelete={handleDelete}/>
      {hasNext && <button disabled={isLoading} onClick={ handleLoadMore }>MORE</button>}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}
// {hasNext && <button onClick={ handleLoadMore }>MORE</button>} hasNext 가 false 이면 rendering 을 되지 않고, hasNext true 이면 뒤의 btn tag 도 true 라서 둘다 출력됨. 
export default App;
