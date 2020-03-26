import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

class EditTeamMember extends Component {

  onChangeTitle = (title) =>{
    this.props.setAttributes({title})
  }

  render () {
    const {className, attributes, setAttributes} = this.props;
    const { title } = attributes;

    return (
      <div className={className}>
        <RichText
          tagName='h4'
          onChange={this.onChangeTitle}
          value={title}
        />
      </div>
    )
  }
}

export default EditTeamMember;