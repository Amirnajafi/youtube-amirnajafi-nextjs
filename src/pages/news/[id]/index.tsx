import { useRouter } from "next/router"

const NewsItem = () =>{
    const router = useRouter()
    const {id} = router.query
    return (
        <h2>Hello from News {id}</h2>
    )
}
export default NewsItem