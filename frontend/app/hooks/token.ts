import { useRouter } from "next/navigation"
import { useToken } from "../store/token"
export default function UseToken(){
    const router = useRouter()
    const token = useToken((state) => state.token)
    const setToken = useToken((state) => state.setToken)

    const handleUpdateToken = () => {
        setToken(null)
        router.refresh()
    }
    return{token, setToken, handleUpdateToken}
}