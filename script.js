(function () {
    "use strict";

    var mobileQuery = window.matchMedia("(max-width: 600px)");
    var currentPage = 0;

    function getPerView() {
        return (mobileQuery.matches)
            ? 1
            : 3;
    }

    function getTotal() {
        return document.querySelectorAll("#track .slide").length;
    }

    function getPageCount() {
        return Math.ceil(getTotal() / getPerView());
    }

    function getOffset() {
        var perView = getPerView();
        return Math.min(currentPage * perView, getTotal() - perView);
    }

    function update() {
        var track = document.getElementById("track");
        var dots = document.querySelectorAll("#pager .pager-dot");
        var index;

        track.style.transform = "translateX(-" +
                (getOffset() * 100 / getPerView()) + "%)";

        for (index = 0; index < dots.length; index += 1) {
            if (index === currentPage) {
                dots[index].classList.add("active");
                dots[index].setAttribute("aria-current", "true");
            } else {
                dots[index].classList.remove("active");
                dots[index].removeAttribute("aria-current");
            }
        }
    }

    function goTo(page) {
        var count = getPageCount();
        currentPage = (page + count) % count;
        update();
    }

    function buildPager() {
        var pager = document.getElementById("pager");
        var count = getPageCount();
        var index;
        var dot;

        pager.textContent = "";

        for (index = 0; index < count; index += 1) {
            dot = document.createElement("button");
            dot.type = "button";
            dot.className = "pager-dot";
            dot.setAttribute("data-page", String(index));
            dot.setAttribute("aria-label", "Страница " + (index + 1) +
                    " из " + count);
            pager.appendChild(dot);
        }
    }

    function onPagerClick(event) {
        var page = event.target.getAttribute("data-page");

        if (page !== null) {
            goTo(parseInt(page, 10));
        }
    }

    function onBreakpointChange() {
        currentPage = 0;
        buildPager();
        update();
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("arrow-prev").addEventListener("click", function () {
            goTo(currentPage - 1);
        });
        document.getElementById("arrow-next").addEventListener("click", function () {
            goTo(currentPage + 1);
        });
        document.getElementById("pager").addEventListener("click", onPagerClick);
        mobileQuery.addEventListener("change", onBreakpointChange);

        buildPager();
        update();
    });

}());
