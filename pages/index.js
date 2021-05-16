import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Router from "next/router"


import styles from "../styles/Home.module.css"
import Footer from "./components/Footer"

export default function Home() {

  const [searchTerms, setSearchTerms] = useState("")

  const submitSearch = () => {
    // ignore if search is empty
    if (searchTerms === "") return
    Router.push({
      pathname: "/search",
      query: {q: searchTerms}
    })
  }

	return (
		<div className={styles.container}>
			<Head>
				<title>Nasa Image Search</title>
				<meta name="description" content="Nasa Image Search" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div>
					<input 
            className={styles.input}
            id="searchbar"
            type="text"
            placeholder="Search"
            onChange={
              (element) =>{
                const {value} = element.currentTarget
                setSearchTerms(value)
              } 
            }
            onKeyPress={
              (event) => {
                // submits search on enter
                if (event.code === 'Enter')
                  return submitSearch()
              }
            }
          />
          <Image
            src="/search.png"
            width={20}
            height={20}
            onClick={submitSearch}
          />
				</div>
			</main>

			<Footer/>
		</div>
	)
}
