from flask import Flask, render_template, request, jsonify
import random
import string
from functools import wraps
import webbrowser
import threading
import time

app = Flask(__name__)

class CriptografiaService:
    def __init__(self):
        self.substitution_map = {}
        self.reverse_substitution_map = {}
        self.generate_substitution_maps()
    
    def generate_substitution_maps(self):
        """Gera mapas de substituição aleatórios"""
        chars = string.ascii_letters + string.digits + ' .,!?'
        shuffled = list(chars)
        random.shuffle(shuffled)
        
        self.substitution_map = dict(zip(chars, shuffled))
        self.reverse_substitution_map = dict(zip(shuffled, chars))
    
    def caesar_cipher(self, text, key, operation):
        """Implementa a Cifra de César"""
        result = []
        
        for char in text:
            if char.isalpha():
                if char.isupper():
                    base = ord('A')
                else:
                    base = ord('a')
                
                if operation == 'encrypt':
                    new_char = chr((ord(char) - base + key) % 26 + base)
                else:  # decrypt
                    new_char = chr((ord(char) - base - key) % 26 + base)
                
                result.append(new_char)
            else:
                result.append(char)
        
        return ''.join(result)
    
    def substitution_cipher(self, text, operation):
        """Implementa a Cifra de Substituição"""
        if operation == 'encrypt':
            mapping = self.substitution_map
        else:  # decrypt
            mapping = self.reverse_substitution_map
        
        return ''.join(mapping.get(char, char) for char in text)
    
    def transposition_cipher(self, text, operation):
        """Implementa a Cifra de Transposição"""
        if operation == 'encrypt':
            clean_text = text.replace(' ', '')
            if not clean_text:
                return text
            
            cols = 4
            rows = (len(clean_text) + cols - 1) // cols
            
            matrix = []
            for i in range(0, len(clean_text), cols):
                row = clean_text[i:i + cols]
                row = row.ljust(cols, 'X')
                matrix.append(row)
            
            result = []
            for col in range(cols):
                for row in range(rows):
                    result.append(matrix[row][col])
            
            return ''.join(result)
        
        else:  # decrypt
            cols = 4
            rows = (len(text) + cols - 1) // cols
            
            matrix = [''] * rows
            idx = 0
            
            for col in range(cols):
                for row in range(rows):
                    if idx < len(text):
                        matrix[row] += text[idx]
                        idx += 1
            
            return ''.join(matrix).rstrip('X')

crypto_service = CriptografiaService()

def validate_input(func):
    """Validação de entrada"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
        
        text = data.get('text', '').strip()
        algorithm = data.get('algorithm')
        operation = data.get('operation')
        
        if not text:
            return jsonify({'error': 'Texto não pode estar vazio'}), 400
        
        if algorithm not in ['cesar', 'substitution', 'transposition']:
            return jsonify({'error': 'Algoritmo inválido'}), 400
        
        if operation not in ['encrypt', 'decrypt']:
            return jsonify({'error': 'Operação inválida'}), 400
        
        return func(*args, **kwargs)
    return wrapper

def open_browser():
    """Abre o navegador padrão após um pequeno delay"""
    def open_url():
        time.sleep(1.5)  # Aguarda o servidor Flask iniciar
        webbrowser.open_new('http://localhost:5000/')
    
    thread = threading.Thread(target=open_url)
    thread.daemon = True
    thread.start()

@app.route('/')
def index():
    """Página principal com a ferramenta"""
    return render_template('index.html')

@app.route('/curiosidades')
def curiosidades():
    """Página dedicada às curiosidades"""
    return render_template('curiosities.html')

@app.route('/api/encrypt', methods=['POST'])
@validate_input
def encrypt():
    """Endpoint para criptografia"""
    data = request.get_json()
    text = data['text']
    algorithm = data['algorithm']
    operation = data['operation']
    key = data.get('key', 3)
    
    try:
        if algorithm == 'cesar':
            result = crypto_service.caesar_cipher(text, key, operation)
        elif algorithm == 'substitution':
            result = crypto_service.substitution_cipher(text, operation)
        elif algorithm == 'transposition':
            result = crypto_service.transposition_cipher(text, operation)
        
        return jsonify({
            'success': True,
            'result': result,
            'algorithm': algorithm,
            'operation': operation
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Erro durante o processamento: {str(e)}'
        }), 500

@app.route('/api/generate-new-keys', methods=['POST'])
def generate_new_keys():
    """Gera novos mapas de substituição"""
    crypto_service.generate_substitution_maps()
    return jsonify({'success': True, 'message': 'Chaves regeneradas com sucesso'})

if __name__ == '__main__':
    # Abre o navegador automaticamente
    open_browser()
    
    # Inicia o servidor Flask
    app.run(debug=True, host='0.0.0.0', port=5000)