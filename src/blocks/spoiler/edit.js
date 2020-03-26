import { Component, Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import {
  InnerBlocks, RichText, InspectorControls,
} from '@wordpress/block-editor'

import {
  PanelBody,
  ToggleControl,
} from '@wordpress/components'

class Edit extends Component {

  onChangeTitle = (title) => {
    this.props.setAttributes({ title })
  }

  onChangeTogg = (show) => {
    this.props.setAttributes({ show })
  }

  render () {
    const { attributes, className} = this.props
    const { title, show } = attributes

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings')} initialOpen={true}>
            <ToggleControl
              label={__('Show Content', 'ust-blocks')}
              checked={show}
              onChange={this.onChangeTogg}
            />
          </PanelBody>
        </InspectorControls>

        <div className={ className } data-show-content={show} >
          <div className="wp-block-ust-spoiler__title">
            <RichText
              tagName='h3'
              onChange={this.onChangeTitle}
              value={title}
              placeholder={__('Titlu')}
              allowedFormats={[]}
            />
            <a className="wp-block-ust-spoiler__toggle-button"></a>
          </div>
          <div className={'wp-block-ust-spoiler__content'}>
            <InnerBlocks/>
          </div>

        </div>
      </Fragment>
    )
  }
}

export default Edit


