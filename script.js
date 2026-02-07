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
let intensityMode = false;

// INTENSE Random glitch trigger - MORE FREQUENT
setInterval(() => {
    if (Math.random() > 0.5) { // 50% chance - much more frequent!
        isGlitching = true;
        glitchColor = Math.random() > 0.6 ? '#0F0' : (Math.random() > 0.5 ? '#0FF' : '#FF00FF'); // Green, Cyan, or Magenta
        glitchOffset.x = (Math.random() - 0.5) * 20; // Increased offset
        glitchOffset.y = (Math.random() - 0.5) * 20;
        
        // Stop glitch after short duration
        setTimeout(() => {
            isGlitching = false;
            glitchColor = '#0F0';
            glitchOffset.x = 0;
            glitchOffset.y = 0;
        }, 30 + Math.random() * 80);
    }
}, 150); // More frequent interval

// Extreme intensity mode trigger
setInterval(() => {
    if (Math.random() > 0.85) {
        intensityMode = true;
        setTimeout(() => {
            intensityMode = false;
        }, 500 + Math.random() * 1000);
    }
}, 3000);

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
        
        // Add rotation during intense glitches
        if (intensityMode) {
            ctx.rotate((Math.random() - 0.5) * 0.1);
        }
    }

    // Loop through drops
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        
        // Random color variation during glitch - MORE CHAOTIC
        if (isGlitching && Math.random() > 0.5) {
            const colors = ['#0F0', '#0FF', '#FF00FF', '#00FFFF', '#FFFF00', '#FFF'];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        } else if (!isGlitching) {
            ctx.fillStyle = '#0F0';
        }
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it crosses the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment y position - faster during intensity mode
        drops[i] += intensityMode ? 2 : 1;
    }

    // Restore context if glitching
    if (isGlitching) {
        ctx.restore();
    }
}

// Animation loop - faster
setInterval(drawMatrix, 40);

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

// Create blood drips dynamically - MUCH MORE INTENSE
function createBloodDrip() {
    const drip = document.createElement('div');
    drip.className = 'blood-drip';
    drip.style.left = Math.random() * 100 + '%';
    drip.style.animationDuration = (2 + Math.random() * 3) + 's'; // Faster drips
    drip.style.animationDelay = Math.random() * 2 + 's'; // Less delay
    drip.style.width = (2 + Math.random() * 5) + 'px'; // Thicker drips
    document.body.appendChild(drip);
    
    // Remove drip after animation
    setTimeout(() => {
        drip.remove();
    }, 8000);
}

// Create MANY more blood drips - MORE FREQUENT
setInterval(() => {
    if (Math.random() > 0.4) { // 60% chance - much more frequent!
        createBloodDrip();
    }
}, 400); // More frequent interval

// Initialize MANY drips
for (let i = 0; i < 30; i++) {
    setTimeout(() => createBloodDrip(), i * 200);
}

// INTENSE glitch effect to canvas - MORE FREQUENT AND DRAMATIC
function randomGlitch() {
    // More frequent glitch blocks
    if (Math.random() > 0.92) {
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.3})`;
        ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 400, // Larger blocks
            Math.random() * 100
        );
    }
    
    // Screen tear effect - MORE INTENSE
    if (Math.random() > 0.88) {
        const sliceY = Math.random() * canvas.height;
        const sliceHeight = 10 + Math.random() * 50; // Thicker slices
        const imageData = ctx.getImageData(0, sliceY, canvas.width, sliceHeight);
        ctx.putImageData(imageData, (Math.random() - 0.5) * 40, sliceY); // More displacement
    }
    
    // Random vertical tears
    if (Math.random() > 0.90) {
        const sliceX = Math.random() * canvas.width;
        const sliceWidth = 5 + Math.random() * 30;
        const imageData = ctx.getImageData(sliceX, 0, sliceWidth, canvas.height);
        ctx.putImageData(imageData, sliceX, (Math.random() - 0.5) * 50);
    }
}

// Add glitch to animation - MORE FREQUENT
setInterval(() => {
    randomGlitch();
}, 60);

// Intense glitch effect occasionally - MORE DRAMATIC
setInterval(() => {
    if (Math.random() > 0.7) { // More frequent
        // Flash the entire screen green briefly - STRONGER
        ctx.fillStyle = `rgba(0, 255, 0, ${0.15 + Math.random() * 0.15})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Horizontal displacement - MORE CHAOTIC
        for (let i = 0; i < 10; i++) { // More slices
            const y = Math.random() * canvas.height;
            const height = 2 + Math.random() * 15;
            const imageData = ctx.getImageData(0, y, canvas.width, height);
            ctx.putImageData(imageData, (Math.random() - 0.5) * 60, y); // More displacement
        }
    }
}, 300); // More frequent

// Screen shake effect
function screenShake() {
    if (Math.random() > 0.92) {
        const shakeX = (Math.random() - 0.5) * 10;
        const shakeY = (Math.random() - 0.5) * 10;
        document.body.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
        
        setTimeout(() => {
            document.body.style.transform = 'translate(0, 0)';
        }, 50);
    }
}

setInterval(screenShake, 100);

// Color inversion flash
function colorFlash() {
    if (Math.random() > 0.95) {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 50 + Math.random() * 100);
    }
}

setInterval(colorFlash, 200);

// Random static noise overlay
function addStaticNoise() {
    if (Math.random() > 0.85) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 100;
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green
            data[i + 2] = noise; // Blue
            data[i + 3] = 20;    // Alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
}

setInterval(addStaticNoise, 150);

// Chromatic aberration effect
function chromaticAberration() {
    if (Math.random() > 0.90) {
        const offset = Math.random() * 10;
        canvas.style.filter = `
            drop-shadow(${offset}px 0 0 lime) 
            drop-shadow(-${offset}px 0 0 cyan)
        `;
        
        setTimeout(() => {
            canvas.style.filter = 'none';
        }, 50 + Math.random() * 100);
    }
}

setInterval(chromaticAberration, 200);

// Blood splatter effect
function createBloodSplatter() {
    if (Math.random() > 0.93) {
        const splatter = document.createElement('div');
        splatter.style.position = 'fixed';
        splatter.style.left = Math.random() * 100 + '%';
        splatter.style.top = Math.random() * 100 + '%';
        splatter.style.width = (20 + Math.random() * 60) + 'px';
        splatter.style.height = (20 + Math.random() * 60) + 'px';
        splatter.style.background = `radial-gradient(circle, rgba(0, 0, 0, 0.8), rgba(10, 10, 10, 0.3))`;
        splatter.style.borderRadius = '50%';
        splatter.style.filter = 'blur(2px)';
        splatter.style.zIndex = '15';
        splatter.style.pointerEvents = 'none';
        splatter.style.animation = 'splatterFade 2s ease-out forwards';
        
        document.body.appendChild(splatter);
        
        setTimeout(() => {
            splatter.remove();
        }, 2000);
    }
}

setInterval(createBloodSplatter, 500);

// Pulsating dark vignette
let vignetteIntensity = 0;
let vignetteDirection = 1;

function pulsateVignette() {
    vignetteIntensity += vignetteDirection * 0.02;
    
    if (vignetteIntensity > 1) {
        vignetteIntensity = 1;
        vignetteDirection = -1;
    } else if (vignetteIntensity < 0) {
        vignetteIntensity = 0;
        vignetteDirection = 1;
    }
    
    canvas.style.boxShadow = `inset 0 0 ${100 + vignetteIntensity * 200}px rgba(0, 0, 0, ${vignetteIntensity * 0.5})`;
}

setInterval(pulsateVignette, 50);

// Distorted audio-like visual effect
function audioDistortion() {
    if (Math.random() > 0.94) {
        for (let i = 0; i < 5; i++) {
            const y = Math.random() * canvas.height;
            ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.3})`;
            ctx.fillRect(0, y, canvas.width, 2 + Math.random() * 5);
        }
    }
}

setInterval(audioDistortion, 100);
