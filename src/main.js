const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error("Unable to retrieve data.");
  } catch (error) {
    console.log(error);
  }
};

const titleHandler = (data) => {
  const containerTitles = document.querySelectorAll("#container-title");
  for (let i = 0; i < data.length; i++) {
    containerTitles[i].innerText = data[i].title;
  }
};

const activeUserBtnHandler = (targetBtn) => {
  const activeBtn = document.querySelector("button.active");
  if (targetBtn === activeBtn) {
    return;
  }
  activeBtn.classList.remove("active");
  targetBtn.classList.add("active");
};

const dataHandler = (targetBtn, data) => {
  const current = document.querySelectorAll("#current");
  const previous = document.querySelectorAll("#previous");

  for (let i = 0; i < current.length; i++) {
    const dailyData = data[i].timeframes.daily;
    const weeklyData = data[i].timeframes.weekly;
    const monthlyData = data[i].timeframes.monthly;

    targetBtn.innerText === "Daily"
      ? ((current[i].innerText = dailyData.current),
        (previous[i].innerText = dailyData.previous))
      : null;

    targetBtn.innerText === "Weekly"
      ? ((current[i].innerText = weeklyData.current),
        (previous[i].innerText = weeklyData.previous))
      : null;

    targetBtn.innerText === "Monthly"
      ? ((current[i].innerText = monthlyData.current),
        (previous[i].innerText = monthlyData.previous))
      : null;
  }
};

const userBtnHandler = (data) => {
  const userBtns = document.querySelectorAll(".user-buttons button");
  userBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const targetBtn = e.target;
      activeUserBtnHandler(targetBtn);
      dataHandler(targetBtn, data);
    })
  );
};

const init = async () => {
  const data = await fetchData("./src/data.json");
  titleHandler(data);
  userBtnHandler(data);
};

init();
