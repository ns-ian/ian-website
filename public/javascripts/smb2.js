const LINEUP_CAP = 2800;
const BENCH_CAP = 1750;
const PITCH_BATFLD_CAP = 100;
const PITCH_MAIN_CAP = 200;

function sumLineup() {
  var lineup = document.getElementsByClassName('lineup');
  var displayTotal = document.querySelector('.fielderTotal');
  var sum = 0;

  for(var i = 0; i < lineup.length; i++) {
    sum += parseInt(lineup[i].value);
  }

  displayTotal.textContent = sum + 
                             ' points allocated, ' + 
                             parseInt(LINEUP_CAP - sum) + 
                             ' remaining';
}

function sumBench() {
  var bench = document.getElementsByClassName('bench');
  var displayTotal = document.querySelector('.benchTotal');
  var sum = 0;

  for(var i = 0; i < bench.length; i++) {
    sum += parseInt(bench[i].value);
  }

  displayTotal.textContent = sum +
                             ' points allocated, ' +
                             parseInt(BENCH_CAP - sum) +
                             ' remaining';
}

function sumPitch(x) {
  var pitcherName = 'pitcher' + x;
  var batFldName = 'pitch' + x + 'BatFld';
  var mainName = 'pitch' + x + 'Main';
  var query = '.pitcher' + x + 'Total';

  var pitcher = document.getElementById(pitcherName);
  var batFld = document.getElementsByClassName(batFldName);
  var main = document.getElementsByClassName(mainName);
  var displayTotal = document.querySelector(query);
  var batFldSum = 0;
  var mainSum = 0;

  var i = 0;
  for(i = 0; i < batFld.length; i++) {
    batFldSum += parseInt(batFld[i].value);
  }
  for(i = 0; i < main.length; i++) {
    mainSum += parseInt(main[i].value);
  }

  var displayName = 'Pitcher ' + x;
  if(pitcher.value != '') {
    displayName = pitcher.value;
  }

  displayTotal.textContent = displayName +
                             ': ' +
                             batFldSum +
                             ' base points allocated, ' +
                             parseInt(PITCH_BATFLD_CAP - batFldSum) +
                             ' remaining; ' +
                             mainSum +
                             ' pitching points allocated, ' +
                             parseInt(PITCH_MAIN_CAP - mainSum) +
                             ' remaining';
}
