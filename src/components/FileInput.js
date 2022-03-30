import { useEffect, useRef, useState } from "react";

// 파일을 선택하여 console 에 출력해줄 함수 // props 로 name, value, onchange 를 받고,
function FileInput({ name, value, onChange }) {
    const [preview, setPreview] = useState();

    // const [value, setValue] = useState();
    const inputRef = useRef();
    const handleChange = (e)  => {
        // console.log(e.target.value) // 보안을 위해서 웹 브라우저는 사용자의 파일 경로를 숨겨준다.
        const nextValue = e.target.files[0];
        // setValue(nextValue)
        onChange(name, nextValue);
    };
    // useEffect 를 사용할 때
    // useEffect(() => {
    //     if (inputRef.current) {
    //         console.log(inputRef.current);
    //     }
    // }, [])
    
    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value = '';
        onChange(name, null)
    }
    // 이런 식으로 component 함수에서 외부의 상태를 바꾸는 것을 sideEffect 라고 한다. 이런 sideEffect 를 할때, useEffect 를 많이 활용한다. 
    useEffect(() => {
        if (!value) return;
        // objectURL 만들기 (이 함수는 문자열을 리턴한다)
        const nextPreview = URL.createObjectURL(value)
        setPreview(nextPreview)
        // 사이드 이펙트 정리하기 revokeObjectURL 을 이용하여 진행한다. 
        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview)
        }
    }, [value])
    return (
        <div>
            <img src={preview} alt="img 미리보기"></img>
            <input 
                type="file" 
                accept="image/png, image/jpeg"
                onChange={handleChange} 
                ref={inputRef} 
            />
            {value && <button onClick={handleClearClick}>reset</button>}
        </div>
    );
}
// file input 은 value prop 을 지정할 수 없고, 반드시 비제어 component 로 만들어야 한다.
// js 에서 갑을 사용자만이 바꿀 수 있게끔 만들기 위함.
// console 창으로 보는 error 추적 : stack trace 라고 부른다.
export default FileInput;
