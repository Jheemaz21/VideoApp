document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch("/upload", {
    method: "POST",
    body: formData
  });

  const result = await res.json();
  const status = document.getElementById("uploadStatus");
  if (result.success) {
    status.innerHTML = `<div class="alert alert-success">Video berhasil diupload!</div>`;
    form.reset();
  } else {
    status.innerHTML = `<div class="alert alert-danger">Gagal upload: ${result.error}</div>`;
  }
});
