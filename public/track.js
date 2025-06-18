(function() {
  'use strict';

  // Function to send analytics data
  function sendAnalytics() {
    const data = {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // Send the data with keepalive for reliability
    fetch('https://op-analytics.vercel.app/api/collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true
    }).catch(function(error) {
      // Silently handle errors to avoid disrupting the user experience
      console.debug('Analytics tracking error:', error);
    });
  }

  // Send analytics on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendAnalytics);
  } else {
    sendAnalytics();
  }

  // Send analytics on page unload (useful for SPAs and page exits)
  window.addEventListener('beforeunload', sendAnalytics);

  // Send analytics on visibility change (useful for mobile and tab switching)
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      sendAnalytics();
    }
  });

})(); 