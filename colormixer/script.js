// DOM Selectors
const slider = document.querySelectorAll("[type=range]");
const colorField = document.querySelector(".color-field");
const hexColorCode = document.querySelector(".hex-color-code");
const randomBtn = document.querySelector(".random-button");

/* == START OF COLOR MIXER OBJECT == */
class ColorSlider {
  red = red ?? 128;
  green = green ?? 128;
  blue = blue ?? 128;
  hexName = "#808080";

  changeBackgroundColor() {
    return (colorField.style.backgroundColor = `rgb(${this.red}, ${this.green}, ${this.blue} )`);
  }

  getColor(colorName, colorValue) {
    if (colorName === "red") {
      this.red = colorValue;
    } else if (colorName === "green") {
      this.green = colorValue;
    } else if (colorName === "blue") {
      this.blue = colorValue;
    }
  }

  createHexName() {
    const redHex = this.turnToHex(Number(this.red));
    const greenHex = this.turnToHex(Number(this.green));
    const blueHex = this.turnToHex(Number(this.blue));
    this.hexName = ("#" + redHex + greenHex + blueHex).toUpperCase();
  }

  turnToHex(value) {
    const hexValue = value.toString(16);
    return hexValue.length === 1 ? `0${hexValue}` : hexValue;
  }

  assignHexName() {
    hexColorCode.textContent = this.hexName;
  }

  updateSlider(colorName, colorValue) {
    if (colorName === "red") {
      document.querySelector(`#${colorName}`).value = colorValue;
    } else if (colorName === "green") {
      document.querySelector(`#${colorName}`).value = colorValue;
    } else if (colorName === "blue") {
      document.querySelector(`#${colorName}`).value = colorValue;
    }
  }
}
// Creates Object
const colorMixer = new ColorSlider(red, green, blue);
/* == END OF COLOR MIXER OBJECT == */

slider.forEach((ColorSlider) => {
  colorMixer.getColor(ColorSlider.id, ColorSlider.value);
  render();
  ColorSlider.addEventListener("input", (e) => {
    colorMixer.getColor(e.target.id, e.target.value);
    render();
  });
});

// Random Color Button with Fetch call
randomBtn.addEventListener("click", buttonHandler);

function buttonHandler() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => {
      console.log(response);
      // Wrong url name dose not show response.ok
      if (!response.ok) {
        throw new Error("Fetch does not work. Check Link!");
      }
      return response.json();
    })
    .then((data) => {
      colorMixer.getColor("red", data.rgb.r);
      colorMixer.getColor("green", data.rgb.g);
      colorMixer.getColor("blue", data.rgb.b);
      colorMixer.updateSlider("red", data.rgb.r);
      colorMixer.updateSlider("green", data.rgb.g);
      colorMixer.updateSlider("blue", data.rgb.b);
      render();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Render Funtion to update the page with new input
function render() {
  colorMixer.changeBackgroundColor();
  colorMixer.createHexName();
  colorMixer.assignHexName();
}
