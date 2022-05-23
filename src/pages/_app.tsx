import { SessionProvider } from "next-auth/react";
import { Header } from '../components/Header'

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { PrismicProvider, PrismicLink } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { linkResolver, repositoryName } from '../../prismicio'
import Link from "next/link";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>
            {children}
          </a>
        </Link>
      )}    
    >
    <SessionProvider session={session}>

      <Header />
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </SessionProvider>
    </PrismicProvider>  
  )
}

export default MyApp
