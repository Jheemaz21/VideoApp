const videos = [
    { src: 'videos/bojo-biduan.mp4', title: 'DJ Bojo Biduan', category: 'Musik' },
    { src: 'videos/video2.mp4', title: 'Belajar JavaScript', category: 'Edukasi' },
    { src: 'videos/video3.mp4', title: 'Game Play', category: 'Game' },
    { src: 'videos/video4.mp4', title: 'Stand Up Lucu', category: 'Komedi' },
    { src: 'videos/video5.mp4', title: 'Tutorial Tailwind', category: 'Edukasi' },
];

const categories = ['Semua', ...new Set(videos.map(v => v.category))];
let selectedCategory = 'Semua';

const container = document.getElementById('video-container');
const categoryButtons = document.getElementById('category-buttons');

function renderCategoryButtons() {
    categoryButtons.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = `px-4 py-1 rounded-full border border-blue-500 text-sm
      ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`;

        btn.addEventListener('click', () => {
            selectedCategory = cat;
            renderCategoryButtons();
            renderVideos();
        });

        categoryButtons.appendChild(btn);
    });
}

// fitur upload
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const videoFile = document.getElementById('videoFile').files[0];
  
  if (videoFile) {
    const formData = new FormData();
    formData.append('video', videoFile);

    // Kirim data video ke server
    fetch('upload_video.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Video uploaded successfully!');
        // Kamu bisa redirect atau memberikan pesan sukses
      } else {
        alert('Upload failed!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error uploading your video.');
    });
  } else {
    alert('Please select a video to upload.');
  }
});


function renderVideos() {
    container.innerHTML = '';

    const filtered = selectedCategory === 'Semua'
        ? videos
        : videos.filter(v => v.category === selectedCategory);

    filtered.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'bg-white p-4 rounded-xl shadow';

        videoCard.innerHTML = `
      <h2 class="text-xl font-semibold mb-2">${video.title}</h2>
      <video class="w-full rounded-lg mb-2" controls preload="metadata">
        <source src="${video.src}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="flex items-center gap-4">
        <button class="like-btn px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600">
          ❤️ Like
        </button>
        <span class="like-count text-sm text-gray-600">0 Likes</span>
      </div>
    `;

        container.appendChild(videoCard);

        const likeBtn = videoCard.querySelector('.like-btn');
        const likeCount = videoCard.querySelector('.like-count');

        let count = 0;
        likeBtn.addEventListener('click', () => {
            count++;
            likeCount.textContent = `${count} Likes`;
        });
    });
}

// Ambil video tambahan dari localStorage
const storedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
videos.push(...storedVideos);

// Form Upload
const uploadForm = document.getElementById('upload-form');

if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('video-title').value;
        const category = document.getElementById('video-category').value;
        const fileInput = document.getElementById('video-file');
        const file = fileInput.files[0];

        if (!file || !file.type.startsWith('video/')) {
            alert('File harus berupa video!');
            return;
        }

        const fileURL = URL.createObjectURL(file);

        const newVideo = {
            src: fileURL,
            title,
            category
        };

        videos.push(newVideo);

        // Simpan ke localStorage
        storedVideos.push(newVideo);
        localStorage.setItem('uploadedVideos', JSON.stringify(storedVideos));

        // Reset form
        uploadForm.reset();

        // Render ulang
        renderCategoryButtons();
        renderVideos();
    });
}


// Init
renderCategoryButtons();
renderVideos();
