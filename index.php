<?php
/**
* The main template file.
*
* This is the most generic template file in a WordPress theme
* and one of the two required files for a theme (the other being style.css).
* It is used to display a page when nothing more specific matches a query.
* E.g., it puts together the home page when no home.php file exists.
* Learn more: http://codex.wordpress.org/Template_Hierarchy
*
* @package new_portique_theme
*/

get_header();


if ( is_front_page() || is_page('expositions') ){

}
?>

<div class="container-fluid">
  <!-- Position de la signature -->
  <?php get_template_part('template-parts/signature/signature'); ?>
  <!-- Container principal -->
  <div id="app" class="container-fluid"></div>
</div>

<?php get_footer();?>
