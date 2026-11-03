(() => {
'use strict';

/* =========================================================
   CONFIG — troque textos, personagem e dificuldades aqui
   ========================================================= */
const CONFIG = {
  title: 'Bolso 26',
  levelName: 'FASE 5',
  timeLimit: 40,                 // segundos para chegar ao avião
  urna: {
    duration: 30,                   // segundos de votação em cada turno
    autoEvery: 4.5,                 // a cada X s (÷ velocidade da dificuldade) entra sozinho um voto no Lula
    firstAuto: 3,                   // atraso do primeiro voto automático
    lockChance: .35,                // chance do CONFIRMA vir travado (2–4 cliques para destravar)
    blinkChance: .45,               // chance da foto do Flávio piscar ao digitar 22 (não muda o voto)
    rounds: [                       // lulaPts = quanto vale cada voto no Lula; nullPerVote = brancos/nulos gerados por voto confirmado
      { name: 'FASE 3', sub: 'PRIMEIRO TURNO', lulaPts: 1, nullPerVote: .5 },  // cada voto confirmado gera +0,5 branco/nulo (e o Flávio nunca passa de 50%); empate passa
      { name: 'FASE 4', sub: 'SEGUNDO TURNO',  lulaPts: 2, nullPerVote: 0,    // o Lula precisa vencer; se o Flávio vencer = fraude
        extend: { seconds: 30, lulaPts: 3 } },                                  // ao fim do tempo o Zanin prorroga +30s; daí cada voto no Lula vale 3 (contagem continua)
    ],
    candidates: {
      '22': { k: 'F', name: 'Flávio Bolsonaro', party: 'PL' },
      '13': { k: 'L', name: 'Luiz Inácio Lula da Silva', party: 'PT' },
    },
  },
  duel: {
    bandTime: 30,                   // segundos de luta no debate da Band
    bandName: 'FASE 1', bandSub: 'DEBATE NA BAND',
    globoName: 'FASE 2', globoSub: 'DEBATE NA GLOBO',
    questions: 5,                   // quantos diálogos por partida (sorteados do banco abaixo)
  },
  // Diálogos do debate da Globo (Lula x Flávio, 23/10/2026). O Lula fala (lula); o jogador escolhe a fala do Flávio (o).
  // A PRIMEIRA opção é a correta (a que realmente rendeu no debate); o jogo embaralha. ok/bad = reação do Lula ao acerto/erro.
  quiz: [
    { lula: 'Isso aí é só você dar um Google, meu filho. Dá um Google!',
      o: ['Ô Lula, quem é que governa o Brasil? É você ou é o Google?', 'Boa dica, Lula. Vou perguntar pro Siri.', 'Prefiro perguntar pra Janja, ela sabe tudo.', 'Eu não uso internet, só rádio de pilha.'],
      ok: 'Hã… quer dizer… eu governo, ué! O Google é só… assessor.', bad: 'Isso, rapaz! Dá um Google que você aprende!' },
    { lula: 'Sem os nossos reajustes, o salário mínimo seria R$ 900. Nunca foi tão bom!',
      o: ['Hoje é dia 23 de outubro. O seu salário já acabou?', 'Que ótimo! Com R$ 900 eu vivo de boa.', 'Salário? Eu vivo de aplauso, Lula.', 'Vou pedir um Pix pro Google.'],
      ok: 'Ih… acabou dia 5. Próxima pergunta, por favor!', bad: 'Pois é! Gratidão ao PT, meu filho!' },
    { lula: 'O povo voltou a comer carne! A picanha voltou pra mesa do brasileiro!',
      o: ['No seu governo você prometeu picanha e entregou… abóbora!', 'No seu governo você prometeu picanha e entregou… mortadela dormida!', 'No seu governo você prometeu picanha e entregou… ovo de codorna!', 'No seu governo você prometeu picanha e entregou… churrasquinho de gato!'],
      ok: 'Abóbora?! É um legume nutritivo! E orgânico!', bad: 'Nem pra criticar você acerta, Flávio. Foi abóbora!' },
    { lula: 'Vamos mostrar o patrimônio de cada um aqui, Flávio? Cadê o seu?',
      o: ['Mostro! Mas você colocou aí o Sítio de Atibaia e o tríplex do Guarujá?', 'Meu patrimônio é um pedalinho e uma ilha particular.', 'Tá tudo no bunker, pode ir lá ver.', 'Declarei a Casa da Dinda e o jatinho.'],
      ok: 'Eh… isso aí foi arquivado! Passa pra próxima!', bad: 'Olha só que patrimônio de respeito! Tá tudo declarado.' },
    { lula: 'Você nunca pisou no Nordeste, Flávio! Não conhece o povo de lá!',
      o: ['Lula, eu sou o carioca mais nordestino que você já viu!', 'Lula, eu sou o carioca mais gaúcho que você já viu!', 'Lula, eu sou o carioca mais paulistano que você já viu!', 'Lula, eu sou o carioca mais mineiro que você já viu!'],
      ok: 'Carioca mais nordestino? Só se for no sotaque… de “oxente”!', bad: 'Perdeu o rumo, Flávio! Nem o GPS te acha.' },
    { lula: 'Flávio, me explica aí: qual é a sua política monetária? Juros, câmbio, inflação…',
      o: ['Simples, Lula: vai ser o tesouraço! Corte de gastos em tudo!', 'Minha política monetária é o Pix, Lula.', 'Eu imprimo dinheiro na impressora lá de casa.', 'Vou deixar o Google calcular os juros.'],
      ok: 'Tesouraço? Vai pegar a motosserra emprestada do Milei pra isso, Flávio?', bad: 'Nem tesouraço você tem! Só falta pedir a motosserra do Milei emprestada!' },
    { lula: 'Flávio, você não votou contra ampliar a licença-maternidade quando era deputado?',
      o: ['Eu estava errado… eu era mais jovem.', 'Foi o Google que votou por mim.', 'Eu só estava de passagem naquele dia.', 'Isso foi coisa do Xandão.'],
      ok: 'Olha só, reconheceu! Aplausos pro rapaz!', bad: 'Culpar os outros, Flávio? Assume, rapaz!' },
  ],
  zaninBanner: 'PRORROGADO!',
  zaninSub: '+30 segundos',
  fraudBanner: 'FRAUDE ELEITORAL!',
  fraudTitle: 'Fim de jogo!',
  fraudText: n => `${n} fraudou o segundo turno e por isso foi preso pelo Xandão.`,
  heroName: 'Flávio',
  checkpointLabel: '⚠ POSTO DA PF',
  loseTitle: 'Capturado!',
  loseText: n => `${n} foi capturado antes de chegar ao avião.`,
  winTitle: 'Decolou!',
  winText: (n, t) => `${n} embarcou em ${t.toFixed(1)}s. O Trump estava esperando na pista.`,
  trumpBubble: 'Welcome aboard!',
  trumpBye: 'Bye bye!',
  timeoutTitle: 'Tempo esgotado!',
  timeoutText: n => `O avião decolou sem o ${n}. Ele foi preso pelo Xandão.`,
  cuffedStamp: 'PRESO!',
  eggLine: 'Acho melhor você dar o fora daqui tá okey?',
  difficulties: [
    { id: 'facil',   name: 'Fácil',   time: 40, lives: 5, speed: 0.85, density: 0.65, length: 5200,
      fight: { lulaHp: 80,  lulaDmg: 5, speed: 85,  cd: 1.6,  wind: .50, armor: .25, retreat: .4,  combo: .05, block: .06 } },   // luta (Band): vida do Lula, dano, velocidade, pausa entre golpes…
    { id: 'normal',  name: 'Normal',  time: 40, lives: 5, speed: 1.00, density: 1.00, length: 6400,
      fight: { lulaHp: 140, lulaDmg: 8, speed: 110, cd: .85,  wind: .38, armor: .65, retreat: .25, combo: .3,  block: .25 } },
    { id: 'dificil', name: 'Difícil', time: 35, lives: 3, speed: 1.25, density: 1.35, length: 7600,
      fight: { lulaHp: 210, lulaDmg: 11, speed: 140, cd: .55, wind: .28, armor: .9, retreat: .1,  combo: .5,  block: .4 } },
  ],
};

/* ---------- constantes de mundo ---------- */
const W = 960, H = 540;
const ROAD_TOP = 120, ROAD_BOT = 460, MID = (ROAD_TOP + ROAD_BOT) / 2;
const PLAYER_R = 11, PLAYER_SPEED = 200;
const FALL_TIME = 1.0, FALL_ANIM = .22;       // ao perder uma vida o Flávio cai e fica parado 1s
const FINISH_PAD = 140;           // distância do avião até o fim do mundo
const TIME_LIMIT = CONFIG.timeLimit;
// linha do tempo (s) da cena de tempo esgotado
const CUT = { panOut0: .8, panOut1: 1.8, walk0: 1.8, walk1: 2.8, fly0: 2.8, panBack0: 4.8, panBack1: 5.8, enter0: 5.8, enter1: 7.0, zoom0: 7.0, zoom1: 8.0, end: 9.9 };
const ZOOM_ARREST = 3;
// easter egg: grade disfarçada sob o 5º pilar da ponte (pilares ficam em x = 200 + 520·k)
const EGG_X = 200 + 520 * 4, EGG_W = 46, EGG_CX = EGG_X + EGG_W / 2, EGG_BONUS = 5;
// Só essa coluna sobe até o alto da tela sobre a água e dá para caminhar nela; a grade (invisível) fica no topo.
const EGG_MIN_Y = 28, EGG_TRIGGER_Y = EGG_MIN_Y + 10;
const EGG = { sink: .7, scene0: 1.0, hug0: 2.2, hug1: 2.9, speak0: 3.1, fadeOut: 7.0, back: 7.5, end: 8.3 };             // zoom final na prisão (os dois ficam no centro da tela)
// Perseguição (px/s, multiplicados pela velocidade da dificuldade). PRF sempre mais rápida que manifestantes.
const COP_CHASE = 120, COP_SIGHT = 230;
const PERSON_CHASE = 90, PERSON_SIGHT = 150, PERSON_ALERT_TIME = 1.0;   // segundos à vista até te identificar

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const canvas = $('#c'), ctx = canvas.getContext('2d');
const stage = $('#stage');
function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const store = {
  get(k, d) { try { const v = localStorage.getItem('fdp.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('fdp.' + k, JSON.stringify(v)); } catch {} },
};

/* ---------- som ---------- */
let audio = null, muted = store.get('muted', false);
function beep(freq, dur, type = 'square', vol = 0.07, slideTo = 0, delay = 0) {
  if (muted) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const t0 = audio.currentTime + delay, o = audio.createOscillator(), g = audio.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(audio.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch {}
}
const sfx = {
  hit()  { beep(220, .25, 'sawtooth', .1, 60); },
  lose() { [300, 240, 180, 110].forEach((f, i) => beep(f, .25, 'square', .09, 0, i * .22)); },
  win()  { [523, 659, 784, 1047].forEach((f, i) => beep(f, .2, 'triangle', .12, 0, i * .13)); },
  start(){ beep(440, .12, 'square', .06); beep(660, .15, 'square', .06, 0, .1); },
  tick() { beep(880, .08, 'square', .05); },
  gavel(){ beep(130, .12, 'square', .22, 55); beep(1500, .035, 'square', .1); },
  alarm(){ beep(420, .35, 'square', .1, 200); beep(420, .35, 'square', .1, 200, .4); },
  plane(){ beep(90, 2.2, 'sawtooth', .07, 520); beep(140, 2.2, 'triangle', .06, 700); },
  cuff() { beep(1400, .05, 'square', .08); beep(900, .09, 'square', .08, 0, .09); },
  clang(){ beep(170, .22, 'square', .1, 80); beep(1100, .06, 'square', .05, 0, .02); },
  hug()  { beep(330, .12, 'triangle', .09); beep(440, .16, 'triangle', .09, 0, .1); },
  swing(){ beep(700, .09, 'sawtooth', .04, 280); },
  bell() { beep(1250, .55, 'sine', .12); beep(1250, .55, 'sine', .08, 0, .18); },
  wrong(){ beep(160, .3, 'sawtooth', .1, 90); },
  bonus(){ [660, 880, 1100, 1320].forEach((f, i) => beep(f, .12, 'triangle', .1, 0, i * .07)); },
};

/* ---------- estado ---------- */
const sel = { diff: store.get('diff', 'normal') };          // controle é sempre livre
let state = 'intro';              // intro | menu | play | paused | end …
let G = null;                     // estado da partida
let band = null, quiz = null;     // debates: Fase 1 (luta na Band) e Fase 2 (quiz na Globo)
let scale = 1;

/* ---------- menu ---------- */
function buildChoices(el, items, key, render) {
  el.innerHTML = '';
  items.forEach(it => {
    const b = document.createElement('button');
    b.className = 'choice' + (sel[key] === it.id ? ' sel' : '');
    b.innerHTML = render(it);
    b.onclick = () => { sel[key] = it.id; store.set(key, it.id); [...el.children].forEach(c => c.classList.remove('sel')); b.classList.add('sel'); updateBest(); };
    el.appendChild(b);
  });
}
function updateBest() {
  const b = store.get('best.' + sel.diff, null);
  $('#best').textContent = b ? `Seu melhor tempo (${CONFIG.difficulties.find(d => d.id === sel.diff).name}): ${b.toFixed(1)}s` : '';
}
function initMenu() {
  document.title = CONFIG.title;
  $('#title').textContent = CONFIG.title;
  buildChoices($('#difficulties'), CONFIG.difficulties, 'diff', d => d.name);
  updateBest();
  $('#muteBtn').textContent = muted ? '🔇' : '🔊';
  $('#menu').classList.add('hidden');                         // o menu só aparece no fim da abertura
}

/* ---------- geração da fase ---------- */
function newGame() {
  const diff = CONFIG.difficulties.find(d => d.id === sel.diff) || CONFIG.difficulties[1];
  const rnd = mulberry32((Math.random() * 1e9) | 0);
  const L = diff.length, spd = diff.speed;
  const cpX = Math.round(L * 0.72);
  const obs = [], gates = [];
  const R = (a, b) => a + rnd() * (b - a);
  const rY = (m = 30) => R(ROAD_TOP + m, ROAD_BOT - m);

  // posto de checagem: duas barreiras com abertura que sobe e desce
  [0, 1].forEach(i => gates.push({ x: cpX + i * 150, w: 22, gap: 120 - diff.speed * 8, phase: i * 2.1, freq: 1.3 * spd }));

  let x = 650;
  while (x < L - FINISH_PAD - 300) {
    if (Math.abs(x - cpX - 75) < 380) { x += 60; continue; }
    if (Math.abs(x - EGG_CX) < 330) { x += 60; continue; }      // área livre em volta da grade
    const r = rnd();
    if (r < 0.32) {            // viatura patrulhando a ponte no sentido horizontal
      const dir = rnd() < .5 ? -1 : 1;
      obs.push({ t: 'car', x, y: rY(40), vx: dir * R(95, 165) * spd, range: R(110, 190), w: 78, h: 34, ph: rnd() * 6 });
    } else if (r < 0.66) {     // grupo de manifestantes: demoram a te notar e perseguem devagar
      const n = 3 + ((rnd() * 3) | 0), cy = rY(60);
      for (let i = 0; i < n; i++)
        obs.push({ t: 'person', x: x + R(-26, 26), y: cy + R(-50, 50), r: 11, ax: R(8, 22), ay: R(10, 28), f: R(1, 2.2) * spd,
                   ph: rnd() * 6, v: (rnd() * 4) | 0, cs: R(0.85, 1) * PERSON_CHASE * spd, alert: 0, active: false });
    } else {                   // PRF: te nota na hora e persegue rápido
      obs.push({ t: 'cop', x, y: rY(40), r: 13, active: false });
    }
    x += R(190, 330) / diff.density;
  }
  obs.forEach(o => { o.bx = o.x; o.by = o.y; });

  return {
    diff, L, cpX, obs, gates,
    p: { x: 60, y: MID, vx: 0, vy: 0, face: 1, step: 0 },
    lives: diff.lives, inv: 0, shake: 0, time: 0, t: 0, over: null, flash: 0,
    auto: false, cam: 0, tick: null, cs: null, bonus: 0, eggUsed: false, egg: null, bonusAt: -99, downAt: -99,
  };
}

/* ---------- entrada ---------- */
const keys = new Set();
const touch = { on: false, id: null, ox: 0, oy: 0, x: 0, y: 0 };
addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
  if (state === 'intro') { if (k === 'm') toggleMute(); else if (!e.repeat) skipIntro(); return; }
  if (state === 'band') {
    if (k === 'm') toggleMute();
    else if (!e.repeat && band && PUNCH_KEYS.includes(k)) band.punchBuf = .22;
    else if (!e.repeat && band && JUMP_KEYS.includes(k)) band.jumpBuf = .18;
    keys.add(k); return;
  }
  if (state === 'quiz') { if (k === 'm') toggleMute(); else quizKey(k); return; }
  if (state === 'duelEnd') { if (k === 'enter' || k === ' ') duelPrimary(); return; }
  if (state === 'urna') { if (k === 'm') toggleMute(); else urnaKey(k); return; }
  if (state === 'urnaEnd') { if (k === 'enter' || k === ' ') urnaPrimary(); return; }
  if (state === 'fraud') { if (!e.repeat && k !== 'm') skipFraud(); if (k === 'm') toggleMute(); return; }
  if (state === 'zanin') { if (!e.repeat && k !== 'm') skipZanin(); if (k === 'm') toggleMute(); return; }
  if (k === 'm') toggleMute();
  else if ((state === 'cut' || state === 'egg') && !e.repeat) skipScene();
  if (k === 'p' || k === 'escape') togglePause();
  if ((k === 'enter' || k === ' ') && state === 'menu') startGame();
  if ((k === 'enter' || k === ' ') && (state === 'end' || state === 'fraudEnd')) retryFn();
  keys.add(k);
});
const PUNCH_KEYS = ['z', 'j', 'x', 'k', 'enter'], JUMP_KEYS = [' ', 'w', 'arrowup'];
addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
addEventListener('blur', () => { keys.clear(); if (state === 'play') togglePause(true); });

function toLogical(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
const bandPtr = new Map();         // pointerId -> 'left' | 'right' (botões de toque da luta)
const touchUI = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
const BTN = { left: { x: 70, y: 468, r: 46 }, right: { x: 176, y: 468, r: 46 }, punch: { x: 884, y: 462, r: 56 }, jump: { x: 774, y: 478, r: 42 } };
canvas.addEventListener('pointerdown', e => {
  if (state === 'intro') { skipIntro(); return; }
  if (state === 'band' && band && !band.over) {
    const p = toLogical(e), hit = n => Math.hypot(p.x - BTN[n].x, p.y - BTN[n].y) < BTN[n].r + 14;
    if (hit('left')) { bandPtr.set(e.pointerId, 'left'); canvas.setPointerCapture(e.pointerId); }
    else if (hit('right')) { bandPtr.set(e.pointerId, 'right'); canvas.setPointerCapture(e.pointerId); }
    else if (hit('jump')) band.jumpBuf = .18;
    else band.punchBuf = .22;                                        // toque / clique em qualquer outro lugar = soco
    return;
  }
  if (state === 'cut' || state === 'egg') { skipScene(); return; }
  if (state === 'fraud') { skipFraud(); return; }
  if (state === 'zanin') { skipZanin(); return; }
  if (state !== 'play') return;
  const p = toLogical(e); canvas.setPointerCapture(e.pointerId);
  Object.assign(touch, { on: true, id: e.pointerId, ox: p.x, oy: p.y, x: p.x, y: p.y });
});
canvas.addEventListener('pointermove', e => { if (touch.on && e.pointerId === touch.id) { const p = toLogical(e); touch.x = p.x; touch.y = p.y; } });
const endTouch = e => { bandPtr.delete(e.pointerId); if (touch.id === e.pointerId) touch.on = false; };
canvas.addEventListener('pointerup', endTouch);
canvas.addEventListener('pointercancel', endTouch);

function inputVec() {
  let x = 0, y = 0;
  if (keys.has('arrowleft') || keys.has('a')) x -= 1;
  if (keys.has('arrowright') || keys.has('d')) x += 1;
  if (keys.has('arrowup') || keys.has('w')) y -= 1;
  if (keys.has('arrowdown') || keys.has('s')) y += 1;
  if (touch.on) {
    const dx = touch.x - touch.ox, dy = touch.y - touch.oy, m = Math.hypot(dx, dy), dead = 6, full = 55;
    if (m > dead) { const k = Math.min(1, (m - dead) / (full - dead)); x = dx / m * k; y = dy / m * k; }
  }
  const m = Math.hypot(x, y);
  return m > 1 ? { x: x / m, y: y / m } : { x, y };
}

/* ---------- fluxo ---------- */
let curPhase = 'band';                                      // fase atual: band | globo | urna1 | urna2 | bridge
function startGame() { startBand(); }                      // o jogo começa pelo debate da Band
function retryFn() {                                        // "Tentar de novo" recomeça a MESMA fase (depois de vencer o jogo, recomeça do início)
  if (G && G.over === 'win') return startBand();
  ({ band: startBand, globo: startQuiz, urna1: () => startUrna(1), urna2: () => startUrna(2), bridge: startBridge }[curPhase] || startBand)();
}
function startBridge() {
  G = newGame(); state = 'play'; band = quiz = null; curPhase = 'bridge';
  $('#urna').classList.add('hidden'); $('#quiz').classList.add('hidden'); $('#dResult').classList.add('hidden');
  $('#menu').classList.add('hidden'); $('#end').classList.add('hidden'); $('#end').classList.remove('scene'); $('#pause').classList.add('hidden');
  sfx.start();
}
function endGame(won, reason) {
  const timeout = reason === 'timeout';
  state = 'end'; G.over = won ? 'win' : 'lose';
  if (won) {
    store.set('done', true);                                   // jogo concluído: libera a escolha de fase no menu
    sfx.win();
    const key = 'best.' + sel.diff, best = store.get(key, null);
    if (!best || G.time < best) store.set(key, G.time);
  } else sfx.lose();
  setTimeout(() => {
    if (state !== 'end') return;
    $('#endTitle').textContent = won ? CONFIG.winTitle : timeout ? CONFIG.timeoutTitle : CONFIG.loseTitle;
    $('#endText').textContent = won ? CONFIG.winText(CONFIG.heroName, G.time) : timeout ? CONFIG.timeoutText(CONFIG.heroName) : CONFIG.loseText(CONFIG.heroName);
    $('#end').classList.toggle('scene', timeout);     // deixa a cena da prisão visível atrás do texto
    $('#end').classList.remove('hidden'); updateBest();
  }, won ? 900 : timeout ? 400 : 700);
}

/* ---------- cena: tempo esgotado ----------
   Trump embarca, o avião decola, a câmera volta e o Alexandre de Moraes prende o jogador. */
function startCutscene() {
  const g = G;
  state = 'cut'; g.over = 'timeout'; g.inv = 0; g.p.vx = g.p.vy = 0; touch.on = false;
  g.cs = { t: 0, cam0: g.cam, flown: false, cuffed: false, ended: false };
  sfx.alarm();
}
function updateCut(dt) {
  const g = G, cs = g.cs;
  g.t += dt; g.flash = Math.max(0, g.flash - dt); g.shake = Math.max(0, g.shake - dt);
  cs.t = Math.min(CUT.end, cs.t + dt);
  if (!cs.flown && cs.t >= CUT.fly0) { cs.flown = true; sfx.plane(); }
  if (!cs.cuffed && cs.t >= CUT.enter1) { cs.cuffed = true; sfx.cuff(); }
  if (!cs.ended && cs.t >= CUT.end) { cs.ended = true; endGame(false, 'timeout'); }
}
function skipScene() { if (state === 'cut') skipCut(); else skipEgg(); }
function skipCut() {
  const cs = G && G.cs;
  if (state !== 'cut' || !cs || cs.t < 1 || cs.t >= CUT.enter1) return;
  cs.t = CUT.enter1; cs.flown = true;
}
/* ---------- easter egg: grade sob o 5º pilar ----------
   Pausa o cronômetro, mostra o Jair (macacão de preso) abraçando o jogador, e devolve +5s. */
const limitOf = g => (g.diff.time || TIME_LIMIT) + g.bonus;       // tempo da ponte depende da dificuldade (difícil = 35s)
function startEgg() {
  const g = G;
  state = 'egg'; g.eggUsed = true; g.inv = 0; touch.on = false;
  g.p.vx = g.p.vy = 0;
  g.egg = { t: 0, x0: g.p.x, y0: g.p.y, hugSfx: false, back: false };
  sfx.clang();
}
function updateEgg(dt) {
  const g = G, e = g.egg, p = g.p;
  g.t += dt; e.t += dt;
  if (e.t < EGG.sink) { const k = ease(e.t / EGG.sink); p.x = e.x0 + (EGG_CX - e.x0) * k; p.y = e.y0 + (EGG_MIN_Y + 4 - e.y0) * k; }
  if (!e.hugSfx && e.t >= EGG.hug0) { e.hugSfx = true; sfx.hug(); }
  if (!e.back && e.t >= EGG.back) {                          // sai da grade: +5s e um instante de invulnerabilidade
    e.back = true; g.bonus += EGG_BONUS; g.bonusAt = g.t; g.inv = 1.6;
    p.x = EGG_CX; p.y = ROAD_TOP + 58; p.vx = p.vy = 0; p.face = 1;
    sfx.bonus();
  }
  if (e.t >= EGG.end) { state = 'play'; g.egg = null; }
}
function skipEgg() {
  const e = G && G.egg;
  if (state !== 'egg' || !e || e.t < 2 || e.t >= EGG.fadeOut) return;
  e.t = EGG.fadeOut; e.hugSfx = true;
}
const camFor = x => clamp(x - 300, 0, G.L - W + 260);
const ease = x => x * x * (3 - 2 * x);
// zoom da prisão: aproxima até o ponto médio entre o Flávio e o Moraes ficar no centro da tela
function cutZoom(g) {
  const k = ease(clamp((g.cs.t - CUT.zoom0) / (CUT.zoom1 - CUT.zoom0), 0, 1));
  if (k <= 0) return null;
  const tx = g.p.x + 17 - camFor(g.p.x), ty = g.p.y - 4;        // centro do casal, em coordenadas de tela
  return { z: 1 + (ZOOM_ARREST - 1) * k, sx: W / 2 + (tx - W / 2) * k, sy: H / 2 + (ty - H / 2) * k };
}
function cutCam(g) {
  const cs = g.cs, t = cs.t, air = g.L - W + 260, camP = camFor(g.p.x);
  const e = x => x * x * (3 - 2 * x), lerp = (a, b, k) => a + (b - a) * k;
  if (t < CUT.panOut0) return cs.cam0;
  if (t < CUT.panOut1) return lerp(cs.cam0, air, e((t - CUT.panOut0) / (CUT.panOut1 - CUT.panOut0)));
  if (t < CUT.panBack0) return air;
  if (t < CUT.panBack1) return lerp(air, camP, e((t - CUT.panBack0) / (CUT.panBack1 - CUT.panBack0)));
  return camP;
}
function togglePause(force) {
  if (state === 'play') { state = 'paused'; $('#pause').classList.remove('hidden'); }
  else if (state === 'paused' && force !== true) { state = 'play'; $('#pause').classList.add('hidden'); }
}
function toggleMute() { muted = !muted; store.set('muted', muted); $('#muteBtn').textContent = muted ? '🔇' : '🔊'; }

$('#start').onclick = startGame;
$('#retry').onclick = () => retryFn();
$('#change').onclick = () => { $('#end').classList.add('hidden'); G = null; band = quiz = null; showMenu(); };
$('#pause').onclick = () => togglePause();
$('#muteBtn').onclick = e => { e.stopPropagation(); toggleMute(); };

/* =========================================================
   DEBATES — Fase 1 (luta corporal na Band) e Fase 2 (quiz na Globo)
   ========================================================= */
const FIGHT = { jumpV: 800, grav: 2400, passH: 70, dodgeH: 45, floorY: 470, s: 3.0, minX: 70, maxX: 890, gap: 60, reach: 88, pSpeed: 175, pDmg: 5, punchT: .34, hitAt: .1, intro: 2.1 };
const QUIZ = { s: 2.4, oy: 262, fx: 250, lx: 710, intro: 1.9 };
const fightOy = () => FIGHT.floorY - 12 * FIGHT.s;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const dWinner = { next: false, kind: 'band' };

function resetScreens() {
  ['#menu', '#end', '#pause', '#urna', '#quiz', '#dResult'].forEach(q => $(q).classList.add('hidden'));
  $('#end').classList.remove('scene');
}
function showDuelResult(kind, win, title, text, nextLabel) {
  state = 'duelEnd'; dWinner.next = win; dWinner.kind = kind;
  $('#quiz').classList.add('hidden');
  $('#dTitle').textContent = title; $('#dText').textContent = text; $('#dNext').textContent = nextLabel;
  $('#dNext').classList.toggle('hidden', !win); $('#dRetry').classList.toggle('hidden', win);
  $('#dResult').classList.remove('hidden');
  if (win) sfx.win(); else sfx.lose();
}
function duelPrimary() {
  if (dWinner.next) { if (dWinner.kind === 'band') startQuiz(); else startUrna(1); }
  else retryFn();
}

/* ---------- Fase 1: luta na Band ---------- */
function startBand() {
  const diff = CONFIG.difficulties.find(d => d.id === sel.diff) || CONFIG.difficulties[1], fc = diff.fight;
  G = null; urna = null; frd = null; zn = null; quiz = null; state = 'band'; curPhase = 'band'; resetScreens();
  const mk = (x, face, hp) => ({ x, face, hp, max: hp, sh: hp, pt: -1, hit: false, stun: 0, kb: 0, step: 0, down: 0, jy: 0, jv: 0 });
  band = { diff, fc, t: 0, clock: CONFIG.duel.bandTime, over: null, overT: 0, shake: 0, flash: 0, slow: 1, tick: null, punchBuf: 0, jumpBuf: 0, bell: false,
           pops: [], sparks: [], f: mk(340, 1, 100), l: Object.assign(mk(620, -1, fc.lulaHp), { st: 'idle', stT: 0, cd: 1.2, combo: 0 }) };
  sfx.start();
}
function bandPop(b, x, y, text, color, size = 40) { b.pops.push({ x, y, text, color, size, t: 0, life: .7, rot: (Math.random() - .5) * .5 }); }
function bandSparks(b, x, y) { for (let i = 0; i < 9; i++) { const a = Math.random() * 6.28, v = 90 + Math.random() * 160; b.sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, t: 0, life: .45, r: 3 + Math.random() * 4 }); } }
function endBand(kind) {
  const b = band; if (b.over) return;
  b.over = kind; b.overT = 0; sfx.bell();
  if (kind === 'win') b.slow = .35;
}
function hitLula(b) {
  const l = b.l, fc = b.fc, oy = fightOy();
  if ((l.st === 'idle' || l.st === 'back') && l.stun <= 0 && Math.random() < fc.block) {      // Lula levanta a guarda: quase não sente o soco
    l.hp = Math.max(0, l.hp - FIGHT.pDmg * .2); l.kb = 150 * b.f.face; sfx.clang(); b.shake = .05;
    bandPop(b, l.x, oy - 62, 'BLOQUEOU!', '#9fd0ff', 26); l.blockT = .25;
    if (l.hp <= 0) endBand('win'); return;
  }
  const armor = l.st === 'wind' && Math.random() < fc.armor;
  l.hp = Math.max(0, l.hp - FIGHT.pDmg); sfx.hit(); b.shake = .12;
  bandPop(b, l.x, oy - 62, ['POW!', 'PAF!', 'BAM!', 'TOMA!'][(Math.random() * 4) | 0], '#ffe14a'); bandSparks(b, l.x + l.face * 14, oy - 40);
  if (!armor) {
    l.stun = .1; l.kb = 330 * b.f.face; l.st = 'idle'; l.pt = -1; l.cd = Math.max(l.cd, .35);
    if (Math.random() < fc.retreat) { l.st = 'back'; l.stT = .45 + Math.random() * .3; }
  }
  if (l.hp <= 0) endBand('win');
}
function hitFlavio(b) {
  const f = b.f, oy = fightOy();
  f.hp = Math.max(0, f.hp - b.fc.lulaDmg); f.stun = .26; f.kb = -260 * f.face; f.pt = -1; sfx.hit(); b.shake = .22; b.flash = .2;
  bandPop(b, f.x, oy - 62 - f.jy, 'AI!', '#ff6b6b', 36); bandSparks(b, f.x + f.face * 14, oy - 40 - f.jy);
  if (f.hp <= 0) endBand('lose');
}
function updateBand(dt) {
  const b = band, f = b.f, l = b.l, fc = b.fc, raw = dt; dt *= b.slow;
  b.t += dt; b.shake = Math.max(0, b.shake - raw); b.flash = Math.max(0, b.flash - raw);
  b.pops.forEach(p => p.t += dt); b.pops = b.pops.filter(p => p.t < p.life);
  b.sparks.forEach(p => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt; }); b.sparks = b.sparks.filter(p => p.t < p.life);
  const k = Math.min(1, dt * 4); f.sh += (f.hp - f.sh) * k; l.sh += (l.hp - l.sh) * k;
  f.stun = Math.max(0, f.stun - dt); l.stun = Math.max(0, l.stun - dt); l.blockT = Math.max(0, (l.blockT || 0) - dt);
  if (b.over) {                                                      // nocaute / fim de tempo
    b.overT += raw;
    const loser = b.over === 'win' ? l : b.over === 'lose' ? f : null;
    if (loser) loser.down = Math.min(1, loser.down + dt * 2.2);
    if (b.over === 'win' && b.overT > .9) b.slow = 1;
    f.x += f.kb * dt; l.x += l.kb * dt; f.kb *= Math.exp(-8 * dt); l.kb *= Math.exp(-8 * dt);
    if (state === 'band' && b.overT > 2.3) {
      const n = CONFIG.heroName;
      if (b.over === 'win') showDuelResult('band', true, 'Nocaute no debate!', `${n} derrubou o Lula na Band em ${(CONFIG.duel.bandTime - b.clock).toFixed(1)}s.`, 'Continuar');
      else if (b.over === 'lose') showDuelResult('band', false, `${n} foi nocauteado!`, 'O Lula levou a melhor no debate da Band.', 'Tentar de novo');
      else showDuelResult('band', false, 'Tempo esgotado!', `O mediador encerrou o debate e o Lula continua de pé (${Math.round(100 * l.hp / l.max)}% de vida).`, 'Tentar de novo');
    }
    return;
  }
  if (b.t < FIGHT.intro) return;                                     // abertura da fase
  b.clock -= dt;
  const sec = Math.ceil(b.clock); if (sec <= 5 && sec > 0 && sec !== b.tick) { b.tick = sec; sfx.tick(); }
  if (b.clock <= 0) { b.clock = 0; endBand('time'); return; }

  // ---- Flávio (jogador)
  const bt = [...bandPtr.values()];
  const dir = ((keys.has('arrowright') || keys.has('d') || bt.includes('right')) ? 1 : 0) - ((keys.has('arrowleft') || keys.has('a') || bt.includes('left')) ? 1 : 0);
  const sgn = l.x >= f.x ? 1 : -1;                                   // os dois sempre se encaram (inclusive depois de um pulo por cima)
  if (f.pt < 0) f.face = sgn;
  if (l.pt < 0 && l.st !== 'wind' && l.st !== 'punch') l.face = -sgn;
  b.jumpBuf = Math.max(0, b.jumpBuf - dt);
  if (b.jumpBuf > 0 && f.jy <= 0 && f.stun <= 0) { f.jv = FIGHT.jumpV; f.jy = .01; b.jumpBuf = 0; beep(380, .16, 'triangle', .07, 760); }
  if (f.jy > 0) { f.jv -= FIGHT.grav * dt; f.jy += f.jv * dt; if (f.jy <= 0) { f.jy = 0; f.jv = 0; } }
  const vx = f.stun > 0 ? 0 : dir * FIGHT.pSpeed * (f.pt >= 0 ? .35 : 1);
  f.x += vx * dt + f.kb * dt; f.kb *= Math.exp(-8 * dt); f.step += Math.abs(vx) * dt * .09; f.walk = Math.abs(vx) > 5 || f.jy > 0;
  b.punchBuf = Math.max(0, b.punchBuf - dt);
  if (b.punchBuf > 0 && f.pt < 0 && f.stun <= 0) { f.pt = 0; f.hit = false; b.punchBuf = 0; sfx.swing(); }
  if (f.pt >= 0) {
    f.pt += dt;
    if (!f.hit && f.pt >= FIGHT.hitAt) { f.hit = true; const d = (l.x - f.x) * f.face; if (d > 0 && d < FIGHT.reach) hitLula(b); }
    if (f.pt >= FIGHT.punchT) f.pt = -1;
  }
  if (b.over) return;

  // ---- Lula (IA)
  if (l.stun <= 0) {
    l.cd -= dt;
    const d = Math.abs(l.x - f.x); l.walk = false;
    if (l.st === 'idle') {
      if (d > FIGHT.reach - 16) { l.x += l.face * fc.speed * dt; l.walk = true; }
      else if (l.cd <= 0) { l.st = 'wind'; l.stT = fc.wind; l.combo = Math.random() < fc.combo ? 2 : 1; }
    } else if (l.st === 'wind') {
      l.stT -= dt; if (l.stT <= 0) { l.st = 'punch'; l.pt = 0; l.hit = false; sfx.swing(); }
    } else if (l.st === 'punch') {
      l.pt += dt;
      if (!l.hit && l.pt >= FIGHT.hitAt) { l.hit = true; if (Math.abs(l.x - f.x) < FIGHT.reach + 4 && f.jy < FIGHT.dodgeH) hitFlavio(b); }
      if (l.pt >= FIGHT.punchT) {
        l.pt = -1; l.combo--;
        if (l.combo > 0) { l.st = 'wind'; l.stT = fc.wind * .55; }
        else { l.st = 'idle'; l.cd = fc.cd * (.8 + Math.random() * .4); if (Math.random() < fc.retreat) { l.st = 'back'; l.stT = .5 + Math.random() * .4; } }
      }
    } else if (l.st === 'back') {
      l.stT -= dt; l.x -= l.face * fc.speed * .9 * dt; l.walk = true; if (l.stT <= 0) l.st = 'idle';
    }
  }
  l.x += l.kb * dt; l.kb *= Math.exp(-8 * dt); l.step += (l.walk ? 1 : 0) * dt * 7;
  // ---- limites e distância mínima
  f.x = clamp(f.x, FIGHT.minX, FIGHT.maxX); l.x = clamp(l.x, FIGHT.minX, FIGHT.maxX);
  if (f.jy < FIGHT.passH) {
    const sg = l.x >= f.x ? 1 : -1, ov = FIGHT.gap - Math.abs(l.x - f.x);
    if (ov > 0) {
      f.x -= sg * ov / 2; l.x += sg * ov / 2; f.x = clamp(f.x, FIGHT.minX, FIGHT.maxX); l.x = clamp(l.x, FIGHT.minX, FIGHT.maxX);
      if (Math.abs(l.x - f.x) < FIGHT.gap) { if (l.x <= FIGHT.minX || l.x >= FIGHT.maxX) f.x = clamp(l.x - sg * FIGHT.gap, FIGHT.minX, FIGHT.maxX); else l.x = clamp(f.x + sg * FIGHT.gap, FIGHT.minX, FIGHT.maxX); }
    }
  }
}

function drawFighter(o, who, t, oy, s) {
  const k = o.pt >= 0 ? Math.min(1, o.pt / FIGHT.punchT) : -1, wind = who === 'L' && o.st === 'wind';
  const e = k >= 0 ? Math.sin(k * Math.PI) : 0, sleeve = who === 'F' ? '#2b303c' : '#1f2a46', glove = who === 'F' ? '#2f9e44' : '#d62f2f', sh = who === 'F' ? 9.5 : 10, wd = who === 'F' ? 4.6 : 5;
  const guard = who === 'L' && o.blockT > 0, moving = !!o.walk && o.down <= 0, idle = !moving && k < 0 && !wind;
  ctx.save(); ctx.translate(o.x, oy - (o.jy || 0) + (o.down > 0 ? 0 : idle ? Math.sin(t * 5 + (who === 'L' ? 1.5 : 0)) * 1.2 : 0)); ctx.scale(o.face * s, s);
  if (o.down > 0) { ctx.translate(0, 12); ctx.rotate(-o.down * 1.45); ctx.translate(0, -12); }
  else if (o.stun > 0) ctx.rotate(-.22);
  else if (wind) ctx.rotate(-.16);
  else if (k >= 0) ctx.rotate(.12 * e);
  if (who === 'F') Sprites.flavio(ctx, o.step, 1, moving, true); else Sprites.lula(ctx, t, true);
  const bob = Math.sin(t * 8 + (who === 'L' ? 1 : 0)) * (idle ? .7 : 0);
  if (guard) { Sprites.limb(ctx, sh, -8, 9, -19, wd, sleeve); Sprites.ell(ctx, 9, -19, 4.4, 4, glove); Sprites.limb(ctx, -sh, -8, 7, -15, wd, sleeve); Sprites.ell(ctx, 7, -15, 4.2, 3.8, glove); ctx.restore(); return; }
  Sprites.limb(ctx, -sh, -8, wind ? -6 : 3, wind ? -15 : -13 + bob, wd, sleeve); Sprites.ell(ctx, wind ? -6 : 3, wind ? -15 : -13 + bob, 3.5, 3.3, glove);
  const hx = wind ? 1 : 12 + 24 * e, hy = wind ? -5 : -10 - bob;
  Sprites.limb(ctx, sh, -8, hx, hy, wd, sleeve); Sprites.ell(ctx, hx, hy, 3.9, 3.6, glove);
  ctx.restore();
  if (wind) { ctx.save(); ctx.textAlign = 'center'; ctx.font = '900 34px system-ui'; ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.fillStyle = '#ff4040';
    const yy = oy - 44 * s * .78 - Math.abs(Math.sin(t * 20)) * 4; ctx.strokeText('!', o.x, yy); ctx.fillText('!', o.x, yy); ctx.restore(); }
  if (o.down >= 1) {                                                 // estrelinhas de nocaute
    ctx.save(); ctx.fillStyle = '#ffe14a';
    for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1, px = o.x - o.face * 70 + Math.cos(a) * 24, py = oy + 22 + Math.sin(a) * 7; ctx.beginPath(); ctx.arc(px, py, 4, 0, 7); ctx.fill(); }
    ctx.restore();
  }
}
function drawFx2(list, sparks, t) {
  sparks.forEach(p => { ctx.globalAlpha = 1 - p.t / p.life; ctx.fillStyle = '#ffe14a'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 - p.t / p.life * .5), 0, 7); ctx.fill(); });
  ctx.globalAlpha = 1; ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  list.forEach(p => {
    const k = p.t / p.life; ctx.save(); ctx.translate(p.x, p.y - k * 36); ctx.rotate(p.rot); const sc = k < .15 ? .6 + k / .15 * .6 : 1.2 - k * .3; ctx.scale(sc, sc);
    ctx.globalAlpha = Math.min(1, (1 - k) * 2); ctx.font = `900 ${p.size}px system-ui, sans-serif`; ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(0,0,0,.65)'; ctx.strokeText(p.text, 0, 0); ctx.fillStyle = p.color; ctx.fillText(p.text, 0, 0); ctx.restore();
  });
}
function bigText(txt, y, size, color, a = 1) {
  ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.font = `900 ${size}px system-ui, sans-serif`;
  ctx.lineWidth = Math.max(5, size / 7); ctx.strokeStyle = 'rgba(0,0,0,.65)'; ctx.strokeText(txt, W / 2, y); ctx.fillStyle = color; ctx.fillText(txt, W / 2, y); ctx.restore();
}
function drawBand() {
  const b = band, t = b.t, f = b.f, l = b.l, oy = fightOy();
  const shk = b.shake > 0 ? 10 * b.shake / .22 : 0;
  ctx.save(); ctx.translate((Math.random() - .5) * shk, (Math.random() - .5) * shk);
  drawStudio('band', t);
  drawPodium(QUIZ.fx, 'band', 300, 478, 'FLÁVIO'); drawPodium(QUIZ.lx, 'band', 300, 478, 'LULA');
  ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.35)';                     // sombras no chão
  [f, l].forEach(o => { ctx.beginPath(); ctx.globalAlpha = 1 - Math.min(.6, (o.jy || 0) / 200); const sk = 1 - Math.min(.4, (o.jy || 0) / 330); ctx.beginPath(); ctx.ellipse(o.x - (o.down > 0 ? o.face * 40 * o.down : 0), FIGHT.floorY + 2, (36 + 28 * o.down) * sk, 9 * sk, 0, 0, 7); ctx.fill(); });
  ctx.restore();
  drawFighter(l, 'L', t, oy, FIGHT.s); drawFighter(f, 'F', t, oy, FIGHT.s);
  drawFx2(b.pops, b.sparks, t);
  ctx.restore();
  if (b.flash > 0) { ctx.fillStyle = `rgba(255,50,50,${b.flash * 1.2})`; ctx.fillRect(0, 0, W, H); }
  const d = CONFIG.duel;
  drawDuelHud(`${d.bandName} • ${d.bandSub}`, fmtTime(b.clock), f.hp / f.max, f.sh / f.max, l.hp / l.max, l.sh / l.max, b.clock <= 5 && !b.over && b.t > FIGHT.intro);
  if (b.t < FIGHT.intro) {                                           // abertura
    const a = b.t < 1.5 ? 1 : clamp((FIGHT.intro - b.t) / .6, 0, 1);
    bigText(d.bandName, 230, 70, '#ffcf33', Math.min(1, a));
    bigText(d.bandSub, 282, 30, '#fff', Math.min(1, a));
    bigText(`Derrube o Lula em ${d.bandTime}s!`, 322, 22, '#bfe0ff', Math.min(1, a));
  } else if (b.t < FIGHT.intro + .8) bigText('LUTE!', 250, 84, '#ff4040', clamp(1 - (b.t - FIGHT.intro) / .8, 0, 1));
  if (b.over && state === 'band') bigText(b.over === 'win' ? 'NOCAUTE!' : b.over === 'lose' ? 'NOCAUTEADO!' : 'FIM DO TEMPO!', 250, 84, b.over === 'win' ? '#ffcf33' : '#ff4040', clamp(b.overT * 3, 0, 1));
  if (b.t >= FIGHT.intro && b.t < FIGHT.intro + 5 && !b.over) {
    ctx.textAlign = 'center'; ctx.font = 'bold 15px system-ui'; ctx.fillStyle = `rgba(255,255,255,${clamp(FIGHT.intro + 5 - b.t, 0, 1)})`;
    ctx.fillText(touchUI ? 'Toque nos botões para andar e pular • toque em qualquer lugar para dar soco' : '← → / A D andam • ESPAÇO pula • Z (ou clique) dá soco', W / 2, H - 22);
  }
  if (touchUI && state === 'band' && !b.over && b.t > .3) {          // botões de toque
    const bt = [...bandPtr.values()];
    [['left', '◀'], ['right', '▶'], ['jump', '⤒'], ['punch', '👊']].forEach(([n, ic]) => {
      const c = BTN[n], on = bt.includes(n);
      ctx.fillStyle = on ? 'rgba(255,255,255,.4)' : 'rgba(255,255,255,.16)'; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = `${n === 'punch' ? 44 : 32}px system-ui, "Apple Color Emoji", "Noto Color Emoji"`; ctx.textAlign = 'center'; ctx.fillText(ic, c.x, c.y + (n === 'punch' ? 15 : 11));
    });
  }
}

/* ---------- barras de vida (compartilhadas pelos dois debates) ---------- */
function drawBar(x, y, w, h, frac, trail, rtl, label, color) {
  ctx.fillStyle = 'rgba(0,0,0,.6)'; roundRect(x - 4, y - 4, w + 8, h + 8, 9); ctx.fill();
  const seg = (fr, fill) => { const ww = Math.max(0, w * clamp(fr, 0, 1)); if (ww < 1) return; ctx.fillStyle = fill; roundRect(rtl ? x + w - ww : x, y, ww, h, 6); ctx.fill(); };
  seg(trail, 'rgba(255,255,255,.85)');
  seg(frac, color || (frac > .5 ? '#4ade6a' : frac > .25 ? '#ffd23f' : '#ff4d4d'));
  ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(rtl ? x + w - w * clamp(frac, 0, 1) + 4 : x + 4, y + 3, Math.max(0, w * clamp(frac, 0, 1) - 8), 3);
  ctx.save(); ctx.textAlign = rtl ? 'right' : 'left'; ctx.font = '900 15px system-ui'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.7)'; ctx.lineJoin = 'round';
  ctx.strokeText(label, rtl ? x + w : x, y - 9); ctx.fillStyle = '#fff'; ctx.fillText(label, rtl ? x + w : x, y - 9); ctx.restore();
}
function drawDuelHud(title, center, fF, fT, lF, lT, urgent, colors, noBars) {
  ctx.save(); ctx.textAlign = 'center'; ctx.font = '800 12px system-ui'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.lineJoin = 'round';
  ctx.strokeText(title, W / 2, 20); ctx.fillText(title, W / 2, 20);
  ctx.font = '900 32px system-ui'; ctx.lineWidth = 6; ctx.fillStyle = urgent && Math.floor(performance.now() / 250) % 2 ? '#ff6b6b' : '#fff';
  ctx.strokeText(center, W / 2, 62); ctx.fillText(center, W / 2, 62); ctx.restore();
  if (noBars) return;
  drawBar(30, 44, 330, 20, fF, fT, false, 'FLÁVIO', colors && colors.f); drawBar(600, 44, 330, 20, lF, lT, true, 'LULA', colors && colors.l);
}

/* ---------- Fase 2: debate na Globo (cutscene de diálogo) ----------
   O Lula fala (texto digitado) → o jogador escolhe a fala do Flávio → o Lula reage → a barra de quem se saiu melhor enche. */
function startQuiz() {
  G = null; urna = null; frd = null; zn = null; band = null; state = 'quiz'; curPhase = 'globo'; resetScreens();
  const pool = CONFIG.quiz, n = Math.min(CONFIG.duel.questions, pool.length);
  quiz = { t: 0, order: shuffle(pool.map((_, i) => i)).slice(0, n), i: -1, phase: 'intro', ok: 0, pF: 0, pL: 0, sF: 0, sL: 0, hurtF: 0, hurtL: 0, pops: [], sparks: [],
           q: null, opts: [], ci: 0, pick: -1, shown: false, who: 'L', line: '', typed: 0, typing: false, hold: 0, blip: 0 };
  sfx.start();
}
function quizSay(who, text) {
  const z = quiz; z.who = who; z.line = text; z.typed = 0; z.typing = true; z.hold = 0; z.blip = 0;
  const w = $('#qWho'); w.textContent = who === 'L' ? 'LULA' : 'FLÁVIO'; w.className = who;
  $('#qLine').textContent = '';
}
function quizLoad() {
  const z = quiz, q = CONFIG.quiz[z.order[z.i]], idx = shuffle(q.o.map((_, j) => j));
  z.q = q; z.opts = idx.map(j => q.o[j]); z.ci = idx.indexOf(0); z.pick = -1; z.phase = 'lula';
  $('#qNum').textContent = `DIÁLOGO ${z.i + 1} DE ${z.order.length}`;
  $('#qOpts').classList.add('hidden'); $('#qNext').classList.add('hidden'); $('#qSay').classList.remove('hidden'); $('#quiz').classList.add('compact');
  const box = $('#qOpts'); box.innerHTML = '';
  z.opts.forEach((o, i) => {
    const b = document.createElement('button'); b.className = 'qOpt'; b.dataset.q = i;
    b.innerHTML = `<i>${'ABCD'[i]}</i><span></span>`; b.lastChild.textContent = o; box.appendChild(b);
  });
  quizSay('L', q.lula);
}
function quizAdvance() {                                         // Enter / toque: completa o texto, ou segue adiante
  const z = quiz; if (!z || state !== 'quiz' || !z.shown) return;
  if (z.typing) { z.typed = z.line.length; return; }
  if (z.phase === 'flavio') z.hold = 9;
  else if (z.phase === 'wait') quizNext();
}
function quizKey(k) {
  const z = quiz; if (!z || state !== 'quiz' || !z.shown) return;
  if (z.phase === 'choose') {
    const i = /^[1-4]$/.test(k) ? +k - 1 : 'abcd'.indexOf(k);
    if (i >= 0 && i < 4 && k.length === 1) quizPick(i);
  } else if (k === 'enter' || k === ' ') quizAdvance();
}
function quizPick(i) {
  const z = quiz; if (z.phase !== 'choose') return;
  z.phase = 'flavio'; z.pick = i; beep(660, .06, 'triangle', .06);
  $('#qOpts').classList.add('hidden'); $('#quiz').classList.add('compact');
  quizSay('F', z.opts[i]);
}
function quizReact() {                                           // o Lula responde; nesse instante os pontos são entregues
  const z = quiz, ok = z.pick === z.ci;
  z.phase = 'react';
  if (ok) {
    z.ok++; z.hurtL = .7; sfx.hit(); sfx.bonus();
    bandSparks(z, QUIZ.lx - 10, 200);
    z.pops.push({ x: QUIZ.fx, y: 150, text: 'ACERTOU!', color: '#ffe14a', size: 40, t: 0, life: 1.1, rot: -.08 });
  } else {
    z.hurtF = .7; sfx.wrong();
    bandSparks(z, QUIZ.fx + 10, 200);
    z.pops.push({ x: QUIZ.fx, y: 150, text: 'ERROU!', color: '#ff6b6b', size: 40, t: 0, life: 1.1, rot: .08 });
  }
  quizSay('L', ok ? z.q.ok : z.q.bad);
}
function quizNext() {
  const z = quiz; if (z.phase !== 'wait') return;
  if (z.i + 1 >= z.order.length) { quizFinish(); return; }
  z.i++; quizLoad();
}
function quizFinish() {
  const z = quiz, n = z.order.length, win = z.ok > n / 2, hero = CONFIG.heroName;       // vence quem acerta a maioria
  z.phase = 'done';
  if (win) showDuelResult('globo', true, `${hero} venceu o debate!`, `${z.ok} respostas certeiras em ${n}: o Flávio acertou a maioria e venceu o debate.`, 'Continuar');
  else showDuelResult('globo', false, 'Lula venceu o debate!', `${hero} acertou só ${z.ok} de ${n} respostas e o Lula levou a melhor.`, 'Tentar de novo');
}
function updateQuiz(dt) {
  const z = quiz; z.t += dt;
  z.hurtF = Math.max(0, z.hurtF - dt); z.hurtL = Math.max(0, z.hurtL - dt);
  z.pops.forEach(p => p.t += dt); z.pops = z.pops.filter(p => p.t < p.life);
  z.sparks.forEach(p => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt; }); z.sparks = z.sparks.filter(p => p.t < p.life);
  const k = Math.min(1, dt * 3); z.sF += (z.pF - z.sF) * k; z.sL += (z.pL - z.sL) * k;
  if (!z.shown && z.t >= QUIZ.intro && state === 'quiz') { z.shown = true; z.i = 0; $('#quiz').classList.remove('hidden'); quizLoad(); sfx.start(); return; }
  if (!z.shown || state !== 'quiz') return;
  if (z.typing) {
    z.typed = Math.min(z.line.length, z.typed + dt * 46);
    const n = Math.floor(z.typed); $('#qLine').textContent = z.line.slice(0, n);
    if (n > z.blip && n % 3 === 0 && !muted) beep(z.who === 'L' ? 150 + (n % 5) * 14 : 230 + (n % 5) * 18, .03, 'square', .02);
    z.blip = n;
    if (z.typed >= z.line.length) { z.typing = false; $('#qLine').textContent = z.line; z.hold = 0; }
    return;
  }
  if (z.phase === 'lula') { z.phase = 'choose'; $('#qOpts').classList.remove('hidden'); $('#quiz').classList.remove('compact'); }
  else if (z.phase === 'flavio') { z.hold += dt; if (z.hold > .8) quizReact(); }
  else if (z.phase === 'react') { z.hold += dt; if (z.hold > .6) { z.phase = 'wait'; $('#qNext').textContent = z.i + 1 >= z.order.length ? 'Ver resultado ▶' : 'Continuar ▶'; $('#qNext').classList.remove('hidden'); } }
}
function drawQuiz() {
  const z = quiz, t = z.t, d = CONFIG.duel, s = QUIZ.s;
  drawStudio('globo', t);
  const talking = who => z.shown && z.typing && z.who === who && state === 'quiz';
  const bust = (x, face, who, hurt, win) => {
    const shk = hurt > 0 ? Math.sin(hurt * 60) * 5 * (hurt / .7) : 0, tk = talking(who);
    ctx.save(); ctx.translate(x + shk, QUIZ.oy + Math.sin(t * 2 + x) * 1.5 - (win ? Math.abs(Math.sin(t * 9)) * 6 : 0) - (tk ? Math.abs(Math.sin(t * 13)) * 4 : 0)); ctx.scale(face * s, s);
    if (hurt > 0) ctx.rotate(-.18 * (hurt / .7));
    if (who === 'F') Sprites.flavio(ctx, 0, 1, false); else Sprites.lula(ctx, t);
    ctx.restore();
    if (tk) {                                                       // balãozinho "falando…"
      const bx = x + face * 62, by = QUIZ.oy - 100;
      ctx.fillStyle = '#fff'; Sprites.rr(ctx, bx - 24, by - 14, 48, 28, 12); ctx.fill();
      ctx.beginPath(); ctx.moveTo(bx - face * 14, by + 12); ctx.lineTo(bx - face * 26, by + 26); ctx.lineTo(bx - face * 4, by + 12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#1a2340'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(bx - 12 + i * 12, by + Math.sin(t * 9 + i) * 2.5, 3.2, 0, 7); ctx.fill(); }
    }
  };
  const done = z.phase === 'done' || state === 'duelEnd';
  const won = z.ok > z.order.length / 2;
  bust(QUIZ.fx, 1, 'F', z.hurtF, done && won); bust(QUIZ.lx, -1, 'L', z.hurtL, done && !won);
  drawPodium(QUIZ.fx, 'globo', 272, 360, 'FLÁVIO'); drawPodium(QUIZ.lx, 'globo', 272, 360, 'LULA');
  drawFx2(z.pops, z.sparks, t);
  const n = z.order.length;
  drawDuelHud(`${d.globoName} • ${d.globoSub}`, z.i < 0 ? '' : `${Math.min(z.i + 1, n)}/${n}`, 0, 0, 0, 0, false, null, true);
  if (t < QUIZ.intro) {
    const a = t < 1.3 ? 1 : clamp((QUIZ.intro - t) / .6, 0, 1);
    bigText(d.globoName, 230, 70, '#ffcf33', a); bigText(d.globoSub, 282, 30, '#fff', a); bigText('Responda ao Lula: acerte a maioria para vencer!', 322, 20, '#cfe6ff', a);
  }
}

/* ---------- cenários ---------- */
const studioCache = {};
function drawStudio(kind, t) {
  if (!studioCache[kind]) {
    const cv = document.createElement('canvas'); cv.width = W * 2; cv.height = H * 2;
    const c = cv.getContext('2d'); c.scale(2, 2); (kind === 'band' ? paintBand : paintGlobo)(c);
    studioCache[kind] = cv;
  }
  ctx.drawImage(studioCache[kind], 0, 0, W, H);
  if (kind === 'band') {                                             // pontinhos azuis do telão piscando
    const r = mulberry32(21);
    for (let i = 0; i < 46; i++) { const x = r() * W, y = 345 + r() * 120, a = .25 + .6 * Math.abs(Math.sin(t * (.8 + r() * 1.6) + i)); ctx.fillStyle = `rgba(120,175,255,${a})`; ctx.beginPath(); ctx.arc(x, y, 1.2 + r() * 1.8, 0, 7); ctx.fill(); }
  }
}
function polyline(c, pts) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); }
function paintBand(c) {
  const TAU = Math.PI * 2, rnd = mulberry32(7);
  let g = c.createLinearGradient(0, 0, 0, 340); g.addColorStop(0, '#2b3688'); g.addColorStop(1, '#1b2162'); c.fillStyle = g; c.fillRect(0, 0, W, 340);
  g = c.createLinearGradient(0, 335, 0, H); g.addColorStop(0, '#141a45'); g.addColorStop(.1, '#0a0e29'); g.addColorStop(1, '#04061a'); c.fillStyle = g; c.fillRect(0, 335, W, H - 335);
  // ruído de gráfico atrás
  c.lineWidth = 1; c.lineJoin = 'round';
  for (let k = 0; k < 6; k++) {
    c.strokeStyle = `rgba(150,180,255,${.22 + k * .04})`; const base = 262 + k * 5; c.beginPath();
    for (let x = 0; x <= W; x += 12) { if (x > 440 && x < 520) { c.moveTo(x + 12, base); continue; } const y = base - (rnd() < .18 ? rnd() * 26 : rnd() * 7); x === 0 ? c.moveTo(x, y) : c.lineTo(x, y); }
    c.stroke();
  }
  // linha principal do gráfico
  c.strokeStyle = '#7fb2ff'; c.lineWidth = 2.6; c.shadowColor = '#4d8dff'; c.shadowBlur = 8;
  const L1 = [[0, 88], [190, 126], [300, 186], [350, 256]], R1 = [[530, 262], [600, 238], [690, 208], [800, 204], [960, 172]];
  polyline(c, L1); polyline(c, R1); c.shadowBlur = 0;
  c.fillStyle = '#e6f0ff'; [[190, 126], [800, 204], [690, 208]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 3.2, 0, TAU); c.fill(); });
  // logo "BAND ELEIÇÕES 2026"
  c.strokeStyle = '#dfeaff'; c.lineWidth = 2.5; c.strokeRect(352, 66, 296, 104);
  // símbolo da emissora (o mesmo olho dos palanques) + ELEIÇÕES 2026
  c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.ellipse(500, 98, 40, 21, 0, 0, TAU); c.stroke();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(500, 98, 13, 0, TAU); c.fill();           // íris preenchida
  c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = '900 34px system-ui, sans-serif'; c.fillText('ELEIÇÕES', 500, 152);
  c.fillStyle = '#5cc4ff'; c.font = '800 19px system-ui, sans-serif'; c.textAlign = 'right'; c.fillText('2026', 616, 196); c.textAlign = 'left';
  // piso: brilho do horizonte e pontinhos
  c.fillStyle = 'rgba(150,190,255,.35)'; c.fillRect(0, 334, W, 2);
  for (let i = 0; i < 360; i++) { const x = rnd() * W, y = 340 + Math.pow(rnd(), 1.5) * 150, a = .18 + rnd() * .55; c.fillStyle = rnd() < .7 ? `rgba(70,130,255,${a})` : `rgba(150,190,255,${a})`; c.beginPath(); c.arc(x, y, .8 + rnd() * 2, 0, TAU); c.fill(); }
  // refletores laterais
  [64, 896].forEach(x => {
    c.fillStyle = 'rgba(70,130,255,.45)'; c.beginPath(); c.ellipse(x, 530, 10, 7, 0, 0, TAU); c.fill();
    c.fillStyle = '#12141c'; Sprites.rr(c, x - 15, 436, 30, 38, 6); c.fill(); c.fillStyle = '#2a2e3b'; c.fillRect(x - 20, 474, 40, 8);
    c.fillStyle = '#e9f1ff'; c.beginPath(); c.arc(x, 436, 9, 0, TAU); c.fill(); c.strokeStyle = '#4d8dff'; c.lineWidth = 2; c.stroke();
  });
}
function paintGlobo(c) {
  const TAU = Math.PI * 2, rnd = mulberry32(11);
  let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a2260'); g.addColorStop(.6, '#1763c8'); g.addColorStop(1, '#07183e'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  g = c.createRadialGradient(480, 150, 10, 480, 150, 420); g.addColorStop(0, 'rgba(130,205,255,.6)'); g.addColorStop(1, 'rgba(130,205,255,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  // colunas inclinadas de cada lado, com faixas de luz
  [-1, 1].forEach(side => {
    const dir = -side;                                               // aponta para o centro
    for (let i = 0; i < 4; i++) {
      const x0 = side < 0 ? 8 + i * 66 : W - 8 - i * 66, bot = 340 - i * 14, top = i * -6;
      const pg = c.createLinearGradient(x0, 0, x0 + dir * 46, 0); pg.addColorStop(0, '#3a8bf5'); pg.addColorStop(1, '#0e3f94');
      c.fillStyle = pg; c.beginPath(); c.moveTo(x0, top); c.lineTo(x0 + dir * 46, top); c.lineTo(x0 + dir * 70, bot); c.lineTo(x0 + dir * 24, bot); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 3; c.shadowColor = '#bfe0ff'; c.shadowBlur = 8; c.beginPath(); c.moveTo(x0, top); c.lineTo(x0 + dir * 24, bot); c.stroke(); c.shadowBlur = 0;
      c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(x0 - 12, bot - 4, 90, 4);
    }
  });
  // telão central: símbolo + ELEIÇÕES
  g = c.createLinearGradient(0, 64, 0, 254); g.addColorStop(0, '#5ab8ff'); g.addColorStop(1, '#1f6fe6'); c.fillStyle = g; Sprites.rr(c, 300, 64, 360, 190, 8); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 2; Sprites.rr(c, 306, 70, 348, 178, 6); c.stroke();
  const R = 48, gx = c.createLinearGradient(480 - R, 0, 480 + R, 0); gx.addColorStop(0, '#0a9bff'); gx.addColorStop(1, '#5538f6');
  c.fillStyle = gx; c.beginPath(); c.arc(480, 140, R, 0, TAU); c.fill();                                       // círculo
  c.fillStyle = '#fff'; Sprites.rr(c, 480 - R * .795, 140 - R * .5, R * 1.59, R * 1.0, R * .1); c.fill();      // "tela" branca de cantos arredondados
  c.fillStyle = gx; c.beginPath(); c.arc(480, 140, R * .4, 0, TAU); c.fill();                                  // bola central
  c.fillStyle = '#fff'; c.font = '900 40px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('ELEIÇÕES', 480, 232);
  // piso escuro de azulejos
  g = c.createLinearGradient(0, 300, 0, H); g.addColorStop(0, '#2d3340'); g.addColorStop(1, '#0b0d13'); c.fillStyle = g; c.fillRect(0, 300, W, H - 300);
  c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 1.5;
  for (let i = -10; i <= 10; i++) { c.beginPath(); c.moveTo(480 + i * 32, 300); c.lineTo(480 + i * 150, H); c.stroke(); }
  for (let j = 1; j <= 7; j++) { const y = 300 + 240 * Math.pow(j / 7, 1.7); c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  c.strokeStyle = 'rgba(80,175,255,.85)'; c.lineWidth = 3; c.shadowColor = '#46b4ff'; c.shadowBlur = 10;
  polyline(c, [[0, 470], [250, 440], [345, 410]]); polyline(c, [[W, 470], [710, 440], [615, 410]]); c.shadowBlur = 0;
  // mapa do Brasil iluminado
  const br = [[34, 4], [48, 0], [62, 6], [74, 4], [88, 18], [100, 30], [96, 44], [86, 52], [78, 66], [66, 76], [58, 92], [48, 100], [44, 88], [34, 76], [22, 62], [10, 50], [4, 38], [14, 26], [24, 18]].map(([x, y]) => [480 + (x - 50) * 2.7, 430 + (y - 50) * 1.05]);
  c.save(); c.shadowColor = '#46b4ff'; c.shadowBlur = 26; c.fillStyle = 'rgba(70,170,255,.92)'; c.beginPath(); br.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.shadowBlur = 0; c.clip();
  for (let i = 0; i < 70; i++) { const x = 340 + rnd() * 290, y = 380 + rnd() * 110, s = 6 + rnd() * 12; c.fillStyle = `rgba(200,235,255,${.15 + rnd() * .4})`; c.beginPath(); c.moveTo(x, y); c.lineTo(x + s, y + s * .3); c.lineTo(x + s * .4, y + s); c.closePath(); c.fill(); }
  c.restore();
}
function drawPodium(x, kind, top, bot, label) {
  const w = 108, h = bot - top;
  ctx.save();
  if (kind === 'band') {                                             // acrílico fosco com o olho da emissora
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, 'rgba(236,243,255,.88)'); g.addColorStop(.5, 'rgba(188,203,236,.82)'); g.addColorStop(1, 'rgba(142,162,208,.78)');
    ctx.fillStyle = g; Sprites.rr(ctx, x - w / 2, top, w, h, 6); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x - w / 2 - 4, top - 6, w + 8, 10);
    ctx.fillStyle = '#8c95a8'; ctx.fillRect(x - w / 2 - 12, bot, w + 24, 10); ctx.fillStyle = '#5d6577'; ctx.fillRect(x - w / 2 - 12, bot + 8, w + 24, 3);
    ctx.strokeStyle = '#5d6c8c'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, top + 24, 17, 10, 0, 0, 7); ctx.stroke();
    ctx.fillStyle = '#5d6c8c'; ctx.beginPath(); ctx.arc(x, top + 24, 7, 0, 7); ctx.fill();
    ctx.fillStyle = '#44506e'; ctx.font = '900 13px system-ui'; ctx.textAlign = 'center'; ctx.fillText(label, x, top + 66);
  } else {                                                           // pódio escuro com losango laranja
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#1b2236'); g.addColorStop(.5, '#2a3552'); g.addColorStop(1, '#141a2b');
    ctx.fillStyle = g; Sprites.rr(ctx, x - w / 2, top, w, h, 4); ctx.fill();
    ctx.fillStyle = '#4b5a82'; ctx.fillRect(x - w / 2, top, w, 5);
    ctx.fillStyle = '#ffae2b'; ctx.beginPath(); ctx.moveTo(x - 30, top + 14); ctx.lineTo(x + 30, top + 14); ctx.lineTo(x, top + 50); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e8730e'; ctx.beginPath(); ctx.moveTo(x, top + 14); ctx.lineTo(x + 30, top + 14); ctx.lineTo(x, top + 50); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '900 12px system-ui'; ctx.textAlign = 'center'; ctx.fillText(label, x, top + 66);
  }
  ctx.restore();
}

/* ---------- Fases 3 e 4: urna eletrônica ----------
   Digite 22 (Flávio, 1 ponto) ou 13 (Lula, 2 pontos) e CONFIRMA. A apuração anda sozinha, devagar, a favor do Lula.
   Só passa de fase se, ao fim do tempo, os pontos do Flávio forem MAIORES que os do Lula. */
let urna = null;
function fmtMMSS(sec) { const s = Math.ceil(Math.max(0, sec)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

function initUrna() {
  const nums = $('#uNums');
  [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].forEach(n => {
    const b = document.createElement('button');
    if (n === '') { b.className = 'uKey ghost'; b.disabled = true; } else { b.className = 'uKey'; b.textContent = n; b.dataset.k = String(n); }
    nums.appendChild(b);
  });
  $('#urna').addEventListener('pointerdown', e => {
    const b = e.target.closest('[data-k]');
    if (b) { e.preventDefault(); urnaKey(b.dataset.k); }
  });
  $('#uNext').onclick = () => urnaPrimary();
  $('#uRetry').onclick = () => retryFn();
    $('#qOpts').addEventListener('pointerdown', e => { const b = e.target.closest('[data-q]'); if (b && quiz && state === 'quiz' && quiz.phase === 'choose') { e.preventDefault(); quizPick(+b.dataset.q); } });
  $('#qNext').onclick = () => quizNext();
  $('#qSay').addEventListener('pointerdown', () => quizAdvance());
  $('#dNext').onclick = () => duelPrimary(); $('#dRetry').onclick = () => retryFn();
  $('#dMenu').onclick = () => { band = quiz = null; $('#dResult').classList.add('hidden'); showMenu(); };
  $('#uMenu').onclick = () => { urna = null; band = quiz = null; $('#urna').classList.add('hidden'); showMenu(); };
}
function startUrna(round = 1) {
  const diff = CONFIG.difficulties.find(d => d.id === sel.diff) || CONFIG.difficulties[1], cfg = CONFIG.urna, rd = cfg.rounds[round - 1];
  state = 'urna'; G = null; frd = null; zn = null; band = quiz = null; curPhase = 'urna' + round;
  $('#quiz').classList.add('hidden'); $('#dResult').classList.add('hidden');
  $('#menu').classList.add('hidden'); $('#end').classList.add('hidden'); $('#end').classList.remove('scene'); $('#pause').classList.add('hidden');
  $('#uResult').classList.add('hidden'); $('#urna').classList.remove('hidden');
  urna = { diff, round, rd, t: 0, limit: cfg.duration, lulaPts: rd.lulaPts, extended: false, F: 0, L: 0, N: 0, sF: 0, sL: 0, sN: 0, digits: '', blank: false, lock: 0, fim: 0, autoT: cfg.firstAuto, tickerT: 0, msgT: 0 };
  $('#uPhase').textContent = rd.name + ' • ' + rd.sub;
  urnaReset(); urnaRender(); sfx.start();
}
function urnaReset() { const u = urna; u.digits = ''; u.blank = false; u.lock = 0; $('#uMsg').classList.add('hidden'); }
function urnaSetLock() { const u = urna; u.lock = Math.random() < CONFIG.urna.lockChance ? 2 + ((Math.random() * 3) | 0) : 0; u.lockMax = u.lock; }
function urnaMsg(text, ok) { const m = $('#uMsg'); m.textContent = text; m.className = ok ? 'ok' : ''; if (urna) urna.msgT = ok ? 1.3 : 0; }
function urnaTicker(text, cls) {
  const t = $('#uTicker'); t.textContent = text; t.className = cls + ' pop'; urna.tickerT = 1.6;
  void t.offsetWidth; t.classList.add('pop');
}
function urnaKey(k) {
  const u = urna;
  if (!u || state !== 'urna' || u.fim > 0) return;
  k = String(k).toLowerCase();
  if (/^[0-9]$/.test(k)) {
    if (u.blank || u.digits.length >= 2) { beep(200, .06, 'square', .06); return; }
    u.digits += k; beep(880, .05, 'square', .05);
    if (u.digits.length === 2) {
      urnaSetLock();
      const c = CONFIG.urna.candidates[u.digits];
      if (c && c.k === 'F' && Math.random() < CONFIG.urna.blinkChance) {     // glitch: a foto do Lula pisca por cima, mas o voto segue sendo do Flávio
        drawPortrait('L', $('#uPortrait2'));
        const f = $('#uFrame'); f.classList.remove('glitch'); void f.offsetWidth; f.classList.add('glitch');
      }
    }
  } else if (k === 'corrige' || k === 'backspace' || k === 'delete') {
    beep(520, .08, 'square', .06); urnaReset(); $('#uFrame').classList.remove('glitch');
  } else if (k === 'branco' || k === 'b') {
    if (u.digits.length) { beep(200, .08, 'square', .06); return; }
    u.blank = true; urnaSetLock(); beep(700, .06, 'square', .05);
  } else if (k === 'confirma' || k === 'enter') {
    urnaConfirm();
  } else return;
  urnaRender();
}
function urnaConfirm() {
  const u = urna, ready = u.blank || u.digits.length === 2;
  if (!ready) { beep(200, .08, 'square', .06); return; }
  if (u.lock > 0) {                                           // tecla travada: precisa insistir
    u.lock--;
    const b = $('#uConfirm'); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
    if (u.lock > 0) { beep(170, .09, 'square', .1, 90); urnaMsg('TECLA TRAVADA COM COLA — insista!', false); }
    else { sfx.bonus(); urnaMsg('Cola solta! Confirme.', true); }
    return;
  }
  const c = u.blank ? null : CONFIG.urna.candidates[u.digits];
  if (c) {
    if (c.k === 'F') u.F += 1; else u.L += u.lulaPts;                  // pontos não aparecem na tela, só a porcentagem
    u.N += u.rd.nullPerVote;                                        // 1º turno: cada voto confirmado gera +0,5 branco/nulo
    if (u.rd.nullPerVote && u.F > u.L + u.N) u.N = u.F - u.L;       // trava: brancos+nulos garantem que o Flávio nunca passe de 50%
    urnaTicker(`Voto confirmado: ${c.k === 'F' ? 'Flávio' : 'Lula'}`, c.k === 'F' ? 'f' : 'l');
  } else urnaTicker(u.blank ? 'Voto em branco' : 'Voto nulo', '');
  u.fim = .75; beep(520, .6, 'square', .09);                  // "FIM" com o bipe longo da urna
}
function urnaRender() {
  const u = urna;
  $('#uD0').textContent = u.digits[0] || ''; $('#uD1').textContent = u.digits[1] || '';
  const c = u.digits.length === 2 ? CONFIG.urna.candidates[u.digits] : null, info = $('#uInfo'), photo = $('#uPhoto');
  if (u.blank) info.innerHTML = '<span class="blank">VOTO EM BRANCO</span>';
  else if (c) info.innerHTML = `Nome: <b>${c.name}</b><br>Partido: <b>${c.party}</b>`;
  else if (u.digits.length === 2) info.innerHTML = '<span class="err">NÚMERO ERRADO<br>VOTO NULO</span>';
  else info.innerHTML = '';
  if (c) { drawPortrait(c.k); photo.classList.remove('hidden'); } else { photo.classList.add('hidden'); $('#uFrame').classList.remove('glitch'); }
  const ready = u.blank || u.digits.length === 2;
  const glued = ready && u.lock > 0, cf = $('#uConfirm');
  cf.classList.toggle('locked', glued);                         // borda de cola: afina a cada clique
  cf.style.setProperty('--glue', glued ? (u.lock / (u.lockMax || u.lock)).toFixed(2) : 0);
  if (!ready || u.fim > 0) $('#uMsg').classList.add('hidden');
  $('#uFim').classList.toggle('hidden', !(u.fim > 0));
}
function drawPortrait(who, canvasEl) {                         // busto: reaproveita os sprites, ampliados e recortados
  const cv = canvasEl || $('#uPortrait'), c = cv.getContext('2d'), w = cv.width, h = cv.height, sc = w / 30;
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, w, h);
  const bg = c.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#dfe4e9'); bg.addColorStop(1, '#a9b2bc'); c.fillStyle = bg; c.fillRect(0, 0, w, h);
  c.translate(w / 2, h * .42 + 22 * sc); c.scale(sc, sc);
  if (who === 'F') Sprites.flavio(c, 0, 1, false, true); else Sprites.lula(c, 0, true);
}
function urnaUpdate(dt) {
  const u = urna, cfg = CONFIG.urna;
  if (!u || state !== 'urna') return;
  u.t += dt;
  if (u.fim > 0) { u.fim -= dt; if (u.fim <= 0) { urnaReset(); urnaRender(); } }
  if (u.msgT > 0) { u.msgT -= dt; if (u.msgT <= 0) $('#uMsg').classList.add('hidden'); }
  if (u.tickerT > 0) { u.tickerT -= dt; if (u.tickerT <= 0) { $('#uTicker').textContent = ' '; $('#uTicker').className = ''; } }
  u.autoT -= dt;                                              // a apuração anda sozinha, devagar: voto no Lula (vale 2)
  if (u.autoT <= 0) {
    u.L += u.lulaPts; urnaTicker('Voto apurado: Lula', 'l'); beep(260, .1, 'triangle', .06);
    u.autoT += cfg.autoEvery / u.diff.speed * (.8 + Math.random() * .4);
  }
  const tot = u.F + u.L + u.N, tF = tot ? 100 * u.F / tot : 0, tL = tot ? 100 * u.L / tot : 0, tN = tot ? 100 * u.N / tot : 0, k = Math.min(1, dt * 6);
  u.sF += (tF - u.sF) * k; u.sL += (tL - u.sL) * k; u.sN += (tN - u.sN) * k;
  $('#uNulls').textContent = u.rd.nullPerVote ? 'Brancos e Nulos: ' + Math.round(u.sN) + '%' : '';
  $('#uPctF').textContent = Math.round(u.sF) + '%'; $('#uPctL').textContent = Math.round(u.sL) + '%';
  $('#uBarF').style.width = u.sF + '%'; $('#uBarL').style.width = u.sL + '%';
  const rem = u.limit - u.t;
  $('#uTimer').textContent = fmtMMSS(rem); $('#uTimer').classList.toggle('urgent', rem <= 5);
  if (rem <= 0) { if (u.rd.extend && !u.extended) startZanin(); else urnaFinish(); }   // 2º turno: acabou o tempo → Zanin prorroga
}
function urnaFinish() {
  const u = urna, tot = u.F + u.L + u.N || 1, pF = Math.round(100 * u.F / tot), pL = Math.round(100 * u.L / tot), pN = Math.round(100 * u.N / tot), tie = u.F === u.L;
  state = 'urnaEnd';
  $('#uTimer').textContent = '0:00'; $('#uPctF').textContent = pF + '%'; $('#uPctL').textContent = pL + '%';
  if (u.rd.nullPerVote) $('#uNulls').textContent = 'Brancos e Nulos: ' + pN + '%';
  const pct = `Apuração final: Flávio ${pF}% × Lula ${pL}%` + (u.rd.nullPerVote ? ` (brancos e nulos ${pN}%)` : '') + '. ';
  let title, text, next = false;
  if (u.round === 1) {
    next = u.F >= u.L;                                       // empate também leva ao segundo turno
    title = u.F > u.L ? 'Flávio na frente!' : tie ? 'Empate no primeiro turno!' : 'Lula venceu o primeiro turno!';
    text = pct + (next ? 'Ninguém passou de 50%.' : 'Os votos do Flávio não podem ser menores.');
    $('#uNext').textContent = 'Continuar';
  } else {
    if (u.F >= u.L) { startFraud(); return; }              // Flávio venceu OU empatou o segundo turno: fraude eleitoral (o Lula precisa vencer)
    next = true;
    title = 'Lula venceu o segundo turno!';
    text = pct + 'O Flávio perdeu a eleição.';
    $('#uNext').textContent = 'Continuar';
  }
  u.next = next;
  $('#uResTitle').textContent = title; $('#uResText').textContent = text;
  $('#uNext').classList.toggle('hidden', !next); $('#uRetry').classList.toggle('hidden', next);
  $('#uResult').classList.remove('hidden');
  if (next) sfx.win(); else sfx.lose();
}
function urnaPrimary() {
  if (!urna) return;
  if (urna.next) { if (urna.round === 1) startUrna(2); else startBridge(); }
  else retryFn();
}

/* ---------- prorrogação do 2º turno: o Zanin bate o martelo ----------
   Ao fim dos 30s do segundo turno: +30s, e cada voto no Lula passa a valer 3. A contagem NÃO é zerada. */
let zn = null;
const ZN = { end: 4.0, strikes: [1.4, 1.8, 2.2] };
function startZanin() {
  state = 'zanin'; zn = { t: 0, hit: [false, false, false] };
  $('#urna').classList.add('hidden');
}
function updateZanin(dt) {
  const z = zn; z.t = Math.min(ZN.end, z.t + dt);
  ZN.strikes.forEach((ts, i) => { if (!z.hit[i] && z.t >= ts) { z.hit[i] = true; sfx.gavel(); } });
  if (z.t >= ZN.end) finishZanin();
}
function skipZanin() { if (state === 'zanin' && zn && zn.t > .8) zn.t = ZN.end; }
function finishZanin() {
  const u = urna, ext = u.rd.extend;
  u.extended = true; u.limit += ext.seconds; u.lulaPts = ext.lulaPts;   // só os votos DAQUI PRA FRENTE valem mais; o que já foi contado fica
  state = 'urna'; zn = null;
  $('#urna').classList.remove('hidden');
  $('#uPhase').textContent = u.rd.name + ' • ' + u.rd.sub + ' • PRORROGAÇÃO';
  urnaTicker('Votação prorrogada!', ''); sfx.start();
}
function gavelK(t) {                                          // 1 = martelo no alto, 0 = sobre o suporte
  const S = ZN.strikes;
  if (t < .2) return 0;
  if (t < S[0] - .12) return t < .9 ? ease((t - .2) / .7) : 1;
  for (let i = 0; i < S.length; i++) {
    const ts = S[i];
    if (t >= ts - .12 && t < ts) return (i ? .8 : 1) * (1 - (t - (ts - .12)) / .12);                 // golpe
    if (t >= ts && i + 1 < S.length && t < S[i + 1] - .12) return .8 * ease(clamp((t - ts) / .22, 0, 1));   // levanta de novo
  }
  return 0;
}
function drawZaninScene() {
  const z = zn, t = z.t, s = 3.8, y0 = 330, cx = W / 2;
  const last = ZN.strikes.filter(ts => t >= ts).pop(), a = last === undefined ? 0 : clamp(1 - (t - last) / .22, 0, 1);   // 1 logo após a batida
  ctx.save(); ctx.translate((Math.random() - .5) * 8 * a, (Math.random() - .5) * 8 * a);
  // tribunal: parede de madeira, cortinas, bancada
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#33241a'); bg.addColorStop(1, '#1c130d'); ctx.fillStyle = bg; ctx.fillRect(-20, -20, W + 40, H + 40);
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 368); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let x = 0; x < W; x += 160) ctx.fillRect(x, 0, 80, 368);
  ['left', 'right'].forEach(side => {
    const x0 = side === 'left' ? 0 : W - 110; ctx.fillStyle = '#5a1a20'; ctx.fillRect(x0, 0, 110, 370);
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 3; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * 18, 0); ctx.lineTo(x0 + i * 18, 370); ctx.stroke(); }
  });
  const sp = ctx.createRadialGradient(cx, 260, 40, cx, 260, 460); sp.addColorStop(0, 'rgba(255,235,190,.2)'); sp.addColorStop(1, 'rgba(0,0,0,.5)'); ctx.fillStyle = sp; ctx.fillRect(0, 0, W, H);

  // Zanin atrás da bancada; braço direito segura o martelo
  ctx.save(); ctx.translate(cx, y0); ctx.scale(s, s); Sprites.zanin(ctx, t, true); ctx.restore();
  const k = gavelK(t), px = cx + 105, py = 350 - 50 * k, ang = -1.22 * k;
  Sprites.limb(ctx, cx - 9.5 * s, y0 - 8 * s, cx - 14 * s, y0 + 2 * s, 4.8 * s, '#2d5eab');                         // braço esquerdo, parado
  Sprites.limb(ctx, cx + 9.5 * s, y0 - 8 * s, px, py, 4.8 * s, '#2d5eab');                                            // braço direito
  ctx.fillStyle = '#8a5a2e'; Sprites.rr(ctx, cx + 168, 364, 62, 16, 4); ctx.fill();                                    // suporte do martelo
  ctx.save(); ctx.translate(px, py); ctx.rotate(ang);
  ctx.fillStyle = '#7a4b26'; Sprites.rr(ctx, 0, -5, 94, 10, 4); ctx.fill();
  ctx.fillStyle = '#5a3418'; Sprites.rr(ctx, 72, -21, 48, 42, 6); ctx.fill();
  ctx.fillStyle = '#d0a24a'; ctx.fillRect(79, -21, 5, 42); ctx.fillRect(108, -21, 5, 42);
  ctx.restore();
  Sprites.ell(ctx, px, py, 14, 14, '#e6b494');                                                                       // mão
  // bancada
  const dk = ctx.createLinearGradient(0, 368, 0, H); dk.addColorStop(0, '#4d3421'); dk.addColorStop(1, '#2a1b10'); ctx.fillStyle = dk; ctx.fillRect(110, 368, W - 220, H - 368);
  ctx.fillStyle = '#7d5532'; ctx.fillRect(110, 368, W - 220, 12); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(110, 368, W - 220, 3);
  ctx.fillStyle = '#d0a24a'; Sprites.rr(ctx, cx - 70, 400, 140, 34, 5); ctx.fill();
  ctx.fillStyle = '#2a1b10'; ctx.font = '900 20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('STF', cx, 425);
  // "TOC!" a cada batida
  if (last !== undefined && t - last < .35) {
    ctx.save(); ctx.translate(cx + 200, 330); ctx.rotate(.15); ctx.globalAlpha = 1 - (t - last) / .35; ctx.font = '900 34px system-ui, sans-serif';
    ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText('TOC!', 0, 0); ctx.fillStyle = '#ffe28a'; ctx.fillText('TOC!', 0, 0); ctx.restore();
  }
  ctx.restore();
  if (a > 0) { ctx.fillStyle = `rgba(255,255,255,${.22 * a})`; ctx.fillRect(0, 0, W, H); }
  // banner da prorrogação
  if (t >= ZN.strikes[0]) {
    const pk = clamp((t - ZN.strikes[0]) / .3, 0, 1), sc = 1.5 - .5 * ease(pk);
    ctx.save(); ctx.translate(cx, 96); ctx.scale(sc, sc); ctx.globalAlpha = .4 + .6 * pk; ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.font = '900 62px system-ui, sans-serif'; ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(0,0,0,.65)';
    ctx.strokeText(CONFIG.zaninBanner, 0, 0); ctx.fillStyle = '#ffcf33'; ctx.fillText(CONFIG.zaninBanner, 0, 0);
    ctx.font = '800 30px system-ui, sans-serif'; ctx.lineWidth = 6; ctx.strokeText(CONFIG.zaninSub, 0, 44); ctx.fillStyle = '#fff'; ctx.fillText(CONFIG.zaninSub, 0, 44);
    ctx.restore();
  }
  if (t > .8) { ctx.textAlign = 'center'; ctx.font = '13px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('Toque ou pressione qualquer tecla para pular', cx, H - 14); }
}

/* ---------- fim de jogo por fraude eleitoral ----------
   O Flávio venceu o segundo turno (onde o voto no Lula vale 2): o Xandão aparece e o prende. */
let frd = null;
const FR = { enter0: 1.6, enter1: 3.0, zoom1: 4.0, end: 5.6 };
function startFraud() {
  state = 'fraud'; frd = { t: 0, cuffed: false, ended: false };
  $('#urna').classList.add('hidden'); $('#uResult').classList.add('hidden');
  sfx.alarm();
}
function updateFraud(dt) {
  const f = frd; f.t = Math.min(FR.end, f.t + dt);
  if (!f.cuffed && f.t >= FR.enter1) { f.cuffed = true; sfx.cuff(); }
  if (!f.ended && f.t >= FR.end) {
    f.ended = true; state = 'fraudEnd'; sfx.lose();
    $('#endTitle').textContent = CONFIG.fraudTitle; $('#endText').textContent = CONFIG.fraudText(CONFIG.heroName);
    $('#end').classList.add('scene'); $('#end').classList.remove('hidden');
  }
}
function skipFraud() { const f = frd; if (state === 'fraud' && f && f.t > .8 && f.t < FR.enter1) { f.t = FR.enter1; f.cuffed = true; sfx.cuff(); } }
function drawFraudScene() {
  const f = frd, t = f.t, sc = 2.7, y0 = 318, fx = W / 2 - 60, mx1 = fx + 34 * sc;
  const k = ease(clamp((t - FR.enter1) / (FR.zoom1 - FR.enter1), 0, 1)), px = fx + 46, py = y0 - 30;
  ctx.save();
  if (k > 0) { const z = 1 + .7 * k, sx = W / 2 + (px - W / 2) * k, sy = H / 2 + (py - H / 2) * k; ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-sx, -sy); }
  // sala de apuração: parede, chão, mesa com a urna
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#1d2634'); bg.addColorStop(1, '#131923'); ctx.fillStyle = bg; ctx.fillRect(-W, -H, W * 3, H * 3);
  ctx.fillStyle = '#272d37'; ctx.fillRect(-W, 392, W * 3, H * 2); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(-W, 392, W * 3, 3);
  ctx.fillStyle = '#4b3b2a'; ctx.fillRect(40, 346, 230, 14); ctx.fillRect(52, 360, 10, 40); ctx.fillRect(248, 360, 10, 40);
  ctx.fillStyle = '#cdd0ca'; Sprites.rr(ctx, 80, 262, 150, 86, 8); ctx.fill();
  ctx.fillStyle = '#eef1e3'; ctx.fillRect(92, 274, 84, 52); ctx.fillStyle = '#2b2b2b'; for (let i = 0; i < 6; i++) ctx.fillRect(186 + (i % 3) * 14, 276 + ((i / 3) | 0) * 14, 11, 11);
  ctx.fillStyle = '#2ea84a'; ctx.fillRect(186, 308, 40, 12);
  const sp = ctx.createRadialGradient(W / 2, 300, 40, W / 2, 300, 430); sp.addColorStop(0, 'rgba(255,240,200,.14)'); sp.addColorStop(1, 'rgba(0,0,0,.4)'); ctx.fillStyle = sp; ctx.fillRect(-W, -H, W * 3, H * 3);
  // Flávio parado; o Xandão chega andando com as algemas e depois as coloca
  ctx.save(); ctx.translate(fx, y0); ctx.scale(sc, sc);
  Sprites.flavio(ctx, 0, 1, false);
  if (f.cuffed) {
    ctx.strokeStyle = '#cfd6dd'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-9, 3.5); ctx.lineTo(9, 3.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(-11.5, 3.5, 3.2, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(11.5, 3.5, 3.2, 0, 7); ctx.stroke();
  }
  ctx.restore();
  if (t >= FR.enter0) {
    const m = clamp((t - FR.enter0) / (FR.enter1 - FR.enter0), 0, 1), x = (W + 120) + (mx1 - (W + 120)) * m;
    ctx.save(); ctx.translate(x, y0 + 3); ctx.scale(-sc * 1.15, sc * 1.15);
    Sprites.moraes(ctx, t, m < 1 ? t * 12 : null, m < 1);
    ctx.restore();
  }
  ctx.restore();
  // banner, carimbo e dica de pular
  ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (t < 2.2) {
    ctx.save(); ctx.globalAlpha = t < 1.4 ? 1 : clamp((2.2 - t) / .8, 0, 1); ctx.font = '900 54px system-ui, sans-serif';
    ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText(CONFIG.fraudBanner, W / 2, 110); ctx.fillStyle = '#ff4040'; ctx.fillText(CONFIG.fraudBanner, W / 2, 110); ctx.restore();
  }
  const sk = t - (FR.zoom1 + .1);
  if (sk > 0) {
    const kk = clamp(sk / .25, 0, 1), s2 = 1.7 - .7 * kk;
    ctx.save(); ctx.translate(W / 2, 100); ctx.rotate(-.1); ctx.scale(s2, s2); ctx.globalAlpha = .55 + .4 * kk;
    ctx.font = '900 64px system-ui, sans-serif'; const w = ctx.measureText(CONFIG.cuffedStamp).width + 36;
    ctx.strokeStyle = '#e03030'; ctx.lineWidth = 7; ctx.strokeRect(-w / 2, -52, w, 74); ctx.fillStyle = '#e03030'; ctx.fillText(CONFIG.cuffedStamp, 0, 0); ctx.restore();
  }
  if (state === 'fraud' && t > .8 && t < FR.enter1) { ctx.font = '13px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('Toque ou pressione qualquer tecla para pular', W / 2, H - 14); }
}

/* ---------- física ---------- */
function circleRect(cx, cy, r, rx, ry, rw, rh) {
  const nx = clamp(cx, rx, rx + rw), ny = clamp(cy, ry, ry + rh);
  return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r;
}
function gateGapCenter(g, t) {
  const amp = (ROAD_BOT - ROAD_TOP - g.gap) / 2 - 10;
  return MID + Math.sin(t * g.freq + g.phase) * amp;
}
function update(dt) {
  const g = G, p = g.p;
  g.t += dt; g.time += dt;
  g.inv = Math.max(0, g.inv - dt); g.shake = Math.max(0, g.shake - dt); g.flash = Math.max(0, g.flash - dt);

  // jogador
  const down = g.t - g.downAt < FALL_TIME;                    // caído: sem controle
  const inp = down ? { x: 0, y: 0 } : inputVec(), sp = PLAYER_SPEED * g.diff.speed * 0.95;
  let tx, ty;
  if (down) { tx = 0; ty = 0; }
  else if (g.auto) { tx = sp * (0.72 + 0.35 * inp.x); ty = inp.y * sp; }
  else { tx = inp.x * sp; ty = inp.y * sp; }
  const k = 1 - Math.exp(-14 * dt);
  p.vx += (tx - p.vx) * k; p.vy += (ty - p.vy) * k;
  const roadMin = ROAD_TOP + PLAYER_R, colL = EGG_X + 8, colR = EGG_X + EGG_W - 8;
  let nx = clamp(p.x + p.vx * dt, 20, g.L - 20), ny = p.y + p.vy * dt;
  if (p.y < roadMin) nx = clamp(nx, colL, colR);                 // acima da pista só existe a coluna
  const onCol = nx >= colL && nx <= colR;
  p.x = nx; p.y = clamp(ny, onCol ? EGG_MIN_Y : roadMin, ROAD_BOT - PLAYER_R);
  if (Math.abs(p.vx) > 5) p.face = Math.sign(p.vx);
  p.step += Math.hypot(p.vx, p.vy) * dt * 0.09;

  // obstáculos (só os próximos à câmera)
  let hit = false;
  for (const o of g.obs) {
    if (o.x < p.x - 600 && o.t !== 'cop') continue;
    if (o.x > p.x + W) continue;
    if (o.t === 'car') {
      o.x += o.vx * dt;
      if (o.x < o.bx - o.range) { o.x = o.bx - o.range; o.vx = Math.abs(o.vx); }
      if (o.x > o.bx + o.range) { o.x = o.bx + o.range; o.vx = -Math.abs(o.vx); }
      if (!hit && g.inv <= 0 && circleRect(p.x, p.y, PLAYER_R - 1, o.x - o.w / 2 + 3, o.y - 13, o.w - 6, 26)) hit = true;
    } else {
      if (o.t === 'person') {
        const d = Math.hypot(p.x - o.bx, p.y - o.by);
        // só te identifica depois de ficar um tempo à vista; perde o interesse se você se afasta muito
        if (d < PERSON_SIGHT) o.alert = Math.min(PERSON_ALERT_TIME, o.alert + dt);
        else o.alert = Math.max(0, o.alert - dt * 0.5);
        if (!o.active && o.alert >= PERSON_ALERT_TIME) o.active = true;
        else if (o.active && d > 380) { o.active = false; o.alert = 0; }
        if (o.active && d > 1) {
          o.bx += (p.x - o.bx) / d * o.cs * dt;
          o.by = clamp(o.by + (p.y - o.by) / d * o.cs * dt, ROAD_TOP + o.r, ROAD_BOT - o.r);
        }
        const k = o.active ? 0.35 : 1;   // perseguindo, balança menos
        o.x = o.bx + Math.sin(g.t * o.f + o.ph) * o.ax * k;
        o.y = clamp(o.by + Math.cos(g.t * o.f * .8 + o.ph) * o.ay * k, ROAD_TOP + o.r, ROAD_BOT - o.r);
      }
      else if (o.t === 'cop') {
        const d = Math.hypot(p.x - o.x, p.y - o.y);
        if (d < COP_SIGHT) o.active = true; else if (d > 420) o.active = false;
        const cs = COP_CHASE * g.diff.speed;
        if (o.active) { o.x += (p.x - o.x) / d * cs * dt; o.y += (p.y - o.y) / d * cs * dt; }
        else { o.x += (o.bx - o.x) * Math.min(1, dt * 1.5); o.y += (o.by - o.y) * Math.min(1, dt * 1.5); }
        o.y = clamp(o.y, ROAD_TOP + o.r, ROAD_BOT - o.r);
      }
      if (!hit && g.inv <= 0 && Math.hypot(p.x - o.x, p.y - o.y) < PLAYER_R + o.r - 2) hit = true;
    }
  }
  // portões do posto
  for (const gt of g.gates) {
    if (Math.abs(p.x - gt.x) > 60) continue;
    const c = gateGapCenter(gt, g.t), top = c - gt.gap / 2, bot = c + gt.gap / 2;
    if (g.inv <= 0 && !hit && (circleRect(p.x, p.y, PLAYER_R - 1, gt.x, ROAD_TOP, gt.w, top - ROAD_TOP) ||
                              circleRect(p.x, p.y, PLAYER_R - 1, gt.x, bot, gt.w, ROAD_BOT - bot))) hit = true;
  }

  if (hit) {
    g.lives--; g.inv = FALL_TIME + 1.4; g.downAt = g.t; g.shake = .3; g.flash = .25; sfx.hit();      // cai, fica 1s parado e ainda ganha 1,4s de invulnerabilidade ao levantar
    p.x = Math.max(30, p.x - 50); p.vx = -140; p.vy = 0;
    if (p.y < ROAD_TOP + PLAYER_R) { p.x = EGG_CX; p.y = ROAD_TOP + PLAYER_R; }   // estava sobre a coluna: volta para a pista
    if (g.lives <= 0) { endGame(false); }
  }

  // chegada
  if (state === 'play' && p.x >= g.L - FINISH_PAD + 20) endGame(true);

  // easter egg: entrou na grade escondida sob o 5º pilar
  if (state === 'play' && !g.eggUsed && p.x > EGG_X && p.x < EGG_X + EGG_W && p.y < EGG_TRIGGER_Y) startEgg();

  // cronômetro: bipes nos últimos 5s; zerou = o avião vai embora
  if (state === 'play') {
    const rem = limitOf(g) - g.time, sec = Math.ceil(rem);
    if (sec <= 5 && sec > 0 && sec !== g.tick) { g.tick = sec; sfx.tick(); }
    if (rem <= 0) startCutscene();
  }
}

/* ---------- desenho ---------- */
function draw() {
  const g = G;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);
  if (state === 'intro' || state === 'menu') { drawIntro(); return; }
  if (band) { drawBand(); return; }
  if (quiz) { drawQuiz(); return; }
  if (frd && (state === 'fraud' || state === 'fraudEnd')) { drawFraudScene(); return; }
  if (zn && state === 'zanin') { drawZaninScene(); return; }
  const t = g ? g.t : performance.now() / 1000;
  const L = g ? g.L : 6000;
  let cam = g ? (g.cs ? cutCam(g) : clamp(g.p.x - 300, 0, L - W + 260)) : (performance.now() / 20) % 2000;
  if (g) g.cam = cam;
  const sh = g && g.shake > 0 ? (Math.random() - .5) * 8 : 0;
  ctx.save(); ctx.translate(sh, sh);

  const zm = g && g.cs ? cutZoom(g) : null;
  ctx.save();
  if (zm) { ctx.translate(W / 2, H / 2); ctx.scale(zm.z, zm.z); ctx.translate(-zm.sx, -zm.sy); }
  const scene = !!(g && g.egg && g.egg.t >= EGG.scene0 && g.egg.t < EGG.back);
  if (scene) drawEggScene(g); else drawBridge(cam, t, L);
  if (g && !scene) {
    ctx.save(); ctx.translate(-cam, 0);
    drawCheckpoint(g);
    drawFinish(g);
    const list = [];
    for (const o of g.obs) if (o.x > cam - 100 && o.x < cam + W + 100) list.push({ y: o.y, f: () => drawObstacle(o, g) });
    list.push({ y: g.p.y, f: () => drawPlayer(g) });
    if (g.cs && g.cs.t >= CUT.enter0) list.push({ y: g.p.y + 3, f: () => drawMoraes(g) });
    list.sort((a, b) => a.y - b.y).forEach(i => i.f());
    ctx.restore();
  }
  ctx.restore();                       // fim do zoom
  if (g) { drawHUD(g); drawFx(g); }
  ctx.restore();
  if (g && g.flash > 0) { ctx.fillStyle = `rgba(255,50,50,${g.flash * 1.4})`; ctx.fillRect(0, 0, W, H); }
}

function drawBridge(cam, t, L) {
  // água
  const grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, '#0e3a5c'); grd.addColorStop(.5, '#0b2d48'); grd.addColorStop(1, '#0e3a5c');
  ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(160,210,255,.12)'; ctx.lineWidth = 2;
  for (let row = 0; row < 7; row++) {
    const y = row < 3 ? 20 + row * 32 : ROAD_BOT + 40 + (row - 3) * 22;
    ctx.beginPath();
    for (let x = -40; x < W + 40; x += 20) {
      const wx = x + ((cam * .4) % 40) * -1, wy = y + Math.sin((x + cam * .4) * .05 + t * 1.5 + row) * 3;
      x === -40 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
    }
    ctx.stroke();
  }
  // pilares sob a ponte
  ctx.fillStyle = '#1a2b3a';
  const pil = 520;
  for (let x = -((cam * 1) % pil); x < W + pil; x += pil) { ctx.fillRect(x + 200, ROAD_BOT + 14, 46, 60); const egg = Math.abs(x + 200 + cam - EGG_X) <= 1; ctx.fillRect(x + 200, egg ? 6 : ROAD_TOP - 74, 46, egg ? ROAD_TOP - 20 : 60); }
  // pista
  ctx.fillStyle = '#2d3238'; ctx.fillRect(0, ROAD_TOP, W, ROAD_BOT - ROAD_TOP);
  ctx.fillStyle = 'rgba(255,255,255,.035)';
  for (let i = 0; i < 5; i++) ctx.fillRect(0, ROAD_TOP + i * 68, W, 34);
  // faixa central tracejada
  ctx.fillStyle = '#e8c93a';
  for (let x = -((cam) % 80); x < W; x += 80) ctx.fillRect(x, MID - 2, 44, 4);
  // guard-rails
  [ROAD_TOP - 14, ROAD_BOT].forEach((y, i) => {
    ctx.fillStyle = '#b9c2cb'; ctx.fillRect(0, y, W, 14);
    ctx.fillStyle = '#6f7a85'; ctx.fillRect(0, y + (i ? 0 : 11), W, 3);
    ctx.fillStyle = '#d9a441';
    for (let x = -((cam) % 60); x < W; x += 60) ctx.fillRect(x, y + 1, 6, 12);
  });
  // postes de luz
  for (let x = -((cam) % 300) + 100; x < W + 300; x += 300) {
    [ROAD_TOP - 14, ROAD_BOT + 14].forEach((y, i) => {
      ctx.fillStyle = '#9aa7b3'; ctx.fillRect(x - 2, i ? y : y - 22, 4, 22);
      ctx.fillStyle = '#ffe9a6'; ctx.beginPath(); ctx.arc(x, i ? y + 24 : y - 24, 5, 0, 7); ctx.fill();
    });
  }
}

function drawCheckpoint(g) {
  const x0 = g.cpX - 130, x1 = g.cpX + 150 + 22 + 130;
  // piso do posto
  ctx.fillStyle = 'rgba(255,200,0,.08)'; ctx.fillRect(x0, ROAD_TOP, x1 - x0, ROAD_BOT - ROAD_TOP);
  ctx.fillStyle = '#ffcf33';
  for (let x = x0; x < x1; x += 30) { ctx.fillRect(x, ROAD_TOP, 14, 5); ctx.fillRect(x, ROAD_BOT - 5, 14, 5); }
  // cabines
  [[ROAD_TOP + 6], [ROAD_BOT - 46]].forEach(([y]) => {
    ctx.fillStyle = '#2b4a6b'; ctx.fillRect(g.cpX + 52, y, 70, 40);
    ctx.fillStyle = '#9cd3ff'; ctx.fillRect(g.cpX + 58, y + 8, 58, 14);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'center'; ctx.fillText('PF', g.cpX + 87, y + 36);
  });
  // portões
  g.gates.forEach(gt => {
    const c = gateGapCenter(gt, g.t), top = c - gt.gap / 2, bot = c + gt.gap / 2;
    const bar = (y, h) => {
      ctx.fillStyle = '#fff'; ctx.fillRect(gt.x, y, gt.w, h);
      ctx.fillStyle = '#d63a2f';
      for (let yy = y; yy < y + h; yy += 24) ctx.fillRect(gt.x, yy, gt.w, Math.min(12, y + h - yy));
    };
    bar(ROAD_TOP, top - ROAD_TOP); bar(bot, ROAD_BOT - bot);
  });
  // placa
  const sx = g.cpX + 75 + 11;
  ctx.fillStyle = '#ffcf33'; ctx.fillRect(sx - 120, ROAD_TOP - 60, 240, 30);
  ctx.fillStyle = '#1a1300'; ctx.font = 'bold 16px system-ui'; ctx.textAlign = 'center'; ctx.fillText(CONFIG.checkpointLabel, sx, ROAD_TOP - 39);
  ctx.fillStyle = '#6f7a85'; ctx.fillRect(sx - 100, ROAD_TOP - 30, 4, 16); ctx.fillRect(sx + 96, ROAD_TOP - 30, 4, 16);
}

function drawFinish(g) {
  const fx = g.L - FINISH_PAD;
  // largada
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(40, ROAD_TOP, 6, ROAD_BOT - ROAD_TOP);
  // pista do aeroporto
  ctx.fillStyle = '#3a3f46'; ctx.fillRect(fx - 40, ROAD_TOP - 14, 400, ROAD_BOT - ROAD_TOP + 28);
  // linha de chegada quadriculada
  const s = 14;
  for (let y = ROAD_TOP, r = 0; y < ROAD_BOT; y += s, r++)
    for (let c = 0; c < 2; c++) { ctx.fillStyle = (r + c) % 2 ? '#111' : '#fff'; ctx.fillRect(fx + c * s, y, s, Math.min(s, ROAD_BOT - y)); }
  ctx.fillStyle = '#ffcf33'; ctx.font = 'bold 20px system-ui'; ctx.textAlign = 'center'; ctx.fillText('FIM DA LINHA', fx + 14, ROAD_TOP - 26);
  // avião (decola quando o tempo acaba)
  const cs = g.cs, py = MID, tt = cs ? cs.t - CUT.fly0 : -1;
  let dx = 0, sc = 1, al = 1;
  if (tt > 0) { dx = 160 * tt * tt; sc = 1 + 0.12 * tt; al = clamp(1 - (tt - 1.4) / 0.6, 0, 1); }
  if (al > 0) {
    ctx.save(); ctx.globalAlpha = al; ctx.translate(fx + 150 + dx, py); ctx.scale(sc, sc);
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(8, 14, 120, 18, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#cfd8e0'; ctx.beginPath(); ctx.moveTo(-20, -120); ctx.lineTo(25, -120); ctx.lineTo(10, 0); ctx.lineTo(25, 120); ctx.lineTo(-20, 120); ctx.lineTo(-10, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f4f7fa'; ctx.beginPath(); ctx.ellipse(10, 0, 130, 28, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#2b6cb0'; ctx.fillRect(-100, -4, 190, 8);
    ctx.fillStyle = '#9cd3ff'; ctx.beginPath(); ctx.ellipse(112, 0, 14, 10, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#e1e8ee'; ctx.beginPath(); ctx.moveTo(-110, 0); ctx.lineTo(-135, -48); ctx.lineTo(-100, -48); ctx.lineTo(-80, 0); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-110, 0); ctx.lineTo(-135, 48); ctx.lineTo(-100, 48); ctx.lineTo(-80, 0); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  // Trump: espera ao lado do avião; quando o tempo acaba, caminha até a porta e embarca
  let tx = fx + 215, ty = MID + 64, walk = null, talpha = 1, show = true, bubble = null;
  if (cs) {
    const k = clamp((cs.t - CUT.walk0) / (CUT.walk1 - CUT.walk0), 0, 1);
    if (cs.t >= CUT.walk0) { tx = fx + 215 - 47 * k; ty = MID + 64 - 26 * k; walk = cs.t * 13; talpha = k < .85 ? 1 : (1 - k) / .15; bubble = CONFIG.trumpBye; }
    if (cs.t >= CUT.walk1) show = false;
  } else if (g.p.x > fx - 520) bubble = CONFIG.trumpBubble;
  if (show) {
    ctx.save(); ctx.globalAlpha = talpha; ctx.translate(tx, ty); ctx.scale(-1.7, 1.7);
    Sprites.trump(ctx, g.t, g.over === 'win' || g.p.x > fx - 260, walk);
    ctx.restore();
    if (bubble) {
      ctx.font = 'bold 14px system-ui, sans-serif'; ctx.textAlign = 'center';
      const bw = ctx.measureText(bubble).width + 22, bx = tx - 20, by = ty - 104;
      ctx.fillStyle = '#fff'; Sprites.rr(ctx, bx - bw / 2, by - 12, bw, 26, 8); ctx.fill();
      ctx.beginPath(); ctx.moveTo(bx + 4, by + 14); ctx.lineTo(bx + 14, by + 14); ctx.lineTo(bx + 14, by + 26); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#1a1a1a'; ctx.fillText(bubble, bx, by + 6);
    }
  }
}

function drawObstacle(o, g) {
  ctx.save(); ctx.translate(o.x, o.y);
  if (o.t === 'car') {
    if (o.vx < 0) ctx.scale(-1, 1);          // sprite olha para a direita; espelha ao ir para a esquerda
    Sprites.car(ctx, o, g.t);
  } else if (o.t === 'person') {
    Sprites.protester(ctx, o, g.t);
    // "?" enquanto está te notando, "!" quando começa a perseguir
    if (o.active || o.alert > 0.3) {
      ctx.textAlign = 'center'; ctx.font = 'bold 16px system-ui';
      ctx.fillStyle = o.active ? '#ff3b3b' : '#ffcf33';
      ctx.fillText(o.active ? '!' : '?', -6, -o.r - 36);
    }
  } else if (o.t === 'cop') {
    Sprites.cop(ctx, o, g.t);
    if (o.active) { ctx.fillStyle = '#ff3b3b'; ctx.font = 'bold 18px system-ui'; ctx.textAlign = 'center'; ctx.fillText('!', 0, -34); }
  }
  ctx.restore();
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

function drawPlayer(g) {
  const p = g.p;
  const ft = g.t - g.downAt, fell = ft >= 0 && ft < FALL_TIME;
  if (!fell && g.inv > 0 && Math.floor(g.inv * 14) % 2 && state === 'play') return;
  if (g.over === 'win' && p.x > g.L - FINISH_PAD + 20) return;   // embarcou
  ctx.save(); ctx.translate(p.x, p.y);
  if (g.egg) {
    const t = g.egg.t;
    if (t >= EGG.sink && t < EGG.back) { ctx.restore(); return; }          // dentro da grade
    const k = t < EGG.sink ? 1 - ease(t / EGG.sink) : ease(clamp((t - EGG.back) / .6, 0, 1));
    ctx.globalAlpha = .25 + .75 * k; ctx.scale(.4 + .6 * k, .4 + .6 * k);
  }
  if (fell) {                                                    // cai para trás, fica deitado e se levanta no fim
    const k = ft < FALL_ANIM ? ease(ft / FALL_ANIM) : ft > FALL_TIME - FALL_ANIM ? ease((FALL_TIME - ft) / FALL_ANIM) : 1;
    ctx.translate(0, 11); ctx.rotate(-p.face * 1.5 * k); ctx.translate(0, -11);
  }
  Sprites.flavio(ctx, p.step, p.face, !fell && Math.hypot(p.vx, p.vy) > 15);
  if (g.cs && g.cs.t >= CUT.enter1) {                 // algemado
    ctx.strokeStyle = '#cfd6dd'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(-9, 3.5); ctx.lineTo(9, 3.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(-11.5, 3.5, 3.2, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(11.5, 3.5, 3.2, 0, 7); ctx.stroke();
  }
  ctx.restore();
  if (fell && ft > FALL_ANIM && ft < FALL_TIME - FALL_ANIM) {      // estrelinhas de tontura
    ctx.fillStyle = '#ffe14a';
    for (let k = 0; k < 3; k++) { const a = g.t * 6 + k * 2.1; ctx.beginPath(); ctx.arc(p.x - p.face * 14 + Math.cos(a) * 12, p.y - 16 + Math.sin(a) * 4, 2.6, 0, 7); ctx.fill(); }
  }
}
function drawEggScene(g) {
  const e = g.egg, t = e.t, s = 3.6, y0 = 340, jx = W / 2 + 29;
  // cela: parede de tijolos, janela gradeada, beliche e chão
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#1d2634'); bg.addColorStop(1, '#141a24');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = 2;
  for (let y = 0, r = 0; y < 392; y += 28, r++) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    for (let x = (r % 2) * 40; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 28); ctx.stroke(); }
  }
  ctx.fillStyle = '#2b323d'; ctx.fillRect(0, 392, W, H - 392);
  ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(0, 392, W, 3);
  ctx.fillStyle = '#0d2036'; ctx.fillRect(700, 70, 110, 100);                           // janela
  ctx.fillStyle = '#e8ecf2'; ctx.beginPath(); ctx.arc(760, 105, 14, 0, 7); ctx.fill();
  ctx.fillStyle = '#5b626d'; for (let i = 0; i < 4; i++) ctx.fillRect(712 + i * 28, 70, 6, 100);
  ctx.strokeStyle = '#4b525c'; ctx.lineWidth = 6; ctx.strokeRect(700, 70, 110, 100);
  ctx.fillStyle = '#3a4150'; ctx.fillRect(70, 250, 190, 12); ctx.fillRect(70, 330, 190, 12);     // beliche
  ctx.fillStyle = '#586172'; ctx.fillRect(76, 240, 178, 10); ctx.fillRect(76, 320, 178, 10);
  ctx.fillStyle = '#2d3340'; ctx.fillRect(70, 250, 8, 142); ctx.fillRect(252, 250, 8, 142);
  const sp = ctx.createRadialGradient(W / 2, 300, 40, W / 2, 300, 420); sp.addColorStop(0, 'rgba(255,240,200,.16)'); sp.addColorStop(1, 'rgba(0,0,0,.45)');
  ctx.fillStyle = sp; ctx.fillRect(0, 0, W, H);

  // posições: o Flávio entra caminhando, os dois se aproximam e se abraçam
  const walkK = clamp((t - EGG.scene0) / (EGG.hug0 - EGG.scene0), 0, 1);
  const hugK = ease(clamp((t - EGG.hug0) / (EGG.hug1 - EGG.hug0), 0, 1));
  const d = 190 - 98 * hugK;
  const fx = t < EGG.hug0 ? -90 + (jx - 190 + 90) * ease(walkK) : jx - d;
  const walking = t < EGG.hug0 && walkK < 1, hugging = t >= EGG.hug1 - 0.15;
  const bob = hugging ? Math.sin(t * 5) * 1.5 : 0;
  const line = CONFIG.eggLine, n = clamp(Math.floor((t - EGG.speak0) * 26), 0, line.length), talking = t >= EGG.speak0 && n < line.length;

  ctx.save(); ctx.translate(jx, y0 + bob); ctx.scale(-s, s); Sprites.jair(ctx, t, hugging ? 'none' : 'open', talking); ctx.restore();
  ctx.save(); ctx.translate(fx, y0 + bob); ctx.scale(s, s); Sprites.flavio(ctx, t * 9, 1, walking, hugging); ctx.restore();
  if (hugging) {                                                  // braços cruzando as costas um do outro
    const sy = y0 + bob - 8 * s, ey = y0 + bob - 5 * s, wd = 4.8 * s;
    Sprites.limb(ctx, jx - 9.5 * s, sy, fx - 8.5 * s, ey, wd, '#e8731c'); Sprites.ell(ctx, fx - 8.5 * s, ey, 2.6 * s, 2.6 * s, '#d9a984');
    Sprites.limb(ctx, fx + 9.5 * s, sy, jx + 8.5 * s, ey, wd, '#2b303c'); Sprites.ell(ctx, jx + 8.5 * s, ey, 2.6 * s, 2.6 * s, '#dcab88');
  }

  // balão de fala com texto "digitado"
  if (t >= EGG.speak0) {
    ctx.font = 'bold 22px system-ui, sans-serif'; ctx.textAlign = 'left';
    const maxW = 380, words = line.split(' '), lines = []; let cur = '';
    for (const w of words) { const test = cur ? cur + ' ' + w : w; if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; }
    lines.push(cur);
    const bw = maxW + 40, bh = lines.length * 30 + 28, bx = jx - 40 - bw / 2 + 60, by = 150 - bh / 2;
    ctx.fillStyle = '#fff'; Sprites.rr(ctx, bx, by, bw, bh, 14); ctx.fill();
    ctx.beginPath(); ctx.moveTo(jx - 50, by + bh - 1); ctx.lineTo(jx - 18, by + bh - 1); ctx.lineTo(jx - 28, y0 - 34 * s + 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#16181d'; let left = n;
    lines.forEach((ln, i) => { const part = ln.slice(0, Math.max(0, left)); left -= ln.length + 1; ctx.fillText(part, bx + 20, by + 34 + i * 30); });
  }
}

function drawMoraes(g) {
  const cs = g.cs, p = g.p, k = clamp((cs.t - CUT.enter0) / (CUT.enter1 - CUT.enter0), 0, 1);
  const startX = camFor(p.x) + W + 70, x = startX + (p.x + 34 - startX) * k;
  ctx.save(); ctx.translate(x, p.y + 3); ctx.scale(-1.15, 1.15);   // olha para o jogador
  Sprites.moraes(ctx, g.t, k < 1 ? cs.t * 12 : null, k < 1);   // depois de algemar, as algemas ficam só no Flávio
  ctx.restore();
}

function fmtTime(sec) { const s = Math.ceil(sec); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

function drawFx(g) {
  const cs = g.cs, egg = g.egg;
  ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  const big = (txt, y, size, color, a) => {
    ctx.save(); ctx.globalAlpha = a; ctx.font = `900 ${size}px system-ui, sans-serif`;
    ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.strokeText(txt, W / 2, y); ctx.fillStyle = color; ctx.fillText(txt, W / 2, y); ctx.restore();
  };
  if (state === 'play' && g.time < 2.4) {                       // abertura da fase
    const a = g.time < 1.6 ? 1 : clamp((2.4 - g.time) / 0.8, 0, 1);
    big(CONFIG.levelName, H / 2 - 6, 64, '#ffcf33', a);
    ctx.save(); ctx.globalAlpha = a; ctx.font = 'bold 22px system-ui'; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(0,0,0,.6)';
    const sub = `Chegue ao avião em ${fmtTime(g.diff.time || TIME_LIMIT)}`; ctx.strokeText(sub, W / 2, H / 2 + 30); ctx.fillStyle = '#fff'; ctx.fillText(sub, W / 2, H / 2 + 30); ctx.restore();
  }
  if (cs) {
    if (cs.t < 2.4) big(CONFIG.timeoutTitle.toUpperCase(), 92 + H / 2 * 0, 50, '#ff4040', cs.t < 1.6 ? 1 : clamp((2.4 - cs.t) / .8, 0, 1));
    const sk = cs.t - (CUT.zoom1 + 0.1);
    if (sk > 0) {                                                // carimbo
      const k = clamp(sk / .25, 0, 1), sc = 1.7 - 0.7 * k;
      ctx.save(); ctx.translate(W / 2, 128); ctx.rotate(-0.1); ctx.scale(sc, sc); ctx.globalAlpha = .55 + .4 * k;
      ctx.font = '900 64px system-ui, sans-serif'; const w = ctx.measureText(CONFIG.cuffedStamp).width + 36;
      ctx.strokeStyle = '#e03030'; ctx.lineWidth = 7; ctx.strokeRect(-w / 2, -52, w, 74); ctx.fillStyle = '#e03030'; ctx.fillText(CONFIG.cuffedStamp, 0, 0);
      ctx.restore();
    }
    if (cs.t > 1 && cs.t < CUT.enter1) { ctx.font = '13px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('Toque ou pressione qualquer tecla para pular', W / 2, H - 14); }
  }
  if (egg) {
    const t = egg.t;
    const a = t < .5 ? 0 : t < 1 ? (t - .5) / .5 : t < 1.4 ? 1 - (t - 1) / .4 : t < EGG.fadeOut ? 0 : t < EGG.back ? (t - EGG.fadeOut) / (EGG.back - EGG.fadeOut) : t < EGG.back + .4 ? 1 - (t - EGG.back) / .4 : 0;
    if (a > 0) { ctx.fillStyle = `rgba(0,0,0,${clamp(a, 0, 1)})`; ctx.fillRect(0, 0, W, H); }
    ctx.textAlign = 'right'; ctx.font = 'bold 12px system-ui'; ctx.fillStyle = '#ffcf33'; ctx.fillText('tempo pausado', W - 32, 64);
    ctx.fillRect(W - 26, 54, 3.5, 10); ctx.fillRect(W - 20, 54, 3.5, 10);          // ícone de pausa
    if (t > 2 && t < EGG.fadeOut) { ctx.textAlign = 'center'; ctx.font = '13px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('Toque ou pressione qualquer tecla para pular', W / 2, H - 14); }
  }
  const bt = g.t - g.bonusAt;                                    // "+5s" subindo ao lado do cronômetro
  if (bt >= 0 && bt < 1.8) {
    ctx.save(); ctx.globalAlpha = clamp(1.8 - bt, 0, 1); ctx.textAlign = 'right'; ctx.font = '900 26px system-ui';
    ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(0,0,0,.6)'; const txt = `+${EGG_BONUS}s`, y = 90 - bt * 14;
    ctx.strokeText(txt, W - 16, y); ctx.fillStyle = '#5be37d'; ctx.fillText(txt, W - 16, y); ctx.restore();
  }
}

function drawHUD(g) {
  // vidas
  // emojis herdam a opacidade do fillStyle: sem isto, o flash vermelho de dano (que termina em alpha 0) apagava os corações
  ctx.fillStyle = '#fff'; ctx.globalAlpha = 1;
  ctx.font = '22px system-ui, "Apple Color Emoji", "Noto Color Emoji", sans-serif'; ctx.textAlign = 'left';
  for (let i = 0; i < g.diff.lives; i++) { ctx.globalAlpha = i < g.lives ? 1 : .22; ctx.fillText('❤️', 14 + i * 28, 36); }
  ctx.globalAlpha = 1;
  // progresso
  const bx = W / 2 - 160, bw = 320, by = 26, prog = clamp(g.p.x / (g.L - FINISH_PAD), 0, 1);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; roundRect(bx, by, bw, 12, 6); ctx.fill();
  ctx.fillStyle = '#ffcf33'; roundRect(bx, by, Math.max(12, bw * prog), 12, 6); ctx.fill();
  ctx.fillStyle = '#ffcf33'; ctx.fillRect(bx + bw * (g.cpX / (g.L - FINISH_PAD)) - 1, by - 4, 3, 20);
  ctx.font = '16px system-ui, "Apple Color Emoji", "Noto Color Emoji", sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
  ctx.fillText('✈️', bx + bw + 18, by + 13);
  ctx.fillText('🏃', bx + (bw - 4) * prog + 6, by - 8);
  // tempo
  const rem = Math.max(0, limitOf(g) - g.time), urgent = rem <= 10 && state !== 'egg';
  ctx.textAlign = 'right';
  ctx.font = 'bold 11px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.fillText(CONFIG.levelName, W - 16, 18);
  ctx.font = 'bold 28px system-ui';
  ctx.fillStyle = urgent ? (Math.floor(g.t * 4) % 2 ? '#ffb3b3' : '#ff4040') : '#fff';
  ctx.fillText(fmtTime(rem), W - 16, 46);
  // dica de início
  if (g.time < 4 && state === 'play') {
    ctx.textAlign = 'center'; ctx.font = 'bold 18px system-ui'; ctx.fillStyle = `rgba(255,255,255,${clamp(4 - g.time, 0, 1)})`;
    ctx.fillText(g.auto ? '↑ ↓ para desviar — → acelera' : 'Use as setas / WASD ou arraste o dedo', W / 2, H - 28);
  }
  // analógico virtual
  if (touch.on) {
    const dx = touch.x - touch.ox, dy = touch.y - touch.oy, m = Math.hypot(dx, dy), k = m > 40 ? 40 / m : 1;
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(touch.ox, touch.oy, 40, 0, 7); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.arc(touch.ox + dx * k, touch.oy + dy * k, 18, 0, 7); ctx.fill();
  }
}

/* =========================================================
   ABERTURA (arte conceitual animada) — "Bolso 26"
   O Flávio tira a faixa presidencial do bolso; Lula e Xandão chegam apontando; ele corre e a faixa cai no chão.
   Xandão segue correndo; o Lula volta, pega a faixa e foge de novo. Só então aparece o menu.
   ========================================================= */
const INTRO = { fx0: 440, FY: 332, S: 3.6, pull0: 1.0, pull1: 2.2, title0: 2.0, notice: 3.4, enter0: 3.0, enter1: 4.2, point0: 4.2, run0: 5.2, xT: 700, lT: 830,
                chase0: 5.55, back0: 6.63, ret: 1.0, pick: .7, hold: .8, flee: .95, menu: 10.2, end: 10.5 };
INTRO.pick0 = INTRO.back0 + INTRO.ret; INTRO.hold0 = INTRO.pick0 + INTRO.pick; INTRO.flee0 = INTRO.hold0 + INTRO.hold;
const intro = { t: 0, drop: null, puffs: [], puffT: 0, menuShown: false };
const FLOOR_SASH = INTRO.FY - 22;
const introRun = t => Math.max(0, t - INTRO.run0);
const introFlavioX = t => { const r = introRun(t); return INTRO.fx0 - 260 * r * r - 40 * r; };
const introHand = t => {                                       // mão direita do Flávio em coordenadas do sprite (antes de virar)
  const k = ease(clamp((t - INTRO.pull0) / (INTRO.pull1 - INTRO.pull0), 0, 1)), up = [17, -19], pocket = [9, 3.5];
  return [pocket[0] + (up[0] - pocket[0]) * k, pocket[1] + (up[1] - pocket[1]) * k];
};
function introHeldPos(t) {                                     // onde fica a ponta de cima da faixa na mão do Flávio
  const S = INTRO.S, OY = INTRO.FY - 12 * S, h = introHand(t);
  return { x: introFlavioX(t) + h[0] * S + 2, y: OY + h[1] * S - 4 };
}
const chaseX = (tx, t) => { const c = t - INTRO.chase0; return tx - (260 * c + 520 * c * c); };
function lulaIntro(t, sashX) {                                 // posição/pose do Lula em cada momento da cena
  if (t < INTRO.enter0) return { x: 1500, face: -1, mode: 'off' };
  if (t < INTRO.chase0) { const k = ease(clamp((t - INTRO.enter0 - .25) / (INTRO.enter1 - INTRO.enter0), 0, 1)); return { x: 1200 + (INTRO.lT - 1200) * k, face: -1, mode: t >= INTRO.point0 ? 'point' : k < 1 ? 'run' : 'stand' }; }
  if (t < INTRO.back0) return { x: chaseX(INTRO.lT, t), face: -1, mode: 'run' };
  const stopX = sashX - 62;
  if (t < INTRO.pick0) { const k = ease(clamp((t - INTRO.back0) / INTRO.ret, 0, 1)); return { x: -60 + (stopX + 60) * k, face: 1, mode: k < .97 ? 'run' : 'stand' }; }
  if (t < INTRO.hold0) return { x: stopX, face: 1, mode: 'pick' };
  if (t < INTRO.flee0) return { x: stopX, face: 1, mode: 'hold' };
  const c = t - INTRO.flee0; return { x: stopX + 300 * c + 600 * c * c, face: 1, mode: 'flee' };
}
function updateIntro(dt) {
  const t = intro.t += dt, d = intro.drop;
  if (!d && t >= INTRO.run0 + .12) { const h = introHeldPos(INTRO.run0 + .12); intro.drop = { x: h.x, y: h.y + 50, vx: -90, vy: -300, rot: .05, vr: -5, landed: false }; sfx.hit(); }
  if (d && !d.landed) {
    d.vy += 1800 * dt; d.y += d.vy * dt; d.x += d.vx * dt; d.rot += d.vr * dt;
    if (d.y >= FLOOR_SASH) {
      d.y = FLOOR_SASH; d.vy *= -.36; d.vx *= .5; d.vr *= .45; beep(180 + 40 * Math.random(), .07, 'triangle', .06, 90);
      if (Math.abs(d.vy) < 70) { d.landed = true; d.vy = d.vx = d.vr = 0; }
    }
  } else if (d && d.landed) d.rot += (-.1 - d.rot) * Math.min(1, dt * 8);
  intro.puffT -= dt;                                            // poeira nos pés de quem corre
  if (intro.puffT <= 0) {
    intro.puffT = .05;
    if (t >= INTRO.run0 && t < INTRO.run0 + 1.5) intro.puffs.push({ x: introFlavioX(t) + 30, y: INTRO.FY + 2, t: 0 });
    if (d && d.landed) { const L = lulaIntro(t, d.x); if (L.mode === 'run' || L.mode === 'flee') intro.puffs.push({ x: L.x - L.face * 30, y: INTRO.FY + 2, t: 0 }); }
  }
  intro.puffs.forEach(p => p.t += dt); intro.puffs = intro.puffs.filter(p => p.t < .5);
  if (t >= INTRO.menu && !intro.menuShown) { intro.menuShown = true; showMenu(); }
}
function skipIntro() {
  if (state !== 'intro' || intro.t < 1) return;
  intro.t = INTRO.end; intro.puffs = [];
  intro.drop = { x: 470, y: FLOOR_SASH, vx: 0, vy: 0, rot: -.1, vr: 0, landed: true };
  intro.menuShown = true; showMenu();
}
function showMenu() {
  state = 'menu';
  $('#menu').classList.remove('hidden'); updateBest();
  const unlocked = store.get('done', false), row = $('#phaseRow');
  row.classList.toggle('hidden', !unlocked);
  if (unlocked) {
    const box = $('#phases'); box.innerHTML = '';
    const names = ['1 · Band', '2 · Globo', '3 · 1º turno', '4 · 2º turno', '5 · Ponte'], starts = [startBand, startQuiz, () => startUrna(1), () => startUrna(2), startBridge];
    names.forEach((n, i) => { const b = document.createElement('button'); b.className = 'choice small'; b.textContent = n; b.onclick = () => starts[i](); box.appendChild(b); });
  }
}

let introBGc = null;
function introBG() {
  if (!introBGc) {
    const cv = document.createElement('canvas'); cv.width = W * 2; cv.height = H * 2;
    const c = cv.getContext('2d'); c.scale(2, 2); const TAU = Math.PI * 2, rnd = mulberry32(5), HZ = 238;
    let g = c.createLinearGradient(0, 0, 0, HZ); g.addColorStop(0, '#171243'); g.addColorStop(.55, '#6a2b7c'); g.addColorStop(1, '#ff9a55'); c.fillStyle = g; c.fillRect(0, 0, W, HZ + 2);
    for (let i = 0; i < 60; i++) { c.fillStyle = `rgba(255,255,255,${.2 + rnd() * .6})`; c.beginPath(); c.arc(rnd() * W, rnd() * 120, .6 + rnd() * 1.2, 0, TAU); c.fill(); }
    g = c.createRadialGradient(480, HZ, 10, 480, HZ, 230); g.addColorStop(0, 'rgba(255,220,140,.85)'); g.addColorStop(1, 'rgba(255,160,90,0)'); c.fillStyle = g; c.fillRect(0, 0, W, HZ + 2);
    c.fillStyle = '#ffe9a8'; c.beginPath(); c.arc(480, HZ, 74, Math.PI, TAU); c.fill();
    // esplanada: prédios baixos e o Congresso (duas torres, cúpula e tigela)
    c.fillStyle = '#1b0e38';
    for (let x = 0; x < W; x += 34) { if (x > 360 && x < 600) continue; const h = 14 + rnd() * 30; c.fillRect(x, HZ - h, 30, h + 2); }
    c.fillRect(372, HZ - 16, 216, 18); c.fillRect(448, HZ - 96, 24, 84); c.fillRect(488, HZ - 96, 24, 84);
    c.beginPath(); c.arc(410, HZ - 16, 34, Math.PI, TAU); c.fill(); c.beginPath(); c.arc(552, HZ - 24, 34, 0, Math.PI); c.fill();
    c.fillStyle = 'rgba(255,220,140,.5)'; for (let i = 0; i < 6; i++) { c.fillRect(452, HZ - 90 + i * 12, 4, 5); c.fillRect(492, HZ - 90 + i * 12, 4, 5); }
    // ponte: pista, mureta e faixas
    g = c.createLinearGradient(0, HZ, 0, 350); g.addColorStop(0, '#34304a'); g.addColorStop(1, '#17141f'); c.fillStyle = g; c.fillRect(0, HZ, W, 350 - HZ);
    c.fillStyle = '#9a93ad'; c.fillRect(0, HZ, W, 9); c.fillStyle = '#5b5670'; c.fillRect(0, HZ + 9, W, 3);
    c.fillStyle = '#ffd25a'; for (let x = 10; x < W; x += 90) c.fillRect(x, 296, 50, 4);
    c.fillStyle = '#0b0912'; c.fillRect(0, 350, W, H - 350);
    g = c.createLinearGradient(0, 340, 0, 372); g.addColorStop(0, 'rgba(255,200,120,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 340, W, 32);
    g = c.createRadialGradient(480, 280, 200, 480, 280, 640); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    introBGc = cv;
  }
  ctx.drawImage(introBGc, 0, 0, W, H);
}

/* ---- faixa presidencial: fita verde com listra amarela, franjas douradas e roseta ---- */
const SASH = { N: 18, L: 150, W: 26 };
function sashPts(kind, o) {
  const N = SASH.N, L = SASH.L, pts = [];
  for (let i = 0; i <= N; i++) {
    const s = i / N;
    if (kind === 'lying') {                                      // deitada (e caindo), com ondulação
      const lx = (s - .5) * L * (o.len || 1), ly = Math.sin(s * 7.5 + (o.ph || 0)) * o.amp, c = Math.cos(o.rot), sn = Math.sin(o.rot);
      pts.push([o.x + lx * c - ly * sn, o.y + (lx * sn + ly * c) * o.sq]);
    } else if (kind === 'hang') pts.push([o.x + Math.sin(o.t * 3 + s * 4) * 9 * s, o.y + s * L * .92 * (o.len || 1)]);       // pendurada pela mão
    else pts.push([o.x - o.dir * s * L * .95, o.y + Math.sin(s * 9 - o.t * 22) * 9 * s + s * 10]);                            // esvoaçando atrás de quem corre
  }
  return pts;
}
function drawSash(pts, w, glow) {
  const n = pts.length, Lp = [], Rp = [], Lc = [], Rc = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len, [x, y] = pts[i];
    Lp.push([x + nx * w / 2, y + ny * w / 2]); Rp.push([x - nx * w / 2, y - ny * w / 2]); Lc.push([x + nx * w * .15, y + ny * w * .15]); Rc.push([x - nx * w * .15, y - ny * w * .15]);
  }
  const poly = (A, B) => { ctx.beginPath(); A.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); for (let i = B.length - 1; i >= 0; i--) ctx.lineTo(B[i][0], B[i][1]); ctx.closePath(); };
  ctx.save(); ctx.lineJoin = 'round';
  if (glow) { ctx.shadowColor = `rgba(255,230,90,${glow})`; ctx.shadowBlur = 20; }
  poly(Lp, Rp); ctx.fillStyle = '#12a24a'; ctx.fill(); ctx.shadowBlur = 0; ctx.lineWidth = 2; ctx.strokeStyle = '#06512a'; ctx.stroke();
  poly(Lc, Rc); ctx.fillStyle = '#ffd60a'; ctx.fill();
  // franjas douradas nas duas pontas
  [[0, 1], [n - 1, n - 2]].forEach(([i, j]) => {
    const [x, y] = pts[i], dx = x - pts[j][0], dy = y - pts[j][1], len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    ctx.strokeStyle = '#e8b923'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
    for (let k = 0; k <= 6; k++) { const off = (k / 6 - .5) * w, sx = x + nx * off, sy = y + ny * off; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + ux * 11, sy + uy * 11); ctx.stroke(); }
  });
  // roseta dourada
  const [rx, ry] = pts[Math.round(n * .3)], rg = ctx.createRadialGradient(rx - 2, ry - 2, 1, rx, ry, w * .62); rg.addColorStop(0, '#fff2a6'); rg.addColorStop(1, '#d99a0b');
  ctx.fillStyle = rg; ctx.strokeStyle = '#7a5206'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(rx, ry, w * .62, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#12a24a'; ctx.beginPath(); ctx.arc(rx, ry, w * .3, 0, 7); ctx.fill(); ctx.fillStyle = '#ffd60a'; ctx.beginPath(); ctx.arc(rx, ry, w * .12, 0, 7); ctx.fill();
  ctx.restore();
}
function introBubble(x, y, text) {
  ctx.save(); ctx.font = '900 18px system-ui, sans-serif'; ctx.textAlign = 'center'; const w = ctx.measureText(text).width + 26;
  ctx.fillStyle = '#fff'; Sprites.rr(ctx, x - w / 2, y - 20, w, 36, 12); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 6, y + 15); ctx.lineTo(x + 8, y + 15); ctx.lineTo(x + 20, y + 32); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#1a1226'; ctx.fillText(text, x, y + 5); ctx.restore();
}
function introPointArm(sleeve, skin, t) {                      // braço de apontar (espaço do sprite, olhando para a direita)
  const hy = -13 + Math.sin(t * 16) * 1.8;
  Sprites.limb(ctx, 10, -8, 30, hy, 5, sleeve); Sprites.ell(ctx, 30, hy, 2.6, 2.6, skin); Sprites.limb(ctx, 31, hy - .4, 37.5, hy - 1.6, 1.9, skin);
}
function lulaPickHand(t) {                                     // mão do Lula ao abaixar para pegar a faixa e erguê-la
  const u = t - INTRO.pick0;
  if (u < .3) { const k = ease(clamp(u / .3, 0, 1)); return [13 + 11 * k, 2.8 + 8.2 * k]; }
  if (u < .7) { const k = ease(clamp((u - .3) / .4, 0, 1)); return [24 - 7 * k, 11 - 30 * k]; }
  return [17, -19 + Math.sin(t * 10) * 1.2];
}
function drawLulaIntro(L, t, OY, S) {
  const { x, face, mode } = L;
  if (x > W + 180 || x < -180) return null;
  const running = mode === 'run' || mode === 'flee', ph = t * (running ? 20 : 11), sleeve = '#1f2a46', skin = '#d9a587';
  const u = t - INTRO.pick0, crouch = mode === 'pick' ? 11 * (u < .35 ? ease(clamp(u / .35, 0, 1)) : 1 - ease(clamp((u - .35) / .35, 0, 1))) : 0;
  const bob = (running ? -Math.abs(Math.sin(ph)) * 3 : 0) + crouch;
  ctx.save(); ctx.translate(x, OY + bob); ctx.scale(face * S, S); if (running) ctx.rotate(.1);
  Sprites.lula(ctx, t, true);
  const sw = running ? Math.sin(ph) * 4 : 0;
  let hand = null;                                               // mão do braço da frente (para prender a faixa)
  if (mode === 'point') { Sprites.limb(ctx, -10, -8, -13, 1, 5, sleeve); Sprites.ell(ctx, -13, 2.8, 2.5, 2.5, skin); introPointArm(sleeve, skin, t + 1); }
  else if (mode === 'pick') { hand = lulaPickHand(t); Sprites.limb(ctx, -10, -8, -13, 1, 5, sleeve); Sprites.ell(ctx, -13, 2.8, 2.5, 2.5, skin); Sprites.limb(ctx, 10, -8, hand[0], hand[1], 5, sleeve); Sprites.ell(ctx, hand[0], hand[1] + 1.4, 2.6, 2.6, skin); }
  else if (mode === 'hold') { hand = lulaPickHand(t); Sprites.limb(ctx, -10, -8, -17, -19 + Math.sin(t * 10 + 1) * 1.2, 5, sleeve); Sprites.ell(ctx, -17, -20, 2.6, 2.6, skin); Sprites.limb(ctx, 10, -8, hand[0], hand[1], 5, sleeve); Sprites.ell(ctx, hand[0], hand[1] - 1, 2.6, 2.6, skin); }
  else if (mode === 'flee') { hand = [15, -9 + Math.sin(ph) * 2]; Sprites.limb(ctx, -10, -8, -12 - sw, 1, 5, sleeve); Sprites.ell(ctx, -12 - sw, 2.8, 2.5, 2.5, skin); Sprites.limb(ctx, 10, -8, hand[0], hand[1], 5, sleeve); Sprites.ell(ctx, hand[0], hand[1] + 1, 2.6, 2.6, skin); }
  else { Sprites.limb(ctx, -10, -8, -13 + sw, 1, 5, sleeve); Sprites.ell(ctx, -13 + sw, 2.8, 2.5, 2.5, skin); Sprites.limb(ctx, 10, -8, 13 - sw, 1, 5, sleeve); Sprites.ell(ctx, 13 - sw, 2.8, 2.5, 2.5, skin); }
  ctx.restore();
  return hand ? { x: x + face * S * hand[0], y: OY + bob + S * hand[1] } : null;
}
function drawIntro() {
  const t = intro.t, S = INTRO.S, FY = INTRO.FY, OY = FY - 12 * S, run = t >= INTRO.run0, rt = introRun(t), idle = state === 'menu' ? performance.now() / 1000 : t;
  introBG();
  const d = intro.drop, picked = t >= INTRO.pick0 + .3;
  // faixa caída no chão (sombra, brilho e a própria faixa)
  if (d && !picked) {
    const lift = clamp((FLOOR_SASH - d.y) / 120, 0, 1), sq = 1 - .5 * (1 - lift), pulse = .5 + .5 * Math.sin(idle * 3);
    ctx.fillStyle = `rgba(0,0,0,${.4 * (1 - lift * .7)})`; ctx.beginPath(); ctx.ellipse(d.x, FLOOR_SASH + 12, 78 * (1 - lift * .3), 11, 0, 0, 7); ctx.fill();
    if (d.landed) {
      const g = ctx.createRadialGradient(d.x, FLOOR_SASH, 4, d.x, FLOOR_SASH, 130); g.addColorStop(0, `rgba(255,214,90,${.22 + .12 * pulse})`); g.addColorStop(1, 'rgba(255,214,90,0)');
      ctx.fillStyle = g; ctx.fillRect(d.x - 140, FLOOR_SASH - 90, 280, 180);
    }
    const lying = sashPts('lying', { x: d.x, y: d.y, rot: d.rot, sq, amp: d.landed ? 7 : 15, len: .9, ph: d.landed ? .6 : t * 8 });
    if (t >= INTRO.pick0 + .3 - .01) { /* já começou a levantar */ }
    drawSash(lying, SASH.W, d.landed ? .3 + .3 * pulse : 0);
    if (d.landed && t > INTRO.run0 + 1.6) {                      // brilhinhos
      ctx.fillStyle = '#fff6c0';
      for (let i = 0; i < 4; i++) { const a = idle * 1.5 + i * 1.57, k = .5 + .5 * Math.sin(idle * 4 + i * 2), r = 5 * k, sx = d.x + Math.cos(a * 1.3 + i) * 70, sy = FLOOR_SASH - 4 + Math.sin(a + i) * 20;
        ctx.beginPath(); ctx.moveTo(sx, sy - r); ctx.lineTo(sx + r * .3, sy - r * .3); ctx.lineTo(sx + r, sy); ctx.lineTo(sx + r * .3, sy + r * .3); ctx.lineTo(sx, sy + r); ctx.lineTo(sx - r * .3, sy + r * .3); ctx.lineTo(sx - r, sy); ctx.lineTo(sx - r * .3, sy - r * .3); ctx.closePath(); ctx.fill(); }
    }
  }
  intro.puffs.forEach(p => { const k = p.t / .5; ctx.fillStyle = `rgba(220,200,190,${.5 * (1 - k)})`; ctx.beginPath(); ctx.arc(p.x + k * 20, p.y - k * 10, 6 + k * 14, 0, 7); ctx.fill(); });

  // Xandão (entra, aponta, sai correndo atrás do Flávio) e Lula (idem, mas volta para pegar a faixa)
  const chase = t - INTRO.chase0, pointing = t >= INTRO.point0 && chase < 0;
  let xx = 1500;
  if (t >= INTRO.enter0) { xx = chase >= 0 ? chaseX(INTRO.xT, t) : 1200 + (INTRO.xT - 1200) * ease(clamp((t - INTRO.enter0) / (INTRO.enter1 - INTRO.enter0), 0, 1)); }
  if (xx < W + 120 && xx > -180) {
    const wk = chase >= 0 || Math.abs(xx - INTRO.xT) > 2;
    ctx.save(); ctx.translate(xx, OY + (wk ? -Math.abs(Math.sin(t * 12)) * 3 : 0)); ctx.scale(-S, S); if (chase >= 0) ctx.rotate(.1);
    Sprites.moraes(ctx, t, wk ? t * (chase >= 0 ? 20 : 11) : null, false, pointing); ctx.restore();
  }
  const L = lulaIntro(t, d ? d.x : 470), lhand = drawLulaIntro(L, t, OY, S);
  if (lhand && d) {                                              // faixa na mão do Lula: sendo erguida, exibida ou esvoaçando na fuga
    if (L.mode === 'pick') {
      const k = ease(clamp((t - INTRO.pick0 - .3) / .4, 0, 1));
      if (k > 0) {
        const lying = sashPts('lying', { x: d.x, y: d.y, rot: d.rot, sq: .5, amp: 7, len: .9, ph: .6 }), hang = sashPts('hang', { x: lhand.x, y: lhand.y, t, len: 1 });
        drawSash(lying.map((p, i) => [p[0] + (hang[i][0] - p[0]) * k, p[1] + (hang[i][1] - p[1]) * k]), SASH.W, 0);
      }
    } else if (L.mode === 'hold') drawSash(sashPts('hang', { x: lhand.x, y: lhand.y, t: t * 1.4, len: 1 }), SASH.W, .35);
    else if (L.mode === 'flee') drawSash(sashPts('stream', { x: lhand.x, y: lhand.y, dir: L.face, t }), SASH.W, .25);
  }

  // Flávio
  const fx = introFlavioX(t);
  if (fx > -140) {
    const step = rt * 14, bob = run ? -Math.abs(Math.sin(step)) * 6 : Math.sin(t * 2.2) * 1.2;
    ctx.save(); ctx.translate(fx, OY + bob); ctx.scale(run ? -S : S, S); if (run) ctx.rotate(.12);
    Sprites.flavio(ctx, step, 1, run, true);
    const sleeve = '#2b303c', skin = '#dcab88', sw = Math.sin(step);
    const la = run ? [-9 + sw * 6, 1 + Math.abs(Math.cos(step)) * 1.5] : [-12, 1];
    Sprites.limb(ctx, -9.5, -8, la[0], la[1], 4.6, sleeve); Sprites.ell(ctx, la[0], la[1] + 1.8, 2.5, 2.5, skin);
    let h = introHand(t);
    if (run) { const k = clamp(rt / .14, 0, 1); h = [h[0] + (9 - sw * 6 - h[0]) * k, h[1] + (1 - h[1]) * k]; }
    Sprites.limb(ctx, 9.5, -8, h[0], h[1], 4.6, sleeve); Sprites.ell(ctx, h[0], h[1] + 1.6, 2.5, 2.5, skin);
    ctx.restore();
    if (t >= INTRO.pull0 && !d) {                                // a faixa saindo do bolso e sendo erguida
      const k = ease(clamp((t - INTRO.pull0) / (INTRO.pull1 - INTRO.pull0), 0, 1)), p = introHeldPos(t);
      drawSash(sashPts('hang', { x: p.x, y: p.y, t: t * (t > INTRO.notice ? 3 : 1), len: .25 + .75 * k }), SASH.W, .4 * k);
    }
    if (t >= INTRO.notice && t < INTRO.run0) {                   // "!" de susto
      ctx.save(); ctx.textAlign = 'center'; ctx.font = '900 56px system-ui'; ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.7)'; ctx.lineJoin = 'round'; ctx.fillStyle = '#ff4040';
      const yy = OY - 36 * S - 6 - Math.abs(Math.sin(t * 14)) * 6; ctx.strokeText('!', fx, yy); ctx.fillText('!', fx, yy); ctx.restore();
    }
  }
  if (pointing && t > INTRO.point0 + .1) { introBubble(xx - 30, 150, 'Parado aí!'); introBubble(L.x - 30, 118, 'Olha ele aí!'); }
  if (L.mode === 'hold' && t > INTRO.hold0 + .1) introBubble(L.x + 10, 118, 'Agora é minha!');

  // título
  const ta = ease(clamp((t - INTRO.title0) / .6, 0, 1));
  if (ta > 0) {
    ctx.save(); ctx.translate(W / 2, 74); const sc = 1.35 - .35 * ta; ctx.scale(sc, sc); ctx.globalAlpha = ta; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
    ctx.font = '900 76px system-ui, sans-serif'; const wb = ctx.measureText('BOLSO ').width, w26 = ctx.measureText('26').width, x0 = -(wb + w26) / 2;
    ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(20,6,30,.85)'; ctx.strokeText('BOLSO ', x0, 0); ctx.strokeText('26', x0 + wb, 0);
    ctx.fillStyle = '#fff'; ctx.fillText('BOLSO ', x0, 0);
    const g = ctx.createLinearGradient(0, -60, 0, 8); g.addColorStop(0, '#fff4ae'); g.addColorStop(1, '#f59e1a'); ctx.fillStyle = g; ctx.fillText('26', x0 + wb, 0); ctx.restore();
  }
  if (state === 'intro' && t < .6) { ctx.fillStyle = `rgba(0,0,0,${1 - t / .6})`; ctx.fillRect(0, 0, W, H); }
  if (state === 'intro' && t > 1 && t < INTRO.menu) { ctx.textAlign = 'center'; ctx.font = '13px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillText('Toque ou pressione qualquer tecla para pular', W / 2, H - 14); }
}

/* ---------- loop e resize ---------- */
function resize() {
  const r = stage.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
  scale = canvas.width / W;
  stage.style.setProperty('--u', (r.width / W) + 'px');
}
addEventListener('resize', resize);
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (state === 'intro') updateIntro(dt);
  else if (band && (state === 'band' || state === 'duelEnd')) updateBand(dt);
  else if (quiz && (state === 'quiz' || state === 'duelEnd')) updateQuiz(dt);
  else if (state === 'play') update(dt);
  else if (state === 'cut') updateCut(dt);
  else if (state === 'egg') updateEgg(dt);
  else if (state === 'urna') urnaUpdate(dt);
  else if (state === 'fraud') updateFraud(dt);
  else if (state === 'zanin') updateZanin(dt);
  else if (state === 'end' && G) { G.t += dt; }
  draw();
  requestAnimationFrame(frame);
}

initMenu(); initUrna(); resize();
requestAnimationFrame(frame);

// teste/depuração via console: window.__game
window.__game = { get intro() { return intro; }, skipIntro, showMenu, get band() { return band; }, get quiz() { return quiz; }, startBand, startQuiz, get G() { return G; }, get state() { return state; }, get urna() { return urna; }, get frd() { return frd; }, get zn() { return zn; }, start: startBridge, startUrna, startFraud };
})();
