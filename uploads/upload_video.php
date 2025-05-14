<?php
$target_dir = "videos/";  // Folder tempat menyimpan video
$target_file = $target_dir . basename($_FILES["video"]["name"]);
$uploadOk = 1;
$videoFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Cek apakah file adalah video
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["video"]["tmp_name"]);
    if($check !== false) {
        echo "File is a video - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not a video.";
        $uploadOk = 0;
    }
}

// Cek apakah file sudah ada
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Cek ukuran file (maksimal 50MB)
if ($_FILES["video"]["size"] > 50000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Izinkan hanya format video tertentu
if ($videoFileType != "mp4" && $videoFileType != "avi" && $videoFileType != "mov") {
    echo "Sorry, only MP4, AVI & MOV files are allowed.";
    $uploadOk = 0;
}

// Jika semua pengecekan lolos, coba upload file
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["video"]["tmp_name"], $target_file)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
