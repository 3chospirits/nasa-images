import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Image from "next/image"

import Spinner from "./components/Spinner"
import styles from "../styles/Home.module.css"

import { searchImage } from "../api"

export default function Search() {
    const [results, setResults] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    console.log(params.plan_id)

    // fetch the data from the nasa api
    useEffect(() => {
        console.log("router.query")
        console.log(router)
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

    if (results === undefined) return <></>

    return <div className={styles.container}>
        {(isLoading || !results) ? <Spinner/> : 
        <>
        {/* {JSON.stringify(results)} */}
            {/* {console.log(results)} */}
            {results.images.map((imgData)=>{
                return <>
                    <div>{imgData.data[0].title}</div>
                    <Image
                        src={imgData.links[0].href}
                        layout="responsive"
                        height={50}
                        width={50}
                    />
                </>
                
            })}
        </>
        }
        </div>
}