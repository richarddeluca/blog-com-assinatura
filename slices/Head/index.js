import React from 'react'
import { PrismicRichText } from '@prismicio/react'

const Head = ({ slice }) => (
  <section>
    {
      slice.primary.description ?
      <PrismicRichText field={slice.primary.description}/>
      : <p>start by editing this slice from inside Slice Machine!</p>
    }
    <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
        }
    `}</style>
  </section>
)

export default Head