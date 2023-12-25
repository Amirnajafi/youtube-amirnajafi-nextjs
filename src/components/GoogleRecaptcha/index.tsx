import Script from 'next/script';
import React from 'react';

function GoogleRecaptcha() {
  const window_height = window.innerHeight;
  return (
    <div>
      <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
      <Script src="https://www.google.com/recaptcha/api.js" />
    </div>
  );
}

export {GoogleRecaptcha};
