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
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faTag from '@fortawesome/fontawesome-free-solid/faTag';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
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
  faChevronDown,
  faCircle,
  faPlus,
  faSearch,
  faTag,
  faUsers,
  // Regular
  faComment,
  faImage,
  faImages,
  faSquare
);
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
Vue.component(FontAwesomeLayers.name, FontAwesomeLayers);
