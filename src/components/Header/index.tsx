import Image from 'next/image'
import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton'
import Link from 'next/link'
import { ActiveLink } from '../ActiveLink'
export function Header() {
    return (
        <>
            <header className={styles.container}>
                <div className={styles.content}>
                    <Link passHref href='/'><Image src="/vercel.svg" alt="logo.svg" width={120} height={120} /></Link>
                    <nav>
<ActiveLink activeClassName={styles.active} href='/'>
                        <a className={styles.active} >Home</a>
</ActiveLink>
<ActiveLink activeClassName={styles.active} href='/blog'>
                        <a>Posts</a>
</ActiveLink>
                    </nav>
                    <SignInButton />
                </div>
            </header>
        </>
    )
}