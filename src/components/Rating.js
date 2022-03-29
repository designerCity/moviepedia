import './Rating.css';

const RATINGS = [1, 2, 3, 4, 5]; // 값 별점이 나타내는 값을 요소로 하는 배열

function Star({ selected = false}) { // selected prop 의 역할 : 값이 참일 때, selected 라는 css 를 추가해서 색깔을 다르게 보여줄 것이다. 
    const className = `Rating-star ${selected ? 'selected' : ''}`;
    return <span className={className}>*</span>;
}

function Rating({ value = 0 }) {
    return (
        <div>
            {RATINGS.map((rating) => (
                <Star key={rating} selected={value >= rating} />
            ))}
            {/* <Star selected={value >= 1}/>
            <Star selected={value >= 2}/>
            <Star selected={value >= 3}/>
            <Star selected={value >= 4}/>
            <Star selected={value >= 5}/> */}
        </div>
    );
}
// 배열을 렌더링할 때 반드시 key 값을 지정 해줘야한다.
export default Rating;