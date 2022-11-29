const image_drop_area = document.querySelector(".card-upload-section");
const img_item = document.querySelector("#image-item");
const card_placeholder_tip = document.querySelector(".card-placeholder-tip");

image_drop_area.addEventListener("dragover", (event) => {
  event.preventDefault();
});

image_drop_area.addEventListener("drop", (event) => {
  event.preventDefault();
  let reader = new FileReader();
  const file = event.dataTransfer.files[0];
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    img_item.style.display = "none";
    card_placeholder_tip.style.display = "none";
    image_drop_area.style.backgroundImage = `url('${reader.result}')`;
    image_drop_area.style.backgroundRepeat = "no-repeat";
    image_drop_area.style.backgroundSize = "cover";
  };
});
