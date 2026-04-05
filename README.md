# 🚗 Niza Multimarcas — Site de Anúncio de Veículos

Site estático em HTML + CSS + JS puro para anunciar carros e motos seminovos.
Toda a manutenção de estoque é feita **apenas editando o arquivo `data/veiculos.json`**.

---

## 📁 Estrutura de Pastas

```
niza-multimarcas/
│
├── index.html          → Página Home (slider + destaques + busca rápida)
├── carros.html         → Listagem completa com filtros
├── veiculo.html        → Página individual do veículo (galeria + detalhes)
├── contato.html        → Página de contato com mapa e horários
│
├── css/
│   └── style.css       → Todo o estilo do site
│
├── js/
│   ├── utils.js        → Funções utilitárias (formatar preço, km, carregar JSON)
│   └── components.js   → Header e Footer injetados em todas as páginas
│
├── data/
│   └── veiculos.json   → ⭐ ARQUIVO PRINCIPAL — adicione/remova veículos aqui
│
└── imgs/
    ├── logo.png        → Logotipo da Niza (coloque aqui)
    ├── imgs-home/      → Imagens do slider da Home
    │   ├── slide1.jpg          (desktop — mínimo 1920x1080px)
    │   ├── slide1-mobile.webp  (mobile — mínimo 768x900px)
    │   ├── slide2.jpg
    │   ├── slide2-mobile.webp
    │   └── ...
    └── imgs-carros/    → Fotos de cada veículo
        ├── celta/
        │   ├── foto1.jpg
        │   ├── foto2.jpg
        │   └── foto3.jpg
        ├── porsche/
        │   ├── foto1.jpg
        │   └── foto2.jpg
        └── nome-do-veiculo/   ← crie uma pasta para cada veículo
```

---

## ✏️ Como Adicionar um Veículo

Abra `data/veiculos.json` e adicione um novo objeto no array:

```json
{
  "id": "009",
  "ano": 2022,
  "nome": "Onix Plus Premier 1.0 Turbo",
  "marca": "Chevrolet",
  "preco": 89900,
  "cambio": "Automático",
  "km": 15000,
  "combustivel": "Flex",
  "tipo": "Carro",
  "galeria": [
    "imgs/imgs-carros/onix/foto1.jpg",
    "imgs/imgs-carros/onix/foto2.jpg",
    "imgs/imgs-carros/onix/foto3.jpg"
  ],
  "link": "https://wa.me/5514999999999?text=Olá!%20Tenho%20interesse%20no%20Chevrolet%20Onix%20Plus%20Premier%202022."
}
```

### Regras importantes:

| Campo        | Tipo    | Obrigatório | Observação                              |
|------------- |---------|-------------|-----------------------------------------|
| `id`         | string  | ✅ Sim       | Único por veículo. Use "001", "002"...  |
| `ano`        | number  | ✅ Sim       | Apenas o número: `2022`                 |
| `nome`       | string  | ✅ Sim       | Nome do modelo: `"Civic EXL 1.5 Turbo"`|
| `marca`      | string  | ✅ Sim       | Fabricante: `"Honda"`                   |
| `preco`      | number  | ✅ Sim       | Apenas o número: `115000` (sem R$ ou ponto) |
| `cambio`     | string  | ✅ Sim       | `"Manual"` ou `"Automático"`            |
| `km`         | number  | ✅ Sim       | Apenas o número: `48000`                |
| `combustivel`| string  | ✅ Sim       | `"Flex"`, `"Gasolina"` ou `"Diesel"`    |
| `tipo`       | string  | ✅ Sim       | **Exatamente** `"Carro"` ou `"Moto"`    |
| `galeria`    | array   | ✅ Sim       | Pelo menos 1 imagem. Caminhos relativos à raiz. |
| `link`       | string  | ✅ Sim       | Link do WhatsApp com mensagem pré-preenchida (veja abaixo) |

---

## 📱 Como Gerar o Link do WhatsApp

Use o formato:
```
https://wa.me/55DDDNUMERO?text=MENSAGEM_CODIFICADA
```

**Exemplo manual:**
1. Número: `(14) 99999-9999` → `5514999999999`
2. Mensagem: `Olá! Tenho interesse no Honda Civic 2022. Poderia me passar mais informações?`
3. Codifique a mensagem em URL encode: `Ol%C3%A1!%20Tenho%20interesse%20no%20Honda%20Civic%202022...`
4. Link final: `https://wa.me/5514999999999?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Honda%20Civic%202022...`

Você pode usar [urlencoder.org](https://www.urlencoder.org/) para codificar a mensagem.

---

## ❌ Como Remover um Veículo

Simplesmente **delete o objeto inteiro** do `veiculos.json` referente ao veículo vendido.

Você pode também mover a pasta de fotos do carro para um diretório de backup.

---

## 🖼 Como Adicionar Imagens do Slider (Home)

1. Coloque as imagens em `imgs/imgs-home/`
2. Abra `index.html` e localize o comentário de cada slide:
```html
<!-- quando tiver imagem, substitua o slide-placeholder por: -->
```
3. Substitua o bloco `<div class="slide-placeholder">` por:
```html
<picture>
  <source srcset="imgs/imgs-home/slide1-mobile.webp" media="(max-width:768px)">
  <source srcset="imgs/imgs-home/slide1.webp">
  <img src="imgs/imgs-home/slide1.jpg" alt="Slide 1"
    style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
</picture>
```

**Dica de tamanhos recomendados:**
- Desktop: `1920 × 1080px` (salve como `.jpg` ou `.webp`)
- Mobile: `768 × 900px` (salve como `.webp` para melhor performance)

---

## 🎨 Como Mudar Informações da Empresa

Abra `js/components.js` e edite:
- Número de telefone/WhatsApp
- E-mail
- Endereço
- Link do Instagram
- Iframe do Google Maps

Para atualizar o número do WhatsApp no botão do footer, procure por `wa.me/5514999999999` e substitua pelo número correto.

---

## ⏰ Como Alterar os Horários de Atendimento

Abra `contato.html` e edite o array `horarios`:
```js
const horarios = [
  { dia: 'Segunda-feira', horario: '08:00 – 18:00', fechado: false, weekend: false },
  { dia: 'Sábado',        horario: '08:00 – 14:00', fechado: false, weekend: true  },
  { dia: 'Domingo',       horario: 'Fechado',        fechado: true,  weekend: true  },
  // ...
];
```

---

## 🌐 Como Publicar o Site

O site é **100% estático** — não precisa de servidor especial. Você pode hospedá-lo em:

- **Hostinger / Locaweb / UOL Host** → suba os arquivos via FTP
- **Netlify** (grátis) → arraste a pasta no [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** (grátis) → conecte ao GitHub

> ⚠️ **Importante:** Para que o `fetch('data/veiculos.json')` funcione, o site precisa estar em um servidor web. Não abre corretamente clicando direto no arquivo `.html` no computador. Use o VS Code com a extensão **Live Server** para testar localmente.

---

## 📌 Dicas Finais

- Use imagens comprimidas (`.webp` quando possível) para carregamento mais rápido
- Mantenha os `id` únicos — nunca repita o mesmo ID para dois veículos
- O campo `tipo` diferencia `"Carro"` de `"Moto"` nos filtros — use exatamente esses valores com letra maiúscula
- A logo deve estar em `imgs/logo.png` para aparecer no header e footer

---

**Niza Multimarcas** © 2024 — Todos os direitos reservados
