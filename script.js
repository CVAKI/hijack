// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to display - mix of alphanumeric and special characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const charactersArray = characters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;

// Array to store y-position of each column
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Start at random positions
}

// Glitch state
let isGlitching = false;
let glitchColor = '#0F0'; // Default green
let glitchOffset = { x: 0, y: 0 };

// Random glitch trigger
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every interval
        isGlitching = true;
        glitchColor = Math.random() > 0.5 ? '#F00' : '#0F0'; // Red or Green
        glitchOffset.x = (Math.random() - 0.5) * 10;
        glitchOffset.y = (Math.random() - 0.5) * 10;
        
        // Stop glitch after short duration
        setTimeout(() => {
            isGlitching = false;
            glitchColor = '#0F0';
            glitchOffset.x = 0;
            glitchOffset.y = 0;
        }, 50 + Math.random() * 100);
    }
}, 200);

// Function to draw the matrix rain
function drawMatrix() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set color based on glitch state
    ctx.fillStyle = glitchColor;
    ctx.font = fontSize + 'px monospace';

    // Apply glitch effect
    if (isGlitching) {
        ctx.save();
        ctx.translate(glitchOffset.x, glitchOffset.y);
    }

    // Loop through drops
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        
        // Random color variation during glitch
        if (isGlitching && Math.random() > 0.7) {
            ctx.fillStyle = Math.random() > 0.5 ? '#F00' : '#0F0';
        } else if (!isGlitching) {
            ctx.fillStyle = '#0F0';
        }
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it crosses the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment y position
        drops[i]++;
    }

    // Restore context if glitching
    if (isGlitching) {
        ctx.restore();
    }
}

// Animation loop
setInterval(drawMatrix, 50);

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate columns
    const newColumns = canvas.width / fontSize;
    drops.length = 0;
    for (let i = 0; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
    }
});

// Create blood drips dynamically
function createBloodDrip() {
    const drip = document.createElement('div');
    drip.className = 'blood-drip';
    drip.style.left = Math.random() * 100 + '%';
    drip.style.animationDuration = (3 + Math.random() * 4) + 's';
    drip.style.animationDelay = Math.random() * 5 + 's';
    drip.style.width = (1 + Math.random() * 3) + 'px';
    document.body.appendChild(drip);
    
    // Remove drip after animation
    setTimeout(() => {
        drip.remove();
    }, 10000);
}

// Create multiple blood drips
setInterval(() => {
    if (Math.random() > 0.7) {
        createBloodDrip();
    }
}, 800);

// Initialize some drips
for (let i = 0; i < 15; i++) {
    setTimeout(() => createBloodDrip(), i * 500);
}

// Optional: Add random glitch effect to canvas
function randomGlitch() {
    if (Math.random() > 0.98) {
        // Random glitch blocks
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.15})`;
        ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 200,
            Math.random() * 50
        );
    }
    
    // Screen tear effect
    if (Math.random() > 0.95) {
        const sliceY = Math.random() * canvas.height;
        const sliceHeight = 5 + Math.random() * 30;
        const imageData = ctx.getImageData(0, sliceY, canvas.width, sliceHeight);
        ctx.putImageData(imageData, (Math.random() - 0.5) * 20, sliceY);
    }
}

// Add glitch to animation
setInterval(() => {
    randomGlitch();
}, 100);

// Intense glitch effect occasionally
setInterval(() => {
    if (Math.random() > 0.9) {
        // Flash the entire screen red briefly
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Horizontal displacement
        for (let i = 0; i < 5; i++) {
            const y = Math.random() * canvas.height;
            const height = 2 + Math.random() * 10;
            const imageData = ctx.getImageData(0, y, canvas.width, height);
            ctx.putImageData(imageData, (Math.random() - 0.5) * 30, y);
        }
    }
}, 500);
