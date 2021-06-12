/* eslint-disable no-restricted-globals */
self.addEventListener('push', function (e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore this new world',
        icon: 'images/checkmark.png',
      },
      { action: 'close', title: 'Close', icon: 'images/xmark.png' },
    ],
  }
  e.waitUntil(self.registration.showNotification('Hello world!', options))
})

self.addEventListener('notificationclose', function (e) {
  const notification = e.notification
  const action = e.action

  if (action === 'close') {
    notification.close()
  } else {
    self.clients.openWindow('http://www.example.com')
    notification.close()
  }
})
