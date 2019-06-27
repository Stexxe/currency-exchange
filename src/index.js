if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', {scope: '/'}).then((e) => {
      console.log('SW registered: ', e);
    }).catch((error) => {
      console.log('SW registration failed: ', error);
    })
  });
}

window.addEventListener('load', () => {
  document.body.innerText = 'Offline';
});