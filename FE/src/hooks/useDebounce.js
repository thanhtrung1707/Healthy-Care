import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useState } from "react"

export const useDebounce = (value,delay) => {
    const [valueDebunce,setValueDebounce] = useState('')
    useEffect(() => {
      
    const handle = setTimeout(() => {
        setValueDebounce(value)
    },[delay])
    return () => {
        clearTimeout(handle)
    }
    }, [value])
    
    return valueDebunce
}