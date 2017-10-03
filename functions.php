<?php
/**
* portique_theme functions and definitions
*
* @package new_portique_theme
*/

function menu(){
	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'top'    => __( 'Top Menu', 'twentyseventeen' ),
		'social' => __( 'Social Links Menu', 'twentyseventeen' ),
		) );

		// Define and register starter content to showcase the theme on new sites.
		$starter_content = array(
			'nav_menus' => array(
				// Assign a menu to the "top" location.
				'top' => array(
					'name' => __( 'Top Menu', 'twentyseventeen' ),
					'items' => array(
						'link_home', // Note that the core "home" page is actually a link in case a static front page is not used.
						'page_about',
						'page_blog',
						'page_contact',
					),
				),
			),
		);

		add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

		function special_nav_class ($classes, $item) {
			if (in_array('current-menu-item', $classes) ){
				$classes[] = 'active ';
			}
			return $classes;
		}
	}
	class description_walker extends Walker_Nav_Menu
	{

		function start_el(&$output, $item, $depth, $args)
		{
			global $wp_query;
			$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

			$class_names = $value = '';

			$classes = empty( $item->classes ) ? array() : (array) $item->classes;

			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
			$class_names = ' class="'. esc_attr( $class_names ) . '"';

			$output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';

			$attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
			$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
			$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
			$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

			$prepend = '<strong>';
			$append = '</strong>';
			$description  = ! empty( $item->description ) ? '<span>'.esc_attr( $item->description ).'</span>' : '';

			if($depth != 0)
			{
				$description = $append = $prepend = "";
			}

			$item_output = $args->before;
			$item_output .= '<a'. $attributes .'>';
			$item_output .= $args->link_before .$prepend.apply_filters( 'the_title', $item->title, $item->ID ).$append;
			$item_output .= $description.$args->link_after;
			$item_output .= '</a>';
			$item_output .= $args->after;

			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );

			if ($item->menu_order == 1) {
				$classes[] = 'first';
			}

		}
	}

	function types_init() {
		if ( !function_exists( 'get_home_path' ) )
		require_once( dirname(__FILE__) . '/../../../wp-admin/includes/file.php' );
		$path = get_home_path();
		//var_dump($path);
		require_once($path.'wp-content/themes/new_portique_theme/types/exposition.php');
		require_once($path.'wp-content/themes/new_portique_theme/types/evenement.php');

	}

	function init(){
		types_init();
		menu();
	}
	add_action('init', 'init');

	function templateFormatDate($value){
		$annee = substr($value, 0, 4);
		$mois = substr($value, 4, 2);
		$jour = substr($value, 6, 2); // 20 12 2017

		$date = $jour.'.'.$mois.'.'.$annee;

		return $date;

	}
	add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );
	function my_theme_enqueue_scripts() {

		wp_enqueue_script( 'bundle', get_stylesheet_directory_uri() . '/dist/bundle.js', array('jquery'), 1, false );
		wp_localize_script( 'bundle', 'adminAjax', admin_url( 'admin-ajax.php' ) );
	}

	require_once( __DIR__ . '/includes/ajax-manager.php');
	require_once( __DIR__ . '/includes/navigation.php');

	/* Google map API */


add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');


function my_theme_add_scripts() {
    if (is_page('nous-trouver')) {
        wp_enqueue_script( 'google-map', 'https://maps.googleapis.com/maps/api/js?key="XXXX', array(), '3', true );
        wp_enqueue_script( 'google-map-init', get_template_directory_uri() . '/google-maps.js', array('google-map', 'jquery'), '0.1', true );
    }
}

add_action( 'wp_enqueue_scripts', 'my_theme_add_scripts' );
