import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Link from "next/link";
import { createClient, linkResolver } from "../../../../prismicio";
import { components } from "../../../../slices";
import styles from '../stylesUid.module.scss'
import { getSession, useSession } from "next-auth/react";
import { convertCompilerOptionsFromJson } from "typescript";
import { useRouter } from "next/router";
import { useEffect } from "react";


const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "blog_content")
    .map((slice) => prismicH.asText(slice.items[0].content))
    .join(" ");

  const excerpt = text.substring(0, 2000);


  if (text.length > 2000) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const ArticlePreview = ({ article, params }) => {
  const {data: session} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/blog/${params.uid}`)
    }
  }, [session])
  
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const excerpt = getExcerpt(article.data.slices);
    const putExcerpt = () => {
      if(!session?.activeSubscription) {
        return (
          <p>{excerpt}</p>
        )
      }
    }
  return (
    <>
      <Head>
        <title>
          {prismicH.asText(article.data.title)} | Deluca
        </title>
      </Head>
      <main className={styles.container}>
        <div>
          <PrismicLink
            href="/blog"
           >
            &larr; Back to articles
          </PrismicLink>
        </div>
        <div className={`${styles.content} ${styles.previewContent}`}>
            <PrismicText field={article.data.title} />
            <p>{dateFormatter.format(date)}</p>
          <div>
            {putExcerpt()}          
          </div>
          <div className={styles.continueReading}>
            Quer continuar lendo?
              <Link href='/'>
                <a href="">Se inscreva agora</a>
              </Link>
         </div>
        </div>
    </main>
    </>
  );
};

export default ArticlePreview;

export async function getStaticProps({params, previewData }) {  
  const client = createClient({ previewData });
  const article = await client.getByUID("article", params.uid);
  
  return {
    props: {
      article,
      params
    },
    redirect: 60 * 60 // 1 hour
  };
}

export async function getStaticPaths() {
  const client = createClient();
  const documents = await client.getAllByType("article");
  return {
    paths: documents.map((doc) => prismicH.asLink(doc, linkResolver)),
    fallback: 'blocking',
  };
}