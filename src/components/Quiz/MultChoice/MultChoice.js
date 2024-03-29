import React from "react";
import Form from "react-bootstrap/Form";
import './MultChoice.css'
import xmark from "../../../assets/x.svg";
import checkmark from "../../../assets/check.svg";

//Displays radio buttons for multiple choice questions for quiz page and results page
const MultChoice = (props) => {
    let components = []
    for (let i = 0; i < props.answerChoices.length; i++) {
        if (props.disabled === 'true'){
            if (i === props.selected) {
                if (props.selected === props.answer){
                    components.push(
                        <Form.Check 
                        type="radio"
                        key={`formHorizontalRadios` + (i+1)}
                        label={<div><strong>{props.answerChoices[i]}</strong> 
                        <img src = {checkmark} alt = "checkmark"/></div>}
                        name="formHorizontalRadios"
                        disabled = {true}
                        className = 'correct selected'
                        />
                    ) 
                } else {
                    components.push(
                        <Form.Check 
                        type="radio"
                        key={`formHorizontalRadios` + (i+1)}
                        label={<div><strong>{props.answerChoices[i]}</strong>
                        <img src = {xmark} alt = "xmark"/></div>}
                        name="formHorizontalRadios"
                        disabled = {true}
                        className = 'wrong selected'
                        />
                    )
                }
            }else if (i === props.answer) {
                components.push(
                    <Form.Check 
                    type="radio"
                    key={`formHorizontalRadios` + (i+1)}
                    label={<div><strong>{props.answerChoices[i]}</strong>
                    <img src = {checkmark} alt = "checkmark"/></div>}
                    name="formHorizontalRadios"
                    disabled = {true}
                    className = 'correct'
                    />
                )
            }else {
                components.push(
                    <Form.Check 
                    type="radio"
                    key={`formHorizontalRadios` + (i+1)}
                    label={props.answerChoices[i]}
                    name="formHorizontalRadios"
                    disabled = {true}
                    />
                )
            }
        } else {
            components.push(
                <Form.Check 
                type="radio"
                key={`formHorizontalRadios` + (i+1)}
                label={props.answerChoices[i]}
                name="formHorizontalRadios"
                onChange = {(e) => props.onSelect(i, props.question, e)}
                />
            )
            // if (props.question === '1'){
            //     components.push(
            //         <Form.Check 
            //         type="radio"
            //         key={`formHorizontalRadios` + (i+1)}
            //         label={props.answerChoices[i]}
            //         name="formHorizontalRadios"
            //         onChange = {(e) => props.onSelect(i, 1, e)}
            //         />
            //     )
            // }
            // else if (props.question === '2') {
            //     components.push(
            //         <Form.Check 
            //         type="radio"
            //         key={`formHorizontalRadios` + (i+1)}
            //         label={props.answerChoices[i]}
            //         name="formHorizontalRadios"
            //         onChange = {(e) => props.onSelect(i, 2, e)}
            //         />
            //     )
            // }
            // else {
            //     components.push(
            //         <Form.Check 
            //         type="radio"
            //         key={`formHorizontalRadios` + (i+1)}
            //         label={props.answerChoices[i]}
            //         name="formHorizontalRadios"
            //         onChange = {(e) => props.onSelect(i, 3, e)}
            //         />
            //     )
            // }
            
        }
    }
    return (
        <Form>
        <Form.Group className = "radios">
            <div className = "radios-wrapper">
                <div className = "align-wrapper">
                {components}
                </div>
            </div>
        </Form.Group>
        </Form>
        
    )
}

export default MultChoice;