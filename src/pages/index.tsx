import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

const Home: NextPage<HomeProps> = ({ product }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notícias nooooo</title>
        <meta name="description" content="site de publicações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContainer}>
        <section className={styles.hero}>
          <p>fala, parça</p>
          <h1>Notícias sobre o mundo <span>RPG</span></h1>
          <p>Tenha acesso a todas as publicações <br />
            <span>por apenas {product.amount}</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src='/avatar.svg' alt='figura ilustrativa' width={336} height={521} />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1Ku2FnCkjMuR48QPkOAbHXEB')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount! / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}

export default Home
