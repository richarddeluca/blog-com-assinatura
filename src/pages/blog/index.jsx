import Head from "next/head";
import NextImage from "next/image";
import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import styles from './styles.module.scss'
import { createClient } from "../../../prismicio";
import Link from "next/link";
import { useSession } from "next-auth/react";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "blog_content")
    .map((slice) => prismicH.asText(slice.primary.content))
    .join(" ");

  const excerpt = text.substring(0, 250);


  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const Article = ({ article }) => {
const {data: session} = useSession()
function linkPerUseSession(){
  if(session?.activeSubscription){
    return(
      <Link href={`/blog/${article.uid}`}>
            <a>
              <PrismicText field={article.data.title} />
            </a>
      </Link>
    )
  }
  return (
    <PrismicLink document={article}>
          <PrismicText field={article.data.title} />
        </PrismicLink>
  )
} 
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const excerpt = getExcerpt(article.data.slices);
  console.log(article)
  return (
    <article >
          {linkPerUseSession()}
        <time >
          {dateFormatter.format(date)}
        </time>
        {<p>
            {excerpt}
          </p>
        }
    </article>
  );
};

const Index = ({ articles }) => {
  return (
    // <main className={styles.container}>
    //         <section className={styles.articles}>
    //             <a href="#">
    //                 <time>19 de maio de 2022</time>
    //                 <strong>título</strong>
    //                 <p>how to createeeeeeeeeeee how to createeeeeeeeeeee how to createeeeeeeeeeee how to createeeeeeeeeeee how to createeeeeeeeeeee how to createeeeeeeeeeee</p>
    //             </a>
    //             <a href="#">
    //                 <time>19 de maio de 2022</time>
    //                 <strong>título</strong>
    //                 <p>how to createeeeeeeeeeee</p>
    //             </a>
    //             <a href="#">
    //                 <time>19 de maio de 2022</time>
    //                 <strong>título</strong>
    //                 <p>how to createeeeeeeeeeee</p>
    //             </a>
    //         </section>
    //     </main>
 <>

      <section className={styles.articles} >
       
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </section>
</>  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return {
    props: {
      articles,
    },
  };
}