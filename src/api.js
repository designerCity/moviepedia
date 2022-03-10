// request 함수들을 모아놓을 파일 
// 비동기함수 async await 사용 
export async function getReviews({
  order = 'createdAt', offset = 0, limit = 6,    
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/api/film-reviews?${query}`)
  const body = await response.json();
  return body;
}
  // 이렇게 ?뒤에 keyvalue 를 지정하는 것을 query 라고 한다. 
