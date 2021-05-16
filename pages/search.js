import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import Spinner from "./components/Spinner"
import styles from "../styles/Home.module.css"

import { searchImage } from "../api"

export default function Search() {
    const [results, setResults] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    // fetch the data from the nasa api
    useEffect(() => {
        // ignores if query is empty (skips extra api call)
        if (!router.query || Object.keys(router.query).length === 0) return
        
        searchImage(router.query).then((res)=>{
            setResults(res)
            // finished fetching data
            setIsLoading(false)
        })
    }, [])

    // display loading icon
    console.log(results)

    return <div className={styles.container}>
        {(isLoading) ? <Spinner/> : <> stuff</>}
        </div>
}