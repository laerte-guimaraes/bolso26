/* Sprites desenhados em canvas (sem imagens externas).
   Convenção: origem = centro da hitbox, pés em y ≈ +11, olhando para a direita (o chamador espelha com scale(-1,1)).
   As caricaturas são desenhos cartunescos e exagerados de figuras públicas, feitos para sátira. */
window.Sprites = (() => {
  const TAU = Math.PI * 2;

  function rr(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function ell(c, x, y, rx, ry, fill, rot = 0) { c.fillStyle = fill; c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, TAU); c.fill(); }
  function limb(c, x1, y1, x2, y2, w, col) {
    c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round';
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  }
  function star(c, cx, cy, R, r, fill) {
    c.fillStyle = fill; c.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r : R; c.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad); }
    c.closePath(); c.fill();
  }
  // foice e martelo (símbolo do comunismo), desenhados em ~12x12 unidades centradas em (cx, cy)
  function hammerSickle(c, cx, cy, s, col) {
    c.save(); c.translate(cx, cy); c.scale(s, s);
    c.strokeStyle = col; c.fillStyle = col; c.lineCap = 'round';
    // martelo: cabo diagonal + cabeça
    c.lineWidth = 1.3; c.beginPath(); c.moveTo(-3.6, 4.4); c.lineTo(2.6, -3); c.stroke();
    c.save(); c.translate(2.8, -3.2); c.rotate(-0.87); c.fillRect(-1.2, -2.7, 2.4, 5.4); c.restore();
    // foice: cabo + lâmina curva
    c.beginPath(); c.moveTo(3.6, 4.4); c.lineTo(-0.8, -0.3); c.stroke();
    c.beginPath(); c.moveTo(-1.2, -0.6); c.quadraticCurveTo(-5.6, -4.6, 0.8, -6); c.quadraticCurveTo(-3.2, -3.8, 0.2, -0.4); c.closePath(); c.fill();
    c.restore();
  }
  function shadow(c, rx = 13) { ell(c, 0, 12, rx, 4.5, 'rgba(0,0,0,.3)'); }

  /* ---------------- Flávio Bolsonaro (caricatura) ----------------
     Baseado em foto de referência: rosto alongado com queixo marcado, cabelo escuro penteado para cima
     e para o lado com têmporas grisalhas, sobrancelhas grossas e retas, olhos claros, nariz reto e longo,
     barba por fazer, terno escuro, camisa branca, gravata azul estampada e pin dourado na lapela. */
  function flavio(c, step, face, moving, noArms) {
    const sw = Math.sin(step), bob = moving ? -Math.abs(Math.cos(step)) * 1.6 : 0, skin = '#dcab88';
    shadow(c);
    // pernas e sapatos
    limb(c, -3.5, 3, -3.5 + sw * 4, 10, 5, '#1d212b'); limb(c, 3.5, 3, 3.5 - sw * 4, 10, 5, '#1d212b');
    ell(c, -3.5 + sw * 4, 11.2, 4.2, 2.2, '#0b0b0b'); ell(c, 3.5 - sw * 4, 11.2, 4.2, 2.2, '#0b0b0b');
    c.save(); c.translate(0, bob);
    // terno escuro + camisa branca + gravata azul
    c.fillStyle = '#2b303c'; rr(c, -9.5, -11, 19, 17, 5); c.fill();
    c.fillStyle = '#f6f6f6'; c.beginPath(); c.moveTo(-4.6, -11.5); c.lineTo(4.6, -11.5); c.lineTo(0, -1.5); c.closePath(); c.fill();
    c.fillStyle = '#20242e'; c.beginPath(); c.moveTo(-9.5, -9); c.lineTo(-4.2, -11); c.lineTo(0, -1.5); c.lineTo(-3.5, 6); c.lineTo(-9.5, 6); c.closePath(); c.fill();   // lapela esq.
    c.beginPath(); c.moveTo(9.5, -9); c.lineTo(4.2, -11); c.lineTo(0, -1.5); c.lineTo(3.5, 6); c.lineTo(9.5, 6); c.closePath(); c.fill();                              // lapela dir.
    c.fillStyle = '#f6f6f6'; c.beginPath(); c.moveTo(-4.2, -11.4); c.lineTo(0, -9.6); c.lineTo(-1.2, -7.4); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(4.2, -11.4); c.lineTo(0, -9.6); c.lineTo(1.2, -7.4); c.closePath(); c.fill();
    c.fillStyle = '#2f5fa8'; c.beginPath(); c.moveTo(-1.5, -9.8); c.lineTo(1.5, -9.8); c.lineTo(2.5, -1); c.lineTo(0, 3); c.lineTo(-2.5, -1); c.closePath(); c.fill();
    c.fillStyle = 'rgba(190,215,255,.7)'; [[-0.6, -7], [0.8, -5.5], [-0.8, -3.6], [0.6, -1.8], [-0.2, 0]].forEach(([x, y]) => c.fillRect(x, y, 0.9, 0.9));
    ell(c, 5.2, -4.8, 1, 1, '#e5b932');                                                  // pin dourado
    // braços
    if (!noArms) {
      limb(c, -9.5, -8, -12 - sw * 3, 1, 4.6, '#2b303c'); limb(c, 9.5, -8, 12 + sw * 3, 1, 4.6, '#2b303c');
      ell(c, -12 - sw * 3, 2.8, 2.5, 2.5, skin); ell(c, 12 + sw * 3, 2.8, 2.5, 2.5, skin);
    }
    // orelhas, crânio e mandíbula marcada (rosto alongado)
    ell(c, -10.2, -22, 2.2, 3.2, skin); ell(c, 10.2, -22, 2.2, 3.2, skin);
    ell(c, 0, -25, 10, 10.2, skin);
    c.fillStyle = skin; rr(c, -8.8, -26, 17.6, 15.6, 6); c.fill();
    // barba por fazer
    c.save(); rr(c, -8.8, -26, 17.6, 15.6, 6); c.clip();
    c.fillStyle = 'rgba(45,35,32,.34)'; c.beginPath(); c.ellipse(0, -10.5, 10, 7.6, 0, 0, TAU); c.fill();
    c.restore();
    // cabelo escuro penteado para cima/lado; têmporas grisalhas
    c.fillStyle = '#2a1e18'; c.beginPath();
    c.arc(0, -25, 10.9, Math.PI * 1.07, Math.PI * 1.93);
    c.lineTo(8.6, -28.2); c.lineTo(5, -30.4); c.lineTo(-1, -29.4); c.lineTo(-6.5, -30.2); c.lineTo(-8.8, -27.8); c.closePath(); c.fill();
    ell(c, 2.2, -34.6, 8, 3.1, '#2a1e18', .12);                                          // volume do topete
    ell(c, -9.6, -27, 1.5, 2.6, '#8a847f', .15); ell(c, 9.6, -27, 1.5, 2.6, '#8a847f', -.15);   // têmporas grisalhas
    ell(c, -7.2, -30.6, 2.2, 1, '#5b514b', -.4); ell(c, 7.2, -30.6, 2.2, 1, '#5b514b', .4);
    // sobrancelhas grossas, retas e levemente franzidas
    limb(c, -8, -25.4, -2.2, -24.2, 2.6, '#1f1511'); limb(c, 2.2, -24.2, 8, -25.4, 2.6, '#1f1511');
    // olhos claros
    ell(c, -4.5, -22, 2.3, 1.45, '#f3f1ee'); ell(c, 4.5, -22, 2.3, 1.45, '#f3f1ee');
    ell(c, -4.5 + face * .6, -22, 1.1, 1.15, '#5f7d8c'); ell(c, 4.5 + face * .6, -22, 1.1, 1.15, '#5f7d8c');
    ell(c, -4.5 + face * .6, -22, .5, .5, '#111');       ell(c, 4.5 + face * .6, -22, .5, .5, '#111');
    c.strokeStyle = '#4a3328'; c.lineWidth = 1; c.beginPath(); c.arc(-4.5, -22, 2.4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke();
    c.beginPath(); c.arc(4.5, -22, 2.4, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke();
    // nariz reto e longo, com sombra do lado
    ell(c, 0, -18, 1.9, 3.3, '#d19b78'); ell(c, 1, -17.8, 1, 3, 'rgba(150,100,75,.35)');
    ell(c, -1.1, -14.7, .7, .5, '#8a5a45'); ell(c, 1.1, -14.7, .7, .5, '#8a5a45');
    // boca fina, séria (abre ao correr)
    if (moving) ell(c, 0, -12.6, 3, 1.6, '#4a1a1a');
    else { c.strokeStyle = '#6b3028'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(-3.4, -12.7); c.lineTo(3.4, -12.7); c.stroke(); }
    c.restore();
  }

  /* ---------------- Donald Trump (caricatura) ----------------
     Cabelo loiro em topete, pele alaranjada, terno azul-marinho e gravata vermelha longa.
     Desenhado olhando para a direita; o jogo espelha para ele olhar para o jogador. */
  function trump(c, t, excited, walk) {
    const skin = '#f0a15c', sp = excited ? 11 : 4, wave = Math.sin(t * sp), ws = walk == null ? 0 : Math.sin(walk) * 4;
    shadow(c, 14);
    limb(c, -4, 3, -4 + ws, 10, 5.6, '#18213a'); limb(c, 4, 3, 4 - ws, 10, 5.6, '#18213a');
    ell(c, -4 + ws, 11.2, 4.6, 2.3, '#0b0b0b'); ell(c, 4 - ws, 11.2, 4.6, 2.3, '#0b0b0b');
    // terno
    c.fillStyle = '#1d2a4a'; rr(c, -10.5, -12, 21, 19, 5); c.fill();
    c.fillStyle = '#f6f6f6'; c.beginPath(); c.moveTo(-4, -12); c.lineTo(4, -12); c.lineTo(0, -3); c.closePath(); c.fill();
    // gravata vermelha longa
    c.fillStyle = '#c4231a'; c.beginPath(); c.moveTo(-2, -11); c.lineTo(2, -11); c.lineTo(3.4, 4); c.lineTo(0, 8.5); c.lineTo(-3.4, 4); c.closePath(); c.fill();
    c.fillStyle = '#9a1812'; c.fillRect(-2, -11, 4, 2.4);
    // braço esquerdo parado, direito acenando (mãozinha pequena)
    limb(c, -10, -9, -12.5, 0, 4.8, '#1d2a4a'); ell(c, -12.5, 2, 2.3, 2.3, skin);
    limb(c, 10, -9, 15.5, -17 + wave * 2, 4.8, '#1d2a4a'); ell(c, 16, -19.5 + wave * 3, 2.4, 2.4, skin);
    // cabeça
    ell(c, 0, -22, 12, 11.5, skin);
    ell(c, -11.6, -21, 2.4, 3, skin); ell(c, 11.6, -21, 2.4, 3, skin);
    // contorno branco ao redor dos olhos
    ell(c, -4.3, -22.2, 4.4, 3.4, 'rgba(255,225,190,.9)'); ell(c, 4.3, -22.2, 4.4, 3.4, 'rgba(255,225,190,.9)');
    // topete loiro
    c.fillStyle = '#f5d884';
    c.beginPath(); c.ellipse(0, -30, 13, 6.2, -0.12, Math.PI, 0); c.fill();
    c.beginPath(); c.moveTo(-12, -29); c.quadraticCurveTo(0, -34, 14, -26); c.quadraticCurveTo(17, -23.5, 12, -24.5);
    c.quadraticCurveTo(2, -27, -9, -23); c.closePath(); c.fill();
    c.fillStyle = '#e3bd62'; c.fillRect(-12.2, -28, 2.6, 6);
    c.fillStyle = '#d9b05a'; c.beginPath(); c.moveTo(-6, -29); c.quadraticCurveTo(2, -31, 11, -27); c.lineTo(10, -26); c.quadraticCurveTo(2, -28.5, -6, -27.6); c.closePath(); c.fill();
    // sobrancelhas, olhos, nariz, boca
    limb(c, -7.6, -26, -2, -25.4, 2, '#d6ad58'); limb(c, 2, -25.4, 7.6, -26, 2, '#d6ad58');
    ell(c, -4, -22.2, 1.9, 1.5, '#fff'); ell(c, 4, -22.2, 1.9, 1.5, '#fff');
    ell(c, -3.6, -22.1, 1, 1.1, '#3f74b3'); ell(c, 4.4, -22.1, 1, 1.1, '#3f74b3');
    ell(c, 1.2, -18.8, 2.7, 3, '#e58f52');
    ell(c, 0.8, -14.3, 3, 1.6, '#a2403a');    // boquinha franzida
  }

  /* ---------------- Alexandre de Moraes (caricatura) ----------------
     Baseado em foto de referência: totalmente careca (cabeça redonda e brilhante), orelhas salientes,
     sobrancelhas retas e escuras, olhos de pálpebra pesada com olheiras, nariz largo, boca fina e séria,
     terno preto, camisa azul-clara e gravata azul listrada. Sem óculos.
     `walk` = fase do passo (ou null parado); `hold` = segura algemas. */
  function moraes(c, t, walk, hold) {
    const skin = '#d8a47e', dark = '#b97f60', ws = walk == null ? 0 : Math.sin(walk) * 3.8;
    shadow(c, 14);
    // pernas e sapatos
    limb(c, -3.6, 3, -3.6 + ws, 10, 5.2, '#141418'); limb(c, 3.6, 3, 3.6 - ws, 10, 5.2, '#141418');
    ell(c, -3.6 + ws, 11.3, 4.2, 2.2, '#050505'); ell(c, 3.6 - ws, 11.3, 4.2, 2.2, '#050505');
    // terno preto, camisa azul-clara, gravata azul listrada
    c.fillStyle = '#1a1a20'; rr(c, -10, -11, 20, 17.5, 5); c.fill();
    c.fillStyle = '#a9c3e6'; c.beginPath(); c.moveTo(-5, -11.6); c.lineTo(5, -11.6); c.lineTo(0, -1.2); c.closePath(); c.fill();
    c.fillStyle = '#101015'; c.beginPath(); c.moveTo(-10, -9); c.lineTo(-4.6, -11); c.lineTo(0, -1.2); c.lineTo(-3.6, 6.5); c.lineTo(-10, 6.5); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(10, -9); c.lineTo(4.6, -11); c.lineTo(0, -1.2); c.lineTo(3.6, 6.5); c.lineTo(10, 6.5); c.closePath(); c.fill();
    c.fillStyle = '#a9c3e6'; c.beginPath(); c.moveTo(-4.6, -11.5); c.lineTo(0, -9.6); c.lineTo(-1.3, -7.2); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(4.6, -11.5); c.lineTo(0, -9.6); c.lineTo(1.3, -7.2); c.closePath(); c.fill();
    c.fillStyle = '#2c4a8c'; c.beginPath(); c.moveTo(-1.6, -9.8); c.lineTo(1.6, -9.8); c.lineTo(2.7, -1); c.lineTo(0, 3.2); c.lineTo(-2.7, -1); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(200,220,255,.55)'; c.lineWidth = .8;
    for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(-2.2, -8.6 + i * 2.1); c.lineTo(2.2, -10 + i * 2.1); c.stroke(); }
    // braços e mãos (uma com algemas)
    limb(c, -10, -8, -13 - ws * .4, 1, 5, '#1a1a20'); ell(c, -13 - ws * .4, 2.8, 2.5, 2.5, skin);
    limb(c, 10, -8, 14, -3, 5, '#1a1a20'); ell(c, 14.6, -1.4, 2.5, 2.5, skin);
    if (hold) {
      c.strokeStyle = '#cfd6dd'; c.lineWidth = 1.7;
      c.beginPath(); c.arc(17, 2.8, 3.1, 0, TAU); c.stroke(); c.beginPath(); c.arc(21.5, 5.8, 3.1, 0, TAU); c.stroke();
      c.beginPath(); c.moveTo(15.2, -.6); c.lineTo(17.5, .2); c.stroke();
    }
    // cabeça: orelhas salientes, crânio redondo e careca, mandíbula cheia
    ell(c, -10.8, -22, 2.7, 3.9, skin); ell(c, 10.8, -22, 2.7, 3.9, skin);
    ell(c, -10.6, -22, 1.2, 2.3, dark); ell(c, 10.6, -22, 1.2, 2.3, dark);
    ell(c, 0, -24.5, 10.4, 11.4, skin);
    ell(c, 0, -17, 9.8, 8.4, skin);
    // brilho na careca
    ell(c, -2.6, -32, 4.6, 2, 'rgba(255,255,255,.4)', -.25);
    ell(c, 3.4, -33.2, 2, .9, 'rgba(255,255,255,.22)', .2);
    // testa: vincos leves
    c.strokeStyle = 'rgba(140,95,70,.28)'; c.lineWidth = .8;
    c.beginPath(); c.moveTo(-5.5, -28.5); c.quadraticCurveTo(0, -29.6, 5.5, -28.5); c.stroke();
    // sobrancelhas retas, escuras e levemente franzidas
    limb(c, -8, -25.1, -2.2, -24.1, 2, '#2a211c'); limb(c, 2.2, -24.1, 8, -25.1, 2, '#2a211c');
    // olhos de pálpebra pesada, com olheiras
    c.strokeStyle = dark; c.lineWidth = 1.5;
    c.beginPath(); c.arc(-4.6, -20.6, 3.3, .2 * Math.PI, .8 * Math.PI); c.stroke();
    c.beginPath(); c.arc(4.6, -20.6, 3.3, .2 * Math.PI, .8 * Math.PI); c.stroke();
    ell(c, -4.6, -22, 2.9, 1.6, '#f1ece6'); ell(c, 4.6, -22, 2.9, 1.6, '#f1ece6');
    ell(c, -4.2, -22, 1.4, 1.4, '#2a1f19'); ell(c, 5, -22, 1.4, 1.4, '#2a1f19');
    c.fillStyle = skin; c.fillRect(-8, -24, 6.8, 1.6); c.fillRect(1.2, -24, 6.8, 1.6);   // pálpebra caída
    c.strokeStyle = '#3a2a22'; c.lineWidth = 1.1;
    c.beginPath(); c.moveTo(-7.6, -22.8); c.lineTo(-1.6, -22.8); c.moveTo(1.6, -22.8); c.lineTo(7.6, -22.8); c.stroke();
    // nariz largo, com sombra
    ell(c, 0, -17.8, 3, 3.5, '#cd946f'); ell(c, 1.4, -17.4, 1.2, 3, 'rgba(140,90,65,.3)');
    ell(c, -1.7, -15.2, 1, .7, '#8a5a45'); ell(c, 1.7, -15.2, 1, .7, '#8a5a45');
    // sulcos do nariz até a boca, boca fina e tensa, sombra no queixo
    c.strokeStyle = 'rgba(140,95,70,.4)'; c.lineWidth = .9;
    c.beginPath(); c.moveTo(-3.8, -16); c.quadraticCurveTo(-5, -13.5, -4, -11.6); c.moveTo(3.8, -16); c.quadraticCurveTo(5, -13.5, 4, -11.6); c.stroke();
    c.strokeStyle = '#6b2f2a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-3.8, -12.6); c.lineTo(3.8, -12.6); c.stroke();
    ell(c, 0, -9.6, 4, 1.2, 'rgba(150,100,75,.28)');
  }

  /* ---------------- Jair Bolsonaro (caricatura), de macacão de preso ----------------
     Cabelo castanho ralo e grisalho penteado para o lado com entradas, testa alta, sobrancelhas grossas,
     olhos pequenos, nariz arredondado, papada e sulcos marcados. Macacão laranja com número no peito.
     arms: 'down' | 'open' (braços abertos) | 'none' (quem chama desenha os braços); talk = boca abrindo. */
  function jair(c, t, arms, talk) {
    const skin = '#d9a984', dark = '#b97f60', orange = '#e8731c';
    shadow(c, 14);
    limb(c, -3.6, 3, -3.6, 10, 5.4, orange); limb(c, 3.6, 3, 3.6, 10, 5.4, orange);
    ell(c, -3.8, 11.4, 4.4, 2.1, '#f1f1f1'); ell(c, 3.8, 11.4, 4.4, 2.1, '#f1f1f1');
    // macacão laranja, gola e remendo com número
    c.fillStyle = orange; rr(c, -10.2, -11, 20.4, 17.8, 5); c.fill();
    c.fillStyle = '#c85c10'; c.fillRect(-.5, -9, 1, 15.5);
    c.fillStyle = '#f2f2f2'; c.beginPath(); c.moveTo(-4.8, -11.6); c.lineTo(4.8, -11.6); c.lineTo(0, -4.6); c.closePath(); c.fill();
    c.fillStyle = '#fff'; rr(c, 2.4, -5, 6.2, 4.6, .8); c.fill();
    c.save(); c.translate(5.5, -1.7); c.scale(-1, 1);              // o sprite é sempre espelhado: desespelha o número
    c.fillStyle = '#222'; c.font = 'bold 3.6px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('01', 0, 0); c.restore();
    // braços
    if (arms === 'down') {
      limb(c, -10, -8, -13, 1, 5, orange); limb(c, 10, -8, 13, 1, 5, orange);
      ell(c, -13, 2.8, 2.5, 2.5, skin); ell(c, 13, 2.8, 2.5, 2.5, skin);
    } else if (arms === 'open') {
      const w = Math.sin(t * 6) * 1.2;
      limb(c, -10, -8, -20, -13 + w, 5, orange); limb(c, 10, -8, 20, -13 - w, 5, orange);
      ell(c, -21.5, -14 + w, 2.6, 2.6, skin); ell(c, 21.5, -14 - w, 2.6, 2.6, skin);
    }
    // cabeça: papada cheia, orelhas, testa alta
    ell(c, -10.6, -22, 2.5, 3.5, skin); ell(c, 10.6, -22, 2.5, 3.5, skin);
    ell(c, 0, -24, 10.6, 10.8, skin);
    ell(c, 0, -16.8, 10.2, 8.4, skin);
    ell(c, 0, -9.8, 6.2, 1.6, 'rgba(150,100,75,.3)');                       // papada
    // cabelo ralo e grisalho, penteado para o lado, com entradas fundas
    c.fillStyle = '#4d3b31'; c.beginPath();
    c.arc(0, -24.2, 10.9, Math.PI * 1.1, Math.PI * 1.9);
    c.lineTo(8.6, -29); c.lineTo(5.2, -31); c.lineTo(2, -29.4); c.lineTo(-2.6, -31.2); c.lineTo(-8.4, -29.2); c.closePath(); c.fill();
    c.strokeStyle = '#8f8883'; c.lineWidth = .9;
    for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-6 + i * 3.4, -32.2); c.quadraticCurveTo(-1 + i * 3.4, -33.6, 3 + i * 3.4, -31.2); c.stroke(); }
    ell(c, -9.8, -27.4, 1.3, 2.2, '#8f8883', .2); ell(c, 9.8, -27.4, 1.3, 2.2, '#8f8883', -.2);
    // testa franzida e sobrancelhas grossas
    c.strokeStyle = 'rgba(140,95,70,.3)'; c.lineWidth = .8;
    c.beginPath(); c.moveTo(-5.5, -28); c.quadraticCurveTo(0, -29.2, 5.5, -28); c.stroke();
    limb(c, -8, -25.4, -2, -24.2, 2.6, '#3a2b23'); limb(c, 2, -24.2, 8, -25.4, 2.6, '#3a2b23');
    // olhos pequenos com bolsas
    c.strokeStyle = dark; c.lineWidth = 1.2;
    c.beginPath(); c.arc(-4.4, -20.8, 2.8, .2 * Math.PI, .8 * Math.PI); c.stroke(); c.beginPath(); c.arc(4.4, -20.8, 2.8, .2 * Math.PI, .8 * Math.PI); c.stroke();
    ell(c, -4.4, -22, 2.3, 1.45, '#f3efe9'); ell(c, 4.4, -22, 2.3, 1.45, '#f3efe9');
    ell(c, -4.2, -22, 1.1, 1.15, '#3b2a20'); ell(c, 4.6, -22, 1.1, 1.15, '#3b2a20');
    c.strokeStyle = '#3a2a22'; c.lineWidth = 1; c.beginPath(); c.moveTo(-6.8, -23.2); c.lineTo(-2.2, -23.2); c.moveTo(2.2, -23.2); c.lineTo(6.8, -23.2); c.stroke();
    // nariz arredondado, sulcos e boca
    ell(c, 0, -17.8, 3, 3.5, '#cf9670'); ell(c, 1.3, -17.4, 1.1, 3, 'rgba(140,90,65,.3)');
    ell(c, -1.6, -15.2, 1, .7, '#8a5a45'); ell(c, 1.6, -15.2, 1, .7, '#8a5a45');
    c.strokeStyle = 'rgba(140,95,70,.45)'; c.lineWidth = .9;
    c.beginPath(); c.moveTo(-3.8, -16); c.quadraticCurveTo(-5.2, -13.4, -4.2, -11.2); c.moveTo(3.8, -16); c.quadraticCurveTo(5.2, -13.4, 4.2, -11.2); c.stroke();
    if (talk && Math.floor(t * 9) % 2 === 0) { ell(c, 0, -12.2, 3.2, 2.2, '#5a1a1a'); c.fillStyle = '#f3efe9'; c.fillRect(-2.4, -13.4, 4.8, 1.1); }
    else { c.strokeStyle = '#6b2f2a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-3.6, -12.4); c.quadraticCurveTo(0, -11.4, 3.6, -12.4); c.stroke(); }
  }

  /* ---------------- Luiz Inácio Lula da Silva (caricatura) ----------------
     Cabelo branco ralo, barba branca cheia com bigode, sobrancelhas grossas grisalhas, olhos pequenos
     e sorriso aberto; terno azul-escuro, camisa branca, gravata vermelha e estrela vermelha na lapela. */
  function lula(c, t, noArms) {
    const skin = '#d9a587', dark = '#b97f60', suit = '#1f2a46';
    shadow(c, 14);
    limb(c, -3.6, 3, -3.6, 10, 5.4, '#171f36'); limb(c, 3.6, 3, 3.6, 10, 5.4, '#171f36');
    ell(c, -3.8, 11.3, 4.4, 2.2, '#0b0b0b'); ell(c, 3.8, 11.3, 4.4, 2.2, '#0b0b0b');
    c.fillStyle = suit; rr(c, -10, -11, 20, 17.5, 5); c.fill();
    c.fillStyle = '#f4f4f4'; c.beginPath(); c.moveTo(-4.8, -11.6); c.lineTo(4.8, -11.6); c.lineTo(0, -1.4); c.closePath(); c.fill();
    c.fillStyle = '#161e36'; c.beginPath(); c.moveTo(-10, -9); c.lineTo(-4.4, -11); c.lineTo(0, -1.4); c.lineTo(-3.6, 6.5); c.lineTo(-10, 6.5); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(10, -9); c.lineTo(4.4, -11); c.lineTo(0, -1.4); c.lineTo(3.6, 6.5); c.lineTo(10, 6.5); c.closePath(); c.fill();
    c.fillStyle = '#f4f4f4'; c.beginPath(); c.moveTo(-4.4, -11.5); c.lineTo(0, -9.6); c.lineTo(-1.3, -7.2); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(4.4, -11.5); c.lineTo(0, -9.6); c.lineTo(1.3, -7.2); c.closePath(); c.fill();
    c.fillStyle = '#c8201f'; c.beginPath(); c.moveTo(-1.6, -9.8); c.lineTo(1.6, -9.8); c.lineTo(2.6, -1); c.lineTo(0, 3); c.lineTo(-2.6, -1); c.closePath(); c.fill();
    star(c, 5.4, -4.6, 1.9, .8, '#e0262a');                                           // estrela vermelha na lapela
    if (!noArms) {
      limb(c, -10, -8, -13, 1, 5, suit); limb(c, 10, -8, 13, 1, 5, suit);
      ell(c, -13, 2.8, 2.5, 2.5, skin); ell(c, 13, 2.8, 2.5, 2.5, skin);
    }
    // cabeça redonda, orelhas
    ell(c, -10.8, -22, 2.5, 3.5, skin); ell(c, 10.8, -22, 2.5, 3.5, skin);
    ell(c, 0, -23.6, 11.2, 11, skin); ell(c, 0, -17, 10.6, 8.4, skin);
    // cabelo branco ralo (laterais + fios no topo)
    c.fillStyle = '#ece9e2';
    c.beginPath(); c.arc(0, -24.4, 11.4, Math.PI * 1.06, Math.PI * 1.94); c.lineTo(8.6, -29.6); c.lineTo(3, -31.4); c.lineTo(-3, -31.2); c.lineTo(-8.6, -29.4); c.closePath(); c.fill();
    ell(c, -10.6, -24, 2.2, 4.6, '#ece9e2'); ell(c, 10.6, -24, 2.2, 4.6, '#ece9e2');
    c.strokeStyle = 'rgba(200,196,188,.9)'; c.lineWidth = .8;
    for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-5 + i * 3.4, -31.6); c.quadraticCurveTo(-1 + i * 3.4, -33, 3 + i * 3.4, -31.4); c.stroke(); }
    // sobrancelhas grossas grisalhas
    limb(c, -8, -25.6, -2.2, -24.8, 2.8, '#b9b4aa'); limb(c, 2.2, -24.8, 8, -25.6, 2.8, '#b9b4aa');
    // olhos pequenos e alegres
    ell(c, -4.4, -22.4, 2.3, 1.3, '#f3efe9'); ell(c, 4.4, -22.4, 2.3, 1.3, '#f3efe9');
    ell(c, -4.2, -22.4, 1.1, 1.1, '#3b2a20'); ell(c, 4.6, -22.4, 1.1, 1.1, '#3b2a20');
    c.strokeStyle = dark; c.lineWidth = 1.1;
    c.beginPath(); c.arc(-4.4, -21, 2.8, .2 * Math.PI, .8 * Math.PI); c.stroke(); c.beginPath(); c.arc(4.4, -21, 2.8, .2 * Math.PI, .8 * Math.PI); c.stroke();
    // nariz largo
    ell(c, 0, -18.4, 3, 3.3, '#cd906f'); ell(c, 1.3, -18, 1.1, 2.8, 'rgba(140,90,65,.3)');
    // barba branca cheia, bigode e sorriso
    c.save(); c.beginPath(); c.ellipse(0, -17, 10.6, 8.4, 0, 0, TAU); c.rect(-10.6, -24, 21.2, 5); c.clip();
    c.fillStyle = '#efece6'; c.beginPath(); c.moveTo(-10.8, -19.4); c.quadraticCurveTo(-10, -15, -6, -8.6); c.quadraticCurveTo(0, -5.6, 6, -8.6); c.quadraticCurveTo(10, -15, 10.8, -19.4);
    c.quadraticCurveTo(5, -16.4, 0, -16.6); c.quadraticCurveTo(-5, -16.4, -10.8, -19.4); c.closePath(); c.fill();
    c.restore();
    ell(c, -3.2, -15.6, 3.6, 1.7, '#efece6', .25); ell(c, 3.2, -15.6, 3.6, 1.7, '#efece6', -.25);    // bigode
    c.strokeStyle = '#8a4a42'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(-3.4, -13.4); c.quadraticCurveTo(0, -11.6, 3.4, -13.4); c.stroke();   // sorriso
    c.strokeStyle = 'rgba(190,186,178,.7)'; c.lineWidth = .7;
    for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * 2.2, -11); c.lineTo(i * 2.6, -8.4); c.stroke(); }
  }

  /* ---------------- Cristiano Zanin (caricatura) ----------------
     Baseado em foto de referência: óculos redondos de aro preto grosso, cabelo ralo e escuro penteado para
     trás com testa alta, rosto claro e corado, sorriso discreto; terno azul, camisa branca, gravata azul-marinho. */
  function zanin(c, t, noArms) {
    const skin = '#e6b494', suit = '#2d5eab';
    shadow(c, 14);
    limb(c, -3.6, 3, -3.6, 10, 5.4, '#1c2f57'); limb(c, 3.6, 3, 3.6, 10, 5.4, '#1c2f57');
    ell(c, -3.8, 11.3, 4.4, 2.2, '#0b0b0b'); ell(c, 3.8, 11.3, 4.4, 2.2, '#0b0b0b');
    c.fillStyle = suit; rr(c, -10, -11, 20, 17.5, 5); c.fill();
    c.fillStyle = '#f6f6f6'; c.beginPath(); c.moveTo(-4.8, -11.6); c.lineTo(4.8, -11.6); c.lineTo(0, -1.4); c.closePath(); c.fill();
    c.fillStyle = '#24508f'; c.beginPath(); c.moveTo(-10, -9); c.lineTo(-4.4, -11); c.lineTo(0, -1.4); c.lineTo(-3.6, 6.5); c.lineTo(-10, 6.5); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(10, -9); c.lineTo(4.4, -11); c.lineTo(0, -1.4); c.lineTo(3.6, 6.5); c.lineTo(10, 6.5); c.closePath(); c.fill();
    c.fillStyle = '#f6f6f6'; c.beginPath(); c.moveTo(-4.4, -11.5); c.lineTo(0, -9.6); c.lineTo(-1.3, -7.2); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(4.4, -11.5); c.lineTo(0, -9.6); c.lineTo(1.3, -7.2); c.closePath(); c.fill();
    c.fillStyle = '#142447'; c.beginPath(); c.moveTo(-1.6, -9.8); c.lineTo(1.6, -9.8); c.lineTo(2.5, -1); c.lineTo(0, 3.2); c.lineTo(-2.5, -1); c.closePath(); c.fill();
    if (!noArms) {
      limb(c, -10, -8, -13, 1, 5, suit); limb(c, 10, -8, 13, 1, 5, suit);
      ell(c, -13, 2.8, 2.5, 2.5, skin); ell(c, 13, 2.8, 2.5, 2.5, skin);
    }
    // cabeça: rosto claro e corado, orelhas
    ell(c, -10.2, -22, 2.3, 3.3, skin); ell(c, 10.2, -22, 2.3, 3.3, skin);
    ell(c, 0, -24.4, 10.2, 10.4, skin); ell(c, 0, -17.2, 9.6, 8.8, skin);
    ell(c, -6.4, -17, 2.6, 1.8, 'rgba(225,120,110,.32)'); ell(c, 6.4, -17, 2.6, 1.8, 'rgba(225,120,110,.32)');   // bochechas coradas
    // cabelo escuro e ralo, penteado para trás, testa alta e brilhante
    c.fillStyle = '#3b3b3e'; c.beginPath();
    c.arc(0, -25.4, 10.6, Math.PI * 1.1, Math.PI * 1.9);
    c.lineTo(7.4, -30.4); c.lineTo(3, -32.2); c.lineTo(-3, -32.2); c.lineTo(-7.4, -30.4); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(160,160,170,.65)'; c.lineWidth = .7;
    for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-5.4 + i * 3.6, -32.6); c.quadraticCurveTo(-4 + i * 3.6, -35, -2.4 + i * 3.6, -33.4); c.stroke(); }
    ell(c, -3.6, -28.4, 3.2, 1.2, 'rgba(255,255,255,.4)', -.2);                                                    // brilho na testa
    // sobrancelhas finas e levantadas (expressão simpática)
    limb(c, -7.6, -27, -2.4, -26.2, 1.6, '#2a2523'); limb(c, 2.4, -26.2, 7.6, -27, 1.6, '#2a2523');
    // óculos redondos de aro preto grosso
    ell(c, -4.6, -22.6, 3.7, 3.7, 'rgba(210,230,255,.2)'); ell(c, 4.6, -22.6, 3.7, 3.7, 'rgba(210,230,255,.2)');
    ell(c, -4.6, -22.4, 1.9, 1.5, '#f3f0ea'); ell(c, 4.6, -22.4, 1.9, 1.5, '#f3f0ea');
    ell(c, -4.4, -22.4, 1, 1.05, '#2f2118'); ell(c, 4.8, -22.4, 1, 1.05, '#2f2118');
    c.strokeStyle = '#121214'; c.lineWidth = 1.9;
    c.beginPath(); c.arc(-4.6, -22.6, 3.7, 0, TAU); c.stroke(); c.beginPath(); c.arc(4.6, -22.6, 3.7, 0, TAU); c.stroke();
    c.lineWidth = 1.5; c.beginPath(); c.moveTo(-.9, -23); c.lineTo(.9, -23); c.moveTo(-8.2, -23.2); c.lineTo(-10.6, -23.8); c.moveTo(8.2, -23.2); c.lineTo(10.6, -23.8); c.stroke();
    // nariz e sorriso discreto
    ell(c, 0, -18, 2.2, 3, '#d99f80'); ell(c, 1, -17.8, .9, 2.6, 'rgba(150,100,75,.3)');
    c.strokeStyle = '#8a3e38'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-3.8, -13.6); c.quadraticCurveTo(0, -11.4, 3.8, -13.8); c.stroke();
    c.strokeStyle = 'rgba(150,100,75,.4)'; c.lineWidth = .8; c.beginPath(); c.moveTo(-5.2, -14.4); c.quadraticCurveTo(-5.6, -13, -4.4, -12.6); c.moveTo(5.2, -14.4); c.quadraticCurveTo(5.6, -13, 4.6, -12.8); c.stroke();
  }

  /* ---------------- manifestante ---------------- */
  const SHIRTS = ['#d4261c', '#d4261c', '#d4261c', '#d4261c'];   // todos de vermelho
  const SKINS = ['#f1caa2', '#d9a47a', '#a8744f', '#7a4e32'];
  const HAIRS = ['#3b2a1e', '#1a1a1a', '#c9a24a', '#5a3b22'];
  function protester(c, o, t) {
    const v = o.v | 0, shirt = SHIRTS[v], skin = SKINS[(v + 1) % 4], hair = HAIRS[(v + 2) % 4];
    const act = o.active, sw = Math.sin(t * (act ? 11 : 5) + o.ph), shake = act ? Math.sin(t * 14 + o.ph) : 0;
    shadow(c, 11);
    // pernas (jeans) e tênis
    limb(c, -3, 3, -3 + sw * 3, 10, 4.2, '#2b3f66'); limb(c, 3, 3, 3 - sw * 3, 10, 4.2, '#2b3f66');
    ell(c, -3 + sw * 3, 11, 3.4, 2, '#f2f2f2'); ell(c, 3 - sw * 3, 11, 3.4, 2, '#f2f2f2');
    // braço esquerdo (atrás): punho erguido quando perseguindo
    const lx = act ? -10 : -9.5 - sw * 2, ly = act ? -18 + shake * 1.5 : 0;
    limb(c, -6.5, -8, lx, ly, 3.8, shirt); ell(c, lx, ly, 2.2, 2.2, skin);
    // tronco
    c.fillStyle = shirt; rr(c, -7, -11, 14, 16, 4); c.fill();
    // cabeça
    ell(c, 0, -17, 7.4, 7.6, skin);
    c.fillStyle = hair; c.beginPath(); c.arc(0, -18, 7.8, Math.PI * 1.02, Math.PI * 1.98); c.closePath(); c.fill();
    if (v === 2) { c.fillRect(-8, -19, 2.4, 9); c.fillRect(5.6, -19, 2.4, 9); }   // cabelo comprido
    ell(c, -2.6, -16.4, 1.1, 1.2, '#1a1a1a'); ell(c, 2.6, -16.4, 1.1, 1.2, '#1a1a1a');
    if (act) { limb(c, -4.6, -19.4, -1.4, -18.2, 1.3, '#1a1a1a'); limb(c, 4.6, -19.4, 1.4, -18.2, 1.3, '#1a1a1a'); ell(c, 0, -12.2, 2.4, 2.2, '#5a1010'); }
    else { c.strokeStyle = '#5a2a1a'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(-2, -12.6); c.lineTo(2, -12.6); c.stroke(); }
    // braço direito segurando cartaz ou bandeira
    const hx = 10, hy = -18 + (act ? shake * 2.5 : sw * .8);
    limb(c, 6.5, -8, hx, hy, 3.8, shirt); ell(c, hx, hy, 2.2, 2.2, skin);
    limb(c, hx, hy + 6, hx, hy - 20, 1.8, '#7a5230');
    const kind = ['sign', 'pt', 'com', 'pt'][v];
    if (kind === 'sign') {                            // cartaz vermelho
      c.fillStyle = '#fafafa'; rr(c, hx - 9, hy - 33, 21, 14, 2); c.fill();
      c.strokeStyle = '#a7a7a7'; c.lineWidth = 1; c.stroke();
      c.fillStyle = '#d4261c'; c.fillRect(hx - 6, hy - 30, 15, 2.4); c.fillRect(hx - 6, hy - 25.6, 10, 2.4);
    } else {
      const w = Math.sin(t * 6 + o.ph) * 1.5, fx0 = hx, fy0 = hy - 33, fw = 24, fh = 14, cx = fx0 + fw / 2, cy = fy0 + fh / 2 + w * .5;
      c.fillStyle = '#d3202a'; c.beginPath(); c.moveTo(fx0, fy0); c.lineTo(fx0 + fw, fy0 + w); c.lineTo(fx0 + fw, fy0 + fh + w); c.lineTo(fx0, fy0 + fh); c.closePath(); c.fill();
      if (kind === 'pt') {                            // PT: estrela branca em campo vermelho
        star(c, cx, cy, 5.2, 2.2, '#fff');
      } else {                                        // comunismo: foice e martelo amarelos em campo vermelho
        hammerSickle(c, cx - 0.5, cy + 0.3, 1.25, '#f6d02f');
      }
    }
  }

  /* ---------------- PRF (Polícia Rodoviária Federal) ---------------- */
  function cop(c, o, t) {
    const act = o.active, sw = Math.sin(t * (act ? 12 : 3) + (o.bx || 0) * .01), skin = '#e3b794';
    shadow(c, 12);
    limb(c, -3.2, 3, -3.2 + sw * 3.4, 10, 4.6, '#142038'); limb(c, 3.2, 3, 3.2 - sw * 3.4, 10, 4.6, '#142038');
    ell(c, -3.2 + sw * 3.4, 11.2, 3.8, 2.2, '#0b0b0b'); ell(c, 3.2 - sw * 3.4, 11.2, 3.8, 2.2, '#0b0b0b');
    // braço esquerdo
    limb(c, -8, -8, -10 - sw * 2, 0, 4.2, '#223763'); ell(c, -10 - sw * 2, 1.6, 2.2, 2.2, skin);
    // tronco + colete
    c.fillStyle = '#223763'; rr(c, -8.5, -11, 17, 17, 4); c.fill();
    c.fillStyle = '#0f1a30'; rr(c, -7, -10, 14, 13, 3); c.fill();
    c.fillStyle = '#ffd400'; c.font = 'bold 6.5px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('PRF', 0, -4.2);
    c.fillRect(-7, -1.6, 14, 1.4);                     // faixa refletiva
    c.fillStyle = '#0b0b0b'; c.fillRect(-8.5, 3.2, 17, 2.6); c.fillStyle = '#d9b020'; c.fillRect(-1.3, 3.2, 2.6, 2.6);  // cinto
    // braço direito com cassetete
    const bx = act ? 12 : 10.5, by = act ? -14 + Math.sin(t * 14) * 2 : 1;
    limb(c, 8, -8, bx, by, 4.2, '#223763'); ell(c, bx, by, 2.2, 2.2, skin);
    limb(c, bx, by, bx + (act ? 5 : 1), by + (act ? -9 : 9), 2.4, '#0b0b0b');
    // cabeça, óculos escuros e boné
    ell(c, 0, -18, 7.2, 7.4, skin);
    c.fillStyle = '#0b0b0b'; rr(c, -6, -19.4, 12, 3.8, 1.6); c.fill();
    ell(c, -3.1, -17.5, 2.2, 1.6, '#1d2430'); ell(c, 3.1, -17.5, 2.2, 1.6, '#1d2430');
    if (act) ell(c, 0, -13, 2.5, 2.2, '#5a1010'); else { c.strokeStyle = '#5a2a1a'; c.lineWidth = 1.1; c.beginPath(); c.moveTo(-2, -13.4); c.lineTo(2, -13.4); c.stroke(); }
    c.fillStyle = '#16264a'; c.beginPath(); c.arc(0, -21, 8, Math.PI, 0); c.closePath(); c.fill();
    c.fillRect(-8, -22, 16, 2.4);
    c.fillStyle = '#0b1530'; c.beginPath(); c.moveTo(-6, -21); c.lineTo(10.5, -21); c.lineTo(10, -19.6); c.lineTo(-6, -19.6); c.closePath(); c.fill(); // aba
    ell(c, 0, -24.5, 1.8, 1.8, '#ffd400');             // distintivo
  }

  /* ---------------- viatura da PRF (vista lateral, olhando para a direita) ---------------- */
  function car(c, o, t) {
    const on = Math.floor(t * 6 + o.ph) % 2;
    ell(c, 0, 17, 40, 5, 'rgba(0,0,0,.33)');
    // halo das sirenes
    ell(c, 0, -2, 46, 26, `rgba(${on ? '255,60,60' : '60,120,255'},.14)`);
    // rodas
    [[-24, 14], [24, 14]].forEach(([x, y]) => { ell(c, x, y, 6.4, 6.4, '#101010'); ell(c, x, y, 3, 3, '#aeb4ba'); });
    // carroceria
    c.fillStyle = '#f4f6f8'; rr(c, -38, -4, 76, 19, 6); c.fill();
    // cabine
    c.fillStyle = '#f4f6f8'; c.beginPath(); c.moveTo(-23, -4); c.lineTo(-15, -16); c.lineTo(13, -16); c.lineTo(24, -4); c.closePath(); c.fill();
    c.fillStyle = '#243b55'; c.beginPath(); c.moveTo(-19, -5); c.lineTo(-13, -14); c.lineTo(-1, -14); c.lineTo(-1, -5); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(2, -5); c.lineTo(2, -14); c.lineTo(11, -14); c.lineTo(20, -5); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.28)'; c.fillRect(-16, -12, 3, 6);
    // faixa azul e amarela com PRF
    c.fillStyle = '#1b4aa8'; c.fillRect(-38, 3, 76, 7);
    c.fillStyle = '#f2c230'; c.fillRect(-38, 10.5, 76, 1.8);
    c.save(); c.translate(-2, 0); if (o.vx < 0) c.scale(-1, 1);   // o chamador espelha a viatura; o texto não pode ficar invertido
    c.fillStyle = '#fff'; c.font = 'bold 7px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('PRF', 0, 9.2);
    c.restore();
    // faróis e lanternas
    c.fillStyle = '#ffe9a0'; c.fillRect(35, -1, 3.4, 4.2);
    c.fillStyle = '#d63030'; c.fillRect(-38.4, -1, 3, 4.2);
    // barra de luz no teto
    c.fillStyle = '#1a1a1a'; rr(c, -10, -20, 22, 5, 2); c.fill();
    c.fillStyle = on ? '#ff3b3b' : '#4a1818'; c.fillRect(-9, -19.4, 10, 3.8);
    c.fillStyle = on ? '#1c2b55' : '#3b7bff'; c.fillRect(2, -19.4, 9.4, 3.8);
  }

  return { flavio, trump, moraes, jair, lula, zanin, protester, cop, car, rr, limb, ell };
})();
