import './style.editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { InnerBlocks } from '@wordpress/block-editor'
import Edit from './edit'

const attributes = {
  maxHeight: {
    type: 'number',
    default: 215,
  },
}

registerBlockType('ust/expand', {
  title: __('Expand', 'ust-blocks'),
  category: 'layout',
  icon: {
    background: '#004696',
    foreground: '#fff',
    src: 'arrow-down-alt2',
  },
  keywords: [
    __('expand', 'ust-blocks'),
    __('seemore', 'ust-blocks'),
  ],
  attributes,
  edit: Edit,
  save: function ({ attributes }) {
    const { maxHeight } = attributes

    return (
      <div>
        <div className="seemore">
          <div className="max-height" style={{ maxHeight: maxHeight }}>
            <div className="full-text">
              <InnerBlocks.Content/>
            </div>
          </div>
          <div className="btn-more"></div>
        </div>
      </div>
    )
  },
})