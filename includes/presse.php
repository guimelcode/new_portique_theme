<?php
/**
Presse manager
- gérer les appels de contenu
- gérer le formatage HTML
*/
function laPresse(){

  $contactPresse = get_page_by_title( '[:fr]Contact presse[:en]Press Contact[:]' );
	$newsletter = get_page_by_title( 'Newsletter' );
	echo "<div id='presse' class='row container-fluid'>";
	echo "<div class='slider-control'>
	<div class='prev-control swiper-button-prev' id='prev-control'>

	</div>
	<div class='next-control swiper-button-next' id='next-control'>

	</div>
	</div>";
	echo "<div class='bxslider swiper-wrapper'>";
	echo "<div class='contact-presse swiper-slide'>";
	echo "<div class='col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-10'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $contactPresse->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1096_resized.jpg"/>';
	echo "</div></div>";


	echo "<div class='newsletter swiper-slide'>";
	echo "<div class='col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-10'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $newsletter->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1125_resized.jpg"/>';
	echo "</div></div>";

}

 ?>
