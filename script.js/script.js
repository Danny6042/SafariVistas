/* ============================================================
   SAFARIVISTA
   Complete JavaScript
   Premium Kenya Tourism & Safari Experience
   ============================================================ */

"use strict";

/* ============================================================
   DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       PAGE LOADER
       ======================================================== */

    const pageLoader = document.querySelector(".page-loader");

    if (pageLoader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                pageLoader.classList.add("loaded");

                setTimeout(() => {
                    pageLoader.remove();
                }, 700);

            }, 500);
        });
    }


    /* ========================================================
       CURRENT YEAR
       ======================================================== */

    document.querySelectorAll("[data-current-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* ========================================================
       HEADER
       ======================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* ========================================================
       MOBILE NAVIGATION
       ======================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNavigation = document.querySelector(".mobile-navigation");

    if (menuToggle && mobileNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuToggle.classList.toggle("active", !isOpen);
            mobileNavigation.classList.toggle("open", !isOpen);

            document.body.classList.toggle(
                "menu-open",
                !isOpen
            );
        });


        /* Close mobile menu after clicking a link */

        mobileNavigation
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.classList.remove("active");
                    mobileNavigation.classList.remove("open");
                    document.body.classList.remove("menu-open");

                });

            });


        /* Close menu with Escape */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.classList.remove("active");
                mobileNavigation.classList.remove("open");
                document.body.classList.remove("menu-open");

            }

        });

    }


    /* ========================================================
       SMOOTH SCROLL
       ======================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ========================================================
       ACTIVE NAVIGATION
       ======================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(
            ".main-navigation a, .mobile-navigation a"
        );

    if (sections.length && navLinks.length) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute("id");

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    });

                },
                {
                    rootMargin: "-35% 0px -55% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* ========================================================
       DESTINATION FILTERS
       ======================================================== */

    const destinationButtons =
        document.querySelectorAll(
            ".destinations .filter-btn"
        );

    const destinationCards =
        document.querySelectorAll(
            ".destination-card"
        );

    destinationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;

            destinationButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            destinationCards.forEach(card => {

                const category =
                    card.dataset.category;

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {

                    card.style.display = "";

                    requestAnimationFrame(() => {
                        card.classList.remove("filter-hidden");
                    });

                } else {

                    card.classList.add("filter-hidden");

                    setTimeout(() => {

                        if (
                            card.classList.contains(
                                "filter-hidden"
                            )
                        ) {
                            card.style.display = "none";
                        }

                    }, 250);

                }

            });

        });

    });


    /* ========================================================
       SAFARI FILTERS
       ======================================================== */

    const safariButtons =
        document.querySelectorAll(
            ".safaris .filter-btn"
        );

    const safariCards =
        document.querySelectorAll(
            ".tour-card"
        );

    safariButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;

            safariButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            safariCards.forEach(card => {

                const category =
                    card.dataset.category;

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {

                    card.style.display = "";

                    requestAnimationFrame(() => {
                        card.classList.remove("filter-hidden");
                    });

                } else {

                    card.classList.add("filter-hidden");

                    setTimeout(() => {

                        if (
                            card.classList.contains(
                                "filter-hidden"
                            )
                        ) {
                            card.style.display = "none";
                        }

                    }, 250);

                }

            });

        });

    });


    /* ========================================================
       HERO VIDEO
       ======================================================== */

    const heroVideo =
        document.querySelector(".hero-video");

    const heroFallback =
        document.querySelector(".hero-fallback");

    if (heroVideo) {

        heroVideo.addEventListener(
            "canplay",
            () => {

                heroVideo.classList.add("video-ready");

                if (heroFallback) {
                    heroFallback.classList.add(
                        "video-hidden"
                    );
                }

            }
        );


        heroVideo.addEventListener(
            "error",
            () => {

                heroVideo.classList.add(
                    "video-error"
                );

                if (heroFallback) {
                    heroFallback.classList.add(
                        "fallback-visible"
                    );
                }

            }
        );


        /* Attempt autoplay */

        const playPromise =
            heroVideo.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {

                heroVideo.muted = true;

                heroVideo.play().catch(() => {
                    if (heroFallback) {
                        heroFallback.classList.add(
                            "fallback-visible"
                        );
                    }
                });

            });

        }

    }


    /* ========================================================
       GALLERY
       ======================================================== */

    const galleryItems =
        Array.from(
            document.querySelectorAll(
                ".gallery-item"
            )
        );

    const lightbox =
        document.querySelector(
            ".gallery-lightbox"
        );

    const lightboxImage =
        lightbox
            ? lightbox.querySelector(
                ".gallery-view img"
            )
            : null;

    const galleryClose =
        document.querySelector(
            ".gallery-close"
        );

    const galleryPrev =
        document.getElementById(
            "gallery-prev"
        );

    const galleryNext =
        document.getElementById(
            "gallery-next"
        );

    let currentGalleryIndex = 0;


    function updateGalleryImage(index) {

        if (
            !galleryItems.length ||
            !lightboxImage
        ) {
            return;
        }

        currentGalleryIndex =
            (index + galleryItems.length) %
            galleryItems.length;

        const item =
            galleryItems[currentGalleryIndex];

        const image =
            item.querySelector("img");

        if (!image) return;

        lightboxImage.src =
            image.currentSrc ||
            image.src;

        lightboxImage.alt =
            image.alt || "SafariVista gallery image";

    }


    function openGallery(index) {

        if (!lightbox) return;

        updateGalleryImage(index);

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );

    }


    function closeGallery() {

        if (!lightbox) return;

        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

    }


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {
            openGallery(index);
        });

    });


    if (galleryClose) {

        galleryClose.addEventListener(
            "click",
            closeGallery
        );

    }


    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            () => {

                updateGalleryImage(
                    currentGalleryIndex - 1
                );

            }
        );

    }


    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            () => {

                updateGalleryImage(
                    currentGalleryIndex + 1
                );

            }
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeGallery();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("open")
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeGallery();
            }

            if (event.key === "ArrowLeft") {
                updateGalleryImage(
                    currentGalleryIndex - 1
                );
            }

            if (event.key === "ArrowRight") {
                updateGalleryImage(
                    currentGalleryIndex + 1
                );
            }

        }
    );


    /* ========================================================
       TOUCH SWIPE FOR GALLERY
       ======================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchStartX - touchEndX;

                if (Math.abs(difference) < 50) {
                    return;
                }

                if (difference > 0) {

                    updateGalleryImage(
                        currentGalleryIndex + 1
                    );

                } else {

                    updateGalleryImage(
                        currentGalleryIndex - 1
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* ========================================================
       COUNTER ANIMATION
       ======================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    function animateCounter(counter) {

        if (
            counter.dataset.animated === "true"
        ) {
            return;
        }

        counter.dataset.animated = "true";

        const target =
            Number(
                counter.dataset.counter
            );

        const suffix =
            counter.dataset.suffix || "";

        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                Math.floor(
                    target * eased
                );

            counter.textContent =
                currentValue + suffix;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target + suffix;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    /* ========================================================
       TRAVEL PLANNER
       ======================================================== */

    const plannerForm =
        document.querySelector(
            ".planner-form"
        );

    const plannerResult =
        document.querySelector(
            ".planner-result"
        );

    if (
        plannerForm &&
        plannerResult
    ) {

        plannerForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const destination =
                    plannerForm
                        .querySelector(
                            "[name='destination']"
                        )
                        ?.value || "Kenya";

                const duration =
                    plannerForm
                        .querySelector(
                            "[name='duration']"
                        )
                        ?.value || "7";

                const style =
                    plannerForm
                        .querySelector(
                            "[name='style']"
                        )
                        ?.value || "classic";


                const styleNames = {
                    classic: "Classic Safari",
                    luxury: "Luxury Escape",
                    adventure: "Adventure",
                    family: "Family Safari"
                };


                const styleName =
                    styleNames[style] ||
                    "Safari Adventure";


                plannerResult.innerHTML = `
                    <div class="planner-success">
                        <strong>Your journey is taking shape.</strong>
                        <p>
                            We've prepared a
                            ${duration}-day
                            ${styleName}
                            through
                            ${destination}.
                        </p>
                        <a href="#booking" class="text-link">
                            Continue to booking →
                        </a>
                    </div>
                `;


                plannerResult.classList.add(
                    "visible"
                );


                plannerResult
                    .querySelector("a")
                    ?.addEventListener(
                        "click",
                        () => {
                            plannerResult.classList.remove(
                                "visible"
                            );
                        }
                    );

            }
        );

    }


    /* ========================================================
       BOOKING FORM
       ======================================================== */

    const bookingForm =
        document.querySelector(
            ".booking-form"
        );

    const formMessage =
        document.querySelector(
            ".form-message"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !bookingForm.checkValidity()
                ) {

                    bookingForm.reportValidity();

                    if (formMessage) {
                        formMessage.textContent =
                            "Please complete the required fields.";
                        formMessage.className =
                            "form-message error";
                    }

                    return;
                }


                const name =
                    document.getElementById(
                        "booking-name"
                    )?.value.trim() || "";

                const destination =
                    document.getElementById(
                        "booking-destination"
                    )?.value || "";

                const guests =
                    document.getElementById(
                        "booking-guests"
                    )?.value || "";


                if (formMessage) {

                    formMessage.textContent =
                        `Thank you${name ? `, ${name}` : ""}! ` +
                        `Your safari enquiry for ` +
                        `${destination || "Kenya"} ` +
                        `for ${guests || "your"} traveller(s) ` +
                        `has been prepared.`;

                    formMessage.className =
                        "form-message success";

                }


                /* =================================================
                   WHATSAPP BOOKING MESSAGE

                   This creates a WhatsApp enquiry using
                   the number already present in your HTML.
                   ================================================= */

                const email =
                    document.getElementById(
                        "booking-email"
                    )?.value.trim() || "";

                const phone =
                    document.getElementById(
                        "booking-phone"
                    )?.value.trim() || "";

                const style =
                    document.getElementById(
                        "booking-style"
                    )?.value || "";

                const date =
                    document.getElementById(
                        "booking-date"
                    )?.value || "";

                const message =
                    document.getElementById(
                        "booking-message"
                    )?.value.trim() || "";


                const whatsappText =
                    `SafariVista Safari Enquiry%0A%0A` +
                    `Name: ${encodeURIComponent(name)}%0A` +
                    `Email: ${encodeURIComponent(email)}%0A` +
                    `Phone: ${encodeURIComponent(phone)}%0A` +
                    `Travellers: ${encodeURIComponent(guests)}%0A` +
                    `Destination: ${encodeURIComponent(destination)}%0A` +
                    `Travel style: ${encodeURIComponent(style)}%0A` +
                    `Travel date: ${encodeURIComponent(date)}%0A` +
                    `Dream safari: ${encodeURIComponent(message)}`;


                const whatsappURL =
                    `https://wa.me/254742228875?text=${whatsappText}`;


                /* Open WhatsApp after successful validation */

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }, 500);

            }
        );

    }


    /* ========================================================
       NEWSLETTER FORM
       ======================================================== */

    const newsletterForm =
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input[type='email']"
                    );


                if (
                    !input ||
                    !input.checkValidity()
                ) {

                    input?.reportValidity();

                    return;

                }


                const button =
                    newsletterForm.querySelector(
                        "button"
                    );


                const originalText =
                    button
                        ? button.textContent
                        : "Subscribe";


                if (button) {

                    button.textContent =
                        "Subscribed ✓";

                    button.disabled = true;

                }


                input.value = "";


                setTimeout(() => {

                    if (button) {

                        button.textContent =
                            originalText;

                        button.disabled = false;

                    }

                }, 3000);

            }
        );

    }


    /* ========================================================
       FAQ
       ======================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {
                    return;
                }

                faqItems.forEach(otherItem => {

                    if (
                        otherItem !== item &&
                        otherItem.open
                    ) {
                        otherItem.open = false;
                    }

                });

            }
        );

    });


    /* ========================================================
       BACK TO TOP
       ======================================================== */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );


    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ========================================================
       LAZY IMAGE ERROR HANDLING
       ======================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* ========================================================
       REVEAL ANIMATIONS
       ======================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .destination-card,
            .experience-card,
            .why-item,
            .tour-card,
            .testimonial-card,
            .story-card,
            .contact-card,
            .about-content,
            .about-image
            `
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "reveal-element"
            );

            revealObserver.observe(
                element
            );

        });

    }


    /* ========================================================
       PREVENT DOUBLE SUBMISSIONS
       ======================================================== */

    document
        .querySelectorAll("form")
        .forEach(form => {

            form.addEventListener(
                "invalid",
                () => {
                    form.classList.add(
                        "has-validation-error"
                    );
                },
                true
            );

        });


    /* ========================================================
       RESIZE CLEANUP
       ======================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                menuToggle &&
                mobileNavigation
            ) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.classList.remove(
                    "active"
                );

                mobileNavigation.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* ========================================================
       CONSOLE MESSAGE
       ======================================================== */

    console.log(
        "%cSafariVista",
        "font-size:24px;font-weight:bold;"
    );

    console.log(
        "Discover Kenya. Experience the extraordinary."
    );

});