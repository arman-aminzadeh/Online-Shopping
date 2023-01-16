//console.log(mainImage, smallPic);
export const imageChanger = (smallPic, mainImage) => {
  console.log("Hello....");
  smallPic[0].addEventListener("click", () => {
    mainImage.src = smallPic[0].src;
  });
  smallPic[1].addEventListener("click", () => {
    mainImage.src = smallPic[1].src;
  });
  smallPic[2].addEventListener("click", () => {
    mainImage.src = smallPic[2].src;
  });
  smallPic[3].addEventListener("click", () => {
    mainImage.src = smallPic[3].src;
  });
};
