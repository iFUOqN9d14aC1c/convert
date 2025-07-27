class ProxyConverter {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // Mode buttons
        this.convertModeBtn = document.getElementById('convert-mode');
        this.decodeModeBtn = document.getElementById('decode-mode');
        
        // Panels
        this.convertPanel = document.getElementById('convert-panel');
        this.decodePanel = document.getElementById('decode-panel');
        
        // Convert form elements
        this.protocolSelect = document.getElementById('protocol');
        this.ipInput = document.getElementById('ip');
        this.portInput = document.getElementById('port');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.convertBtn = document.getElementById('convert-btn');
        this.convertResult = document.getElementById('convert-result');
        this.convertOutput = document.getElementById('convert-output');
        this.copyConvertBtn = document.getElementById('copy-convert');
        
        // Decode form elements
        this.telegramUrlInput = document.getElementById('telegram-url');
        this.decodeBtn = document.getElementById('decode-btn');
        this.decodeResult = document.getElementById('decode-result');
        this.decodeOutput = document.getElementById('decode-output');
        this.copyDecodeBtn = document.getElementById('copy-decode');
        
        // Decoded info elements
        this.decodedServer = document.getElementById('decoded-server');
        this.decodedPort = document.getElementById('decoded-port');
        this.decodedUser = document.getElementById('decoded-user');
        this.decodedPass = document.getElementById('decoded-pass');
    }

    bindEvents() {
        // Mode switching
        this.convertModeBtn.addEventListener('click', () => this.switchMode('convert'));
        this.decodeModeBtn.addEventListener('click', () => this.switchMode('decode'));
        
        // Convert functionality
        this.convertBtn.addEventListener('click', () => this.convertProxy());
        this.copyConvertBtn.addEventListener('click', () => this.copyToClipboard(this.convertOutput.value));
        
        // Decode functionality
        this.decodeBtn.addEventListener('click', () => this.decodeTelegramUrl());
        this.copyDecodeBtn.addEventListener('click', () => this.copyToClipboard(this.decodeOutput.value));
        
        // Enter key support
        [this.ipInput, this.portInput, this.usernameInput, this.passwordInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.convertProxy();
            });
        });
        
        this.telegramUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.decodeTelegramUrl();
        });
    }

    switchMode(mode) {
        if (mode === 'convert') {
            this.convertModeBtn.classList.add('active');
            this.decodeModeBtn.classList.remove('active');
            this.convertPanel.classList.add('active');
            this.decodePanel.classList.remove('active');
        } else {
            this.decodeModeBtn.classList.add('active');
            this.convertModeBtn.classList.remove('active');
            this.decodePanel.classList.add('active');
            this.convertPanel.classList.remove('active');
        }
    }

    convertProxy() {
        const protocol = this.protocolSelect.value;
        const ip = this.ipInput.value.trim();
        const port = this.portInput.value.trim();
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();

        // Validation
        if (!ip || !port) {
            this.showError('Пожалуйста, заполните IP адрес и порт');
            return;
        }

        if (!this.isValidIP(ip)) {
            this.showError('Неверный формат IP адреса');
            return;
        }

        if (!this.isValidPort(port)) {
            this.showError('Порт должен быть числом от 1 до 65535');
            return;
        }

        // Build proxy URL
        let proxyUrl = `${protocol}://`;
        
        if (username && password) {
            proxyUrl += `${username}:${password}@`;
        }
        
        proxyUrl += `${ip}:${port}`;

        // Show result
        this.convertOutput.value = proxyUrl;
        this.convertResult.classList.remove('hidden');
        
        this.showSuccess('Прокси успешно сконвертирован!');
    }

    decodeTelegramUrl() {
        const url = this.telegramUrlInput.value.trim();
        
        if (!url) {
            this.showError('Пожалуйста, введите Telegram SOCKS ссылку');
            return;
        }

        try {
            const urlObj = new URL(url);
            
            if (!url.includes('t.me/socks') && !url.includes('t.me/proxy')) {
                this.showError('Неверный формат Telegram ссылки');
                return;
            }

            const params = urlObj.searchParams;
            const server = params.get('server') || '';
            const port = params.get('port') || '';
            const user = params.get('user') || '';
            const pass = params.get('pass') || '';

            if (!server || !port) {
                this.showError('Ссылка не содержит необходимых параметров (server, port)');
                return;
            }

            // Update decoded info
            this.decodedServer.textContent = server || 'Не указан';
            this.decodedPort.textContent = port || 'Не указан';
            this.decodedUser.textContent = user || 'Не указан';
            this.decodedPass.textContent = pass || 'Не указан';

            // Build proxy URL
            let proxyUrl = 'socks5://';
            if (user && pass) {
                proxyUrl += `${user}:${pass}@`;
            }
            proxyUrl += `${server}:${port}`;

            this.decodeOutput.value = proxyUrl;
            this.decodeResult.classList.remove('hidden');
            
            this.showSuccess('Telegram ссылка успешно расшифрована!');
            
        } catch (error) {
            this.showError('Неверный формат URL');
        }
    }

    isValidIP(ip) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip) || this.isValidDomain(ip);
    }

    isValidDomain(domain) {
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
        return domainRegex.test(domain);
    }

    isValidPort(port) {
        const portNum = parseInt(port);
        return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showSuccess('Скопировано в буфер обмена!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showSuccess('Скопировано в буфер обмена!');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ProxyConverter();
});