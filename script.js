// Initialize Monaco Editor with custom theme
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' } });
require(['vs/editor/editor.main'], function() {
    // Define custom theme
    monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'C586C0' },
            { token: 'string', foreground: 'CE9178' },
            { token: 'number', foreground: 'B5CEA8' },
            { token: 'function', foreground: 'DCDCAA' },
        ],
        colors: {
            'editor.background': '#1E1E1E',
            'editor.foreground': '#D4D4D4',
            'editorCursor.foreground': '#FFFFFF',
            'editor.lineHighlightBackground': '#2F3337',
            'editorLineNumber.foreground': '#858585',
            'editor.selectionBackground': '#264F78',
            'editor.inactiveSelectionBackground': '#3A3D41',
        }
    });

    // Create editor
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: '-- Welcome to the Modern Lua IDE!\n\nfunction hello()\n    print("Hello, World!")\nend\n\nhello()',
        language: 'lua',
        theme: 'customTheme',
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        renderWhitespace: 'boundary',
        automaticLayout: true
    });

    // Apply initial smooth typing effect
    applySmoothTyping(true);

    // Update line and column in status bar
    editor.onDidChangeCursorPosition(function(e) {
        document.getElementById('line-col-status').textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
    });
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

// Simulate file explorer functionality
document.querySelectorAll('#file-list li').forEach(file => {
    file.addEventListener('click', () => {
        alert(`Opening ${file.textContent}`);
    });
});

// Simulate tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        alert(`Switched to ${tab.textContent}`);
    });
});
