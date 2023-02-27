import {useState} from "react";

const useDebouncedInput = ({ defaultText = '', debounceTime = 750 }) => {
    const [text, setText] = useState(defaultText)
    const [t, setT] = useState(null)

    const onChange = (text: string) => {
        if (t) clearTimeout(t)
        // @ts-ignore
        setT(setTimeout(() => setText(text), debounceTime))
    }

    return [text, onChange]
}