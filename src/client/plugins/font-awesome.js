import Vue from 'vue';

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import fontawesome from '@fortawesome/fontawesome';

// Brands
import { faFacebook, faTwitter } from '@fortawesome/fontawesome-free-brands';

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
  faTwitter,
  // Regular
  faImage,
  faImages,
  faSquare,
  faComment,
  faTag,
  faUsers
);
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
