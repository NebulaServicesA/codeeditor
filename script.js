// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' } });
require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: '-- Welcome to the Lua Code Editor!\n\nfunction hello()\n    print("Hello, World!")\nend\n\nhello()',
        language: 'lua',
        theme: 'vs-dark'
    });

    // Apply initial smooth typing effect
    applySmoothTyping(true);
});

// Settings modal
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const smoothTypingToggle = document.getElementById('smoothTypingToggle');
const glowTextToggle = document.getElementById('glowTextToggle');

settingsBtn.onclick = () => settingsModal.style.display = 'block';
closeSettingsBtn.onclick = () => settingsModal.style.display = 'none';

window.onclick = (event) => {
    if (event.target == settingsModal) {
        settingsModal.style.display = 'none';
    }
};

// Smooth typing toggle
smoothTypingToggle.onchange = () => {
    applySmoothTyping(smoothTypingToggle.checked);
};

// Glow text toggle
glowTextToggle.onchange = () => {
    applyGlowText(glowTextToggle.checked);
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

// Function to apply smooth typing effect
function applySmoothTyping(enabled) {
    const editorElement = document.querySelector('.monaco-editor');
    if (editorElement) {
        if (enabled) {
            editorElement.classList.add('smooth-typing');
        } else {
            editorElement.classList.remove('smooth-typing');
        }
    }
}

// Function to apply glow text effect
function applyGlowText(enabled) {
    const editorElement = document.querySelector('.monaco-editor');
    if (editorElement) {
        if (enabled) {
            editorElement.classList.add('glow-text');
        } else {
            editorElement.classList.remove('glow-text');
        }
    }
}
