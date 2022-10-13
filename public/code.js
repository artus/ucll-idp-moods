const elements = {
  name: document.querySelector("#name-section"),
  nameFormButton: document.querySelector("#name-form-button"),
  nameFormInput: document.querySelector("#name-form-input"),
  moods: document.querySelector("#moods-section"),
  moodsFormRange: document.querySelector("#moods-form-range"),
  moodsTable: document.querySelector("#moods-table-data"),
  moodsFormInput: document.querySelector("#moods-form-input"),
  moodsFormButton: document.querySelector("#moods-form-button"),
  moodsFormLabel: document.querySelector("#moods-form-label")
};

let yourName;

elements.nameFormButton.addEventListener("click", () => {
  setName(elements.nameFormInput.value);
});

elements.moodsFormButton.addEventListener("click", async () => {
  try {
    const description = elements.moodsFormInput.value;
    const score = elements.moodsFormRange.value;

    const newMood = {
      description,
      score,
    };

    const response = await fetch(`/moods/${yourName}`, {
      method: "POST",
      body: JSON.stringify(newMood),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const moods = await response.json();

    if (response.status >= 400) {
      alert(moods.error);
    } else {
      showMoods(moods);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

const sections = ["name", "moods"];
const originalDisplayOptions = new Map();

function showHTML(id = "name") {
  for (const section of sections) {
    const element = document.querySelector(`#${section}-section`);
    if (!originalDisplayOptions.has(section)) {
      originalDisplayOptions.set(section, element.style.display);
    }
    if (id === section) {
      element.style.display = originalDisplayOptions.get(section);
    } else {
      element.style.display = "none";
    }
  }
}

function setName(name) {
  yourName = name;
  elements.moodsFormLabel.innerHTML = `Hi ${name}, how are you feeling today?`;
  showHTML("moods");
  loadMoods();
}

function showMoods(moods) {
  if (!moods || !moods.length) {
    elements.moodsTable.innerHTML = "<p>No moods yet.</p>";
  } else {
    elements.moodsTable.innerHTML = "";
    for (const mood of moods) {
      const { description, timestamp, score } = mood;
      const date = new Date(timestamp).toISOString().substring(0, 10);
      elements.moodsTable.innerHTML += `<div><p>${date}</p><p>${description}</p><p><img src="./img/${score}.png"></p></div>`;
    }
  }
}

async function loadMoods() {
  try {
    const response = await fetch(`/moods/${yourName}`, {
      method: "GET",
    });
    const moods = await response.json();

    if (response.status >= 400) {
      alert(moods.error);
    } else {
      showMoods(moods);
    }
  } catch (error) {
    console.error(error);
  }
}

showHTML("name");
