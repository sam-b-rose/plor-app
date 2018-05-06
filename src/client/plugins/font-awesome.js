import Vue from 'vue';

import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from '@fortawesome/vue-fontawesome';
import fontawesome from '@fortawesome/fontawesome';

// Brands
import {
  faFacebook,
  faFacebookF,
  faTwitter
} from '@fortawesome/fontawesome-free-brands';

// Solid
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle';
import faTag from '@fortawesome/fontawesome-free-solid/faTag';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

// Regular
import faComment from '@fortawesome/fontawesome-free-regular/faComment';
import faImage from '@fortawesome/fontawesome-free-regular/faImage';
import faImages from '@fortawesome/fontawesome-free-regular/faImages';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
// import faTag from '@fortawesome/fontawesome-pro-regular/faTag';
// import faUsers from '@fortawesome/fontawesome-pro-regular/faUsers';

fontawesome.library.add(
  // Brands
  faFacebook,
  faFacebookF,
  faTwitter,
  // Solid
  faCircle,
  // Regular
  faImage,
  faImages,
  faSquare,
  faComment,
  faTag,
  faUsers
);
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
Vue.component(FontAwesomeLayers.name, FontAwesomeLayers);
