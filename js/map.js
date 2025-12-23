const modal = document.getElementById("key-modal");
const enterBtn = document.getElementById("enter-btn");
const errorMsg = document.getElementById("error-msg");
const mapContainer = document.getElementById("map-container");

let mapData = null;

/* Carrega o JSON */
fetch("data/points.json")
  .then(response => response.json())
  .then(data => {
    mapData = data;
  });

enterBtn.addEventListener("click", () => {
  const key = document.getElementById("player-key").value.trim();

  if (!mapData.players[key]) {
    errorMsg.textContent = "Chave inválida.";
    return;
  }

  modal.style.display = "none";
  renderPoints(mapData.players[key].visiblePoints);
});

/* Renderiza os pontos permitidos */
function renderPoints(visibleIds) {
  const img = document.getElementById("map-image");

  img.onload = () => {
    const mapWidth = img.clientWidth;
    const mapHeight = img.clientHeight;

    mapData.points.forEach(point => {
      if (!visibleIds.includes(point.id)) return;

      const el = document.createElement("div");
      el.className = "map-point";

      el.style.left = `${point.x * mapWidth}px`;
      el.style.top = `${point.y * mapHeight}px`;

      el.innerHTML = `
        <img src="assets/icons/${point.type}.png" alt="${point.name}" />
        <div class="tooltip">
          <strong>${point.name}</strong><br/><br/>
          ${point.description}
        </div>
      `;

      mapContainer.appendChild(el);
    });
  };

  /* Caso a imagem já esteja carregada */
  if (img.complete) img.onload();
}
