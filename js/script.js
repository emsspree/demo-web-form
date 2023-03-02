/**
 * Drei-Quiz-Fragen
 * von Andre Trecksel
 */

'use strict';
let antworten = '';
let frms = document.forms;

let frageNr = frms[frms.length - 1].parentElement.nextElementSibling.firstElementChild.firstElementChild;
frageNr.textContent = 1;
let kategorie = frms[0].parentElement.previousElementSibling.firstElementChild.firstElementChild;

for (let i = 0; i < frms.length; i++) {
  let frm = frms[i];
  let melder = frm.firstElementChild.lastElementChild;
  let weiter = frm.lastElementChild.lastElementChild;
  frm.addEventListener('submit', event => {
    // Standardverhalten verhindern
    event.preventDefault();

    // Antwort beziehen
    fetch("antworten.php", {
      method: "post",
      body: new FormData(event.target)
    }).then(response => {
      return response.json();
    }).then(response => {
      console.dir(response);
      if (response.korrekt === true) {
        melder.removeAttribute('class');
        melder.classList.add('richtig');
        let meldung = 'Die Frage wurde richtig beantwortet.';
        melder.textContent = meldung;
        console.log('Frage ' + frageNr.textContent + ': %c' + meldung, 'color:limegreen');
        weiter.removeAttribute('disabled');
        weiter.addEventListener('click', event => {
          frm.classList.add('fertig');
          // if (frageNrAktuell < 3) {
          //   frageNr.textContent = event.target.dataset.nextNum;
          //   kategorie.textContent = event.target.dataset.next;
          // } else {
          //   frageNr.parentElement.textContent = '\u00A0'; // frageNr.textContent = '3';
          //   kategorie.parentElement.textContent = '\u00A0';
          // }
          if (event.target.dataset.nextNum === '-') {
            frageNr.parentElement.textContent = '\u00A0';
            kategorie.parentElement.textContent = '\u00A0';
          } else {
            frageNr.textContent = event.target.dataset.nextNum;
            kategorie.textContent = event.target.dataset.next;
          }
        });
      } else {
        melder.removeAttribute('class');
        melder.classList.add('falsch');
        let meldung = 'Die Frage wurde falsch beantwortet.';
        melder.textContent = meldung;
        console.log('Frage ' + frageNr.textContent + ': %c' + meldung, 'color:crimson');
      }
    });

  });

}
