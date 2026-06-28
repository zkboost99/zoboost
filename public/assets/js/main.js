/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Robok - AI Agency & Technology HTML Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {


		/* ==================================================
		    # Wow Init
		 ===============================================*/
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: true, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();


		/* ==================================================
		    # Tooltip Init
		===============================================*/
		$('[data-toggle="tooltip"]').tooltip();


		/* ==================================================
		    # Youtube Video Init
		 ===============================================*/
		$('.player').mb_YTPlayer();


		/* ==================================================
		    # imagesLoaded active
		===============================================*/
		$('#gallery-masonary,.blog-masonry').imagesLoaded(function() {

			/* Filter menu */
			$('.mix-item-menu').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({
					filter: filterValue
				});
			});

			/* filter menu active class  */
			$('.mix-item-menu button').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

			/* Filter active */
			var $grid = $('#gallery-masonary').isotope({
				itemSelector: '.gallery-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.gallery-item',
				}
			});

			/* Filter active */
			$('.blog-masonry').isotope({
				itemSelector: '.blog-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.blog-item',
				}
			});

		});


		/* ==================================================
		    # Fun Factor Init
		===============================================*/
		$('.js-counter').numberAnimate();


		/* ==================================================
		    # Magnific popup init
		 ===============================================*/
		$(".popup-link").magnificPopup({
			type: 'image',
			// other options
		});

		$(".popup-gallery").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			// other options
		});

		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		$('.magnific-mix-gallery').each(function() {
			var $container = $(this);
			var $imageLinks = $container.find('.item');

			var items = [];
			$imageLinks.each(function() {
				var $item = $(this);
				var type = 'image';
				if ($item.hasClass('magnific-iframe')) {
					type = 'iframe';
				}
				var magItem = {
					src: $item.attr('href'),
					type: type
				};
				magItem.title = $item.data('title');
				items.push(magItem);
			});

			$imageLinks.magnificPopup({
				mainClass: 'mfp-fade',
				items: items,
				gallery: {
					enabled: true,
					tPrev: $(this).data('prev-text'),
					tNext: $(this).data('next-text')
				},
				type: 'image',
				callbacks: {
					beforeOpen: function() {
						var index = $imageLinks.index(this.st.el);
						if (-1 !== index) {
							this.goTo(index);
						}
					}
				}
			});
		});


		/* ==================================================
            # Hover Active Init
        ===============================================*/
		$('.hover-active-item').on('mouseenter', function() {
			var $this;
			$this = $(this);
			if ($this.hasClass('active')) {
				$this.addClass('active');
			} else {
				$this.addClass('active');
				$this.siblings().removeClass('active');
			}
		})


		/* ==================================================
            # Banner Carousel
         ===============================================*/
		const bannerFade = new Swiper(".banner-fade", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true
			},

			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
            # Brand Carousel
         ===============================================*/
		const brandOne = new Swiper(".brand-style-one-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 2,
			spaceBetween: 50,
			autoplay: true,
			breakpoints: {
				768: {
					slidesPerView: 3,
					spaceBetween: 80,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 80,
				},
				1400: {
					slidesPerView: 5,
					spaceBetween: 80,
				}
			},
		});



		/* ==================================================
            # Testimonials Carousel
         ===============================================*/
		const testimonialOneCarousel = new Swiper(".testimonial-style-one-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: true,
			pagination: {
				el: ".testimonial-swiper-pagination",
				clickable: true,
			},
			// Navigation arrows
			navigation: {
				nextEl: ".testimonial-swiper-button-next",
				prevEl: ".testimonial-swiper-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 50,
				},
				992: {
					slidesPerView: 1,
					spaceBetween: 50,
				},
				1400: {
					slidesPerView: 2,
					spaceBetween: 50,
				},
			}
		});


		/* ==================================================
            # Testimonials Carousel
         ===============================================*/
		const testimonialTwoCarousel = new Swiper(".testimonial-style-two-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
		});


		/* ==================================================
            # Testimonials Carousel
         ===============================================*/
		const testimonialhreeCarousel = new Swiper(".testimonial-style-three-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
			// Navigation arrows
			navigation: {
				nextEl: ".testimonial-three-next",
				prevEl: ".testimonial-three-prev"
			},

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
            # Infinite Carousel
         ===============================================*/
		const testimonialFourCarousel = new Swiper(".testimonial-style-four-left-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			centeredSlides: true,
			speed: 4000,
			autoplay: {
				delay: 0,
				enabled: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				}
			},
		});

		/* ==================================================
            # Testimonial Carousel
         ===============================================*/
		const testimonialFourCarouselRight = new Swiper(".testimonial-style-four-right-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			centeredSlides: true,
			freeMode: true,  
			freeModeMomentum: false,
			freeModeMomentumBounce: false,
			speed: 4000,
			autoplay: {
				delay: 0,
				disableOnInteraction: true,
				//waitForTransition: false,
				reverseDirection: true,
				enabled: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				}
			},
		});


		/* ==================================================
            # Infinite Carousel
         ===============================================*/
		const inifnitCarousel = new Swiper(".infinit-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			centeredSlides: true,
			speed: 2000,
			autoplay: {
				delay: 0,
				enabled: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 5,
				},
				1024: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				}
			},
		});


		/* ==================================================
            # Infinite Gallery Carousel
         ===============================================*/
		const inifnitGallaryCarousel = new Swiper(".infinite-gallery-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 2,
			spaceBetween: 30,
			loop: true,
			centeredSlides: true,
			speed: 2000,
			autoplay: {
				delay: 0,
				enabled: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 5,
				}
			},
		});


		/* ==================================================
            # Services Carousel
         ===============================================*/
		const servicesStyleThreeCarousel = new Swiper(".services-style-three-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			slidesPerView: 1,
			grabCursor: true,
			spaceBetween: 30,
			autoplay: true,
			// If we need pagination
			pagination: {
				el: '.services-pagination',
				type: 'fraction',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".services-button-next",
				prevEl: ".services-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 2,
				}
			},

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
		    Portfolio Animation
		================================================== */

		let ofsetHeight = document.querySelector(".scroll-top-animation");
		if (ofsetHeight) {
			ScrollTrigger.matchMedia({
				"(min-width: 992px)": function() {

					let pbmitpanels = gsap.utils.toArray(".scroll-top-item");
					const spacer = 0;

					let pbmitheight = pbmitpanels[0].offsetHeight + 30;
					pbmitpanels.forEach((pbmitpanel, i) => {
						//This is for padding between item
						TweenMax.set(pbmitpanel, {
							top: i * 0
						});
						const tween = gsap.to(pbmitpanel, {
							scrollTrigger: {
								trigger: pbmitpanel,
								start: () => `top bottom-=100`,
								end: () => `top top+=40`,
								scrub: true,
								invalidateOnRefresh: true
							},
							ease: "none",
							//This is for scaling outsite 
							scale: () => 1 - (pbmitpanels.length - i) * 0.025
						});
						ScrollTrigger.create({
							trigger: pbmitpanel,
							start: () => "top 140px",
							endTrigger: '.scroll-top-animation',
							end: `bottom top+=${pbmitheight + (pbmitpanels.length * spacer)}`,
							pin: true,
							pinSpacing: false,
						});
					});
				},
				"(max-width:1025px)": function() {
					ScrollTrigger.getAll().forEach(pbmitpanels => pbmitpanels.kill(true));
				}
			});
		}


		/* ==================================================
		    Hover Tab
		================================================== */
		let selectedIndex = 0;
		$('.service-tab-content-list li').on('mousemove', function (e) {
			$(this).addClass('active').siblings().removeClass('active');
			let arr = [...$('.service-tab-content-list li')];
			arr.forEach((value, index) => {
				if ($(value).hasClass('active')) {
					selectedIndex = index + 1;
				}
			});
			$('.service-tab-contents:nth-child(' + selectedIndex + ')').addClass('active').siblings().removeClass('active');
		});



		/* ==================================================
		    Splite Text
		================================================== */
		let text_split = document.querySelector(".split-text");
		if (text_split) {
			const animEls = document.querySelectorAll('.split-text');
			animEls.forEach(el => {
				var splitEl = new SplitText(el, {
					type: "lines, words",
					linesClass: "line"
				});
				var splitTl = gsap.timeline({
					duration: .15,
					ease: 'power4',
					scrollTrigger: {
						trigger: el,
						start: 'top 90%'
					}
				});

				splitTl.from(splitEl.words, {
					yPercent: "100",
					stagger: 0.025,
				});

			});
		}



		/* ==================================================
			Text Transfor Up
		================================================== */
		let text_transform_up = document.querySelector(".text-transform-up");
		if (text_transform_up) {
			if ($('.text-transform-up').length > 0) {
				let splitTitleLines = gsap.utils.toArray(".text-transform-up");
				splitTitleLines.forEach(splitTextLine => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: splitTextLine,
							start: 'top 90%',
							end: 'bottom 60%',
							scrub: false,
							markers: false,
							toggleActions: 'play none none none'
						}
					});

					const itemSplitted = new SplitText(splitTextLine, {
						type: "words, lines"
					});
					gsap.set(splitTextLine, {
						perspective: 300
					});
					itemSplitted.split({
						type: "lines"
					})
					tl.from(itemSplitted.lines, {
						duration: 1,
						delay: 0.3,
						opacity: 0,
						rotationX: -50,
						force3D: true,
						transformOrigin: "top center -50",
						stagger: 0.2
					});
				});
			}
		}


		/* ==================================================
		    Splite Text Left
		================================================== */
		let split_text_right = document.querySelector(".split-text-right");
		if (split_text_right) {
			var spt = $(".split-text-right");
			if (spt.length == 0) return;
			spt.each(function(index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-text-line"
				});
				gsap.set(el, {
					perspective: 400
				});

				if ($(el).hasClass('split-text-in-right')) {
					gsap.set(el.split.chars, {
						opacity: 0,
						x: "50",
						ease: "Back.easeOut",
					});
				}
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
					},
					x: "0",
					y: "0",
					rotateX: "0",
					scale: 1,
					opacity: 1,
					duration: 0.8,
					stagger: 0.03,
				});
			});
		}

		/* ==================================================
        	# Text Scroll Animation
        ===============================================*/
		var width = $(window).width();
		if (width > 1023) {
			let text_scroll = document.querySelector(".text-scroll-animation");
			if (text_scroll) {
				gsap.registerPlugin(ScrollTrigger);
				const textElements = gsap.utils.toArray('.text');
				textElements.forEach(text => {
					gsap.to(text, {
						backgroundSize: '100%',
						ease: 'none',
						scrollTrigger: {
						trigger: text,
						start: 'center 80%',
						end: 'center 20%',
						scrub: true,
						},
					});
				});
			}
		}
		
		/* ==================================================
		    GSAP Element Scroll Animation
		================================================== */

		var width = $(window).width();
		if (width > 1023) {
			let upDown_Scroll = document.querySelector(".upDownScrol");
			if (upDown_Scroll) {
				gsap.set(".upDownScrol", {
					yPercent: 80
				});

				gsap.to(".upDownScrol", {
					yPercent: -80,
					ease: "none",
					scrollTrigger: {
						trigger: ".upDownScrol",
						end: "bottom center",
						scrub: 1
					},
				});
			}


			let rightLeft_Scroll = document.querySelector(".leftRightScroll");
			if (rightLeft_Scroll) {
				gsap.set(".leftRightScroll", {
					xPercent: -30
				});

				gsap.to(".leftRightScroll", {
					xPercent: 0,
					ease: "none",
					scrollTrigger: {
						trigger: ".leftRightScroll",
						end: "left center",
						scrub: 4
					},
				});
			}
		}


		/* ==================================================
		    Transform Up Animation
		================================================== */
		if (document.querySelectorAll(".transform-up-animation").length > 0) {
			const workBoxes = document.querySelectorAll(".transform-up-animation .transform-animation-item");
			gsap.fromTo(
				workBoxes, {
					opacity: 0,
					scale: 0.9,
					y: 50,
				}, {
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.5,
					stagger: {
						each: 0.1,
						from: "random",
					},
					scrollTrigger: {
						trigger: ".transform-up-animation",
						start: "top bottom",
						end: "bottom top",
						scrub: false,
					},
				}
			);
		}


		/* ==================================================
		  Image Scale
		================================================== */
		var width = $(window).width();
		if (width > 1023) {
			if (document.querySelectorAll(".image-scale-animation").length > 0) {
				var step1 = gsap.timeline({
					duration: 1,
					scrollTrigger: {
						trigger: ".image-scale-animation",
						scrub: 4,
						start: "top 100%",
						end: "bottom 70%",
					},
				});

				step1.from(".image-scale-animation .image-scale-animation-item", {
					scale: 0.1,
					duration: 5,
				});
				step1.to(".image-scale-animation .image-scale-animation-item", {
					scale: 1,
					duration: 2,
					transformOrigin: "center bottom",
				});
			}
		}


		/* ==================================================
		    GSAP Image Reveal
		================================================== */
		let img_reveals = document.querySelector(".img-reveal");
		if (img_reveals) {

			gsap.registerPlugin(ScrollTrigger);

			let revealContainers = document.querySelectorAll(".img-reveal");

			revealContainers.forEach((container) => {
				let image = container.querySelector("img");
				let t3 = gsap.timeline({
					scrollTrigger: {
						trigger: container,
						toggleActions: "restart none none reset"
					}
				});

				t3.set(container, {
					autoAlpha: 1
				});
				t3.from(container, .8, {
					xPercent: -20,
					ease: Power2.out
				});
			});
		}



		/* ==================================================
		    GSAP Fade Up
		================================================== */
		let fadeArray_items = document.querySelectorAll(".fade-up-anim");
		if (fadeArray_items.length > 0) {
			const fadeArray = gsap.utils.toArray(".fade-up-anim")
			fadeArray.forEach((item, i) => {
				var fade_direction = "bottom"
				var onscroll_value = 1
				var duration_value = 1.15
				var fade_offset = 50
				var delay_value = 0.15
				var ease_value = "power2.out"
				if (item.getAttribute("data-offset")) {
					fade_offset = item.getAttribute("data-offset");
				}
				if (item.getAttribute("data-duration")) {
					duration_value = item.getAttribute("data-duration");
				}
				if (item.getAttribute("data-direction")) {
					fade_direction = item.getAttribute("data-direction");
				}
				if (item.getAttribute("data-on-scroll")) {
					onscroll_value = item.getAttribute("data-on-scroll");
				}
				if (item.getAttribute("data-delay")) {
					delay_value = item.getAttribute("data-delay");
				}
				if (item.getAttribute("data-ease")) {
					ease_value = item.getAttribute("data-ease");
				}
				let animation_settings = {
					opacity: 0,
					ease: ease_value,
					duration: duration_value,
					delay: delay_value,
				}
				if (fade_direction == "top") {
					animation_settings['y'] = -fade_offset
				}
				if (fade_direction == "left") {
					animation_settings['x'] = -fade_offset;
				}
				if (fade_direction == "bottom") {
					animation_settings['y'] = fade_offset;
				}
				if (fade_direction == "right") {
					animation_settings['x'] = fade_offset;
				}
				if (onscroll_value == 1) {
					animation_settings['scrollTrigger'] = {
						trigger: item,
						start: 'top 85%',
					}
				}
				gsap.from(item, animation_settings);
			})
		}


		/* ==================================================
		    Smooth Scroll
		================================================== */
		if ($('.smooth-scroll-yes').length) {
			const lenis = new Lenis({
				smoothWheel: true,
				wheelMultiplier: 1,
				duration: 1.5,
				lerp: 0.1,
			});

			function raf(time) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);

			// Handle scroll animation for anchor links
			document.querySelectorAll('a[href^="#"]').forEach((el) => {
				el.addEventListener('click', (e) => {
					e.preventDefault()
					const id = el.getAttribute('href')?.slice(1)
					if (!id) return
					const target = document.getElementById(id)
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth'
						})
					}
				})
			});
		}


		/* ==================================================
		    Contact Form Validations
		================================================== */
		$('.contact-form').each(function() {
			var formInstance = $(this);
			formInstance.submit(function() {

				var action = $(this).attr('action');

				$("#message").slideUp(750, function() {
					$('#message').hide();

					$('#submit')
						.after('<img src="assets/img/ajax-loader.gif" class="loader" />')
						.attr('disabled', 'disabled');

					$.post(action, {
							name: $('#name').val(),
							email: $('#email').val(),
							phone: $('#phone').val(),
							comments: $('#comments').val()
						},
						function(data) {
							document.getElementById('message').innerHTML = data;
							$('#message').slideDown('slow');
							$('.contact-form img.loader').fadeOut('slow', function() {
								$(this).remove()
							});
							$('#submit').removeAttr('disabled');
						}
					);
				});
				return false;
			});
		});

	}); // end document ready function

	/* ==================================================
        Preloader Init
     ===============================================*/
	 $(window).on('load', function(event) {
		$('#preloader').delay(500).fadeOut(500);
	});


})(jQuery); // End jQuery