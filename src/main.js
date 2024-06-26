/**
 * Fetches data from some API url
 * @async
 * @function fetchData
 * @param {string} url - The API url
 * @return {Array<Object>} The data from the URL
 */
const fetchData = async (url) => {
  try {
    //Sends a request
    const res = await fetch(url);

    //Handles response if successful
    if (res.ok) {
      const data = await res.json();
      return data;

      // Handles response if unsuccessful
    } else {
      throw new Error("Unable to retrieve data.");
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Changes the "active" button to the target button
 * @param {Element} targetBtn - Clicked button in user container
 * @param {Element} activeBtn - User button element with the class "active"
 */
const activeUserBtnHandler = (targetBtn, activeBtn) => {
  if (targetBtn === activeBtn) {
    return;
  }
  activeBtn.classList.remove("active");
  targetBtn.classList.add("active");
};

/**
 * Renders container titles from the already fetched data
 * @param {Array<Object>} data - Data from API fetch
 */
const titleHandler = (data) => {
  const containerTitles = document.querySelectorAll("#container-title");
  for (let i = 0; i < data.length; i++) {
    containerTitles[i].innerText = data[i].title;
  }
};

/**
 * Renders timeframes data from the already fetched data
 * @param {Element} targetBtn - Clicked button in user container
 * @param {Array<Object>} data - Data from API fetch
 */
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

/**
 * Attaches event listeners to user buttons
 * @param {Array<Object>} data - Data from API fetch
 */
const userBtnHandler = (data) => {
  const userBtns = document.querySelectorAll(".user-buttons button");
  userBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const targetBtn = e.target;
      const activeBtn = document.querySelector("button.active");
      activeUserBtnHandler(targetBtn, activeBtn);
      dataHandler(targetBtn, data);
    })
  );
};

/**
 * @async
 */
const init = async () => {
  //2. Data is retrieved from JSON file
  const data = await fetchData("./src/data.json");

  //3. Container titles are retrieved from data and rendered
  titleHandler(data);

  //4. Depending on which button is clicked:
  //4a. Active button is changed
  //4b. Timeframe current and previous data are retrieved from data and rendered
  userBtnHandler(data);
};

//1. JS init function is fired
init();
