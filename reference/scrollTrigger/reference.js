console.clear();

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "none" });

// Simple pulse animations for the balls and text
const pulses = gsap
  .timeline({
    defaults: {
      duration: 0.05,
      autoAlpha: 1,
      scale: 1.5,
      transformOrigin: "center",
      ease: "back.out(1.7)"
    }
  })
  .to(".ball02, .text01", {}, 0.2)
  .to(".ball03, .text02", {}, 0.33)
  .to(".ball04, .text03", {}, 0.46);

// Main timeline with scroll trigger
const main = gsap
  .timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: "#svg-stage",
      scrub: true,
      start: "top center",
      end: "bottom center",
      pin: true,
      pinSpacing: true
    }
  })
  .to(".ball01", { duration: 0.01, autoAlpha: 1 })
  // Simulate line drawing by animating stroke-dasharray
  .fromTo(".theLine", 
    { 
      strokeDasharray: "1000 1000",
      strokeDashoffset: 1000
    },
    { 
      strokeDashoffset: 0,
      duration: 1
    }, 0)
  // Animate ball01 along a simple path using transform
  .to(".ball01", {
    x: 250,
    y: 100,
    duration: 0.3
  }, 0.2)
  .to(".ball01", {
    x: 280,
    y: 200,
    duration: 0.3
  }, 0.4)
  .to(".ball01", {
    x: 150,
    y: 400,
    duration: 0.3
  }, 0.6)
  .add(pulses, 0.2);
