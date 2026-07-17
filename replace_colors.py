import os

file_path = r'd:\portfoilio\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('color: #FFFFFF', 'color: var(--c-white)')
content = content.replace('color: #94A3B8', 'color: var(--c-gray)')
content = content.replace('color: #00E5FF', 'color: var(--c-cyan)')
content = content.replace('color: #00F0FF', 'color: var(--c-cyan)')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
