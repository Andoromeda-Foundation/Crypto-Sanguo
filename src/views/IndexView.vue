<template>
  <div>
    <!-- ***** Wellcome Area Start ***** -->
    <section class="wellcome_area clearfix"
             id="home">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 col-md">
            <div class="wellcome-heading">
              <h2>Sponsor Token</h2>
              <h3>ST</h3>
              <p>发布专属于你的区块链加密卡牌，获取意想不到的高额收益！</p>
            </div>
            <div class="get-start-area">
              <router-link v-if="!me"
                           class="submit"
                           :to="{ name: 'CreateToken'}">
                立即创建Token
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Welcome thumb -->
      <div class="welcome-thumb wow fadeInDown"
           data-wow-delay="0.5s">
        <img src="/static/assets/img/bg-img/welcome-img-token.png"
             class=""
             alt="">
      </div>
    </section>
    <!-- ***** Wellcome Area End ***** -->

    <!-- ***** Special Area Start ***** -->
    <section class="special-area bg-white section_padding_100"
             id="about">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Section Heading Area -->
            <div class="section-heading text-center">
              <h2>Why Is It Special</h2>
              <div class="line-shape"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Single Special Area -->
          <div class="col-12 col-md-4">
            <div class="single-special text-center wow fadeInUp"
                 data-wow-delay="0.2s">
              <div class="single-icon">
                <i class="ti-mobile"
                   aria-hidden="true"></i>
              </div>
              <h4>Easy to use</h4>
              <p>We build pretty complex tools and this allows us to take designs and
                turn them into functional quickly and easily</p>
            </div>
          </div>
          <!-- Single Special Area -->
          <div class="col-12 col-md-4">
            <div class="single-special text-center wow fadeInUp"
                 data-wow-delay="0.4s">
              <div class="single-icon">
                <i class="ti-ruler-pencil"
                   aria-hidden="true"></i>
              </div>
              <h4>Powerful Design</h4>
              <p>We build pretty complex tools and this allows us to take designs and
                turn them into functional quickly and easily</p>
            </div>
          </div>
          <!-- Single Special Area -->
          <div class="col-12 col-md-4">
            <div class="single-special text-center wow fadeInUp"
                 data-wow-delay="0.6s">
              <div class="single-icon">
                <i class="ti-settings"
                   aria-hidden="true"></i>
              </div>
              <h4>Customizability</h4>
              <p>We build pretty complex tools and this allows us to take designs and
                turn them into functional quickly and easily</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Special Description Area -->
      <div class="special_description_area mt-150">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="special_description_img">
                <img src="/static/assets/img/bg-img/special.png"
                     alt="">
              </div>
            </div>
            <div class="col-lg-6 col-xl-5 ml-xl-auto">
              <div class="special_description_content">
                <h2>Our Best Propositions for You!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor ut labore et dolore magna aliqua. Lorem ipsum dolor
                  sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco.</p>
                <div class="app-download-area">
                  <div class="app-download-btn wow fadeInUp"
                       data-wow-delay="0.2s">
                    <!-- Google Store Btn -->
                    <a href="#">
                      <i class="fa fa-android"></i>
                      <p class="mb-0">
                        <span>available on</span> Google Store</p>
                    </a>
                  </div>
                  <div class="app-download-btn wow fadeInDown"
                       data-wow-delay="0.4s">
                    <!-- Apple Store Btn -->
                    <a href="#">
                      <i class="fa fa-apple"></i>
                      <p class="mb-0">
                        <span>available on</span> Apple Store</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Special Area End ***** -->

    <!-- ***** Awesome Features Start ***** -->
    <section class="awesome-feature-area bg-white section_padding_0_50 clearfix"
             id="features">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Heading Text -->
            <div class="section-heading text-center">
              <h2>Awesome Features</h2>
              <div class="line-shape"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Single Feature Start -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-feature">
              <i class="ti-user"
                 aria-hidden="true"></i>
              <h5>Awesome Experience</h5>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <!-- Single Feature Start -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-feature">
              <i class="ti-pulse"
                 aria-hidden="true"></i>
              <h5>Fast and Simple</h5>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <!-- Single Feature Start -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-feature">
              <i class="ti-dashboard"
                 aria-hidden="true"></i>
              <h5>Clean Code</h5>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <!-- Single Feature Start -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-feature">
              <i class="ti-palette"
                 aria-hidden="true"></i>
              <h5>Perfect Design</h5>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <!-- Single Feature Start -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-feature">
              <i class="ti-crown"
                 aria-hidden="true"></i>
              <h5>Best Industry Leader</h5>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <!-- Single Feature Start -->
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-feature">
              <i class="ti-headphone"
                 aria-hidden="true"></i>
              <h5>24/7 Online Support</h5>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
    <!-- ***** Awesome Features End ***** -->

    <!-- ***** Video Area Start ***** -->
    <div class="video-section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Video Area Start -->
            <div class="video-area"
                 style="background-image: url(/static/assets/img/bg-img/video.jpg);">
              <div class="video-play-btn">
                <a href="https://www.youtube.com/watch?v=f5BBJ4ySgpo"
                   class="video_btn">
                  <i class="fa fa-play"
                     aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ***** Video Area End ***** -->

    <!-- ***** Cool Facts Area Start ***** -->
    <section class="cool_facts_area clearfix">
      <div class="container">
        <div class="row">
          <!-- Single Cool Fact-->
          <div class="col-12 col-md-3 col-lg-3">
            <div class="single-cool-fact d-flex justify-content-center wow fadeInUp"
                 data-wow-delay="0.2s">
              <div class="counter-area">
                <h3>
                  <span class="counter">90</span>
                </h3>
              </div>
              <div class="cool-facts-content">
                <i class="ion-arrow-down-a"></i>
                <p>APP <br> DOWNLOADS</p>
              </div>
            </div>
          </div>
          <!-- Single Cool Fact-->
          <div class="col-12 col-md-3 col-lg-3">
            <div class="single-cool-fact d-flex justify-content-center wow fadeInUp"
                 data-wow-delay="0.4s">
              <div class="counter-area">
                <h3>
                  <span class="counter">120</span>
                </h3>
              </div>
              <div class="cool-facts-content">
                <i class="ion-happy-outline"></i>
                <p>Happy <br> Clients</p>
              </div>
            </div>
          </div>
          <!-- Single Cool Fact-->
          <div class="col-12 col-md-3 col-lg-3">
            <div class="single-cool-fact d-flex justify-content-center wow fadeInUp"
                 data-wow-delay="0.6s">
              <div class="counter-area">
                <h3>
                  <span class="counter">40</span>
                </h3>
              </div>
              <div class="cool-facts-content">
                <i class="ion-person"></i>
                <p>ACTIVE <br>ACCOUNTS</p>
              </div>
            </div>
          </div>
          <!-- Single Cool Fact-->
          <div class="col-12 col-md-3 col-lg-3">
            <div class="single-cool-fact d-flex justify-content-center wow fadeInUp"
                 data-wow-delay="0.8s">
              <div class="counter-area">
                <h3>
                  <span class="counter">10</span>
                </h3>
              </div>
              <div class="cool-facts-content">
                <i class="ion-ios-star-outline"></i>
                <p>TOTAL <br>APP RATES</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Cool Facts Area End ***** -->

    <!-- ***** App Screenshots Area Start ***** -->
    <section class="app-screenshots-area bg-white section_padding_0_100 clearfix"
             id="screenshot">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <!-- Heading Text  -->
            <div class="section-heading">
              <h2>App Screenshots</h2>
              <div class="line-shape"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- App Screenshots Slides  -->
            <div class="app_screenshots_slides owl-carousel">
              <div class="single-shot">
                <img src="/static/assets/img/scr-img/app-1.jpg"
                     alt="">
              </div>
              <div class="single-shot">
                <img src="/static/assets/img/scr-img/app-2.jpg"
                     alt="">
              </div>
              <div class="single-shot">
                <img src="/static/assets/img/scr-img/app-3.jpg"
                     alt="">
              </div>
              <div class="single-shot">
                <img src="/static/assets/img/scr-img/app-4.jpg"
                     alt="">
              </div>
              <div class="single-shot">
                <img src="/static/assets/img/scr-img/app-5.jpg"
                     alt="">
              </div>
              <div class="single-shot">
                <img src="/static/assets/img/scr-img/app-3.jpg"
                     alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** App Screenshots Area End *****====== -->

    <!-- ***** Pricing Plane Area Start *****==== -->
    <section class="pricing-plane-area section_padding_100_70 clearfix"
             id="pricing">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Heading Text  -->
            <div class="section-heading text-center">
              <h2>Pricing Plan</h2>
              <div class="line-shape"></div>
            </div>
          </div>
        </div>

        <div class="row no-gutters">
          <div class="col-12 col-md-6 col-lg-3">
            <!-- Package Price  -->
            <div class="single-price-plan text-center">
              <!-- Package Text  -->
              <div class="package-plan">
                <h5>Starter Plan</h5>
                <div class="ca-price d-flex justify-content-center">
                  <span>$</span>
                  <h4>29</h4>
                </div>
              </div>
              <div class="package-description">
                <p>Up to 10 users monthly</p>
                <p>Unlimited updates</p>
                <p>Free host &amp; domain</p>
                <p>24/7 Support</p>
                <p>10 Unique Users</p>
              </div>
              <!-- Plan Button  -->
              <div class="plan-button">
                <a href="#">Select Plan</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <!-- Package Price  -->
            <div class="single-price-plan text-center">
              <!-- Package Text  -->
              <div class="package-plan">
                <h5>Basic Plan</h5>
                <div class="ca-price d-flex justify-content-center">
                  <span>$</span>
                  <h4>49</h4>
                </div>
              </div>
              <div class="package-description">
                <p>Up to 10 users monthly</p>
                <p>Unlimited updates</p>
                <p>Free host &amp; domain</p>
                <p>24/7 Support</p>
                <p>10 Unique Users</p>
              </div>
              <!-- Plan Button  -->
              <div class="plan-button">
                <a href="#">Select Plan</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <!-- Package Price  -->
            <div class="single-price-plan active text-center">
              <!-- Package Text  -->
              <div class="package-plan">
                <h5>Advenced Plan</h5>
                <div class="ca-price d-flex justify-content-center">
                  <span>$</span>
                  <h4>69</h4>
                </div>
              </div>
              <div class="package-description">
                <p>Up to 10 users monthly</p>
                <p>Unlimited updates</p>
                <p>Free host &amp; domain</p>
                <p>24/7 Support</p>
                <p>10 Unique Users</p>
              </div>
              <!-- Plan Button  -->
              <div class="plan-button">
                <a href="#">Select Plan</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <!-- Package Price  -->
            <div class="single-price-plan text-center">
              <!-- Package Text  -->
              <div class="package-plan">
                <h5>Community Plan</h5>
                <div class="ca-price d-flex justify-content-center">
                  <span>$</span>
                  <h4>99</h4>
                </div>
              </div>
              <div class="package-description">
                <p>Up to 10 users monthly</p>
                <p>Unlimited updates</p>
                <p>Free host &amp; domain</p>
                <p>24/7 Support</p>
                <p>10 Unique Users</p>
              </div>
              <!-- Plan Button  -->
              <div class="plan-button">
                <a href="#">Select Plan</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Pricing Plane Area End ***** -->

    <!-- ***** Client Feedback Area Start ***** -->
    <section class="clients-feedback-area bg-white section_padding_100 clearfix"
             id="testimonials">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10">
            <div class="slider slider-for">
              <!-- Client Feedback Text  -->
              <div class="client-feedback-text text-center">
                <div class="client">
                  <i class="fa fa-quote-left"
                     aria-hidden="true"></i>
                </div>
                <div class="client-description text-center">
                  <p>“ I have been using it for a number of years. I use Colorlib for
                    usability testing. It's great for taking images and making clickable
                    image prototypes that do the job and save me the coding time
                    and just the general hassle of hosting. ”</p>
                </div>
                <div class="star-icon text-center">
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                </div>
                <div class="client-name text-center">
                  <h5>Aigars Silkalns</h5>
                  <p>Ceo Colorlib</p>
                </div>
              </div>
              <!-- Client Feedback Text  -->
              <div class="client-feedback-text text-center">
                <div class="client">
                  <i class="fa fa-quote-left"
                     aria-hidden="true"></i>
                </div>
                <div class="client-description text-center">
                  <p>“ I use Colorlib for usability testing. It's great for taking images
                    and making clickable image prototypes that do the job and save
                    me the coding time and just the general hassle of hosting. ”</p>
                </div>
                <div class="star-icon text-center">
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                </div>
                <div class="client-name text-center">
                  <h5>Jennifer</h5>
                  <p>Developer</p>
                </div>
              </div>
              <!-- Client Feedback Text  -->
              <div class="client-feedback-text text-center">
                <div class="client">
                  <i class="fa fa-quote-left"
                     aria-hidden="true"></i>
                </div>
                <div class="client-description text-center">
                  <p>“ I have been using it for a number of years. I use Colorlib for
                    usability testing. It's great for taking images and making clickable
                    image prototypes that do the job.”</p>
                </div>
                <div class="star-icon text-center">
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                </div>
                <div class="client-name text-center">
                  <h5>Helen</h5>
                  <p>Marketer</p>
                </div>
              </div>
              <!-- Client Feedback Text  -->
              <div class="client-feedback-text text-center">
                <div class="client">
                  <i class="fa fa-quote-left"
                     aria-hidden="true"></i>
                </div>
                <div class="client-description text-center">
                  <p>“ I have been using it for a number of years. I use Colorlib for
                    usability testing. It's great for taking images and making clickable
                    image prototypes that do the job and save me the coding time
                    and just the general hassle of hosting. ”</p>
                </div>
                <div class="star-icon text-center">
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                  <i class="ion-ios-star"></i>
                </div>
                <div class="client-name text-center">
                  <h5>Henry smith</h5>
                  <p>Developer</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Client Thumbnail Area -->
          <div class="col-12 col-md-6 col-lg-5">
            <div class="slider slider-nav">
              <div class="client-thumbnail">
                <img src="/static/assets/img/bg-img/client-3.jpg"
                     alt="">
              </div>
              <div class="client-thumbnail">
                <img src="/static/assets/img/bg-img/client-2.jpg"
                     alt="">
              </div>
              <div class="client-thumbnail">
                <img src="/static/assets/img/bg-img/client-1.jpg"
                     alt="">
              </div>
              <div class="client-thumbnail">
                <img src="/static/assets/img/bg-img/client-2.jpg"
                     alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Client Feedback Area End ***** -->

    <!-- ***** CTA Area Start ***** -->
    <section class="our-monthly-membership section_padding_50 clearfix">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="membership-description">
              <h2>Join our Monthly Membership</h2>
              <p>Find the perfect plan for you — 100% satisfaction guaranteed.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="get-started-button wow bounceInDown"
                 data-wow-delay="0.5s">
              <a href="#">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** CTA Area End ***** -->

    <!-- ***** Our Team Area Start ***** -->
    <section class="our-Team-area bg-white section_padding_100_50 clearfix"
             id="team">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <!-- Heading Text  -->
            <div class="section-heading">
              <h2>Our Team</h2>
              <div class="line-shape"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="single-team-member">
              <div class="member-image">
                <img src="/static/assets/img/team-img/team-1.jpg"
                     alt="">
                <div class="team-hover-effects">
                  <div class="team-social-icon">
                    <a href="#">
                      <i class="fa fa-facebook"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-google-plus"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram"
                         aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="member-text">
                <h4>Jackson Nash</h4>
                <p>Tax Advice</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="single-team-member">
              <div class="member-image">
                <img src="/static/assets/img/team-img/team-2.jpg"
                     alt="">
                <div class="team-hover-effects">
                  <div class="team-social-icon">
                    <a href="#">
                      <i class="fa fa-facebook"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-google-plus"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram"
                         aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="member-text">
                <h4>Alex Manning</h4>
                <p>CEO-Founder</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="single-team-member">
              <div class="member-image">
                <img src="/static/assets/img/team-img/team-3.jpg"
                     alt="">
                <div class="team-hover-effects">
                  <div class="team-social-icon">
                    <a href="#">
                      <i class="fa fa-facebook"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-google-plus"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram"
                         aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="member-text">
                <h4>Ollie Schneider</h4>
                <p>Business Planner</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="single-team-member">
              <div class="member-image">
                <img src="/static/assets/img/team-img/team-4.jpg"
                     alt="">
                <div class="team-hover-effects">
                  <div class="team-social-icon">
                    <a href="#">
                      <i class="fa fa-facebook"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-google-plus"
                         aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram"
                         aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="member-text">
                <h4>Roger West</h4>
                <p>Financer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Our Team Area End ***** -->

    <!-- ***** Contact Us Area Start ***** -->
    <section class="footer-contact-area section_padding_100 clearfix"
             id="contact">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <!-- Heading Text  -->
            <div class="section-heading">
              <h2>Get in touch with us!</h2>
              <div class="line-shape"></div>
            </div>
            <div class="footer-text">
              <p>We'll send you epic weekly blogs, whitepapers and things to make your
                app startup thrive, all FREE!</p>
            </div>
            <div class="address-text">
              <p>
                <span>Address:</span> 40 Baria Sreet 133/2 NewYork City, US</p>
            </div>
            <div class="phone-text">
              <p>
                <span>Phone:</span> +11-225-888-888-66</p>
            </div>
            <div class="email-text">
              <p>
                <span>Email:</span> info.deercreative@gmail.com</p>
            </div>
          </div>
          <div class="col-md-6">
            <!-- Form Start-->
            <div class="contact_from">
              <form action="#"
                    method="post">
                <!-- Message Input Area Start -->
                <div class="contact_input_area">
                  <div class="row">
                    <!-- Single Input Area Start -->
                    <div class="col-md-12">
                      <div class="form-group">
                        <input type="text"
                               class="form-control"
                               name="name"
                               id="name"
                               placeholder="Your Name"
                               required>
                      </div>
                    </div>
                    <!-- Single Input Area Start -->
                    <div class="col-md-12">
                      <div class="form-group">
                        <input type="email"
                               class="form-control"
                               name="email"
                               id="email"
                               placeholder="Your E-mail"
                               required>
                      </div>
                    </div>
                    <!-- Single Input Area Start -->
                    <div class="col-12">
                      <div class="form-group">
                        <textarea name="message"
                                  class="form-control"
                                  id="message"
                                  cols="30"
                                  rows="4"
                                  placeholder="Your Message *"
                                  required></textarea>
                      </div>
                    </div>
                    <!-- Single Input Area Start -->
                    <div class="col-12">
                      <button type="submit"
                              class="btn submit-btn">Send Now</button>
                    </div>
                  </div>
                </div>
                <!-- Message Input Area End -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Contact Us Area End ***** -->
  </div>
</template>

<script>
import { buyItem, setGg, setNextPrice } from '@/api';

export default {
  name: 'item-view',

  data: () => ({}),

  computed: {
    // itemId() {
    //   return this.$route.params.id;
    // },
    // me() {
    //   return this.$store.state.me || {};
    // },
    // item() {
    //   return this.$store.state.items[this.itemId];
    // },
    // ad() {
    //   return this.$store.state.ads[this.itemId];
    // }
  },
  async created() {
    // this.$store.dispatch('FETCH_ITEM', this.itemId);
    // this.$store.dispatch('FETCH_AD', this.itemId);
  },

  watch: {},

  methods: {},
};
</script>
 <style scoped>

</style>
