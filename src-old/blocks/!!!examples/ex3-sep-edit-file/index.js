import './style.editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { RichText } from '@wordpress/block-editor'
import  Edit from './edit'

const  attributes = {
    title: {
      type: 'string',
      source: 'html',
      selector: 'h4',
    }
  }

registerBlockType('ust/simple', {
  title: __('Ex1: Text Update Save', 'ensp-blocks'),
  category: 'layout',
  icon: {
    background: '#f03',
    foreground: '#fff',
    src: 'arrow-down-alt2',
  },
  keywords: [
    __('example', 'ust-blocks'),
  ],
   attributes,
  edit: Edit,
  // edit2:  function({ className, attributes, setAttributes }) {
  //   const { title } = attributes
  //   const onChangeTitle = (title) =>{
  //     setAttributes({title})
  //   }
  //   return (
  //     <div className={className}>
  //         <RichText
  //           tagName='h4'
  //           onChange={onChangeTitle}
  //           value={title}
  //         />
  //     </div>
  //   )
  // },

  save: function({ attributes }) {
    const { title } = attributes

    return (
      <div>
        <RichText.Content tagName='h4' value={ title } />
      </div>
    )
  },
})