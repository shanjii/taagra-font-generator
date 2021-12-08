<template>
  <div id="background">
    <section id="start-prompt">
      <Logo />
      <button class="start-button" @click="open">Start</button>
    </section>
    <section id="image-displayer">
      <img :src="image" alt="" srcset="" />
    </section>
    <section id="controller-box">
      <div>
        <input
          type="range"
          v-model="width"
          @change="refreshImage"
          max="1800"
          min="200"
        />
        <input
          type="text"
          v-model="text"
          @keyup="refreshImage"
          name=""
          id="controller-input"
        />
        <button @click="download">Download</button>
      </div>
    </section>
  </div>
</template>

<script>
const textToImage = require("text-to-image");

export default {
  data() {
    return {
      image: null,
      text: "Dras'kay",
      width: 400,
    };
  },
  mounted() {
    this.refreshImage();
  },
  methods: {
    open() {
      document.getElementById("start-prompt").classList.add("start");
      document.getElementById("background").classList.add("start");
      setTimeout(() => {
        document.getElementById("controller-box").classList.add("start"),
          (document.getElementById("image-displayer").style.display = "flex"),
          (document.getElementById("start-prompt").style.display = "none");
      }, 1500);
    },
    async refreshImage() {
      this.text = document.getElementById("controller-input").value;
      this.image = await textToImage.generate(`\n ${this.text}`, {
        bgColor: "transparent",
        fontSize: 50,
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
