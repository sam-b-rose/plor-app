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
import faCamera from '@fortawesome/fontawesome-free-solid/faCamera';
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faTag from '@fortawesome/fontawesome-free-solid/faTag';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

// Regular
import faComment from '@fortawesome/fontawesome-free-regular/faComment';
import faImage from '@fortawesome/fontawesome-free-regular/faImage';
import faImages from '@fortawesome/fontawesome-free-regular/faImages';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';

fontawesome.library.add(
  // Brands
  faFacebook,
  faFacebookF,
  faTwitter,
  // Solid
  faCamera,
  faChevronDown,
  faCircle,
  faCheckCircle,
  faExclamationCircle,
  faPlus,
  faSearch,
  faTag,
  faTimes,
  faUsers,
  // Regular
  faComment,
  faImage,
  faImages,
  faSquare
);

fontawesome.config = {
  // autoAddCss: false
};

Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
Vue.component(FontAwesomeLayers.name, FontAwesomeLayers);
