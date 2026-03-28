document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tempInput = document.getElementById('temperature');
    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resultBox = document.getElementById('result-box');
    const resultDisplay = document.getElementById('result-display');
    const errorMsg = document.getElementById('error-msg');
    const inputGroup = document.querySelector('.input-group');
    const bgGlow = document.querySelector('.bg-glow');

    // Conversion Logic
    function convertTemperature() {
        // Validation
        if (tempInput.value === '' || isNaN(tempInput.value)) {
            inputGroup.classList.add('error');
            return;
        } else {
            inputGroup.classList.remove('error');
        }

        const inputVal = parseFloat(tempInput.value);
        const fromType = inputUnit.value;
        const toType = outputUnit.value;

        let result;

        // Convert input to Celsius first (Base Unit)
        let celsiusVal;
        switch (fromType) {
            case 'celsius':
                celsiusVal = inputVal;
                break;
            case 'fahrenheit':
                celsiusVal = (inputVal - 32) * (5 / 9);
                break;
            case 'kelvin':
                celsiusVal = inputVal - 273.15;
                break;
        }

        // Convert from Celsius to Target Unit
        switch (toType) {
            case 'celsius':
                result = celsiusVal;
                break;
            case 'fahrenheit':
                result = (celsiusVal * (9 / 5)) + 32;
                break;
            case 'kelvin':
                result = celsiusVal + 273.15;
                break;
        }

        // Format Result (max 2 decimal places)
        const formattedResult = parseFloat(result.toFixed(2));
        
        // Determine Unit Symbol
        let symbol = '';
        if (toType === 'celsius') symbol = '°C';
        else if (toType === 'fahrenheit') symbol = '°F';
        else if (toType === 'kelvin') symbol = 'K';

        // Display Result
        resultDisplay.textContent = `${formattedResult} ${symbol}`;
        resultBox.classList.remove('hidden');

        // Dynamic Theme Color based on temperature
        updateThemeColor(celsiusVal);
    }

    function updateThemeColor(celsius) {
        let color, glowColor;

        // Color Logic based on "feeling"
        if (celsius < 0) {
            // Freezing - Ice Blue
            color = '#00c8ff';
            glowColor = 'rgba(0, 200, 255, 0.4)';
        } else if (celsius >= 0 && celsius < 15) {
            // Cold - Cool Cyan
            color = '#00e5ff';
            glowColor = 'rgba(0, 229, 255, 0.4)';
        } else if (celsius >= 15 && celsius < 25) {
            // Mild - Neutral Green/Teal
            color = '#00ff88';
            glowColor = 'rgba(0, 255, 136, 0.4)';
        } else if (celsius >= 25 && celsius < 35) {
            // Warm - Orange
            color = '#ffaa00';
            glowColor = 'rgba(255, 170, 0, 0.4)';
        } else {
            // Hot - Red
            color = '#ff3366';
            glowColor = 'rgba(255, 51, 102, 0.4)';
        }

        // Apply styles to CSS variables
        document.documentElement.style.setProperty('--temp-color', color);
        document.documentElement.style.setProperty('--accent-glow', glowColor);
        
        // Also update the glow background directly for smoother transition
        bgGlow.style.background = `radial-gradient(circle, ${glowColor} 0%, rgba(0,0,0,0) 70%)`;
    }

    // Swap Functionality
    function swapUnits() {
        const temp = inputUnit.value;
        inputUnit.value = outputUnit.value;
        outputUnit.value = temp;
        
        // Animation feedback
        swapBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            swapBtn.style.transform = 'rotate(0deg)';
        }, 300);
    }

    // Event Listeners
    convertBtn.addEventListener('click', convertTemperature);
    
    swapBtn.addEventListener('click', swapUnits);

    // Allow "Enter" key to trigger conversion
    tempInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertTemperature();
        }
    });

    // Reset error state on typing
    tempInput.addEventListener('input', () => {
        inputGroup.classList.remove('error');
    });
});