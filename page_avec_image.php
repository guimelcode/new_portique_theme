<?php
/**
* Template Name: Page avec image
*
* @package newportique
*/

echo '<article class="row"name="'.$post->post_name.'">' ?>

  <section class="thePostText francais col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-9">
    <!--  <section class="thePostText francais col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-9"> -->
    <header>
      <h1 class="titre"><?php // echo get_the_title(); ?> VOILà voilà</h1>
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

  <section class="thePostImages col-xs-offset-3 col-xs-20 col-sm-offset-10 col-sm-13 col-xs-24 col-sm-offset-3 col-sm-8 col-lg-offset-2 col-lg-13" data-spy="affix" data-offset-top="205">
  <!-- <section class="thePostImages"> -->
    <?php the_field("page_avec_image"); ?>
  </section>
</article>
