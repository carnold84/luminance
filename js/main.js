import ColorRangeView from './views/ColorRange.js';
import ChartColorsView from './views/ChartColors.js';

const Luminosity = (() => {
  const TITLE = 'Luminance';

  const PICKER_OPTIONS = {
    components: {
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: false,
        hsva: false,
        cmyk: true,
        input: true,
      },
      opacity: true,
      preview: true,
    },
    inline: true,
    showAlways: true,
    theme: 'classic',
  };

  const screens = [
    {
      id: 'color-range',
      label: 'Colour Range',
      module: undefined,
      navItem: undefined,
    },
    {
      id: 'chart-colors',
      label: 'Chart Colours',
      module: undefined,
      navItem: undefined,
    },
  ];
  const screensLookup = {};

  let currentScreenId = screens[0].id;

  const init = () => {
    document.querySelector('title').innerHTML = `${TITLE} - Colour Tools`;
    document.querySelector('#header-title').innerHTML = TITLE;

    screens[0].module = new ColorRangeView({ pickerOptions: PICKER_OPTIONS });
    screens[0].navItem = document.querySelector(
      `.main-nav .item[data-screen-id=${screens[0].id}]`,
    );
    screens[1].module = new ChartColorsView({ pickerOptions: PICKER_OPTIONS });
    screens[1].navItem = document.querySelector(
      `.main-nav .item[data-screen-id=${screens[1].id}]`,
    );

    screens.forEach(screen => {
      screensLookup[screen.id] = screen;
      screen.navItem.addEventListener('click', onNavItemClick);
    });

    selectScreen(currentScreenId);
  };

  const onNavItemClick = evt => {
    console.log(evt);
    currentScreenId = evt.currentTarget.getAttribute('data-screen-id');

    selectScreen(currentScreenId);
  };

  const selectScreen = id => {
    console.log('selectScreen', id);
    screens.forEach(screen => {
      if (screen.id === id) {
        screen.module.show();
      } else {
        screen.module.hide();
      }
    });
  };

  return {
    init,
  };
})();

window.addEventListener('load', Luminosity.init);
