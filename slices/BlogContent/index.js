import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const BlogContent = ({ slice }) => (
  <section>
    <span className="title">
      {
        slice.primary.content ?
<PrismicRichText field={slice.primary.content} />
        : <h2>Não há conteúdo</h2>
      }
    </span>
    <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: justify;
          text-justify: inter-word;
        }
        .title {
          color: #8592e0;
        }
    `}</style>
  </section>
)

export default BlogContent