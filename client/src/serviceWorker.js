export function register() {
  let serviceWorkerUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(serviceWorkerUrl);
}
