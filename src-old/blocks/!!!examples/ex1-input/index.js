import './style.editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { RichText } from '@wordpress/block-editor'

const  attributes = {
    title: {
      type: 'string',
      source: 'html',
      selector: 'h4',
    }
  }

registerBlockType('ust/rich-text', {
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

  edit:  function({ className, attributes, setAttributes }) {
    const { title } = attributes
    return (
      <div className={className}>
          <RichText
            tagName='h4'
            onChange={(title) => setAttributes({ title })}
            value={title}
          />
      </div>
    )
  },

  save: function({ attributes }) {
    const { title } = attributes

    return (
      <div>
        <RichText.Content tagName='h4' value={ title } />
      </div>
    )
  },
})