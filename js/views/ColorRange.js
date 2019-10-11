export default class ColorRange {
  el;
  elNumColors;
  elOutput;
  elSwatches;
  endColor = '#7e3aa7';
  endPicker;
  pickerOptions;
  startColor = '#c8acd9';
  startPicker;

  constructor({ pickerOptions }) {
    this.pickerOptions = pickerOptions;

    this.el = document.querySelector('#color-range');
    this.elNumColors = this.el.querySelector('#num-colors');
    this.elOutput = this.el.querySelector('#output');
    this.elSwatches = this.el.querySelector('#swatches');

    this.startPicker = Pickr.create({
      appClass: 'lum-picker',
      default: this.startColor,
      el: '.start-picker',
      ...this.pickerOptions,
    });
    this.startPicker.on('change', this.onStartColorSelect);

    this.endPicker = Pickr.create({
      appClass: 'lum-picker',
      default: this.endColor,
      el: '.end-picker',
      ...this.pickerOptions,
    });
    this.endPicker.on('change', this.onEndColorSelect);

    this.elNumColors.addEventListener('input', this.onNumColorsChange);

    this.update();
  }

  onStartColorSelect = instance => {
    this.startPicker.applyColor();
    this.startColor = instance.toHEXA().toString();

    this.update();
  };

  onEndColorSelect = instance => {
    this.endPicker.applyColor();
    this.endColor = instance.toHEXA().toString();

    this.update();
  };

  onNumColorsChange = evt => {
    evt.preventDefault();

    this.update();
  };

  update = () => {
    this.elSwatches.innerHTML = '';

    const num_colors = this.elNumColors.value;

    const colors = chroma
      .scale([this.startColor, this.endColor])
      .colors(num_colors);

    colors.forEach(color => {
      let el_color = document.createElement('div');
      el_color.classList.add('swatch');
      el_color.style.backgroundColor = color;
      this.elSwatches.appendChild(el_color);
    });

    this.elOutput.value = JSON.stringify(colors, 2, 2);
  };

  show = () => {
    this.el.classList.remove('hide');
    this.el.classList.add('show');
  };

  hide = () => {
    this.el.classList.remove('show');
    this.el.classList.add('hide');
  };
}
