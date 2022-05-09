import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from "next-auth/react"

export function SignInButton() {
    const { data: session } = useSession();

    const nomeDeUsuario = 'Richard Deluca'
    const logColor = {
        on: '#92f6a6',
        off: '#f6f6a6'
    }
    return session ? (
        <button
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color={logColor.on} className={styles.logo} />
            {nomeDeUsuario}
            <FiX className={styles.closeX} type='button' onClick={() => signOut()} />
        </button>
    ) :
        (
            <button
                type="button"
                className={styles.signInButton}
                onClick={() => signIn()}
            >
                <FaGithub color={logColor.off} className={styles.logo} />
                Sign in with Github
            </button>
        )
}