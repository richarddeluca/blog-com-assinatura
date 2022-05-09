import Image from 'next/image'
import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton'
export function Header() {
    return (
        <>
            <header className={styles.container}>
                <div className={styles.content}>
                    <Image src="/vercel.svg" alt="logo.svg" width={120} height={120} />
                    <nav>
                        <a className={styles.active} >Home</a>
                        <a>Posts</a>
                    </nav>
                    <SignInButton />
                </div>
            </header>
        </>
    )
}