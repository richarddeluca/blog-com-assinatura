import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import {useRouter} from "next/router"
import { useEffect } from "react"

const Success = () => {
  
  const router = useRouter()
  
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }, [])

  return (
      <>
      <h1>Inscrição feita som sucesso</h1>
      <p>iremos te redirecionar para a página inicial</p>
      </>
  )
}

export default Success