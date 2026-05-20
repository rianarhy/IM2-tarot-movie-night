import { DotLottie } from 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web'; 

const prefersReducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

if (!prefersReducedMotion) { new DotLottie({ canvas: document.getElementById('lottie-bg-canvas'), src: 'https://lottie.host/ac2ce0c5-51c8-42ff-842b-72ed4c2ef64b/Qrt1jIX4Q3.lottie', autoplay: true, loop: true, renderConfig: { autoResize: true, devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5) } }); }