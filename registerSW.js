if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/GreenEats/sw.js', { scope: '/GreenEats/' })})}