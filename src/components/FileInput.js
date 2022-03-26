import { useRef } from "react";

// 파일을 선택하여 console 에 출력해줄 함수 // props 로 name, value, onchange 를 받고,
function FileInput({ name, value, onChange }) {
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
    return (
        <div>
            <input type="file" onChange={handleChange} ref={inputRef} />
            {value && <button onClick={handleClearClick}>reset</button>}
        </div>
    );
}
// file input 은 value prop 을 지정할 수 없고, 반드시 비제어 component 로 만들어야 한다.
// js 에서 갑을 사용자만이 바꿀 수 있게끔 만들기 위함.
// console 창으로 보는 error 추적 : stack trace 라고 부른다.


export default FileInput;
