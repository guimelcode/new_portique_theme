<?php
/**
Archives manager
- gérer les appels de contenu
- gérer le formatage HTML
*/

function archives($args){
  $postTitle =   $_POST["postTitle"];
  if($postTitle){
    $args = array(
      'post_type' => 'exposition',
      'name' => $postTitle,
    );
    $gros_query = new WP_Query($args);
    if ( $gros_query->have_posts() ) : while ( $gros_query->have_posts() ) : $gros_query->the_post();
    echo "<div class='archives-article'>";
    get_template_part( 'template-parts/expositions/article' );
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
  get_template_part( 'template-parts/expositions/article' );
  $counter++;
  echo "</div >";
endwhile;
endif;
}




}
?>
