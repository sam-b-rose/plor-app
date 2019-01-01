importScripts('/_nuxt/workbox.4c4f5ca6.js');

workbox.precaching.precacheAndRoute(
  [
    {
      url: '/_nuxt/19.a87af3bc5ef61ee9b0d2.js',
      revision: '3a0a90f357eab2c521b5207c635c9548'
    },
    {
      url: '/_nuxt/app.297959b8f66d84492e47.js',
      revision: 'ee41d1fe25506209c0fe41615817c09b'
    },
    {
      url: '/_nuxt/app.720736a150f4b8aba12fd9cc012a5c85.css',
      revision: '720736a150f4b8aba12fd9cc012a5c85'
    },
    {
      url: '/_nuxt/layouts/app.f534fe3bfe25cc1bfd88.js',
      revision: 'decb9e5bdb099ae27422959fb048bafe'
    },
    {
      url: '/_nuxt/layouts/auth.35ae6be2facb54068aa7.js',
      revision: '04d00046a384b8a82ed6111225401eb2'
    },
    {
      url: '/_nuxt/layouts/default.90b983b2bd850bbbf99c.js',
      revision: 'e4f6ec8efd7deacab478a9a416b851db'
    },
    {
      url: '/_nuxt/manifest.9c407b1ea89ccab303f6.js',
      revision: '47bf79aeb4d17cc30bb07b4518c7d826'
    },
    {
      url: '/_nuxt/pages/about/index.f6819053cf3b21bb6743.js',
      revision: '67c2f8be0c240928937886b0449b8ec6'
    },
    {
      url: '/_nuxt/pages/app/drafts.30823e1fab9ae975a6f6.js',
      revision: '86f47ddda6e917a990bc772916171afc'
    },
    {
      url: '/_nuxt/pages/app/history.6dd86f30bc923ab92bfc.js',
      revision: 'df32ac18d901333c1af56ff42ae5821b'
    },
    {
      url: '/_nuxt/pages/app/index.49b21bae01b92a919f76.js',
      revision: 'aedef41f33a49fb169443dd98a6f2f91'
    },
    {
      url: '/_nuxt/pages/app/queue.1260952c8e5c3ab0aee4.js',
      revision: '7197ec10402a29461190cfd149c261b7'
    },
    {
      url: '/_nuxt/pages/auth/index.27f94df8c3363e743e8b.js',
      revision: '270c10ccb1e95b6403bf1a0cc1b3585c'
    },
    {
      url: '/_nuxt/pages/auth/login.21d2e4829af910bc1d75.js',
      revision: '1c750c1392f43ba18ad3cc800b5aa9e2'
    },
    {
      url: '/_nuxt/pages/auth/logout.91199f682c5ca3cb194a.js',
      revision: 'a2f331d21a1cfa42f003841ee75188de'
    },
    {
      url: '/_nuxt/pages/auth/register.dac01a25f822351a9f0f.js',
      revision: '8bf0285562da07ae781a24726e9c4660'
    },
    {
      url: '/_nuxt/pages/contact/index.6df388b48abe128a421f.js',
      revision: 'd1d3d617f18f4170d6e8abb577538edf'
    },
    {
      url: '/_nuxt/pages/index.b5daf1b3563e6816ba34.js',
      revision: 'a0e78d92dbe6cc737addf1006ac02077'
    },
    {
      url: '/_nuxt/pages/manage/index.42e461c29a0bc9dff77c.js',
      revision: '12af0f86f27126c84b39a3e482ea3861'
    },
    {
      url: '/_nuxt/pages/profile/index.3ef8bd434b63b5740c9a.js',
      revision: 'cf2781ead8d033fd8041d15c5e112219'
    },
    {
      url: '/_nuxt/pages/profile/reset/_token.0fdb90f9ced828ea5d59.js',
      revision: 'a89de6e26fcafe43f58c1864074bc037'
    },
    {
      url: '/_nuxt/vendor.400bfbb706d60af86c20.js',
      revision: 'd720d86e62ee020a1ceda96e95e97eee'
    }
  ],
  {
    cacheId: 'plor',
    directoryIndex: '/',
    cleanUrls: false
  }
);

workbox.clientsClaim();
workbox.skipWaiting();

workbox.routing.registerRoute(
  new RegExp('/_nuxt/.*'),
  workbox.strategies.cacheFirst({}),
  'GET'
);

workbox.routing.registerRoute(
  new RegExp('/.*'),
  workbox.strategies.networkFirst({}),
  'GET'
);
