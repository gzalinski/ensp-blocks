import './styles.editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// const { registerBlockType } = wp.blocks;
// const { __ } = wp.i18n;

registerBlockType('ensp-blocks/expand', {
  title: __('Expand', 'ensp-blocks'),
  category: 'layout',
  icon: {
    background: '#f03',
    foreground: '#fff',
    src: 'admin-network'
  },
  keywords: [ __('Expand', 'ensp-blocks'), __('Spoiler', 'ensp-blocks')],
  edit: ({className}) => {
    return <p className={className}>Editor</p>;
  },
  save: ({className}) => {
    return <p className={className}>Editor</p>;
  }
})