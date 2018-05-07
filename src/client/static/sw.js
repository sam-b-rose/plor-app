importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "plor",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.0466ff653b8bd32d015f.js",
    "revision": "3fd3dd0db3a69eaf5160d80840170c18"
  },
  {
    "url": "/_nuxt/app.113effc88ecbaf74948408987411fd8c.css",
    "revision": "113effc88ecbaf74948408987411fd8c"
  },
  {
    "url": "/_nuxt/layouts/app.2043962f7f4bdc90d799.js",
    "revision": "db8f75ea20a739df4ba8020fbfe8efe6"
  },
  {
    "url": "/_nuxt/layouts/auth.34b07c99afe49cd1b0ee.js",
    "revision": "fb39bc37f51ff46cbd13a0690f44571c"
  },
  {
    "url": "/_nuxt/layouts/default.e8887f3c2cc538e9a420.js",
    "revision": "3fd189f475ca77a5f9cceced07641d16"
  },
  {
    "url": "/_nuxt/manifest.953f03530b86a68796dd.js",
    "revision": "4a2a41733a85f273d91d3b06ed94f5ff"
  },
  {
    "url": "/_nuxt/pages/app/index.748a6fb4b3acf0ee0f68.js",
    "revision": "22804dddbbe8cbe14859320eb86c0210"
  },
  {
    "url": "/_nuxt/pages/auth/index.06ef73053c102a41f36f.js",
    "revision": "81d70bbda6ceeff64af6661dd7f2afed"
  },
  {
    "url": "/_nuxt/pages/auth/login.62f432a0fa5b1cfcbf53.js",
    "revision": "87d747b4f10be79dd3f648d9beec0fe8"
  },
  {
    "url": "/_nuxt/pages/auth/logout.14123e9f5283a3ed5ca1.js",
    "revision": "f12c3100423a04f7e1f88c7825282d9f"
  },
  {
    "url": "/_nuxt/pages/auth/register.1ac3db26cd2c5ae50595.js",
    "revision": "96378ab48af4f6c5f8d5efd30fdc846e"
  },
  {
    "url": "/_nuxt/pages/index.f9f55b96df3c39e40138.js",
    "revision": "5d01f5f03b125df082bf48dfb336f670"
  },
  {
    "url": "/_nuxt/pages/manage/index.4ca4fe9eeba5766cf8ad.js",
    "revision": "f79244cb3d949d76831628350aab0ca6"
  },
  {
    "url": "/_nuxt/pages/site/about.a94166b10cd3e602c5a4.js",
    "revision": "0b3140e1a551723fd606d9475cb3bd46"
  },
  {
    "url": "/_nuxt/pages/site/contact.d292aa8519d16ccfacbf.js",
    "revision": "f700b2a7e344a4693c44220fc80278f1"
  },
  {
    "url": "/_nuxt/pages/site/updates.2fd42e2b5781ccae961b.js",
    "revision": "fd5acd4aa67906b53b8757aa55ca2c27"
  },
  {
    "url": "/_nuxt/pages/users/account/index.74dcfe6dc0108d8ded98.js",
    "revision": "1953aca28541218d294b4b5b8a815143"
  },
  {
    "url": "/_nuxt/pages/users/account/reset/_token.9aa576659458d05113d1.js",
    "revision": "364e9d1231c4cb5d24f92292eadc03e2"
  },
  {
    "url": "/_nuxt/pages/users/index.df5352ecfe12b99ab0ce.js",
    "revision": "7c8769587017f310c96a8d9be8fee531"
  },
  {
    "url": "/_nuxt/vendor.64a85263f594ddc92150.js",
    "revision": "e40c4b274231c07d1a555008d9f77c89"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

