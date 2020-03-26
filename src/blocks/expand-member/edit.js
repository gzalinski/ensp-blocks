import { Component, Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { isBlobURL } from '@wordpress/blob'
import { withSelect } from '@wordpress/data'
import {seeMoreChekcHeight, buttonToggle} from '../expand/script'

import {
  PlainText,
  RichText,
  MediaPlaceholder,
  MediaUpload,
  MediaUploadCheck,
  InnerBlocks,
  InspectorControls
} from '@wordpress/block-editor'

import {
  Spinner,
  withNotices,
  IconButton,
  PanelBody,
  RangeControl,
  TextareaControl,
  SelectControl,
} from '@wordpress/components'


class Edit extends Component {

  onChangeTitle = (title) => {
    this.props.setAttributes({ title })
  }

  onChangeEmail = (email) => {
    this.props.setAttributes({ email })
  }

  onSelectImage = ({ id, url, alt }) => {
    this.props.setAttributes({
      id, url, alt,
    })
  }

  onSelectURL = (url) => {
    this.props.setAttributes({
      url,
      id: null,
      alt: '',
    })
  }
  onUploadError = (message) => {
    const { noticeOperations } = this.props
    noticeOperations.createErrorNotice(message)
  }

  componentDidMount () {
    const { attributes, setAttributes } = this.props
    const { url, id } = attributes
    if (url && isBlobURL(url) && !id) {
      setAttributes({
        url: '',
        alt: '',
      })
    }
  }

  removeImage = () => {
    this.props.setAttributes({
      id: null,
      url: '',
      alt: '',
    })
  }
  updateAlt = (alt) => {
    this.props.setAttributes({ alt })
  }

  updateRangeControl = (maxHeight) => {
    this.props.setAttributes({ maxHeight })
    seeMoreChekcHeight()
    buttonToggle()
  }

  onImageSizeChange = (url) => {
    this.props.setAttributes({ url })
  }

  getImageSizes () {
    const { image, imageSizes } = this.props
    if (!image) return []
    let options = []
    const sizes = image.media_details.sizes

    for (const key in sizes) {
      const size = sizes[key]
      const imageSize = imageSizes.find(size => size.slug === key)
      if (imageSize) {
        options.push({
          label: imageSize.name,
          value: size.source_url,
        })
      }
    }
    return options
  }

  onChangeInner () {
    seeMoreChekcHeight()
    buttonToggle()
  }

  render () {
    const { className, attributes, noticeUI } = this.props
    const { title, email, alt, url, id, maxHeight } = attributes
    const innerAllowed = [
      'core/paragraph',
      'core/heading',
      'core/quote',
      'core/list',
      'core/image',
      'core/video',
      'core/file',
      'core/gallery',
      'core/button',
      'core/spacer',
    ]
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
            {url && !isBlobURL(url) &&
            <TextareaControl
              label={__('Image Alt', 'ust-blocks')}
              value={alt}
              onChange={this.updateAlt}
            />
            }
            {id &&
            <SelectControl
              label={__('Image Size', 'ust-blocks')}
              options={this.getImageSizes()}
              onChange={this.onImageSizeChange}
            />
            }
          </PanelBody>
        </InspectorControls>

        <div className={className}>
          <div className="wp-block-ust-member__image">
            {url ?
              <Fragment>
                <img src={url} alt={alt}/>
                {isBlobURL(url) && <Spinner/>}
              </Fragment>
              : <MediaPlaceholder
                icon="format-image"
                onSelect={this.onSelectImage}
                onSelectURL={this.onSelectURL}
                onError={this.onUploadError}
                accept="image/*"
                allowedTypes={['image']}
                notices={noticeUI}
              />
            }

            {url &&
            <Fragment>
              <IconButton
                className='components-icon-button components-toolbar__control'
                label={__('Remove Image', 'ust-blocks')}
                onClick={this.removeImage}
                icon={'trash'}
              />

              {id &&
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={this.onSelectImage}
                  alowedTypes={['image']}
                  value={id}
                  render={({ open }) => {
                    return (
                      <IconButton
                        className='components-icon-button components-toolbar__control'
                        label={__('Edit Image', 'ust-blocks')}
                        onClick={open}
                        icon={'edit'}
                      />
                    )
                  }}
                />
              </MediaUploadCheck>
              }
            </Fragment>
            }
          </div>
          <div className="wp-block-ust-member__content">
            <RichText
              className="wp-block-ust-member__title"
              tagName='h4'
              onChange={this.onChangeTitle}
              value={title}
              placeholder={__('Titlu')}
              allowedFormats={['italic']}
            />
            <p className="wp-block-ust-member__email">
              <PlainText
                placeholder={__('name@mail.com')}
                onChange={this.onChangeEmail}
                value={email}
              />
            </p>
            <div className="wp-block-ust-member__text seemore">
              <div className="max-height" style={{ maxHeight: maxHeight }}>
                <div className="full-text">
                  <InnerBlocks
                    onChange={this.onChangeInner()}
                    allowedBlocks={innerAllowed}
                  />
                </div>
              </div>
              <div className="btn-more"></div>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}

export default withSelect((select, props) => {
  const id = props.attributes.id
  return {
    image: id ? select('core').getMedia(id) : null,
    imageSizes: select('core/editor').getEditorSettings().imageSizes,
  }
})(withNotices(Edit))

