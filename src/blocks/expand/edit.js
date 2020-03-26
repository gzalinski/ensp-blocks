import { Component, Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { seeMoreChekcHeight, buttonToggle } from './script'

import {
  InnerBlocks,
  InspectorControls
} from '@wordpress/block-editor'

import {
  PanelBody,
  RangeControl,
} from '@wordpress/components'

class Edit extends Component {

  updateRangeControl = (maxHeight) => {
    this.props.setAttributes({ maxHeight })
    seeMoreChekcHeight()
    buttonToggle()
  }

  onChangeInner () {
    seeMoreChekcHeight()
    buttonToggle()
  }

  render () {
    const { className, attributes } = this.props
    const { maxHeight } = attributes
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings')} initialOpen={true}>
            <RangeControl
              label={__('Content max height', 'ust-blocks')}
              value={maxHeight}
              onChange={this.updateRangeControl}
              min={100}
              max={999}
            />
          </PanelBody>
        </InspectorControls>

        <div className={className}>
          <div className="seemore">
            <div className="max-height" style={{ maxHeight: maxHeight }}>
              <div className="full-text">
                <InnerBlocks
                  onChange={this.onChangeInner()}
                />
              </div>
            </div>
            <div className="btn-more"></div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Edit

