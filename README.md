# Jogo da Memória

Jogo da memória responsivo feito com HTML, CSS e JavaScript puro. Não precisa de Node.js, dependências ou banco de dados.

## Como rodar localmente

### Opção 1 — Mais simples
1. Baixe o repositório pelo botão Code > Download ZIP no GitHub.
2. Extraia o arquivo ZIP.
3. Abra a pasta extraída.
4. Dê dois cliques em index.html para abrir o jogo no navegador.

### Opção 2 — Pelo Git
```bash
git clone https://github.com/joaoaugustosilva06-bit/jogo-da-memoria.git
cd jogo-da-memoria
```
Depois, abra index.html no navegador.

### Opção 3 — Servidor local (opcional)
Se tiver Python instalado, dentro da pasta do projeto execute:
```bash
python -m http.server 8000
```
Acesse http://localhost:8000.

## Como jogar
- Clique em duas cartas para tentar encontrar um par.
- Cada tentativa de duas cartas conta como um movimento.
- Encontre os 8 pares para vencer.
- Use Reiniciar para embaralhar e começar novamente.

## Arquivos
- index.html: estrutura da página.
- style.css: visual, animações e responsividade.
- script.js: embaralhamento, regras, cronômetro e pontuação.

O jogo usa emojis como símbolos e a fonte Nunito do Google Fonts. A fonte é opcional; sem internet, o navegador usa a fonte alternativa disponível.