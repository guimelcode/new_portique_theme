<?php
$labels = array(
	'name'               => 'Expositions',
	'singular_name'      => 'Exposition',
	'menu_name'          => 'Expositions',
	'name_admin_bar'     => 'Exposition',
	'add_new'            => _x( 'Ajouter', 'exposition', 'your-plugin-textdomain' ),
	'add_new_item'       => __( 'Ajouter exposition', 'your-plugin-textdomain' ),
	'new_item'           => __( 'Nouvelle exposition', 'your-plugin-textdomain' ),
	'edit_item'          => __( 'Éditer exposition', 'your-plugin-textdomain' ),
	'view_item'          => __( 'Voir exposition', 'your-plugin-textdomain' ),
	'all_items'          => __( 'Toutes les expositions', 'your-plugin-textdomain' ),
	'search_items'       => __( 'Rechercher des expositions', 'your-plugin-textdomain' ),
	'parent_item_colon'  => __( 'Parent Books:', 'your-plugin-textdomain' ),
	'not_found'          => __( 'Pas trouvé d\'expositions.', 'your-plugin-textdomain' ),
	'not_found_in_trash' => __( 'Pas trouvé d\'expositions dans le Corbeille.', 'your-plugin-textdomain' )
);

$args = array(
	'labels'             => $labels,
	'description'        => __( 'Description.', 'your-plugin-textdomain' ),
	'public'             => true,
	'publicly_queryable' => true,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => true,
	'rewrite'            => array( 'slug' => 'exposition' ),
	'capability_type'    => 'post',
	'has_archive'        => true,
	'hierarchical'       => false,
	'menu_position'      => 5,
	'supports'           => array( 'title', 'editor', 'author', 'thumbnail' )
);

register_post_type( 'exposition', $args );

?>
