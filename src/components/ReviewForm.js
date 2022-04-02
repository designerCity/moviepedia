import { useState } from "react";
import { createReviews } from "../api";
import FileInput from "./FileInput";
import RatingInput from "./RaingInput";
import './ReviewList.css'
const INITIAL_VALUES = {
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
};

function ReviewForm({ onSubmitSuccess }) {
    const [inSubmitting, setIsSubmitting] = useState(false);  // 서버에 POST 할 때 여러 번 눌리지 않게끔 해주는 코드 
    const [submittingError, setSubmittingError] = useState(null);
    
    // const [title, setTitle] = useState(''); 
    // const [rating, setRating] = useState(0);
    // const [content, setContent] = useState('');
    const [values, setValues] = useState(INITIAL_VALUES);

    // 이벤트 핸들러 함수 
    // input 의 value 가 변경될 때마다 그 값으로 state 로 변경해줄 것이다. 
    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // }
    // const handleRatingChange = (e) => {
    //     const nextRating = Number(e.target.value);
    //     setRating(nextRating);
    // };
    // const handleContentChange = (e) => {
    //     setContent(e.target.value);
    // };
    const handleChange = (name, value) => {
        setValues((preValues) => ({
            ...preValues,
            [name]: value, // name 의 값으로 property 로 지정하고 해당하는 values 를 지정해준다. 
        }))
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('title', values.title);
        formdata.append('rating', values.rating);
        formdata.append('content', values.content);
        formdata.append('imgFile', values.imgFile);

        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            result = await createReviews(formdata)
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally{
            setIsSubmitting(false);
        }
        const { review } = result;
        onSubmitSuccess(review);
        setValues(INITIAL_VALUES);
    }
    // html form 태그의 기본동작은 sumbit 버튼을 눌렀을때 입력폼의 값과 함께 getrequest 를 보내는 것이다.,
// 그래서 event object 에 prventDefault 함 수를 사용하는 것이다.
    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
            <input name='title' value={values.title} onChange={handleInputChange}/>
            <RatingInput name="rating" value={values.rating} onChange={handleChange} />
            <input name="content" value={values.content} onChange={handleInputChange}/>
            <button type="submit" disabled={inSubmitting}>확인</button>
            {submittingError?.messege && <div>{submittingError.messege}</div>}
        </form>
    );
}
export default ReviewForm;
// React 에서는 input 의 값을 state 로 관리한다. => state 값과 input 의 값을 동일하게 만드는 것이 핵심이다. 
// 이를 제어 component 라고 한다. 
// js, html 에서 onChange 사용자 입력이 끝났을 때 발생하는 이벤트 
// jsx 에서 onChange event 사용자가 값을 입력할 때마다 onChange event 가 발생한다. 
// type submit 인 btn 을 만들면 이 버튼을 클릭하면 Form 태그에서 onSubmit 이벤트가 발생한다 