<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "mthembu.nam@gmail.com"; // Replace with your Gmail address
    $subject = "New Contact Form Submission";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $body = "Name: $name\n" .
            "Email: $email\n" .
            "Message: \n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href = 'Index.html';</script>";
    } else {
        echo "<script>alert('Failed to send message. Please try again later.'); window.location.href = 'Index.html';</script>";
    }
} else {
    header('Location: Index.html');
    exit;
}
?>
