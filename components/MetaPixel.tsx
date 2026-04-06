import Script from 'next/script'

/** Public ID from Meta Events Manager — safe to expose client-side. */
const PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || '1495547215623222'

// Test Events tab only shows browser hits when test_event_code is passed to fbq — not from the URL alone.
const PIXEL_SCRIPT = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
(function(){
var p=new URLSearchParams(window.location.search);
var tc=(p.get('test_event_code')||p.get('fb_test_event_code')||'').trim();
if(!/^[A-Za-z0-9_-]+$/.test(tc))tc='';
if(tc){
fbq('init','${PIXEL_ID}',{test_event_code:tc});
fbq('track','PageView',{},{test_event_code:tc});
}else{
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
}
})();
`

/**
 * Meta Pixel base code — loads on every page (PageView).
 * @see https://developers.facebook.com/docs/meta-pixel
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {PIXEL_SCRIPT}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(PIXEL_ID)}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
