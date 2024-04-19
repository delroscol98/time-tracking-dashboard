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

const dataHandler = async () => {
  //Retrieve data
  const response = await fetch("./data.json");
  const data = await response.json();

  const currentData = document.querySelectorAll("#current");
  const prevData = document.querySelectorAll("#previous");
  console.log(currentData, prevData);
};

const init = () => {
  userBtnHandler();
  dataHandler();
};

init();
