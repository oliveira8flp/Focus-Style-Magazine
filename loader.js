// Start by waiting for the DOM to be fully ready
document.addEventListener("DOMContentLoaded", () => {
  
  gsap.to(".img-preloader", {
  rotationY: 360, // Rotates 180 degrees on the X-axis
  repeat: -1,
  duration: 1.5,
  ease: "linear",
  transformStyle: "preserve-3d" // Essential for 3D sub-elements
});

// A simple object to hold our number
let counter = { val: 0 };
const steps = [0, 23, 54, 74, 92, 100];
const tl = gsap.timeline()

tl.to(counter, { val: 12, duration: 0.5, snap: { val: 1 }, onUpdate: () => document.querySelector(".counter-display").innerText = counter.val + "%" })
  .to(counter, { val: 23, duration: 0.5, snap: { val: 1 }, onUpdate: () => document.querySelector(".counter-display").innerText = counter.val + "%" })
  .to(counter, { val: 54, duration: 0.3, snap: { val: 1 }, onUpdate: () => document.querySelector(".counter-display").innerText = counter.val + "%" })
  .to(counter, { val: 74, duration: 0.3, snap: { val: 1 }, onUpdate: () => document.querySelector(".counter-display").innerText = counter.val + "%" })
  .to(counter, { val: 92, duration: 0.5, snap: { val: 1 }, onUpdate: () => document.querySelector(".counter-display").innerText = counter.val + "%" })
  .to(counter, { val: 100, duration: 0.5, snap: { val: 1 }, onUpdate: () => document.querySelector(".counter-display").innerText = counter.val + "%" })
  .to(".preloader", {
    autoAlpha:0,
}, ">0.1")
  .to(".img-preloader", {width: 0, duration: 2}, "<");

  
});