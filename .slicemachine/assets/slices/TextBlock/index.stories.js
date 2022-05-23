import MyComponent from '../../../../slices/TextBlock';

export default {
  title: 'slices/TextBlock'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default","slice_type":"text_block","items":[{"link":{"link_type":"Web","url":"https://slicemachine.dev"},"content":[{"type":"paragraph","text":"Est deserunt nisi irure ex duis. Velit mollit ad culpa non dolore id eu aliquip. Est aliqua adipisicing occaecat consectetur deserunt est pariatur consectetur quis.","spans":[]}]},{"link":{"link_type":"Web","url":"http://twitter.com"},"content":[{"type":"paragraph","text":"Qui labore occaecat occaecat.","spans":[]}]}],"primary":{"yes":false,"title":"disintermediate dynamic e-services"},"id":"_Default"}} />
_Default.storyName = 'Default'

export const _VariationCuscus = () => <MyComponent slice={{"variation":"variationCuscus","name":"Variation cuscus","slice_type":"text_block","items":[],"primary":{},"id":"_VariationCuscus"}} />
_VariationCuscus.storyName = 'Variation cuscus'
