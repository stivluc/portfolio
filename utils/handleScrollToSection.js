import { smoothScrollTo } from './smoothScrollTo';

// Function to handle smooth scrolling and offset
export const handleScrollToSection = (event, sectionId, duration = 800) => {
  event.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -80; // Adjust for navbar height
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    // Use custom smoothScrollTo function
    smoothScrollTo(y, duration); // Adjust duration as needed
  }
};
