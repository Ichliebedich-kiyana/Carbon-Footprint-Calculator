function test() {
  alert("功能正在开发中=￣ω￣=");
}
let img = document.querySelector(".change");
img.addEventListener(
  "mouseenter",
  function () {
    // 鼠标经过时，为盒子添加新id
    img.id = "transitionBegin";
  },
  false
);
img.addEventListener(
  "mouseleave",
  function () {
    // 鼠标离开时，为盒子添加新id
    img.id = "transitionEnd";
  },
  false
);
