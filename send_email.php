<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $to = "sales@sombono.com"; // Replace with your destination email
    $subject = "New Contact Form Submission";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $body = "Name: $name\n" .
            "Email: $email\n" .
            "Message: \n$message";

            //more code

    // Detect AJAX (fetch/XHR) requests
    $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

    if (mail($to, $subject, $body, $headers)) {
        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
            exit;
        }
        echo "<script>alert('Message sent successfully!'); window.location.href = 'Index.html';</script>";
    } else {
        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
            exit;
        }
        echo "<script>alert('Failed to send message. Please try again later.'); window.location.href = 'Index.html';</script>";
    }
} else {
    header('Location: Index.html');
    exit;
}
?>
