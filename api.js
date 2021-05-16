const {get} = require("https")
const qs = require("qs")


/**
 * Uses the search endpoint of the nasa site for images
 * @param {string} QUERY 
 * @returns {images: [], total_hits: number} 
 */
export const searchImage = (query) => {
    let filtered_query = {...query, media_type: "image"}
    console.log("search: " + "images-api.nasa.gov/search?" + qs.stringify(filtered_query))
    return new Promise ((resolve, reject) => {
        get({
            hostname: "images-api.nasa.gov",
            path: "/search?" + qs.stringify(filtered_query),
            method: "GET"
        },
        (resp) => {
            // converts all the data into a single string
            let data = ""
            resp.on("data", (chunk) => {
                data += chunk;
            })

            // returns data as JSON object
            resp.on("end", () => {
                try {
                    let raw = JSON.parse(data)
                    if (raw.collection === undefined)
                        reject("no results")
                    let res = {
                        images: raw.collection.items,
                        ...raw.collection.metadata,
                    }
                    resolve(res)
                    // resolve(temp)
                } catch (err) {
                    reject(err)
                }
            })
        })
    })
}
    
export const getImageVersions = (href) => {
    return new Promise ((resolve, reject) => {
        get(
            href, 
            (resp) => {
                // converts all the data into a single string
                let data = ""
                resp.on("data", (chunk) => {
                    data += chunk;
                })
                resp.on("end", () => {
                    try {
                        let raw = JSON.parse(data)
                        resolve(raw)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
        )
    })
}

const test = async () => {
    let res = await searchImage({q:"mars"})
    console.log(res)

    // console.log(await getImageVersions(res.images[0].href))
}
test()