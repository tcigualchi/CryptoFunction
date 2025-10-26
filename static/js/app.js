class CryptoApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCharacterCounts();
        this.toggleKeyVisibility();
    }

    setupEventListeners() {
        // Process button
        document.getElementById('processBtn').addEventListener('click', () => {
            this.processText();
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearAll();
        });

        // New keys button
        document.getElementById('newKeysBtn').addEventListener('click', () => {
            this.generateNewKeys();
        });

        // Algorithm change
        document.getElementById('algorithm').addEventListener('change', () => {
            this.toggleKeyVisibility();
        });

        // Key controls
        document.querySelectorAll('.key-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.adjustKey(e.currentTarget.dataset.action);
            });
        });

        // Input text changes
        document.getElementById('inputText').addEventListener('input', () => {
            this.updateCharacterCounts();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.processText();
            }
        });
    }

    toggleKeyVisibility() {
        const algorithm = document.getElementById('algorithm').value;
        const keyGroup = document.getElementById('keyGroup');
        
        if (algorithm === 'cesar') {
            keyGroup.style.display = 'block';
        } else {
            keyGroup.style.display = 'none';
        }
    }

    adjustKey(action) {
        const keyInput = document.getElementById('key');
        let value = parseInt(keyInput.value) || 3;
        
        if (action === 'increase' && value < 25) {
            value++;
        } else if (action === 'decrease' && value > 1) {
            value--;
        }
        
        keyInput.value = value;
    }

    async processText() {
        const inputText = document.getElementById('inputText').value.trim();
        const algorithm = document.getElementById('algorithm').value;
        const operation = document.querySelector('input[name="operation"]:checked').value;
        const key = parseInt(document.getElementById('key').value) || 3;

        if (!inputText) {
            this.showNotification('Por favor, digite algum texto para processar.', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const startTime = performance.now();
            
            const response = await fetch('/api/encrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    algorithm: algorithm,
                    operation: operation,
                    key: key
                })
            });

            const data = await response.json();
            const endTime = performance.now();
            const processingTime = (endTime - startTime).toFixed(2);

            if (data.success) {
                document.getElementById('outputText').value = data.result;
                this.updateStats(processingTime, algorithm);
                this.showNotification(
                    `Texto ${operation === 'encrypt' ? 'criptografado' : 'descriptografado'} com sucesso!`,
                    'success'
                );
            } else {
                throw new Error(data.error);
            }

        } catch (error) {
            this.showNotification(`Erro: ${error.message}`, 'error');
            console.error('Erro:', error);
        } finally {
            this.showLoading(false);
            this.updateCharacterCounts();
        }
    }

    async generateNewKeys() {
        try {
            const response = await fetch('/api/generate-new-keys', {
                method: 'POST'
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification('Novas chaves de substituição geradas com sucesso!', 'success');
            } else {
                throw new Error(data.error);
            }

        } catch (error) {
            this.showNotification(`Erro ao gerar novas chaves: ${error.message}`, 'error');
        }
    }

    clearAll() {
        document.getElementById('inputText').value = '';
        document.getElementById('outputText').value = '';
        document.getElementById('key').value = '3';
        this.updateCharacterCounts();
        this.showNotification('Todos os campos foram limpos!', 'info');
    }

    updateCharacterCounts() {
        const inputText = document.getElementById('inputText').value;
        const outputText = document.getElementById('outputText').value;
        
        document.getElementById('inputCount').textContent = inputText.length;
        document.getElementById('outputCount').textContent = outputText.length;
    }

    updateStats(processingTime, algorithm) {
        document.getElementById('processingTime').textContent = `${processingTime}ms`;
        document.getElementById('algorithmUsed').textContent = this.getAlgorithmName(algorithm);
    }

    getAlgorithmName(algorithm) {
        const names = {
            'cesar': 'César',
            'substitution': 'Substituição', 
            'transposition': 'Transposição'
        };
        return names[algorithm] || algorithm;
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            font-size: 0.875rem;
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        return icons[type] || 'ℹ️';
    }

    getNotificationColor(type) {
        const colors = {
            success: 'var(--success)',
            error: 'var(--error)',
            info: 'var(--primary)',
            warning: 'var(--accent)'
        };
        return colors[type] || 'var(--primary)';
    }
}

// Add CSS animations for notifications
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.notification-icon {
    font-size: 16px;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CryptoApp();
});