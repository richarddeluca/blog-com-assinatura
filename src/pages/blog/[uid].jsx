import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../../prismicio";
import { components } from "../../../slices";
import styles from './stylesUid.module.scss'
import { getSession } from "next-auth/react";
import { convertCompilerOptionsFromJson } from "typescript";


const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const LatestArticle = ({ article }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <li>
      <h1>
        <PrismicLink document={article}>
          <PrismicText field={article.data.title} />
        </PrismicLink>
      </h1>
      <p>
        {dateFormatter.format(date)}
      </p>
    </li>
  );
};

const Article = ({ article, latestArticles }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <section className={styles.container}>
      <Head>
        <title>
          {prismicH.asText(article.data.title)} | Deluca
        </title>
      </Head>
      <div>
        <PrismicLink
          href="/blog"
        >
          &larr; Back to articles
        </PrismicLink>
      </div>
        <div className={styles.post}>
            <PrismicText field={article.data.title} />
            <p>{dateFormatter.format(date)}</p>

        <SliceZone slices={article.data.slices} components={components} />
        </div>
      {latestArticles.length > 0 && (
        <div>
          <div >
            
            <div >
              <div >
                Latest articles
              </div>
              <ul >
                {latestArticles.map((article) => (
                  <LatestArticle key={article.id} article={article} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Article;

export async function getServerSideProps({ req, params, previewData }) {
  const session = await getSession({req})
  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/blog/preview/${params.uid}`,
        permanent: false
      }
    }
  }
  
  const client = createClient({ previewData });
  const article = await client.getByUID("article", params.uid);
  
  const latestArticles = await client.getAllByType("article", {
    limit: 3,
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const documents = await client.getAllByType("article");

  return {
    props: {
      article,
      documents,
      latestArticles
    }
  };
}

// export async function getStaticPaths() {
//   const client = createClient();
//   const documents = await client.getAllByType("article");
//   return {
//     paths: documents.map((doc) => prismicH.asLink(doc, linkResolver)),
//     fallback: false,
//   };
// }