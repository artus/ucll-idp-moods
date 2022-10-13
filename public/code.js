const elements = {
  name: document.querySelector('#name-section'),
  nameFormButton: document.querySelector('#name-form-button'),
  nameFormInput: document.querySelector('#name-form-input'),
  moods: document.querySelector('#moods-section'),
  moodsFormRange: document.querySelector('#moods-form-range')
};

elements.nameFormButton.addEventListener('click', () => {
  setName(elements.nameFormInput.value);
});

const sections = ['name', 'moods'];
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

let name;

function setName(name) {
  name = name;
  showHTML('moods');
}

showHTML('name');