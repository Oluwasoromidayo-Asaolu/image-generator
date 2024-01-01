import React from "react";
import './TextInput.css';
const TextInput = ({ handleInputChange, onButtonGenerate }) => {
    return(
        <div className="textInputDiv">
            <input placeholder="input your text here" onChange={ handleInputChange }/>
            <button type="submit" onClick={ onButtonGenerate }>Generate</button>
        </div>
    )
}
export default TextInput;