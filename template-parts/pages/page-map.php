<?php  echo "<div class='". $post->post_name ." swiper-slide'> "; ?>   <!--changer la class post_name -->
  <section class='thePostText col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-10'>
    <?php echo $content; ?>

  </section>


  <section class='page-image thePostImages col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-md-20 col-md-20 col-lg-offset-1 col-lg-13'>
    <?php

    $location = get_field('location');

    if( !empty($location) ):
    ?>
    <div class="acf-map">
     <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
    </div>
    <?php endif; ?>
  </section>


</div>
