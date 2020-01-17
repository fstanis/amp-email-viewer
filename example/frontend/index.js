import { FrameContainer } from '@ampproject/email-viewer/dist/viewer.mjs';

window.ampCode =
  window.ampCode ||
  `<!DOCTYPE html>
<html ⚡4email allow-xhr-interception allow-viewer-render-template report-errors-to-viewer>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async src="https://cdn.ampproject.org/v0/amp-viewer-integration-0.1.js"></script>
  <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
  <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>

  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
<body>
  Hello, AMP4EMAIL world.
  <amp-list layout="fixed-height" height="100" src="https://preview.amp.dev/static/samples/json/examples.json" binding="no">
  <template type="amp-mustache">
    <div><a href="{{url}}">{{title}}</a></div>
  </template>
</amp-list>
</body>
</html>
`;

const container = document.querySelector('#viewer');
const viewer = new FrameContainer(container, {
  relayPageURL: process.env.CONFIG_RELAY_PAGE_URL,
  useOpaqueOrigin: Boolean(process.env.CONFIG_USE_OPAQUE_ORIGIN),
  imageProxyURL: process.env.CONFIG_IMAGE_PROXY_URL,
  loadTimeout: 3000,
  xhrProxyURL: process.env.CONFIG_XHR_PROXY_URL,
});
viewer.render(window.ampCode);
