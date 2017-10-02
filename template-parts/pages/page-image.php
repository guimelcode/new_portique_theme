<?php  echo "<div class='". $post->post_name ." swiper-slide'> "; ?>   <!--changer la class post_name -->
  <section class='thePostText col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-10'>
    <?php echo $content; ?>

  </section>

<?php
$image = get_field('image_page', $post->ID);
if($image){
  echo "<section class='page-image thePostImages col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-md-20 col-md-20 col-lg-offset-1 col-lg-13'>";
  echo "<img src='".$image['sizes']['medium']."' />";
  echo "</section>";
}
 ?>

</div>
