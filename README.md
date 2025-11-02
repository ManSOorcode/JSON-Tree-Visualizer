# 🌳 JSON Tree Visualizer

An interactive tool to visualize any JSON as a dynamic, searchable tree using **React**, **React Flow**, and **Tailwind CSS v4**.

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── Layout.jsx
│   ├── InputSection.jsx
│   ├── Tree.jsx
│   ├── SearchFilter.jsx
│
├── utils/
│   ├── jsonToFlow.js
│   ├── searchNode.js
│
├── main.jsx
└── index.css
```

---

## ⚙️ Installation

```bash
git clone https://github.com/ManSOorcode/json-tree-visualizer.git
cd json-tree-visualizer
npm install
npm run dev
```

Then open your browser and go to:

```
http://localhost:5173/
```

---

## 🧠 How It Works

- **`jsonToFlow.js`** → Converts JSON data into nodes and edges for React Flow.
- **`searchNode.js`** → Finds nodes based on JSONPath-like syntax.
- **`Tree.jsx`** → Displays JSON as a tree and automatically focuses on searched nodes.

---

## 🧪 Example

### Input JSON

```json
{
  "company": {
    "name": "NextGen Devs",
    "departments": [
      { "name": "Engineering", "employees": 25 },
      { "name": "Marketing", "employees": 10 }
    ],
    "location": {
      "country": "India",
      "city": "Pune"
    }
  }
}
```

### Search Query

```
$.company.location.city
```

### Result

- The tree visualization is generated.
- The node with value `"Pune"` is highlighted and centered.

---

## ⚠️ Limitations

- Works only with **valid JSON**.
- Supports **basic JSONPath** (`$.key.subkey`, `$[0].key`).
- Does **not** support wildcards or filters (`$..key`, `?()` yet).
- Large JSONs are truncated at **400 nodes** for performance.

---

## 🧭 Roadmap

- [ ] Wildcard search (`$..key`)
- [ ] Collapsible nodes
- [ ] Export as PNG/PDF
- [ ] Real-time JSON validation
- [ ] Improved auto layout

---

## 🧑‍💻 Author

**Mansoor Khan**  
Frontend Developer — React | JavaScript  
📧 [mansoor4tech@gmail.com](mailto:mansoor4tech@gmail.com)  
🔗 [Live Demo](https://json-tree-visualizer-pro.vercel.app/)  
💻 [GitHub Repo](https://github.com/ManSOorcode/json-tree-visualizer)

---

## 🪪 License

**MIT License** — free to use and modify with attribution.

---

**🌳 Visualize your JSON easily and efficiently!**
