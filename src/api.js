const BASE_URL = 'https://learn.codeit.kr/api'

// // request 함수들을 모아놓을 파일 

// 비동기함수 async await 사용 
export async function getReviews({
  order = 'createdAt', 
  offset = 0, 
  limit = 6,    
}) {
  // throw new Error('버그가 아니라 기능입니다!')
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`)
  if (!response.ok) {
    throw new Error('리뷰를 불러오는데 실패했습니다.')
  }
  const body = await response.json();
  return body;
}

// 이렇게 ?뒤에 keyvalue 를 지정하는 것을 query 라고 한다. 

export async function createReviews(formdata) {
  const response = await fetch(
    `${BASE_URL}/film-reviews`, {
      method: 'POST',
      body: formdata,
    }
  )
  if (!response.ok) {
    throw new Error('리뷰를 생성하는데 실패했습니다.')
  }
  const body = await response.json();
  return body;
}
