import { configure, addParameters, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    theme: themes.light
  }
});

addDecorator(
  withKnobs({
    escapeHTML: false
  })
);

// automatically import all files ending in *.stories.js
configure(
  [require.context('../stories', true, /\.stories\.(js|mdx)$/)],
  module
);
