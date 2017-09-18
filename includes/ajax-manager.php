<?php
add_action( 'wp_ajax_expositions', 'test_post' );
add_action( 'wp_ajax_nopriv_expositions', 'test_post' );

require get_template_directory() . '/includes/expositions.php';

function test_post() {
	// $rub = $_POST['rub'];
	// echo $rub;
	expositions();

	die();
}

add_action( 'wp_ajax_archives_get_post', 'archives_get_post' );
add_action( 'wp_ajax_nopriv_archives_get_post', 'archives_get_post' );

function archives_get_post($args) {
	/*$postID =   $_POST["postID"];
	$myPost = get_post($postID);
	echo '<h1>'.$myPost->post_content.'</h1>';
	$myPost->have_posts(); */

	$postTitle =   $_POST["postTitle"];
	// echo $postTitle;
	if($postTitle){
		//$postid = $wpdb->get_var( "SELECT ID FROM $wpdb->posts WHERE post_title = '" . $postTitle . "'" );
		// $postByTitle = get_page_by_path($postTitle,OBJECT, 'exposition');
		$args = array(
			'post_type' => 'exposition',
			'name' => $postTitle,
		);
		$gros_query = new WP_Query($args);
		if ( $gros_query->have_posts() ) : while ( $gros_query->have_posts() ) : $gros_query->the_post();
		echo "<div class='archives-article'>";
	 get_template_part( 'template-parts/article' );
	 $counter++;
	//  echo $counter;
	 echo "</div >";
	endwhile;
endif;


	}else {
		$postID =   $_POST["postID"];
		$recherche = array(
			'p'         => $postID,
			'post_type' => 'exposition'
		);

		$ajax_query = new WP_Query($recherche);
		if ( $ajax_query->have_posts() ) : while ( $ajax_query->have_posts() ) : $ajax_query->the_post();
		echo "<div class='archives-article'>";
		get_template_part( 'template-parts/article' );
		$counter++;
		echo "</div >";
	endwhile;
endif;
}


die();
}

// mediations
add_action( 'wp_ajax_mediations', 'mediations' );
add_action( 'wp_ajax_nopriv_mediations', 'mediations' );

function mediations(){
	$scolaires = get_page_by_title( '[:fr]Scolaires[:en]School[:]' );
	// $scolaires = get_post( 'scolaires' );
	// var_dump($scolaires);
	$jeunespublics = get_page_by_title( '[:fr]Jeunes publics[:en]Young audiences[:]' );
	echo "<div id='mediations' class='row container-fluid'>";
	echo "<div class='slider-control'>
	<div class='prev-control swiper-button-prev' id='prev-control'>

	</div>
	<div class='next-control swiper-button-next' id='next-control'>

	</div>
	</div>";
	echo "<div class='bxslider swiper-wrapper'>";
	echo "<div class='jeunes-publics swiper-slide'>";
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $jeunespublics->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-mediations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1096_resized.jpg"/>';
	echo "</div></div>";


	echo "<div class='scolaires swiper-slide'>";
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $scolaires->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-mediations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1125_resized.jpg"/>';
	echo "</div></div>";


	die();
}

// informations
add_action( 'wp_ajax_informations', 'informations' );
add_action( 'wp_ajax_nopriv_informations', 'informations' );

function informations(){
	$equipe = get_page_by_title( '[:fr]Équipe[:en]Team[:]' );
	$mecenat = get_page_by_title( '[:fr]Mécénat[:en]Patronage[:]' );
	$nousTrouver = get_page_by_title( '[:fr]Nous trouver[:en]Find us[:]' );
	echo "<div id='informations' class='row container-fluid'>";
	echo "<div class='slider-control'>
	<div class='prev-control swiper-button-prev' id='prev-control'>

	</div>
	<div class='next-control swiper-button-next' id='next-control'>

	</div>
	</div>";
	echo "<div class='bxslider swiper-wrapper'>";
	echo "<div class='equipe swiper-slide'>";
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $equipe->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1096_resized.jpg"/>';
	echo "</div></div>";


	echo "<div class='mecenat swiper-slide'>";
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $mecenat->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1125_resized.jpg"/>';
	echo "</div></div>";

	echo "<div class='nous-trouver swiper-slide'>";
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $nousTrouver->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1125_resized.jpg"/>';
	echo "</div></div>";


	die();
}

// presse
add_action( 'wp_ajax_presse', 'presse' );
add_action( 'wp_ajax_nopriv_presse', 'presse' );

function presse(){
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
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $contactPresse->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1096_resized.jpg"/>';
	echo "</div></div>";


	echo "<div class='newsletter swiper-slide'>";
	echo "<div class='col-sm-12 col-sm-offset-1'>";
	echo "<h2>";
	echo "</h2><p>";
	$content = apply_filters('the_content', $newsletter->post_content);
	echo $content;
	echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";
	// echo '<img class="image-informations" src="http://amaguq.net/portique-prod-2/wp-content/uploads/2017/05/IMG_1125_resized.jpg"/>';
	echo "</div></div>";


	die();
}


?>
