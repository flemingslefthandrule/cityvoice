import { useState } from "react";

const Option = (props) => {
    const updateOption = props.updateOption || (() => { });
    const opt = "Option " + props.index;
    const [optionValue, setOptionValue] = useState("");

    const handleChange = (event) => {
        setOptionValue(event.target.value);
        props.updateOption(props.index, event.target.value); // Pass complete value
    };

    return (
        <>
            <input className="rounded-[100px] p-2" type="text" name={opt} placeholder={opt} value={optionValue} onChange={handleChange} />
        </>
    );
}

export default Option;
