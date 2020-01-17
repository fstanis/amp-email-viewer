const fetch = require('node-fetch');

module.exports = async function(req, res, next) {
  if (!req.body.originalRequest) {
    throw new Error('invalid XHR proxy request');
  }

  const xhrReq = req.body.originalRequest;
  const url = xhrReq.input || '';
  if (!url.startsWith('http')) {
    throw new Error('invalid url');
  }
  const fetched = await fetch(transformURL(url), xhrReq.init);
  console.log(fetched);
  if (fetched.status !== 200) {
    throw new Error('request failed');
  }
  const type = fetched.headers.get('Content-Type');
  console.log(fetched.headers);
  if (!type.startsWith('application/json')) {
    throw new Error('response not JSON');
  }
  const data = await fetched.json();
  res.type('application/json');
  res.send({
    body: JSON.stringify(data),
    init: {
      status: 200
    }
  });
};

function transformURL(urlString) {
  const url = new URL(urlString);
  url.searchParams.delete('__amp_source_origin');
  return url.href;
}
