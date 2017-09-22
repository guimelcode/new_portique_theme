
<?php echo '<article class="row"name="'.$post->post_name.'">' ?>

 <section class="thePostText francais">
 <!-- <section class="thePostText francais col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-9"> -->
    <header >
      <h1 class="titre"><?php echo get_the_title(); ?></h1>
      <h2 class="subtitle"><?php echo get_field("sous-titre"); ?></h2>
      <h3 class="temps"> du
        <time ><?php echo templateFormatDate(get_post_meta( get_the_ID(), 'date_debut_exposition', true )); ?></time>
        au
        <time ><?php echo templateFormatDate(get_post_meta( get_the_ID(), 'date_fin_exposition', true )); ?></time>
      </h3>
    </header>
    <main>
      <?php echo $content = apply_filters('the_content', $post->post_content); ?>
    </main>
  </section>

<?php if( have_rows('fichiers_media') ): ?>
  <section class="thePostImages col-xs-offset-3 col-xs-20 col-sm-offset-10 col-sm-13 col-xs-24 col-sm-offset-3 col-sm-8 col-lg-offset-2 col-lg-13" data-spy="affix" data-offset-top="205">
    <!-- <div class='img-slider-control'> -->

    <!-- </div> -->

    <div class="imgGal cols-xs-26">
      <div class='img-prev-control' >

      </div>
      <div class='img-next-control'>

      </div>
      <?php
      // $gal = get_post_meta(get_the_ID(),'gallery_data',true);
      // foreach ($gal['image_url'] as $img) {
      //   echo "<figure>";
      //   echo "<img  src='".$img."' />";
      //   echo "<figcaption></figcaption></figure>";
      // }
      ?>
      <div class="swiper-wrapper">

        <?php
        // loop through the rows of data
        while ( have_rows('fichiers_media') ) : the_row();
        $media = get_sub_field('media_file');
        $decription = get_sub_field('description_media');

        echo '<div class="swiper-slide col-xs-26">';
        echo '<img src="'.$media['url'].'"/>';
        echo '<h2>'.$decription.'</h2>';
        echo '</div>';

      endwhile;
      ?>
    </div>
  </div>
</section>
<?php endif; ?>
</article>
