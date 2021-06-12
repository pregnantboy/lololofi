export const useNotification = () => {
  function registerSw() {
    if ('Notification' in window && navigator.serviceWorker) {
      // Display the UI to let the user toggle notifications
      navigator.serviceWorker
        .register(process.env.PUBLIC_URL + '/service-worker.js')
        .then(function (reg) {
          console.log('Service Worker Registered!', reg)
          reg.pushManager.getSubscription().then(function (sub) {
            if (sub === null) {
              // Update UI to ask user to register for Push
              console.log('Not subscribed to push service!')
            } else {
              // We have a subscription, update the database
              console.log('Subscription object: ', sub)
            }
          })
        })
        .catch(function (err) {
          console.log('Service Worker registration failed: ', err)
        })
    }
  }

  function requestPermission() {
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status)
    })
  }

  function displayNotification() {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker
        .getRegistration()
        .then((reg: ServiceWorkerRegistration | undefined) => {
          const options = {
            body: 'Here is a notification body!',
            icon: process.env.PUBLIC_URL + '/logo96.png',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1,
            },
          }
          if (!reg) {
            throw new Error('undefined')
          }
          reg.showNotification('Hello world!', options)
        })
    } else {
      alert('Allow notifications for this to work')
    }
  }

  return {
    registerSw,
    requestPermission,
    displayNotification,
  }
}
