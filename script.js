// 1. بيانات الكويز التعليمية للأطفال
const quizData = [
  {
    question: "ما هو أطول نهر في العالم الذي قامت على ضفافه الحضارة المصرية القديمة؟",
    category: "جغرافيا وتاريخ",
    options: ["نهر النيل", "نهر الأمازون", "نهر الفرات", "نهر الدانوب"],
    correctIndex: 0,
    explanation: "أحسنت! نهر النيل هو شريان الحياة في مصر، وقديماً قيل 'مصر هبة النيل'."
  },
  {
    question: "ما هو أقدم وأكبر الأهرامات الثلاثة في الجيزة، ويُعد إحدى عجائب الدنيا السبع؟",
    category: "عجائب العمارة",
    options: ["هرم خفرع", "هرم خوفو", "هرم منقرع", "هرم زوسر"],
    correctIndex: 1,
    explanation: "ممتاز! هرم خوفو الأكبر استمر بناؤه سنوات طويلة وكان أعلى بناء شيده الإنسان لقرون."
  },
  {
    question: "تمثال مشهور له رأس إنسان وجسم أسد قوي يحرس الأهرامات، ما اسمه؟",
    category: "آثار وأساطير",
    options: ["حورس", "أنوبيس", "أبو الهول", "رع"],
    correctIndex: 2,
    explanation: "رائع جداً! أبو الهول يجمع بين قوة الأسد وحكمة الإنسان."
  },
  {
    question: "من هو الفرعون الصغير الذي اكتُشفت مقبرته الذهبية كاملة عام 1922 بوادي الملوك؟",
    category: "ملوك الفراعنة",
    options: ["أحمس الأول", "توت عنخ آمون", "تحتمس الثالث", "رمسيس الثاني"],
    correctIndex: 1,
    explanation: "إجابة عبقرية! الملك توت عنخ آمون اشتهر بقناعه الذهبي البديع وكنوزه المدهشة."
  },
  {
    question: "ما اسم الكتابة التصويرية التي كان ينقشها المصريون القدماء على جدران المعابد؟",
    category: "اللغة والثقافة",
    options: ["الكتابة المسمارية", "الكتابة الهيروغليفية", "الأبجدية الفينيقية", "الخط الكوفي"],
    correctIndex: 1,
    explanation: "صحيح! الهيروغليفية اعتمدت على رموز وصور الطيور والأشياء للتعبير عن الكلمات."
  },
  {
    question: "ما هو النبات الذي ينمو على ضفاف النيل وصنع منه المصريون القدماء أول ورق في التاريخ؟",
    category: "ابتكارات مذهلة",
    options: ["نبات البردي", "نبات الخيزران", "نبات القطن", "شجر النخيل"],
    correctIndex: 0,
    explanation: "إبداع! نبات البردي استخدمه المصريون لتدوين علومهم وحفظ تاريخهم العظيم."
  },
  {
    question: "من هي الملكة المصرية التي حكمت كفرعون وبنت معبد الدير البحري الشهير في الأقصر؟",
    category: "شخصيات تاريخية",
    options: ["نفرتيتي", "كليوباترا", "حتشبسوت", "شجر الدر"],
    correctIndex: 2,
    explanation: "عظيم! الملكة حتشبسوت تميز عهدها بالسلام والازدهار والرحلات التجارية لبلاد بونت."
  },
  {
    question: "أي مدينة مصرية أسسها الإسكندر الأكبر على البحر المتوسط واشتهرت بمكتبتها التاريخية؟",
    category: "مدن مصرية",
    options: ["القاهرة", "الإسكندرية", "أسوان", "الأقصر"],
    correctIndex: 1,
    explanation: "بطل المعرفة! الإسكندرية كانت عاصمة ومنارة للثقافة والعلم في العالم القديم."
  }
];

// المتغيرات وحالة اللعبة
let currentQuestion = 0;
let score = 0;
let soundEnabled = true;
let answered = false;

// عناصر واجهة المستخدم
const quizContainer = document.getElementById('quiz-container');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionCat = document.getElementById('question-cat');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const explanationBox = document.getElementById('explanation-box');
const scoreDisplay = document.getElementById('score-display');
const questionProgress = document.getElementById('question-progress');
const progressBar = document.getElementById('progress-bar');
const audioToggle = document.getElementById('audio-toggle');
const finalBadge = document.getElementById('final-badge');
const finalStars = document.getElementById('final-stars');
const finalScoreText = document.getElementById('final-score-text');
const finalFeedback = document.getElementById('final-feedback');

// 2. نظام المؤثرات الصوتية (توليد أصوات نغمية ذاتية عبر Web Audio API)
class SoundSystem {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playCorrect() {
    if (!soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // نغمات تصاعدية مبهجة: C5, E5, G5, C6
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.35);
    });
  }

  playWrong() {
    if (!soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.35);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playWin() {
    if (!soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.15 }, { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 }, { f: 1046.50, d: 0.4 },
      { f: 880.00, d: 0.15 }, { f: 1046.50, d: 0.6 }
    ];
    let offset = 0;
    notes.forEach((item) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + offset);
      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + item.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + item.d + 0.05);
      offset += item.d * 0.85;
    });
  }
}

const sounds = new SoundSystem();

// زر التبديل بين كتم وتشغيل الصوت
audioToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  audioToggle.textContent = soundEnabled ? '🔊' : '🔇';
});

// 3. مؤثرات الاحتفال البصرية (Confetti)
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 9 + 5;
    this.color = ['#D4AF37', '#17A2B8', '#E63946', '#FFD166', '#06D6A0', '#118AB2'][Math.floor(Math.random() * 6)];
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = Math.random() * -8 - 4;
    this.gravity = 0.35;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.opacity = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.rotation += this.rotationSpeed;
    this.opacity -= 0.015;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
    ctx.restore();
  }
}

function triggerConfetti() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(centerX + (Math.random() - 0.5) * 150, centerY + (Math.random() - 0.5) * 100));
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].opacity <= 0 || particles[i].y > canvas.height) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// 4. تسلسل ومنطق اللعبة
startBtn.addEventListener('click', () => {
  sounds.init();
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  loadQuestion();
});

function loadQuestion() {
  answered = false;
  const q = quizData[currentQuestion];
  
  questionCat.textContent = q.category;
  questionText.textContent = q.question;
  questionProgress.textContent = `السؤال: ${currentQuestion + 1}/${quizData.length}`;
  progressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
  scoreDisplay.textContent = `النقاط: ${score}`;
  
  explanationBox.className = 'explanation-card';
  explanationBox.style.display = 'none';
  nextBtn.style.display = 'none';

  optionsContainer.innerHTML = '';
  const letters = ['أ', 'ب', 'ج', 'د'];
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[idx]}</span>
      <span class="option-text">${opt}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(idx, btn));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, selectedBtn) {
  if (answered) return;
  answered = true;

  const q = quizData[currentQuestion];
  const allButtons = optionsContainer.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === q.correctIndex) {
    selectedBtn.classList.add('correct');
    score++;
    scoreDisplay.textContent = `النقاط: ${score}`;
    sounds.playCorrect();
    triggerConfetti();

    explanationBox.innerHTML = `🌟 <b>إجابة صحيحة ورائعة!</b><br>${q.explanation}`;
    explanationBox.classList.add('show-correct');
  } else {
    selectedBtn.classList.add('incorrect');
    allButtons[q.correctIndex].classList.add('correct');
    sounds.playWrong();

    quizContainer.classList.add('screen-shake');
    setTimeout(() => quizContainer.classList.remove('screen-shake'), 500);

    explanationBox.innerHTML = `💡 <b>محاولة طيبة! الإجابة الصحيحة هي: "${q.options[q.correctIndex]}"</b><br>${q.explanation}`;
    explanationBox.classList.add('show-wrong');
  }

  nextBtn.style.display = 'inline-flex';
  nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  progressBar.style.width = '100%';

  finalScoreText.textContent = `أحرزت ${score} من ${quizData.length}`;

  let badge = '🏺';
  let stars = '⭐';
  let feedback = '';

  if (score === quizData.length) {
    badge = '👑';
    stars = '⭐⭐⭐⭐⭐';
    feedback = 'مذهل وفوق العادة! أنت حاصل على وسام "فرعون المعرفة الذهبي". معلوماتك التاريخية ممتازة!';
    triggerConfetti();
    setTimeout(triggerConfetti, 400);
    setTimeout(triggerConfetti, 800);
  } else if (score >= quizData.length * 0.7) {
    badge = '🦁';
    stars = '⭐⭐⭐⭐';
    feedback = 'بطل حقيقي! لقد حصلت على وسام "حارس الأهرامات الذكي". معلوماتك قوية!';
    triggerConfetti();
  } else if (score >= quizData.length * 0.5) {
    badge = '📜';
    stars = '⭐⭐⭐';
    feedback = 'عمل رائع! أنت "مستكشف نيل واعد". راجع المعلومات والعب مرة ثانية لتصل للعلامة الكاملة!';
  } else {
    badge = '🧭';
    stars = '⭐⭐';
    feedback = 'بداية جيدة في رحلة استكشاف مصر! التاريخ مليء بالحكايات الممتعة، جرّب مجدداً!';
  }

  finalBadge.textContent = badge;
  finalStars.textContent = stars;
  finalFeedback.textContent = feedback;
  sounds.playWin();
}

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.remove('active');
  quizScreen.classList.add('active');
  loadQuestion();
});