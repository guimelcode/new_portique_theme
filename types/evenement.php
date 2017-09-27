<?php
$labels = array(
	'name'               => 'Évènements',
	'singular_name'      => 'Évènement',
	'menu_name'          => 'Évènements',
	'name_admin_bar'     => 'Évènement',
	'add_new'            => _x( 'Ajouter', 'évènement', 'your-plugin-textdomain' ),
	'add_new_item'       => __( 'Ajouter évènement', 'your-plugin-textdomain' ),
	'new_item'           => __( 'Nouvelle évènement', 'your-plugin-textdomain' ),
	'edit_item'          => __( 'Éditer évènement', 'your-plugin-textdomain' ),
	'view_item'          => __( 'Voir évènement', 'your-plugin-textdomain' ),
	'all_items'          => __( 'Toutes les évènements', 'your-plugin-textdomain' ),
	'search_items'       => __( 'Rechercher des évènements', 'your-plugin-textdomain' ),
	'parent_item_colon'  => __( 'Parent Books:', 'your-plugin-textdomain' ),
	'not_found'          => __( 'Pas trouvé d\'évènements.', 'your-plugin-textdomain' ),
	'not_found_in_trash' => __( 'Pas trouvé d\'évènements dans le Corbeille.', 'your-plugin-textdomain' )
);

$args = array(
	'labels'             => $labels,
	'description'        => __( 'Description.', 'your-plugin-textdomain' ),
	'public'             => true,
	'publicly_queryable' => true,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => true,
	'rewrite'            => array( 'slug' => 'evenement' ),
	'capability_type'    => 'post',
	'has_archive'        => true,
	'hierarchical'       => false,
	'menu_position'      => 5,
	'supports'           => array( 'title', 'editor', 'author', 'thumbnail' )
);

register_post_type( 'evenement', $args );

?>
