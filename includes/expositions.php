<?php



function expositions(){


  ///TEST ///
  /* FOREACH ? */
  $counter = 0;

  echo "<div id='expositions' class='row container-fluid'>";

  // echo "<div class='slider-control'>
  //   <div class='prev-control' id='prev-control'>
  //
  //   </div>
  //   <div class='next-control' id='next-control'>
  //
  //   </div>
  // </div>";
  echo "<div class='swiper-button-prev'></div><div class='swiper-button-next'></div>";
  echo "<div  class='bxslider swiper-wrapper'>";
  $args = date_test()[0];

	$ajax_query = new WP_Query($args);


	if ( $ajax_query->have_posts() ) : while ( $ajax_query->have_posts() ) : $ajax_query->the_post();
    echo "<div class='a-venir swiper-slide'>";
    get_template_part( 'template-parts/article_mini' );
    $counter++;
    echo "</div >";
	endwhile;
  endif;


  $args = date_test()[1];

	$ajax_query = new WP_Query($args);

	if ( $ajax_query->have_posts() ) : while ( $ajax_query->have_posts() ) : $ajax_query->the_post();
    echo "<div class='en-cours swiper-slide'>";
    get_template_part( 'template-parts/article' );
    $counter++;
    echo "</div >";
	endwhile;
  endif;


  $args = date_test()[2];

	$ajax_query = new WP_Query($args);

  echo "<div class='archives swiper-slide'>
  <div class='archives-hover'><span class='close-tag'></span><div class='content'></div></div><article class='row col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-23 col-lg-offset-1 col-lg-25'>";
	if ( $ajax_query->have_posts() ) : while ( $ajax_query->have_posts() ) : $ajax_query->the_post();

    get_template_part( 'template-parts/cell' );
    $counter++;
// var_dump(get_the_title()) ;

	endwhile;
  endif;
  echo "</article></div>";

  echo "</div></div>";
  echo "<span class='process-count' count='".$counter."'></span>";

  /**/
}

function date_test(){
  $today = date( "Ymd" );

  $archive = array(
    'post_type'    => 'exposition',
    'meta_query' => array(
      'relation' => 'AND',
      array(
        'key'     => 'date_debut_exposition',
        'value'   => $today,
        'compare' => '<',
      ),
      array(
        'key' => 'date_fin_exposition',
        'value'   => $today,
        'compare' => '<',
      ),
    ),
    'orderby' => 'date_debut_exposition',
    'order'   => 'DESC',
  );

  $avenir = array(
    'post_type'    => 'exposition',
    'meta_query' => array(
      'relation' => 'AND',
      array(
        'key'     => 'date_debut_exposition',
        'value'   => $today,
        'compare' => '>',
      ),
      array(
        'key' => 'date_fin_exposition',
        'value'   => $today,
        'compare' => '>',
      ),
    ),
    'orderby' => 'date_debut_exposition',
    'order'   => 'DESC',
  );

  $enCours = array(
    'post_type'    => 'exposition',
    'meta_query' => array(
      'relation' => 'AND',
      array(
        'key'     => 'date_debut_exposition',
        'value'   => $today,
        'compare' => '<=',
      ),
      array(
        'key' => 'date_fin_exposition',
        'value'   => $today,
        'compare' => '>=',
      ),
    ),
    'orderby' => 'date_debut_exposition',
    'order'   => 'ASC',
  );
  return array($avenir, $enCours, $archive);
}
?>
