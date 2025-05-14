const videos = [
  {
    title: "Film Seru",
    file: "https://github.com/Jheemaz21/VideoApp/raw/refs/heads/main/assets/videos/video1.mp4",
    thumbnail: "assets/videos/thumb1.jpg",
    kategori: "film"
  },
  {
    title: "Lagu Populer",
    file: "https://www.veed.io/view/615f38d2-b111-407c-b330-a269a4f9d570?panel=share",
    thumbnail: "assets/videos/thumb2.jpg",
    kategori: "musik"
  },
  {
    title: "Belajar Coding",
    file: "assets/videos/video3.mp4",
    thumbnail: "assets/videos/thumb3.jpg",
    kategori: "edukasi"
  },
  {
    title: "Trailer Film",
    file: "assets/videos/video4.mp4",
    thumbnail: "assets/videos/thumb4.jpg",
    kategori: "film"
  }
];

const container = document.getElementById("video-container");

function renderVideos(filteredCategory = "all") {
  container.innerHTML = ""; // Kosongkan dulu
  const filtered = filteredCategory === "all"
    ? videos
    : videos.filter(video => video.kategori === filteredCategory);

  filtered.forEach((video, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6 mb-4";

    col.innerHTML = `
      <div class="card">
        <div class="thumbnail" id="thumb-${index}">
          <img src="${video.thumbnail}" alt="${video.title}" />
          <div class="play-button">▶️</div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${video.title}</h5>
        </div>
      </div>
    `;

    container.appendChild(col);

    const thumbElement = document.getElementById(`thumb-${index}`);
    thumbElement.addEventListener("click", () => {
      thumbElement.outerHTML = `
        <video controls autoplay width="100%" style="border-radius: 10px;">
          <source src="${video.file}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    });
  });
}

// Inisialisasi awal
renderVideos();

// Event kategori dipilih
document.querySelectorAll(".kategori-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const kategori = item.getAttribute("data-kategori");
    renderVideos(kategori);
  });
});

// Ambil data video dari JSON (harus pakai server lokal atau hosting)
fetch("videos.json")
  .then(res => res.json())
  .then(data => {
    videos.push(...data);
    renderVideos(); // render semua video
  });
