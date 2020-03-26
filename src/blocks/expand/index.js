import './style.editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { RichText, InnerBlocks } from '@wordpress/block-editor'
import Edit from './edit'
import { Fragment } from '@wordpress/element'

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
    __('spoiler', 'ust-blocks'),
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

//
// <div className={className + ' seemore'}>
//   <div className="max-height" style={{ maxHeight: maxHeight }}>
// <div className="full-text">
//   <InnerBlocks
// onChange={this.onChangeInner()}
// allowedBlocks={innerAllowed}
// />
// </div>
// </div>
// <div className="btn-more"></div>
// </div>