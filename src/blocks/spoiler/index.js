import './style.editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { InnerBlocks, RichText } from '@wordpress/block-editor'
import Edit from './edit'

const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: 'h3',
  },
  show: {
    type: 'boolean',
    default: true,
  },
}

registerBlockType('ust/spoiler', {
  title: __('Spoiler', 'ust-blocks'),
  category: 'layout',
  icon: {
    background: '#004696',
    foreground: '#fff',
    src: 'arrow-down-alt2',
  },
  keywords: [
    __('spoiler', 'ust-blocks'),
  ],
  attributes,
  edit: Edit,
  save: function ({ attributes }) {
    const { title, show } = attributes

    return (
      <div data-show-content={show}>
        <div className="wp-block-ust-spoiler__title">
          <RichText.Content tagName='h3' value={title}/>
          <a className="wp-block-ust-spoiler__toggle-button"></a>
        </div>
        <div className={'wp-block-ust-spoiler__content'}>
          <InnerBlocks.Content/>
        </div>
      </div>
    )
  },
})