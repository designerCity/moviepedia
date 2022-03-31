import './Rating.css';

const RATINGS = [1, 2, 3, 4, 5]; // 값 별점이 나타내는 값을 요소로 하는 배열

// selected prop 의 역할 : 값이 참일 때, selected 라는 css 를 추가해서 색깔을 다르게 보여줄 것이다. 
function Star({ selected = false, rating, onSelect, onHover }) { 
    const className = `Rating-star ${selected ? 'selected' : ''}`;
    // 별점을 클릭했을 때 실행할 함수
    const handeClick = onSelect ? () => onSelect(rating) : undefined;

    const handeMouseOver = onHover ? () => onHover(rating) : undefined;

    return (
        <span 
            className={className} 
            onClick={handeClick} 
            onMouseOver={handeMouseOver} 
        >
            *
        </span>
    );
}

function Rating({ value = 0, onSelect, onHover, onMouseOut }) {
    return (
        <div onMouseOut={onMouseOut}>
            {RATINGS.map((rating) => (
                <Star 
                    key={rating} 
                    selected={value >= rating} 
                    rating={rating} 
                    onSelect={onSelect} 
                    onHover={onHover}
                />
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
