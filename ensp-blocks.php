<?php
/**
 * Plugin Name: Enspire Block
 */

// Exit if accessed directly.

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin version.
if ( ! defined( 'ENSB_VERSION' ) ) {
	define( 'ENSB_VERSION', '1.3' );
}

if ( ! defined( 'OPB_NAME' ) ) {
	define( 'ENSB_NAME', trim( dirname( plugin_basename( __FILE__ ) ), '/' ) );
}

if ( ! defined( 'OPB_DIR' ) ) {
	define( 'ENSB_DIR', WP_PLUGIN_DIR . '/' . ENSB_NAME );
}

if ( ! defined( 'OPB_URL' ) ) {
	define( 'ENSB_URL', WP_PLUGIN_URL . '/' . ENSB_NAME );
}


function ensp_blocks_register_block_type($block, $options = array()){
	register_block_type(
		'ensp-blocks/' . $block,
		array_merge(
			array(
				'editor_script' => 'ensp-blocks-editor-script',
				'editor_style' => 'ensp-blocks-editor-style',
				'script' => 'ensp-blocks-script',
				'style' => 'ensp-blocks-style',
			),
			$options
		)
	);
}

function ensp_blocks_register(){

	wp_register_script(
		'ensp-blocks-editor-script',
		ENSB_URL. '/dist/editor.js',
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-block-editor',
			'wp-components',
			'lodash',
			'wp-blob',
		),
		null
	);

	wp_register_style(
		'ensp-blocks-editor-style',
		ENSB_URL. '/dist/editor.css',
		array('wp-edit-blocks'),
		null
	);

	wp_register_script(
		'ensp-blocks-script',
		ENSB_URL. '/dist/script.js',
		array('jquery')
	);

	wp_register_style(
		'ensp-blocks-style',
		ENSB_URL. '/dist/style.css',
		array(),
		null
	);

	ensp_blocks_register_block_type('expand');


}

add_action('init', 'ensp_blocks_register');
