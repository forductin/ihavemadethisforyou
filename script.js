document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const hint = document.querySelector('.click-hint');

    // Also click envelope to open
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            envelope.classList.remove('close');

            // Hide hint
            if (hint) hint.style.opacity = '0';

            // Trigger Crab Animation
            const crab = document.querySelector('.crab-container');
            if (crab) crab.classList.add('active');

            // Show second hint after a delay
            const secondHint = document.querySelector('.second-hint');
            if (secondHint) {
                setTimeout(() => {
                    secondHint.classList.add('visible');
                }, 5000); // Show after 5s
            }
        }
    });

    // Falling Elements Generator
    const elements = ['❤️', '🌻', '♌', '🦁', '❤️‍🔥'];

    function createElement() {
        const div = document.createElement('div');
        div.classList.add('falling-element');

        // Randomize Content
        const randomContent = elements[Math.floor(Math.random() * elements.length)];
        div.innerText = randomContent;

        // Randomize Position & Animation
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5s
        div.style.fontSize = Math.random() * 20 + 20 + 'px'; // 20-40px

        document.body.appendChild(div);

        // Cleanup
        setTimeout(() => {
            div.remove();
        }, 6000);
    }

    // Start rain
    setInterval(createElement, 100);

    // Music Logic
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            music.pause();
            musicBtn.innerText = '🎵'; // Muted/Paused icon
        } else {
            music.play();
            musicBtn.innerText = '🔊'; // Playing icon
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering body click
        toggleMusic();
    });

    // Auto-play on first interaction
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            music.play().then(() => {
                isPlaying = true;
                musicBtn.innerText = '🔊';
            }).catch(err => {
                console.log('Autoplay prevented. User must interact first.');
            });
        }
    }, { once: true });

    // Second click on letter reveals photo
    const letter = document.querySelector('.letter');
    const hiddenPhoto = document.querySelector('.hidden-photo');
    const secondHint = document.querySelector('.second-hint');
    const starHint = document.querySelector('.star-hint');

    if (letter && hiddenPhoto) {
        letter.addEventListener('click', (e) => {
            if (envelope.classList.contains('open')) {
                e.stopPropagation(); // Prevent triggering envelope click
                letter.classList.add('hidden');
                hiddenPhoto.classList.add('revealed');
                if (secondHint) secondHint.style.opacity = '0';

                // Show star hint after photo is revealed
                if (starHint) {
                    setTimeout(() => {
                        starHint.classList.add('show');
                    }, 5000); // Show 5s after photo appears
                }
            }
        });
    }

    // Crab Animation Chain
    const crab = document.querySelector('.crab-container');
    crab.addEventListener('animationend', (e) => {
        if (e.animationName === 'crabPeek') {
            // Wait a bit then walk
            setTimeout(() => {
                crab.style.animation = 'none'; // Reset
                crab.offsetHeight; /* trigger reflow */
                crab.style.animation = null;
                crab.classList.add('walking');
            }, Math.random() * 3000 + 2000); // 2-5s delay
        }
    });

    // Starry Night Interaction
    const stars = document.querySelectorAll('.star');
    const modal = document.getElementById('memoryModal');
    const closeModal = document.querySelector('.close-modal');
    const memoryTitle = document.querySelector('.memory-title');
    const memoryText = document.querySelector('.memory-text');

    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = star.getAttribute('data-memory');
            const detail = star.getAttribute('data-detail');

            memoryTitle.textContent = title;
            memoryText.textContent = detail;
            modal.classList.add('show');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
