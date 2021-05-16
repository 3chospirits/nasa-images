import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Image from "next/image"

import Spinner from "./components/Spinner"
import styles from "../styles/Home.module.css"

import { searchImage } from "../api"
import Footer from "./components/Footer"
import ImagePreview from "./components/ImagePreview"






export default function Search(props) {
    const [results, setResults] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    console.log(router)

    // console.log(params.plan_id)

    // fetch the data from the nasa api
    // useEffect(() => {
        
    // }, [])

    useEffect(() => {
        console.log(router.query)
        // ignores if query is empty (skips extra api call)
        if (!router.query || Object.keys(router.query).length === 0) return
        
        searchImage(router.query).then((res)=>{
            setResults(res)
            // finished fetching data
            setIsLoading(false)
        })
    }, [router])

    // display loading icon
    console.log(results)

    if (results === undefined) return <></>
    results.images = [results.images[0]]
    return <div className={styles.container}>
        <main className={styles.main}>
            {(isLoading || !results) ? <Spinner/> : 
            <>{}
                {results.images.map((imgData)=>{
                    return ImagePreview(imgData)
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
        </main>
        <Footer/>
        </div>
}