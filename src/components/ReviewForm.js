import { useState } from "react";
import './ReviewList.css'
function ReviewForm() {
    const [title, setTitle] = useState(''); 
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    // 이벤트 핸들러 함수 
    // input 의 value 가 변경될 때마다 그 값으로 state 로 변경해줄 것이다. 
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleRatingChange = (e) => {
        const nextRating = Number(e.target.value);
        setRating(nextRating);
    };
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    return (
    <form className="ReviewForm">
        <input value={title} onChange={handleTitleChange}/>
        <input type="number" value={rating} onChange={handleRatingChange}/>
        <input value={content} onChange={handleContentChange}/>
    </form>
    );
}
    
// React 에서는 input 의 값을 state 로 관리한다. => state 값과 input 의 값을 동일하게 만드는 것이 핵심이다. 
// 이를 제어 component 라고 한다. 

// js, html 에서 onChange 사용자 입력이 끝났을 때 발생하는 이벤트 
// jsx 에서 onChange event 사용자가 값을 입력할 때마다 onChange event 가 발생한다. 
export default ReviewForm;