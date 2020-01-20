const { loadAMP } = require('./util/loader');

const AMP_LIST_CODE = `<!DOCTYPE html>
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
  <amp-list layout="fixed-height" height="100" src="https://amp.dev/static/samples/json/cart.json" binding="no">
    <template type="amp-mustache">
      <div id="cart">
      {{#cart_items}}
        <div class="cart-item">
          <span>{{name}}</span>
          <span>{{price}}</span>
        </div>
      {{/cart_items}}
      </div>
    </template>
  </amp-list>
</body>
</html>
`;

test('XHR interception is used', async () => {
  const { page } = await loadAMP(AMP_LIST_CODE, {
    xhrProxyURL: process.env.CONFIG_XHR_PROXY_URL,
  });
  const req = await page.waitForRequest(process.env.CONFIG_XHR_PROXY_URL);
  const originalReq = JSON.parse(req.postData()).originalRequest;
  expect(originalReq.input.startsWith('https://amp.dev/static/samples/json/cart.json')).toBeTruthy();
});
