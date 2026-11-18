(() => {
  'use strict';
  const site = document.getElementById('site');
  const scenes = [document.getElementById('scene-invite'), document.getElementById('scene-letter'), document.getElementById('scene-music')];
  const indicator = document.getElementById('chapter-indicator');
  const envelopeStage = document.getElementById('envelope-stage');
  const envelopeButton = document.getElementById('open-envelope');
  const letterPanel = document.getElementById('letter-panel');
  const toast = document.getElementById('toast');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let letterOpened = false;
  let noticeTimeout;

  function showScene(index, focusTarget) {
    current = index;
    scenes.forEach((scene, i) => {
      const selected = i === index;
      scene.hidden = !selected;
      scene.classList.toggle('is-current', selected);
    });
    site.classList.toggle('is-night', index === 2);
    indicator.textContent = `${String(index + 1).padStart(2, '0')} / 03`;
    if (index === 1) syncLetter();
    window.scrollTo({top: 0, behavior: 'instant'});
    if (focusTarget) requestAnimationFrame(() => focusTarget.focus({preventScroll: true}));
  }

  function syncLetter() {
    envelopeStage.hidden = letterOpened;
    letterPanel.hidden = !letterOpened;
    if (!reducedMotion && letterOpened) letterPanel.classList.add('letter-reveal');
  }

  document.getElementById('accept-btn').addEventListener('click', () => showScene(1, envelopeButton));
  document.getElementById('back-letter').addEventListener('click', () => showScene(0, document.getElementById('accept-btn')));
  envelopeButton.addEventListener('click', () => {
    if (letterOpened) return;
    letterOpened = true;
    envelopeButton.classList.add('opening');
    // A abertura respeita quem prefere movimento reduzido.
    window.setTimeout(() => {
      syncLetter();
      document.getElementById('letter-title').setAttribute('tabindex', '-1');
      document.getElementById('letter-title').focus({preventScroll: true});
    }, reducedMotion ? 0 : 420);
  });
  document.getElementById('continue-btn').addEventListener('click', () => showScene(2, document.getElementById('music-title')));
  document.getElementById('back-music').addEventListener('click', () => showScene(1, document.getElementById('continue-btn')));

  function spotifyLink() {
    const raw = (window.SPOTIFY_PLAYLIST_URL || '').trim();
    try {
      const parsed = new URL(raw);
      const path = parsed.pathname;
      // Aceita somente a URL oficial de playlists, não links arbitrários.
      if (parsed.protocol === 'https:' && parsed.hostname === 'open.spotify.com' && /^\/(intl-[a-z-]+\/)?playlist\/[A-Za-z0-9]+\/?$/.test(path)) {
        return parsed.href;
      }
    } catch (_err) { /* URL não configurada */ }
    return null;
  }
  document.getElementById('spotify-btn').addEventListener('click', () => {
    const url = spotifyLink();
    if (!url) {
      toast.textContent = 'A playlist ainda não foi configurada. Edite o arquivo config.js.';
      toast.hidden = false;
      clearTimeout(noticeTimeout);
      noticeTimeout = setTimeout(() => { toast.hidden = true; }, 5500);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  // Pequenos pontos cintilantes desenhados em CSS: sem bibliotecas ou downloads.
  const stars = document.getElementById('stars');
  for (let i = 0; i < 45; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${(i * 73 + 13) % 98}%`;
    star.style.top = `${(i * 41 + 7) % 67}%`;
    star.style.animationDelay = `${(i % 9) * 0.37}s`;
    star.style.width = star.style.height = `${i % 7 === 0 ? 4 : 2}px`;
    stars.appendChild(star);
  }
  const garden = document.getElementById('garden');
  for (let i = 0; i < 26; i++) {
    const flower = document.createElement('span');
    flower.className = 'flower';
    flower.style.left = `${(i * 47 + 5) % 99}%`;
    flower.style.bottom = `${(i * 19 + 4) % 66}px`;
    flower.style.setProperty('--blossom', ['#fff4c4', '#ffe1d5', '#d6e7f4'][i % 3]);
    garden.appendChild(flower);
  }
})();
