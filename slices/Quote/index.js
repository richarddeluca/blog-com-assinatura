import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const Quote = ({ slice }) => (
  <section>
    <span className="title">
      {
        slice.primary.quote ?
        <PrismicRichText field={slice.primary.quote}/>
        : <quote>a quote here</quote>
      }
    </span>
    <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        .title {
          color: #8592e0;
        }
    `}</style>
  </section>
)

export default Quote