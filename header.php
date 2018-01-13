<?php
/**
* The header for our theme.
*
* Displays all of the <head> section and everything up till <div id="content">
*
* @package newportique
*/

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<title><?php bloginfo( 'name' ); ?> – <?php bloginfo( 'description' ); ?></title>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-title" content="<?php bloginfo( 'name' ); ?> – <?php bloginfo( 'description' ); ?>">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

	<div class="hfeed site" id="page">
		<header>
			<?php if ( has_nav_menu( 'top' ) ) : ?>
				<div class="navigation-top container-fluid">
					<div class="wrap row">
						<nav id="site-navigation" class="main-navigation col-xs-offset-1 col-xs-24 " role="navigation" aria-label="<?php _e( 'Top Menu', 'twentyseventeen' ); ?>">

							<?php wp_nav_menu( array(
								'theme_location' => 'top',
								'menu_id'        => 'top-menu',

								'menu_class'=> 'menu col-xs-22 col-sm-26',
								// 'walker' => new description_walker()
							)); ?>

						</nav><!-- #site-navigation -->
						<div class="logo-mobile visible-xs-block col-xs-4">
							<a href="#" class="lp-home">
								<img id="signature-portique_LP" src="http://leportique.org/wp-content/uploads/2017/11/cropped-logo-LP.png" alt="logo_Le-Portique_signature_LP">
							</a>
						</div>
					</div><!-- .wrap -->
				</div><!-- .navigation-top -->
			<?php endif; ?>
		</header>
