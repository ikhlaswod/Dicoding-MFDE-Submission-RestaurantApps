const NotificationHelper = {
  sendNotification({ title, options }) {
    if (!this._checkAvailability()) {
      console.log('Notification not Supported in this Browser!');
      return;
    }
    if (!this._checkPermission()) {
      console.log('User did not yet granted permission');
      this._requestPermission();
      return;
    }
    this._showNotification({ title, options });
  },

  _checkAvailability() {
    return !!('Notification' in window);
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification denied');
    }

    if (status === 'default') {
      console.log('Permission closed');
    }
  },

  async _showNotification({ title, options }) {
    const serviceWorkRegistration = await navigator.serviceWorker.ready;
    serviceWorkRegistration.showNotification(title, options);
  },
};

export default NotificationHelper;
