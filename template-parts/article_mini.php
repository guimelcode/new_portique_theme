<article class="row">
  <section class="thePostText article_mini francais col-xs-offset-3 col-xs-20 text-center">
    <header>
      <h1><?php echo get_the_title(); ?></h1>
      <h2><?php echo get_field("sous-titre"); ?></h2>
       <h3 class="temps"> du
        <time ><?php echo templateFormatDate(get_post_meta( get_the_ID(), 'date_debut_exposition', true )); ?></time>
        au
        <time ><?php echo templateFormatDate(get_post_meta( get_the_ID(), 'date_fin_exposition', true )); ?></time>
      </h3>
    </header>
    <main>
      <!-- Ici, Inclure en <h3> variable texte ou bien EXPOSITION ou bien ÉVÈNEMENT  -->
     <?php echo $content = apply_filters('the_content', $post->post_content); ?>
    </main>
  </section>

<!--  <section class="thePostText article_mini anglais col-xs-offset-3 col-xs-20 col-sm-offset-3 col-sm-20 col-lg-offset-1 col-lg-7">
    <header>
      <h1><?php echo get_post_meta( get_the_ID(), 'english_title', true ); ?></h1>
      <h2><?php echo get_post_meta( get_the_ID(), 'english_subtitle', true ); ?></h2>
      <time ><?php echo get_post_meta( get_the_ID(), 'date_debut_exposition', true ); ?></time>
      <time ><?php echo get_post_meta( get_the_ID(), 'date_fin_exposition', true ); ?></time>
    </header>
    <main>
      <p><?php echo get_post_meta( get_the_ID(), 'english_trad', true ); ?></p>
    </main>
  </section>
-->
</article>
