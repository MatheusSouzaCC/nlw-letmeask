import { useState } from "react";

type ButtonProps = {
    children?: string
}

export function Button(porps: ButtonProps){

    const [counter, setCounter] = useState(0);

    function increment(){
        setCounter(counter + 1);
    }

    return (
        <button onClick={increment}>{porps.children || ""} ({counter})</button>
    );
}