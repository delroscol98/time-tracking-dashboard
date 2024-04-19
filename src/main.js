//Fetch data
fetch("./src/data.json")
  .then(
    (res) => {
      if (res.ok) return res.json();
      throw new Error("Unable to retrieve data.");
    },
    (networkError) => console.log(networkError.message)
  )
  .then((data) => {
    //Render title data
    const titles = document.querySelectorAll("#container-title");
    for (let i = 0; i < titles.length; i++) {
      titles[i].innerText = data[i].title;
    }

    //Handle user buttons
    const userBtns = document.querySelectorAll(".user-buttons button");
    userBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        //Add an active class to the targetBtn and removes active class from other button
        const activeBtn = document.querySelector("button.active");
        const targetbtn = e.target;
        if (targetbtn === activeBtn) {
          return;
        }
        activeBtn.classList.remove("active");
        targetbtn.classList.add("active");

        //Select elements to render timeframe data
        const currentData = document.querySelectorAll("#current");
        const prevData = document.querySelectorAll("#previous");

        //Render data if the daily button is clicked
        if (targetbtn.innerText === "Daily") {
          for (let i = 0; i < data.length; i++) {
            currentData[i].innerText = data[i].timeframes.daily.current;
            prevData[i].innerText = data[i].timeframes.daily.previous;
          }
        }

        //Render data if the weekly button is clicked
        if (targetbtn.innerText === "Weekly") {
          for (let i = 0; i < data.length; i++) {
            currentData[i].innerText = data[i].timeframes.weekly.current;
            prevData[i].innerText = data[i].timeframes.weekly.previous;
          }
        }

        //Render data if the monthly button is clicked
        if (targetbtn.innerText === "Monthly") {
          for (let i = 0; i < data.length; i++) {
            currentData[i].innerText = data[i].timeframes.monthly.current;
            prevData[i].innerText = data[i].timeframes.monthly.previous;
          }
        }
      })
    );
  });
