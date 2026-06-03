function desktopScrollEffect() {
    window.scrollTo(0, 0);
    var allColumn1 = document.querySelectorAll(".column1");
    var allColumn2 = document.querySelectorAll(".column2");
    var isScrollingProgrammatically = false;
    var scrollingTimeout = 0;

    if (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("Chromium") == -1) {
        scrollingTimeout = 20;
    }
    if (navigator.userAgent.indexOf("Firefox") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("Chromium") == -1) {
        scrollingTimeout = 20;
    }

    function syncScroll(event, source, targets, columns) {
        isScrollingProgrammatically = true;
        var sourceCcrollTop = parseInt(source.scrollTop);
        columns.forEach(function (column) {
            column.scrollTop = sourceCcrollTop;
        });
        targets.forEach(function (target) {
            target.scrollTop = source.scrollHeight - source.clientHeight - sourceCcrollTop;
        });
        setTimeout(function () {
            isScrollingProgrammatically = false;    
        }, scrollingTimeout);
    }

    // autoScroll function with smooth ease-out and the 492px final offset
    function autoScroll() {
        const duration = 3000; // Duration of the animation
        const startOffset =1500; // The absolute scroll position where the animation begins
        const finalOffset = 430; // The final resting position to hide the transparent image
        let startTime = null;

        // Easing function: starts fast and smoothly decelerates
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        // Set the initial starting position for the animation
        allColumn1.forEach(col => col.scrollTop = startOffset);
        allColumn2.forEach(col => col.scrollTop = (col.scrollHeight - col.clientHeight) - startOffset);


        function animationStep(currentTime) {
            if (!startTime) {
                startTime = currentTime;
            }
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutCubic(progress);

            // Calculate the total distance the animation needs to cover
            const scrollRange = startOffset - finalOffset;
            
            // Calculate the new scroll position, animating from startOffset down to finalOffset
            const newScrollTop1 = finalOffset + (scrollRange * (1 - easedProgress));
            
            allColumn1.forEach(col => {
                col.scrollTop = newScrollTop1;
            });
            
            // The scroll position of column2 is always the inverse of column1 for perfect sync
            allColumn2.forEach(col => {
                 const maxScrollTop = col.scrollHeight - col.clientHeight;
                 col.scrollTop = maxScrollTop - newScrollTop1;
            });

            if (elapsedTime < duration) {
                requestAnimationFrame(animationStep);
            } else {
                // Animation is complete. Snap to the exact final offset positions.
                allColumn1.forEach(col => col.scrollTop = finalOffset);
                allColumn2.forEach(col => col.scrollTop = col.scrollHeight - col.clientHeight - finalOffset);
            }
        }
        requestAnimationFrame(animationStep);
    }

    autoScroll();

    allColumn1.forEach(function (column1) {
        column1.addEventListener("scroll", function (event) {
            if (!isScrollingProgrammatically) {
                syncScroll(event, column1, allColumn2, allColumn1);
            }
        });
    });

    allColumn2.forEach(function (column2) {
        column2.addEventListener("scroll", function (event) {
            if (!isScrollingProgrammatically) {
                syncScroll(event, column2, allColumn1, allColumn2);
            }
        });
    });
}

function mobileScrollEffect() {
    window.scrollTo(0, 0);
    const row1 = document.querySelector(".row1");
    const row2 = document.querySelector(".row2");
    
    if (!row1 || !row2) return;

    let isUserTouching = false;
    let requestId;

    // Detect user interaction to pause auto-scroll
    row1.addEventListener("touchstart", () => isUserTouching = true, { passive: true });
    row1.addEventListener("touchend", () => isUserTouching = false, { passive: true });

    function update() {
        // 1. Handle Auto-scroll ONLY if user is not touching
        if (!isUserTouching) {
            row1.scrollLeft += 2; // speed
            
            // Reset if reach end
            if (row1.scrollLeft >= row1.scrollWidth - row1.clientWidth) {
                row1.scrollLeft = 0;
            }
        }

        // 2. Sync row2 to row1 (Master-Slave)
        // We set row2 to match row1's current position
        row2.scrollLeft = row1.scrollLeft;

        requestId = requestAnimationFrame(update);
    }

    requestId = requestAnimationFrame(update);
}

// Die URL ohne den Dateinamen "homepage.html"
var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname.replace(/\/index\.html$/, '/');
// Ändern der URL
window.history.replaceState({}, document.title, newUrl);

function showImage(src) {
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.onclick = function () {
        document.body.removeChild(overlay);
    };
    var img = document.createElement('img');
    img.src = src;
    img.className = 'overlay-img';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', function () {
    var burgerMenu = document.querySelector('.burgermenu');
    var sidebar = document.querySelector('.sidebar');

    if (burgerMenu && sidebar) {
        burgerMenu.addEventListener('click', function () {
            if (sidebar.classList.contains('show-sidebar')) {
                sidebar.classList.remove('show-sidebar');
            } else {
                sidebar.classList.add('show-sidebar');
            }
        });
    }
});

function startProgressBar(progressBarId) {
    var progressBar = document.getElementById(progressBarId);
    if (!progressBar) return;
    var width = 1;
    var id = setInterval(frame, 100);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }
}

window.onload = function () {
    // startProgressBar('progressTop');
    // startProgressBar('progressBottom');
};

document.addEventListener("DOMContentLoaded", function () {
    const indexContent = document.querySelector(".indexcontent");
    if (indexContent) {
        const loadingCursor = document.createElement("div");
        loadingCursor.classList.add("loading-cursor");
        indexContent.appendChild(loadingCursor);
        indexContent.addEventListener("mousemove", function (event) {
            const rect = indexContent.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            loadingCursor.style.top = (mouseY - 15) + "px";
            loadingCursor.style.left = (mouseX - 15) + "px";
        });
    }
});

// function trackScrollDirection(el) {
//     let lastScrollTop = 0;
//     el.addEventListener("scroll", function () {
//         let st = el.scrollTop;
//         if (st > lastScrollTop) {
//             el.classList.add("scroll-down");
//             el.classList.remove("scroll-up");
//         } else {
//             el.classList.add("scroll-up");
//             el.classList.remove("scroll-down");
//         }
//         lastScrollTop = st <= 0 ? 0 : st;
//     });
// }
// document.querySelectorAll(".column1, .column2").forEach(trackScrollDirection);

function trackHorizontalScrollDirection(el) {
    let lastScrollLeft = 0;
    el.addEventListener("scroll", function () {
        let sl = el.scrollLeft;
        if (sl > lastScrollLeft) {
            el.classList.add("scroll-right");
            el.classList.remove("scroll-left");
        } else if (sl < lastScrollLeft) {
            el.classList.add("scroll-left");
            el.classList.remove("scroll-right");
        }
        lastScrollLeft = sl <= 0 ? 0 : sl;
    });
}

document.querySelectorAll(".projectrow .row1, .projectrow .row2").forEach(trackHorizontalScrollDirection);