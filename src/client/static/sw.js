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
    "url": "/_nuxt/app.eab7337a43866ebd10d9.js",
    "revision": "eb21c43e19e863eeac2480093f3e5531"
  },
  {
    "url": "/_nuxt/layouts/app.1c41d759627487ce7351.js",
    "revision": "4a1ecd906346979d426246fdecde071d"
  },
  {
    "url": "/_nuxt/layouts/auth.491862cfa76684ffd4fb.js",
    "revision": "7b180180f045a91d88debcb1d6f52e5c"
  },
  {
    "url": "/_nuxt/layouts/default.c8f0052b40d164bdbc0f.js",
    "revision": "a791368fb52a933728ed02daa78ebc36"
  },
  {
    "url": "/_nuxt/manifest.1785753091b6b84517b3.js",
    "revision": "2ef6366045427a6871c5a07f16bf4051"
  },
  {
    "url": "/_nuxt/pages/app/index.b95462c630a56819da25.js",
    "revision": "bd20e7d946cde97c90f081a33af25731"
  },
  {
    "url": "/_nuxt/pages/auth/index.0d39cb92506559473809.js",
    "revision": "f0818da115e17789a9df76007eb89936"
  },
  {
    "url": "/_nuxt/pages/auth/login.514e668b141779117808.js",
    "revision": "eab70ec98df34318acd7ebc1909329da"
  },
  {
    "url": "/_nuxt/pages/auth/logout.f5e2673a1a08c9906e5d.js",
    "revision": "9ecde5ef450c78fe098ecd89e32b0569"
  },
  {
    "url": "/_nuxt/pages/auth/register.2f1ad0869e07d7cd3dc7.js",
    "revision": "11c94e5f4546f6d9b620bb8b8e6d47a4"
  },
  {
    "url": "/_nuxt/pages/index.71f4de9bf0075fa1666e.js",
    "revision": "a83550a4b380fc004be27e7dd5b78878"
  },
  {
    "url": "/_nuxt/pages/manage/index.2c22235dee6f608ea10d.js",
    "revision": "8279706c356e0c165219252df854798e"
  },
  {
    "url": "/_nuxt/pages/site/about.a36d203fa81258ac5e0a.js",
    "revision": "4c1d5301dc4aa464259991ad4f868c8c"
  },
  {
    "url": "/_nuxt/pages/site/contact.a80848e54ef5f0c9532a.js",
    "revision": "638f7f175022d5200ef886256540235f"
  },
  {
    "url": "/_nuxt/pages/site/updates.4534c6b1f950edc39f95.js",
    "revision": "a2849deb2badf82726c1c94f37a161ed"
  },
  {
    "url": "/_nuxt/pages/users/account/index.cc575bcae35077cfe889.js",
    "revision": "6ce197101afc70a6394f5a1ffe41b23e"
  },
  {
    "url": "/_nuxt/pages/users/account/reset/_token.f622a46fd8cacf8b8607.js",
    "revision": "a66f3d178a596eaafb4856883acdad5c"
  },
  {
    "url": "/_nuxt/pages/users/index.e34328520a0d4183d4ad.js",
    "revision": "0996d8215ee951330f6760bbe8443e80"
  },
  {
    "url": "/_nuxt/vendor.f4327edda351ba9549c8.js",
    "revision": "78b1ed38502f44460f51696b58a1f6ee"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

