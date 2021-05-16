import Image from "next/image"

// spinner object for when api data is being fetched

export default function Spinner() {
    return (
        <Image
            src="/spinner.gif"
            width={70}
            height={50}
        />

    )
}