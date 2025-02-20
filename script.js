document.querySelector(".navbar").style.display = "none";
document.querySelector(".center-text").style.opacity = "0"; 

gsap.to(".loading", { opacity: 0, y: 0, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.to(".hero-title", { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" });
gsap.to(".hero-description", { opacity: 1, y: 0, duration: 1, delay: 2.5, ease: "power2.out" });

gsap.to(".hero", { 
    opacity: 0, 
    duration: 1, 
    delay: 3, 
    ease: "power2.out", 
    onComplete: () => {
        document.querySelector(".hero").style.display = "none";
        showNavbar();
    }
});

function showNavbar() {
    const navbar = document.querySelector(".navbar");
    navbar.style.display = "flex";
    gsap.fromTo(".navbar", 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", onComplete: showText }
    );
}

function showText() {
    const textContainer = document.querySelector(".center-text");
    textContainer.style.display = "flex";

    gsap.fromTo(textContainer, 
        { scale: 2, y: 100, opacity: 0 }, 
        { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "power2.out", onComplete: showImages }
    );
}

function showImages() {
    gsap.fromTo(".top-left", { x: -200, y: -200, opacity: 0 }, { x: 120, y: 100, opacity: 1.4, duration: 1, ease: "power2.out" });
    gsap.fromTo(".top-right", { x: 200, y: -200, opacity: 0 }, { x: -120, y: 100, opacity: 1, duration: 1.2, ease: "power2.out" });
    gsap.fromTo(".bottom-left", { x: -200, y: 200, opacity: 0 }, { x: 90, y: -30, opacity: 1, duration: 1.4, ease: "power2.out" });
    gsap.fromTo(".bottom-right", { x: 200, y: 200, opacity: 0 }, { x: -40, y: -40, opacity: 1, duration: 1.6, ease: "power2.out" });
}

const images = document.querySelectorAll(".corner-image");
const textContainer = document.querySelector(".center-text");

images.forEach(image => {
    image.addEventListener("mouseenter", () => {
        gsap.to(image, { duration: 0.3 ,  zIndex: 10});

        images.forEach(img => {
            if (img !== image) {
                gsap.to(img, { opacity: 0, duration: 0.5 , zIndex: 0 });
            }
        });

        gsap.to(textContainer, { filter: "blur(6px)", duration: 0.5 });

        let interval = setInterval(() => {
            let randomX = (Math.random() - 0.5) * 100;
            let randomY = (Math.random() - 0.5) * 100;

            gsap.to(image, { 
                x: `+=${randomX}`, 
                y: `+=${randomY}`, 
                duration: 0.8, 
                ease: "power2.out" 
            });
        }, 500);

        setTimeout(() => {
            clearInterval(interval);

            gsap.to(image, { 
                x: 0, 
                y: 0, 
                opacity: 1, 
                borderColor: "transparent", 
                borderRadius: "10px", 
                duration: 1, 
                ease: "power2.out" 
            });

            images.forEach(img => {
                if (img !== image) {
                    gsap.to(img, { opacity: 1, duration: 0.5 ,  });
                }
            });

            gsap.to(textContainer, { filter: "blur(0px)", duration: 0.5 });
        }, 5000);
    });
});
