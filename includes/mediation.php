<?php
/**
Médiation manager
- gérer les appels de contenu
- gérer le formatage HTML
*/

function mediation(){
	$scolaires = get_page_by_title( '[:fr]Scolaires[:en]School[:]' );
	// $scolaires = get_post( 'scolaires' );
	// var_dump($scolaires);
	$jeunespublics = get_page_by_title( '[:fr]Jeunes publics[:en]Young audiences[:]');
	echo "<div id='mediations' class='row container-fluid'>";
	echo "<div class='slider-control'>
	<div class='prev-control swiper-button-prev' id='prev-control'>

	</div>
	<div class='next-control swiper-button-next' id='next-control'>

	</div>
	</div>";
	echo "<div class='bxslider swiper-wrapper'>";
	// print_r($jeunespublics);
	// echo $jeunespublics->have_posts();
	$post = $jeunespublics;
	$content = apply_filters('the_content', $post->post_content);
	// get_template_part( 'template-parts/pages/page' );
	// echo "<h2>". $post ."</h2>";
	// print_r($post);
	include(get_template_directory(). '/template-parts/pages/page-image.php');

	$post = $scolaires;
	$content = apply_filters('the_content', $post->post_content);
	// get_template_part( 'template-parts/pages/page' );
	include(get_template_directory(). '/template-parts/pages/page-image.php');
	echo "</div>";
}

?>
