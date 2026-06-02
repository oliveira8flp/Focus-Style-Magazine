gsap.registerPlugin(Draggable);

if (jQuery(".news_ticker").length > 0) {
  const loops = gsap.utils.toArray(".news_ticker").map((ticker) => {
    const line = ticker.querySelector(".news-group");
    const links = line.querySelectorAll("li");

    // detect reversed
    const isReversed = ticker.classList.contains("reverces-animaction");

    // ✅ SAME SPEED for all tickers (or use data-speed if you want)
    const speed = parseFloat(ticker.getAttribute("data-speed") || "1");

    // setup ticker loop
    const tl = horizontalLoop(links, {
      repeat: -1,
      speed, // ✅ fixed (no more i * 0.25)
      draggable: true,
      reversed: isReversed,
      paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")),
    });

    // pause/resume ticker on hover (respect direction)
    links.forEach((link) => {
      link.addEventListener("mouseenter", () =>
        gsap.to(tl, { timeScale: 0, overwrite: true })
      );

      link.addEventListener("mouseleave", () =>
        gsap.to(tl, { timeScale: isReversed ? -1 : 1, overwrite: true })
      );
    });

    return tl;
  });

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};

    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      widths = [],
      xPercents = [],
      pixelsPerSecond = (config.speed || 1) * 180,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      populateWidths = () =>
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
              gsap.getProperty(el, "xPercent")
          );
        }),
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);

    populateWidths();
    gsap.set(items, { xPercent: (i) => xPercents[i] });
    gsap.set(items, { x: 0 });

    const totalWidth = getTotalWidth();

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      ).fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      );
    }

    tl.progress(1, true).progress(0, true);

    // ✅ reversed ticker runs same speed, just direction changed
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.timeScale(-1);
    }

    // ✅ Draggable (no inertia)
    if (config.draggable && typeof Draggable === "function") {
      const proxy = document.createElement("div");
      const wrap = gsap.utils.wrap(0, 1);
      let ratio, startProgress, draggable, totalW;

      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPress() {
          startProgress = tl.progress();
          tl.progress(0);
          populateWidths();
          totalW = getTotalWidth();
          ratio = 1 / totalW;
          tl.progress(startProgress);
        },
        onDrag() {
          tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio));
        },
      })[0];
    }

    return tl;
  }
}

/**
 * ✅ Remove this duplicated init block (it does nothing and can cause confusion)
 *
 * if (jQuery(".news_ticker").length > 0) {
 *   requestAnimationFrame(() => {
 *     initTicker();
 *   });
 * }
 *
 * function initTicker() {
 *   let loops = gsap.utils.toArray('.news_ticker').map((ticker, i) => {
 *     // ... your setup
 *   });
 * }
 */
