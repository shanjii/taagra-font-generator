async function transitionScreen() {
    document.getElementById("start-prompt").classList.add("start");
    document.getElementById("background").classList.add("start");
    await wait(1500)
    document.getElementById("start-prompt").style.display = "none"
    document.getElementById("controller-box").classList.add("start")
    document.getElementById("image-displayer").style.display = "flex"
    await wait(10)
    document.getElementById("image-displayer").style.opacity = 1
};

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export { transitionScreen };