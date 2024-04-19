const userBtnHandler = () => {
  const userBtns = document.querySelectorAll(".user-buttons button");
  userBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const activeBtn = document.querySelector("button.active");
      const targetbtn = e.target;
      if (targetbtn.classList.contains("active")) {
        return;
      }
      activeBtn.classList.remove("active");
      targetbtn.classList.add("active");
    })
  );
};

const getData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data;
};

const init = () => {
  userBtnHandler();
};

init();
