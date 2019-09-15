const Luminosity = (() => {
  const TITLE = "Luminance";

  const PICKER_OPTIONS = {
    components: {
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true
      },
      opacity: true,
      preview: true
    },
    theme: "nano"
  };

  let elEndInput;
  let elNumColors;
  let elOutput;
  let elStartInput;
  let elSwatches;
  let endPicker;
  let startPicker;

  const init = () => {
    document.querySelector("title").innerHTML = `${TITLE} - Colour Tools`;
    document.querySelector("#header-title").innerHTML = TITLE;

    elEndInput = document.querySelector("#end-color");
    elNumColors = document.querySelector("#num-colors");
    elOutput = document.querySelector("#output");
    elStartInput = document.querySelector("#start-color");
    elSwatches = document.querySelector("#swatches");

    startPicker = Pickr.create({
      default: elStartInput.value,
      el: ".start-picker",
      ...PICKER_OPTIONS
    });
    startPicker.on("change", onStartColorSelect);
    elStartInput.addEventListener("blur", onStartColorBlur);

    endPicker = Pickr.create({
      default: elEndInput.value,
      el: ".end-picker",
      ...PICKER_OPTIONS
    });
    endPicker.on("change", onEndColorSelect);
    elEndInput.addEventListener("blur", onEndColorBlur);

    elNumColors.addEventListener("blur", onNumColorsChange);

    update();
  };

  const onStartColorSelect = instance => {
    elStartInput.value = instance
      .toHEXA()
      .toString()
      .toLowerCase();
    startPicker.applyColor();

    update();
  };

  const onStartColorBlur = evt => {
    evt.preventDefault();

    startPicker.setColor(elStartInput.value);
  };

  const onEndColorSelect = instance => {
    endPicker.applyColor();
    elEndInput.value = instance
      .toHEXA()
      .toString()
      .toLowerCase();

    update();
  };

  const onEndColorBlur = evt => {
    evt.preventDefault();

    endPicker.setColor(elEndInput.value);
  };

  const onNumColorsChange = evt => {
    evt.preventDefault();

    update();
  };

  const update = () => {
    elSwatches.innerHTML = "";

    const end_color = elEndInput.value;
    const num_colors = elNumColors.value;
    const start_color = elStartInput.value;

    const colors = chroma.scale([start_color, end_color]).colors(num_colors);

    colors.forEach(color => {
      let el_color = document.createElement("div");
      el_color.classList.add("swatch");
      el_color.style.backgroundColor = color;
      elSwatches.appendChild(el_color);
    });

    elOutput.value = JSON.stringify(colors, 2, 2);
  };

  return {
    init
  };
})();

window.addEventListener("load", Luminosity.init);
