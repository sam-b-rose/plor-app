importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "plor",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.113effc88ecbaf74948408987411fd8c.css",
    "revision": "113effc88ecbaf74948408987411fd8c"
  },
  {
    "url": "/_nuxt/app.6cc748be02bb12d12131.js",
    "revision": "3a9eaba474adfbce4dceba53a31171c9"
  },
  {
    "url": "/_nuxt/layouts/app.6666043c6e997f75c1c4.js",
    "revision": "eca5e78a11e85623c947e07cc29c52a8"
  },
  {
    "url": "/_nuxt/layouts/auth.491862cfa76684ffd4fb.js",
    "revision": "7b180180f045a91d88debcb1d6f52e5c"
  },
  {
    "url": "/_nuxt/layouts/default.9c4e6be819ece93e5566.js",
    "revision": "6484b53f5cb041d7e108ba6d45b77e46"
  },
  {
    "url": "/_nuxt/manifest.e27b8c562d85f5719c26.js",
    "revision": "ff75b6d71e8adfe56080882cd41474ec"
  },
  {
    "url": "/_nuxt/pages/admin/index.47899ad157bfd6d52120.js",
    "revision": "9bd3614e17c9c79c42b29d22232e293e"
  },
  {
    "url": "/_nuxt/pages/app/index.9d150dc26b1bd0d13f9e.js",
    "revision": "591f3af79e97b10e7accb3ab1c57caa1"
  },
  {
    "url": "/_nuxt/pages/index.f80c962ca1a00402b3ef.js",
    "revision": "11c69f8a3ccb329eb48eb0e3d7847844"
  },
  {
    "url": "/_nuxt/pages/manage/index.cc9c532b2f59e832f0c2.js",
    "revision": "49c4a4a7756d41a7726b9c5d8568511f"
  },
  {
    "url": "/_nuxt/pages/site/about.c29d5aea82f8a6bacc56.js",
    "revision": "ba5e874b608d7f2928b4c3290e4aeb14"
  },
  {
    "url": "/_nuxt/pages/site/contact.c84fbc6197ac83a27aff.js",
    "revision": "613f08848f5ef325c8ac1e4741ebe356"
  },
  {
    "url": "/_nuxt/pages/site/updates.52cac88073f65afea150.js",
    "revision": "b9eb940504c275855dc2edbe483369df"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.1318fbf8bcf483f06cf8.js",
    "revision": "cebea502d65b07ac5adb32761cc9c354"
  },
  {
    "url": "/_nuxt/pages/users/auth/index.94f0acbde57ec8d90214.js",
    "revision": "4b503ad6c9c52946284df97dd0935034"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-in.da06b4fcae68aed7cb28.js",
    "revision": "01e274a372f522e600af966f4a9ceaef"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-out.fdd4bdc10bc53deb6eb4.js",
    "revision": "833ba24138168a78ced14786ce5662e7"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-up.8c0f077af18d3c4097d8.js",
    "revision": "3fcbe78b6ed67d4d253de0dd3e4cf6fa"
  },
  {
    "url": "/_nuxt/pages/users/index.f91bec56cd7e8815fa2d.js",
    "revision": "0996d8215ee951330f6760bbe8443e80"
  },
  {
    "url": "/_nuxt/vendor.5def6249787d12251f20.js",
    "revision": "33f59e5a27bf9247e8d916610c6ca766"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

