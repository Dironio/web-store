import { trackEvent } from "../../services/analyticsService";

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const clickPosition = {
        x: event.clientX,
        y: event.clientY,
    };

    const targetData = {
        tag: target.tagName,
        id: target.id || null,
        classes: target.className || null,
        text: target.innerText || null,
    };

    trackEvent('click', {
        click_position: clickPosition,
        target: targetData,
    });
});

let lastScrollTop = 0;

document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    const direction = scrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollTop;

    trackEvent('scroll', {
        scroll_position: scrollTop,
        scroll_direction: direction,
    });
});
