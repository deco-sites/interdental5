import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      {/* RD Station */}
      <script
        type="text/javascript"
        async
        src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/7655f7f2-d0e1-4bb6-9bfb-5ce4c3f12124-loader.js"
      >
      </script>

      {/* Fonts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* latin-ext */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${asset("/fonts/Lato-Regular.woff2")}) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${asset("/fonts/Lato-Regular.woff2")}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* latin-ext */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${asset("/fonts/Lato-Bold.woff2")}) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${asset("/fonts/Lato-Bold.woff2")}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* latin-ext */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: url(${asset("/fonts/Lato-Black.woff2")}) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: url(${asset("/fonts/Lato-Black.woff2")}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          *::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          *::-webkit-scrollbar-thumb {
            background-color: #6562E5;
            border-radius: 4px;
            background-clip: content-box;
          }
          *::-webkit-scrollbar-track {
            border-radius: 4px;
            background-color: #9CA0AE66;
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
