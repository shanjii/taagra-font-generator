<template>
  <div id="background">
    <section id="start-prompt">
      <Logo />
      <button class="start-button" @click="start">OPEN EDITOR</button>
    </section>
    <section id="image-displayer">
      <img :src="image" alt="" srcset="" />
    </section>
    <!-- Desktop controller -->
    <section id="controller-box" v-if="!isCompact">
      <div>
        <input
          type="range"
          v-model="width"
          @input="refreshImage"
          :max="this.screenWidth"
          min="100"
        />
        <input
          type="text"
          v-model="text"
          @keyup="refreshImage"
          autocomplete="false"
          name=""
          id="controller-input"
        />
        <button @click="download">Download</button>
      </div>
    </section>
    <!-- Mobile controller -->
    <section id="controller-box" v-if="isCompact">
      <div style="width: 100%">
        <input
          type="text"
          v-model="text"
          @keyup="refreshImage"
          autocomplete="false"
          name=""
          id="controller-input"
        />
        <button @click="download">Download</button>
      </div>
    </section>
  </div>
</template>

<script>
import { transitionScreen } from "../scripts/animations";
const textToImage = require("text-to-image");

export default {
  data() {
    return {
      image: null,
      text: "Dras'kay",
      width: 400,
      isCompact: false,
      screenWidth: null,
      fontSize: 50,
    };
  },
  mounted() {
    this.refreshImage();
    this.getScreenWidth();
    window.onresize = this.getScreenWidth;
  },
  methods: {
    start() {
      transitionScreen();
    },
    getScreenWidth() {
      this.screenWidth = window.innerWidth - 100;
      if (this.screenWidth < 600) {
        this.width = this.screenWidth - 100;
        this.text = "";
        this.fontSize = 24;
        this.isCompact = true;
      } else {
        this.width = this.screenWidth - 100;
        this.fontSize = 50;
        this.isCompact = false;
      }
      this.refreshImage();
    },
    async refreshImage() {
      this.image = await textToImage.generate(`\n ${this.text}`, {
        bgColor: "transparent",
        fontSize: this.fontSize,
        lineHeight: 70,
        maxWidth: this.width,
        customHeight: this.height,
        verticalAlign: "center",
        textAlign: "center",
        fontFamily: "TaagraBold",
      });
    },
    download() {
      var a = document.createElement("a");
      a.href = this.image;
      a.download = "Image.png";
      a.click();
    },
  },
};
</script>
