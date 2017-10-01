<?php  echo "<div class='". $post->post_name ." swiper-slide'> "; ?>   <!--changer la class post_name -->
  <section class='col-sm-12 col-sm-offset-1'>
    <?php echo $content; ?>

  </section>

<?php
$image = get_field('image_page', $post->ID);
if($image){
  echo "<section class='page-image'>";
  echo "<img src='".$image['sizes']['medium']."' />";
  echo "</section>";
}
 ?>

</div>
