<?php

/**
 * Drei-Quiz-Fragen
 * von Andre Trecksel
 */

/*
 * Inhaltstyp auf JSON setzen
 */
header('Content-Type: application/json');
// header('Content-Type: text/plain'); // fürs Debuggen

/*
 *
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  $antw = array(
    // 'post' => $_POST, // fürs Debuggen
    'korrekt' => false
  );

  if (isset($_POST['html'])) { // Frage 1
    // $antw['antworten'] = array(0, 0, 1);
    if ($_POST['html'] == 'c') {
      $antw['korrekt'] = true;
    }
  } else if (isset($_POST['css-a']) || isset($_POST['css-b']) || isset($_POST['css-c'])) { // Frage 2
    // $antw['antworten'] = array(1, 0, 1);
    if (isset($_POST['css-a']) && isset($_POST['css-c']) && !isset($_POST['css-b'])) {
      $antw['korrekt'] = true;
    }
  } else if (isset($_POST['php'])) { // Frage 3
    // $antw['php-antwort-original'] = $_POST['php']; // fürs Debuggen
    $php_antwort_gefiltert = filter_input(INPUT_POST, 'php', FILTER_SANITIZE_SPECIAL_CHARS, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_BACKTICK | FILTER_FLAG_ENCODE_HIGH);
    // $antw['php-antwort-filtered'] = $php_antwort_gefiltert; // fürs Debuggen
    if ($php_antwort_gefiltert == 'echo') {
      $antw['korrekt'] = true;
    }
  }

  echo json_encode($antw);
  //
} else {
  //
  echo '{"korrekt":false,"error":1}';
  //
}
