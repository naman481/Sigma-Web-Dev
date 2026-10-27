
// ==============================
// ZOMATO LANDING PAGE JAVASCRIPT
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const hero = document.querySelector("main");
    const heroImage = document.querySelector("main > img");
    const heroText = document.querySelector("main p");
    const footer = document.querySelector("footer");
    const navLinks = document.querySelectorAll("header ul li a");

    // 1. Add navigation labels and accessible image text

    const navLabels = [
        "Partner With Us",
        "Investor Relations",
        "Restaurant Consulting",
        "Apps For You"
    ];

    navLinks.forEach((link, index) => {
        link.textContent = navLabels[index];
        link.setAttribute("aria-label", navLabels[index]);

        // Avoid broken navigation to placeholder URLs.
        // Replace these with real page URLs when available.
        link.setAttribute("href", "#");
    });

    if (heroImage) {
        heroImage.setAttribute(
            "alt",
            "Discover delicious food with Zomato"
        );
    }

    // 2. Animate the hero section on page load

    if (heroText) {
        heroText.setAttribute("tabindex", "0");
    }

    if (header) {
        header.animate(
            [
                { opacity: 0, transform: "translateY(-15px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            {
                duration: 700,
                easing: "ease-out",
                fill: "both"
            }
        );
    }

    // 3. Reveal elements when they enter the viewport

    const revealElements = [heroText, footer].filter(Boolean);

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // 4. Subtle mouse movement effect on the hero image

    if (hero && heroImage &&
        window.matchMedia("(hover: hover)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            heroImage.style.animation = "none";
            heroImage.style.transform =
                `scale(1.06) translate(${x * -12}px, ${y * -12}px)`;
        });

        hero.addEventListener("pointerleave", () => {
            heroImage.style.transform = "";
            heroImage.style.animation = "";
        });
    }

    // 5. Smooth header navigation feedback

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            navLinks.forEach((item) => {
                item.removeAttribute("aria-current");
            });

            link.setAttribute("aria-current", "true");

            showToast(
                `${link.textContent} — connect this link to its page.`
            );
        });
    });

    // 6. Automatically update the copyright year

    if (footer) {
        footer.innerHTML =
            `Copyright &copy; ${new Date().getFullYear()} | All rights reserved`;
    }

    // 7. Small notification for demo navigation

    function showToast(message) {
        let toast = document.getElementById("site-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "site-toast";

            Object.assign(toast.style, {
                position: "fixed",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#252525",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: "10px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                fontSize: "14px",
                zIndex: "9999",
                maxWidth: "90%",
                textAlign: "center",
                opacity: "0",
                transition: "opacity 0.25s ease"
            });

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = "1";

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(() => {
            toast.style.opacity = "0";
        }, 2500);
    }
});
