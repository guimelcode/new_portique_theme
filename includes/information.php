<?php
/**
Information manager
- gérer les appels de contenu
- gérer le formatage HTML
*/
function information(){
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
  $post = $nousTrouver;
  $content = apply_filters('the_content', $post->post_content);
  /* adding tepmlate path - test*/
  include(get_template_directory(). '/template-parts/pages/page-map.php');

  $post = $equipe;
  $content = apply_filters('the_content', $post->post_content);

  include(get_template_directory(). '/template-parts/pages/page-image.php');


  echo "<div class='mecenat swiper-slide'>";
  echo "<div class='col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-10'>";
  echo "<h2>";
  echo "</h2><p>";
  $content = apply_filters('the_content', $mecenat->post_content);
  echo $content;
  echo "</p></div><div class='col-lg-11 col-lg-offset-1'>";

  echo "</div></div>";





}

 ?>
