// Start by waiting for the DOM to be fully ready
document.addEventListener("DOMContentLoaded", () => {
  
  const tl = gsap.timeline()
  const counterElement = document.querySelector(".counter");
  const body = document.querySelector("body");
  gsap.set(body, { overflowY: "hidden" });
  
  // 2. Define the starting and ending values
  const myCounter = { val: 10 };

  tl.from(".fill-line", {scaleX: 0, duration: 1})
  .set(".loading-bar", {autoAlpha: 0}, ">")
  .to(".counter-div", {display: "flex"}, "<")
  .to(myCounter, {
    val: 0,                // Count down to 0
    duration: 1.1,          // Duration in seconds
    ease: "none",          // Linear countdown
    roundProps: "val",     // Ensures it counts by integers (10, 9, 8...)
    onUpdate: function() {
        // Update the DOM text content on every frame
        counterElement.textContent = myCounter.val;
    }
}, "<")
  .set(".counter-div", {display: "none"}, ">")
  .to(".cross-div", { display: "flex" }, "<")
  .to(".cross-div path", { fill: "#FFFFFF", duration: 0.1}, "<")
  .to(".cross-div path", { fill: "#E52F25", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#FFFFFF", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#E52F25", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#FFFFFF", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#E52F25", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#FFFFFF", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#E52F25", duration: 0.1}, ">")
  .to(".cross-div path", { fill: "#FFFFFF", duration: 0.1}, ">")
  .to(".cross-div path", {scale: 26, duration: 1.5, transformOrigin: "center center"}, ">")
  .to(".preloader", {autoAlpha: 0}, "<1.2")
})