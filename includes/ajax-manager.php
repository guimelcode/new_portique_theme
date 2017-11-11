<?php
add_action( 'wp_ajax_expositions', 'test_post' );
add_action( 'wp_ajax_nopriv_expositions', 'test_post' );

require get_template_directory() . '/includes/expositions.php';
require get_template_directory() . '/includes/archives.php';
require get_template_directory() . '/includes/mediation.php';
require get_template_directory() . '/includes/information.php';
require get_template_directory() . '/includes/presse.php';

function test_post() {
	expositions();
	die();
}

add_action( 'wp_ajax_archives_get_post', 'archives_get_post' );
add_action( 'wp_ajax_nopriv_archives_get_post', 'archives_get_post' );

function archives_get_post($args) {
	archives($args);
	die();
}

// mediations
add_action( 'wp_ajax_mediations', 'mediations' );
add_action( 'wp_ajax_nopriv_mediations', 'mediations' );

function mediations(){
	mediation();
	die();
}

// informations
add_action( 'wp_ajax_informations', 'informations' );
add_action( 'wp_ajax_nopriv_informations', 'informations' );

function informations(){
	information();
	die();
}

// presse
add_action( 'wp_ajax_presse', 'presse' );
add_action( 'wp_ajax_nopriv_presse', 'presse' );

function presse(){
	laPresse();
	die();
}


?>
