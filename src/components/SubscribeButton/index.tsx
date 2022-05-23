import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const {data: session} = useSession()
    const router = useRouter()

    async function  handleSubscribe(){
        if (!session){
            signIn('github')
            return
        }
        if (session.activeSubscription) {
            router.push('/blog')
            return
        }

        try {
            const response = await api.post('/subscribe')

            const {sessionId} = response.data
            
            const stripe = await getStripeJs()

            await stripe!.redirectToCheckout({sessionId})
        }  catch (err) {
            if (err instanceof Error) {
                alert(err.message)
            } else {
                // do something else with what was thrown, maybe?
                alert(String(err))
              }
        }
    } 
        return (
        <button type='button'
            className={styles.button}
            onClick={handleSubscribe}
            >Se inscreva agora</button>
    )
}