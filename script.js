const ageGroups = [
  { id: '3-10', label: '3–10 let', description: 'Jednoduché logické otázky pro rozvoj myšlení.', levels: 5 },
  { id: '10-15', label: '10–15 let', description: 'Příjemné úlohy pro zlepšení logického uvažování.', levels: 5 },
  { id: '15-20', label: '15–20 let', description: 'Úlohy pro rychlé rozhodování a přemýšlení.', levels: 5 },
  { id: '20-30', label: '20–30 let', description: 'Úlohy pro trénink mozku v běžném životě.', levels: 5 },
  { id: '30-40', label: '30–40 let', description: 'Krátké slovní úlohy pro aktivní mysl.', levels: 5 },
  { id: '40-60', label: '40–60 let', description: 'Příjemné otázky pro zlepšení logiky a důvtipu.', levels: 5 },
  { id: '60-80', label: '60–80 let', description: 'Lehčí a zábavné otázky pro probuzení myšlení.', levels: 5 },
];

const questions = [
  {
    question: 'Pepa má 3 krabice a do každé dá 2 jablka. Kolik jablek má celkem?',
    options: ['6 jablek', '5 jablek', '4 jablka'],
    correctIndex: 0,
    hint: 'Vynásob počet krabic počtem jablek v každé z nich.',
  },
  {
    question: 'Tři kamarádi sdílí 9 bonbónů rovnoměrně. Kolik bonbónů dostane každý?',
    options: ['3 bonbóny', '4 bonbóny', '1 bonbón'],
    correctIndex: 0,
    hint: 'Rozděl 9 bonbónů rovnoměrně mezi 3 osoby.',
  },
  {
    question: 'V autě jsou 2 řidiči a 4 cestující. Kolik osob je v autě celkem?',
    options: ['6 osob', '4 osoby', '2 osoby'],
    correctIndex: 0,
    hint: 'Sečti všechny osoby uvnitř auta.',
  },
  {
    question: 'Na přechodu čeká 5 lidí, přijde ještě jeden. Kolik jich čeká dohromady?',
    options: ['6 lidí', '5 lidí', '4 lidé'],
    correctIndex: 0,
    hint: 'Přičti jednoho ke stávajícím pěti.',
  },
  {
    question: 'Lucie má 2 knihy a Tomáš má o jednu knihu více. Kolik knih má Tomáš?',
    options: ['3 knihy', '2 knihy', '1 knihu'],
    correctIndex: 0,
    hint: 'Tomáš má o jednu knihu víc než Lucie.',
  },
  {
    question: 'Míša koupila 8 per a 2 ztratila. Kolik per jí zůstalo?',
    options: ['6 per', '10 per', '2 pera'],
    correctIndex: 0,
    hint: 'Odečti ztracené pera od původního počtu.',
  },
  {
    question: 'Na stole jsou 4 modré a 3 červené kostky. Kolik kostek je celkem?',
    options: ['7 kostek', '5 kostek', '4 kostky'],
    correctIndex: 0,
    hint: 'Sečti modré a červené kostky.',
  },
  {
    question: 'Zdeňka vidí 2 psy a 2 kočky. Kolik má zvířat dohromady?',
    options: ['4 zvířata', '3 zvířata', '2 zvířata'],
    correctIndex: 0,
    hint: 'Sečti psy a kočky dohromady.',
  },
  {
    question: 'Paní učitelka přinesla 5 tužek a 5 pravítek. Kolik věcí přinesla celkem?',
    options: ['10 věcí', '8 věcí', '5 věcí'],
    correctIndex: 0,
    hint: 'Sečti obě skupiny předmětů.',
  },
  {
    question: 'Když dáš 2 jablka do 3 košíků, kolik jablek bude v každém, pokud se rozdělí rovnoměrně?',
    options: ['1 jablko v každém', 'Žádné jablko', 'Nedá se rozdělit'],
    correctIndex: 0,
    hint: 'Rozděl 2 jablka co nejvíce rovnoměrně mezi 3 košíky.',
  },
];

const ageButtons = document.getElementById('ageButtons');
const agePanel = document.getElementById('agePanel');
const gamePanel = document.getElementById('gamePanel');
const groupTitle = document.getElementById('groupTitle');
const groupDescription = document.getElementById('groupDescription');
const scoreValue = document.getElementById('scoreValue');
const levelValue = document.getElementById('levelValue');
const levelsTotal = document.getElementById('levelsTotal');
const optionsGrid = document.getElementById('optionsGrid');
const hintBtn = document.getElementById('hintBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const feedback = document.getElementById('feedback');
const hintText = document.getElementById('hintText');
const taskInstruction = document.getElementById('taskInstruction');

let currentGroup = null;
let currentLevel = 1;
let totalLevels = 0;
let currentQuestion = null;
let score = 0;
let answerSelected = false;

function initialize() {
  ageGroups.forEach(group => {
    const button = document.createElement('button');
    button.className = 'age-button';
    button.textContent = group.label;
    button.addEventListener('click', () => startGroup(group));
    ageButtons.appendChild(button);
  });

  hintBtn.addEventListener('click', showHint);
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', resetGame);
  renderStart();
}

function renderStart() {
  agePanel.classList.remove('hidden');
  gamePanel.classList.add('hidden');
}

function startGroup(group) {
  currentGroup = group;
  currentLevel = 1;
  totalLevels = group.levels;
  score = 0;
  scoreValue.textContent = score;
  levelsTotal.textContent = totalLevels;
  levelValue.textContent = currentLevel;
  groupTitle.textContent = `Skupina ${group.label}`;
  groupDescription.textContent = group.description;
  agePanel.classList.add('hidden');
  gamePanel.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  feedback.textContent = '';
  hintText.textContent = '';
  renderQuestion();
}

function resetGame() {
  currentGroup = null;
  currentLevel = 1;
  totalLevels = 0;
  score = 0;
  renderStart();
}

function renderQuestion() {
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  taskInstruction.textContent = currentQuestion.question;
  hintText.textContent = '';
  feedback.textContent = '';
  answerSelected = false;
  nextBtn.classList.add('hidden');
  renderOptions(shuffleArray([...currentQuestion.options]));
}

function renderOptions(options) {
  optionsGrid.innerHTML = '';
  const correctText = currentQuestion.options[currentQuestion.correctIndex];
  options.forEach(optionText => {
    const card = document.createElement('button');
    card.className = 'choice-card';
    card.textContent = optionText;
    card.addEventListener('click', () => selectOption(card, optionText === correctText));
    optionsGrid.appendChild(card);
  });
}

function selectOption(card, isCorrect) {
  if (answerSelected) return;

  answerSelected = true;
  card.classList.add(isCorrect ? 'correct' : 'incorrect');

  if (isCorrect) {
    feedback.textContent = 'Správně! Dobré logické uvažování.';
    feedback.className = 'feedback success';
    score += 10;
    scoreValue.textContent = score;
  } else {
    feedback.textContent = 'Špatně. Zkus další otázku.';
    feedback.className = 'feedback error';
  }
  nextBtn.classList.remove('hidden');
}

function showHint() {
  hintText.textContent = `Nápověda: ${currentQuestion.hint}`;
}

function nextQuestion() {
  if (currentLevel >= totalLevels) {
    feedback.textContent = 'Hotovo! Můžeš si vybrat jinou věkovou skupinu.';
    nextBtn.classList.add('hidden');
    return;
  }
  currentLevel += 1;
  levelValue.textContent = currentLevel;
  renderQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

initialize();
