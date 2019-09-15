const Luminosity = (() => {
  const TITLE = "Luminance";

  const PICKER_OPTIONS = {
    components: {
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: false,
        hsva: false,
        cmyk: true,
        input: true
      },
      opacity: true,
      preview: true
    },
    inline: true,
    showAlways: true,
    theme: "classic"
  };

  let elNumColors;
  let elOutput;
  let elSwatches;
  let endColor = "#7e3aa7";
  let endPicker;
  let startColor = "#c8acd9";
  let startPicker;

  const init = () => {
    document.querySelector("title").innerHTML = `${TITLE} - Colour Tools`;
    document.querySelector("#header-title").innerHTML = TITLE;

    elNumColors = document.querySelector("#num-colors");
    elOutput = document.querySelector("#output");
    elSwatches = document.querySelector("#swatches");

    startPicker = Pickr.create({
      appClass: "lum-picker",
      default: startColor,
      el: ".start-picker",
      ...PICKER_OPTIONS
    });
    startPicker.on("change", onStartColorSelect);

    endPicker = Pickr.create({
      appClass: "lum-picker",
      default: endColor,
      el: ".end-picker",
      ...PICKER_OPTIONS
    });
    endPicker.on("change", onEndColorSelect);

    elNumColors.addEventListener("input", onNumColorsChange);

    update();
  };

  const onStartColorSelect = instance => {
    startPicker.applyColor();
    startColor = instance.toHEXA().toString();
    console.log(startColor);

    update();
  };

  const onEndColorSelect = instance => {
    endPicker.applyColor();
    console.log(instance);
    endColor = instance.toHEXA().toString();
    console.log(startColor);

    update();
  };

  const onNumColorsChange = evt => {
    console.log("onNumColorsChange");
    evt.preventDefault();

    update();
  };

  const update = () => {
    elSwatches.innerHTML = "";

    const num_colors = elNumColors.value;

    const colors = chroma.scale([startColor, endColor]).colors(num_colors);

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
