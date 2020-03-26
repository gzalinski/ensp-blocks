import '../expand/style.editor.scss'
import './style.editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { RichText,InnerBlocks } from '@wordpress/block-editor'
import Edit from './edit'

const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: 'h4',
  },
  email: {
    type: 'string',
    source: 'html',
    selector: 'a',
  },
  id: {
    type: 'number',
  },
  alt: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'alt',
    default: '',
  },
  url: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'src',
  },
  maxHeight: {
    type: 'number',
    default: 215,
  },
}

registerBlockType('ust/member', {
  title: __('Member Expand', 'ust-blocks'),
  category: 'layout',
  icon: {
    background: '#004696',
    foreground: '#fff',
    src: 'arrow-down-alt2',
  },
  keywords: [
    __('expand', 'ust-blocks'),
    __('seemore', 'ust-blocks'),
    __('team', 'ust-blocks'),
    __('member', 'ust-blocks'),
  ],
  attributes,
  edit: Edit,
  save: function ({ attributes }) {
    const { title, email, url, alt, id,maxHeight } = attributes

    return (
      <div>
        <div className="wp-block-ust-member__image">
          {url &&
          <img src={url} alt={alt} className={id ? `wp-image-${id}` : null}/>
          }
        </div>
        <div className="wp-block-ust-member__content">
          {title &&
          <RichText.Content className="wp-block-ust-member__title" tagName='h4' value={title}/>
          }

          {email &&
            <p className="wp-block-ust-member__email">
              <span>E-mail: </span>
              <a href={'mailto:' + email}>
                {email}
              </a>
          </p>}
          <div className="wp-block-ust-member__text seemore">
            <div className="max-height" style={{ maxHeight: maxHeight}}>
              <div className="full-text" >
                <InnerBlocks.Content/>
              </div>
            </div>
            <div className="btn-more"></div>
          </div>
        </div>

      </div>
    )
  },
})