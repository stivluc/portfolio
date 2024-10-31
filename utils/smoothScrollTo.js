// Custom smooth scroll function with easing
export const smoothScrollTo = (targetY, duration = 800) => {
  const startY = window.pageYOffset;
  const distanceY = targetY - startY;
  let startTime = null;

  // Easing function: easeOutQuad
  const easeOutQuad = (t) => t * (2 - t);

  const animationFrame = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeOutQuad(progress);

    window.scrollTo(0, startY + distanceY * easeProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationFrame);
    }
  };

  requestAnimationFrame(animationFrame);
};
