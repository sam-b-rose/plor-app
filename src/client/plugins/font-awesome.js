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
import faCircle from '@fortawesome/fontawesome-pro-solid/faCircle';

// Regular
import faComment from '@fortawesome/fontawesome-pro-regular/faComment';
import faImage from '@fortawesome/fontawesome-pro-regular/faImage';
import faImages from '@fortawesome/fontawesome-pro-regular/faImages';
import faSquare from '@fortawesome/fontawesome-pro-regular/faSquare';
import faTag from '@fortawesome/fontawesome-pro-regular/faTag';
import faUsers from '@fortawesome/fontawesome-pro-regular/faUsers';

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
