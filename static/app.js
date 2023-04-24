const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  getColors();
});

function getColors() {
  const query = form.elements.query.value;

  fetch('/palette', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      query
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const colors = data.colors;
      const container = document.querySelector('.container');

      createColorBoxes(colors, container);
    });
}

function createColorBoxes(colors, container) {
  container.innerHTML = '';

  colors.forEach((color) => {
    const box = document.createElement('div');
    box.classList.add('color');
    box.style.backgroundColor = color;
    box.style.width = `calc(100%/ ${colors.length})`;

    box.addEventListener('click', async () => {
      await navigator.clipboard.writeText(color);
    });

    const label = document.createElement('span');
    label.innerText = color;
    box.appendChild(label);

    container.appendChild(box);
  });
}
