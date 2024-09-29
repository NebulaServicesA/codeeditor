// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' } });
require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: '-- Welcome to the Lua Code Editor!\n\nfunction hello()\n    print("Hello, World!")\nend\n\nhello()',
        language: 'lua',
        theme: 'vs-dark'
    });
});

// Settings modal
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const typingAnimationToggle = document.getElementById('typingAnimationToggle');
const glowTextToggle = document.getElementById('glowTextToggle');

settingsBtn.onclick = () => settingsModal.style.display = 'block';
closeSettingsBtn.onclick = () => settingsModal.style.display = 'none';

window.onclick = (event) => {
    if (event.target == settingsModal) {
        settingsModal.style.display = 'none';
    }
};

// Typing animation toggle
typingAnimationToggle.onchange = () => {
    document.querySelectorAll('.animated-text').forEach(el => {
        el.style.animation = typingAnimationToggle.checked ? '' : 'none';
    });
};

// Glow text toggle
glowTextToggle.onchange = () => {
    document.querySelectorAll('.animated-text').forEach(el => {
        el.classList.toggle('glow-text', glowTextToggle.checked);
    });
};

// Music player
const musicSelect = document.getElementById('musicSelect');
const audioPlayer = document.getElementById('audioPlayer');

musicSelect.onchange = () => {
    const selectedMusic = musicSelect.value;
    if (selectedMusic) {
        audioPlayer.src = selectedMusic;
        audioPlayer.play();
    } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
};

// Download MP3 when the page loads
window.onload = () => {
    const mp3Urls = [
        'https://example.com/music1.mp3',
        'https://example.com/music2.mp3',
        'https://example.com/music3.mp3'
    ];

    mp3Urls.forEach((url, index) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `music${index + 1}.mp3`;
                a.click();
                URL.revokeObjectURL(a.href);
            })
            .catch(console.error);
    });
};
