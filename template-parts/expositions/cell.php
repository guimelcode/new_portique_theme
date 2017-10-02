  <section class="thePostText francais col-xs-26 col-sm-13 col-md-6">
    <?php echo "<a postID='".get_the_ID()."' href='#' class='archive-link' name='".$post->post_name."'>";?>

      <h1 class="titre"><?php echo get_the_title(); ?></h1>
      <h2 class="subtitle"><?php echo get_field("sous-titre"); ?></h2>
      <h3 class="temps">
        du&nbsp;<time><?php echo templateFormatDate(get_post_meta( get_the_ID(), 'date_debut_exposition', true )); ?></time>
        au&nbsp;<time><?php echo templateFormatDate(get_post_meta( get_the_ID(), 'date_fin_exposition', true )); ?></time>
      </h3>
    </a>
  </section>
