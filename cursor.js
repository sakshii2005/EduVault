document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    // Create trail elements
    const trailCount = 12;
    const trails = [];
    const positions = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        document.body.appendChild(trail);
        trails.push({ element: trail });
    }
    
    // Track mouse movements
    document.addEventListener('mousemove', (e) => {
        // Update main cursor
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Add position to history
        positions.push({ x: e.clientX, y: e.clientY });
        if (positions.length > trailCount) {
            positions.shift();
        }
        
        // Update trail elements
        trails.forEach((trail, index) => {
            const pos = positions[Math.max(0, positions.length - 1 - index)];
            if (pos) {
                trail.element.style.left = `${pos.x}px`;
                trail.element.style.top = `${pos.y}px`;
                trail.element.style.opacity = 1 - (index / trailCount);
                
                const size = Math.max(5, 18 - (index * 1.2));
                trail.element.style.width = `${size}px`;
                trail.element.style.height = `${size}px`;
            }
        });
    });
    
    // Handle interactive elements
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Handle cursor visibility
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            trails.forEach(trail => {
                trail.element.style.opacity = '0';
            });
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
    });
    
    // Disable on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        trails.forEach(trail => {
            trail.element.style.display = 'none';
        });
    }
});