const sideMenu = document.getElementById("sideMenu");
const matrix = document.getElementById("tamilMatrix");
const langToggleBtn = document.getElementById("langToggle");
const pageTitle = document.getElementById("pageTitle");
const matrixTitle = document.getElementById("matrixTitle");
const clearAllBtn = document.getElementById("clearAllBtn");
const clearPrevBtn = document.getElementById("clearPrevBtn");
const footerText = document.getElementById("footerText");

let selectedMei = null;
let selectedUyir = null;
let previousCells = [];
let isTamil = true;

const openMenu = () => sideMenu.style.width = "250px";
const closeMenu = () => sideMenu.style.width = "0";

const combinations = [
// க்-series (12)
{ "mei": "க்", "uyir": "அ", "uyirmei": "க" },
{ "mei": "க்", "uyir": "ஆ", "uyirmei": "கா" },
{ "mei": "க்", "uyir": "இ", "uyirmei": "கி" },
{ "mei": "க்", "uyir": "ஈ", "uyirmei": "கீ" },
{ "mei": "க்", "uyir": "உ", "uyirmei": "கு" },
{ "mei": "க்", "uyir": "ஊ", "uyirmei": "கூ" },
{ "mei": "க்", "uyir": "எ", "uyirmei": "கெ" },
{ "mei": "க்", "uyir": "ஏ", "uyirmei": "கே" },
{ "mei": "க்", "uyir": "ஐ", "uyirmei": "கை" },
{ "mei": "க்", "uyir": "ஒ", "uyirmei": "கொ" },
{ "mei": "க்", "uyir": "ஓ", "uyirmei": "கோ" },
{ "mei": "க்", "uyir": "ஔ", "uyirmei": "கௌ" },

// ங்-series (12)
{ "mei": "ங்", "uyir": "அ", "uyirmei": "ங" },
{ "mei": "ங்", "uyir": "ஆ", "uyirmei": "ஙா" },
{ "mei": "ங்", "uyir": "இ", "uyirmei": "ஙி" },
{ "mei": "ங்", "uyir": "ஈ", "uyirmei": "ஙீ" },
{ "mei": "ங்", "uyir": "உ", "uyirmei": "ஙு" },
{ "mei": "ங்", "uyir": "ஊ", "uyirmei": "ஙூ" },
{ "mei": "ங்", "uyir": "எ", "uyirmei": "ஙெ" },
{ "mei": "ங்", "uyir": "ஏ", "uyirmei": "ஙே" },
{ "mei": "ங்", "uyir": "ஐ", "uyirmei": "ஙை" },
{ "mei": "ங்", "uyir": "ஒ", "uyirmei": "ஙொ" },
{ "mei": "ங்", "uyir": "ஓ", "uyirmei": "ஙோ" },
{ "mei": "ங்", "uyir": "ஔ", "uyirmei": "ஙௌ" },

// ச்-series (12)
{ "mei": "ச்", "uyir": "அ", "uyirmei": "ச" },
{ "mei": "ச்", "uyir": "ஆ", "uyirmei": "சா" },
{ "mei": "ச்", "uyir": "இ", "uyirmei": "சி" },
{ "mei": "ச்", "uyir": "ஈ", "uyirmei": "சீ" },
{ "mei": "ச்", "uyir": "உ", "uyirmei": "சு" },
{ "mei": "ச்", "uyir": "ஊ", "uyirmei": "சூ" },
{ "mei": "ச்", "uyir": "எ", "uyirmei": "செ" },
{ "mei": "ச்", "uyir": "ஏ", "uyirmei": "சே" },
{ "mei": "ச்", "uyir": "ஐ", "uyirmei": "சை" },
{ "mei": "ச்", "uyir": "ஒ", "uyirmei": "சொ" },
{ "mei": "ச்", "uyir": "ஓ", "uyirmei": "சோ" },
{ "mei": "ச்", "uyir": "ஔ", "uyirmei": "சௌ" },

// ஞ்-series (12)
{ "mei": "ஞ்", "uyir": "அ", "uyirmei": "ஞ" },
{ "mei": "ஞ்", "uyir": "ஆ", "uyirmei": "ஞா" },
{ "mei": "ஞ்", "uyir": "இ", "uyirmei": "ஞி" },
{ "mei": "ஞ்", "uyir": "ஈ", "uyirmei": "ஞீ" },
{ "mei": "ஞ்", "uyir": "உ", "uyirmei": "ஞு" },
{ "mei": "ஞ்", "uyir": "ஊ", "uyirmei": "ஞூ" },
{ "mei": "ஞ்", "uyir": "எ", "uyirmei": "ஞெ" },
{ "mei": "ஞ்", "uyir": "ஏ", "uyirmei": "ஞே" },
{ "mei": "ஞ்", "uyir": "ஐ", "uyirmei": "ஞை" },
{ "mei": "ஞ்", "uyir": "ஒ", "uyirmei": "ஞொ" },
{ "mei": "ஞ்", "uyir": "ஓ", "uyirmei": "ஞோ" },
{ "mei": "ஞ்", "uyir": "ஔ", "uyirmei": "ஞௌ" },

// ட்-series (12)
{ "mei": "ட்", "uyir": "அ", "uyirmei": "ட" },
{ "mei": "ட்", "uyir": "ஆ", "uyirmei": "டா" },
{ "mei": "ட்", "uyir": "இ", "uyirmei": "டி" },
{ "mei": "ட்", "uyir": "ஈ", "uyirmei": "டீ" },
{ "mei": "ட்", "uyir": "உ", "uyirmei": "டு" },
{ "mei": "ட்", "uyir": "ஊ", "uyirmei": "டூ" },
{ "mei": "ட்", "uyir": "எ", "uyirmei": "டெ" },
{ "mei": "ட்", "uyir": "ஏ", "uyirmei": "டே" },
{ "mei": "ட்", "uyir": "ஐ", "uyirmei": "டை" },
{ "mei": "ட்", "uyir": "ஒ", "uyirmei": "டொ" },
{ "mei": "ட்", "uyir": "ஓ", "uyirmei": "டோ" },
{ "mei": "ட்", "uyir": "ஔ", "uyirmei": "டௌ" },

// ண்-series (12)
{ "mei": "ண்", "uyir": "அ", "uyirmei": "ண" },
{ "mei": "ண்", "uyir": "ஆ", "uyirmei": "ணா" },
{ "mei": "ண்", "uyir": "இ", "uyirmei": "ணி" },
{ "mei": "ண்", "uyir": "ஈ", "uyirmei": "ணீ" },
{ "mei": "ண்", "uyir": "உ", "uyirmei": "ணு" },
{ "mei": "ண்", "uyir": "ஊ", "uyirmei": "ணூ" },
{ "mei": "ண்", "uyir": "எ", "uyirmei": "ணெ" },
{ "mei": "ண்", "uyir": "ஏ", "uyirmei": "ணே" },
{ "mei": "ண்", "uyir": "ஐ", "uyirmei": "ணை" },
{ "mei": "ண்", "uyir": "ஒ", "uyirmei": "ணொ" },
{ "mei": "ண்", "uyir": "ஓ", "uyirmei": "ணோ" },
{ "mei": "ண்", "uyir": "ஔ", "uyirmei": "ணௌ" },

{ "mei": "த்", "uyir": "அ", "uyirmei": "த" },
{ "mei": "த்", "uyir": "ஆ", "uyirmei": "தா" },
{ "mei": "த்", "uyir": "இ", "uyirmei": "தி" },
{ "mei": "த்", "uyir": "ஈ", "uyirmei": "தீ" },
{ "mei": "த்", "uyir": "உ", "uyirmei": "து" },
{ "mei": "த்", "uyir": "ஊ", "uyirmei": "தூ" },
{ "mei": "த்", "uyir": "எ", "uyirmei": "தெ" },
{ "mei": "த்", "uyir": "ஏ", "uyirmei": "தே" },
{ "mei": "த்", "uyir": "ஐ", "uyirmei": "தை" },
{ "mei": "த்", "uyir": "ஒ", "uyirmei": "தொ" },
{ "mei": "த்", "uyir": "ஓ", "uyirmei": "தோ" },
{ "mei": "த்", "uyir": "ஔ", "uyirmei": "தௌ" },

{ "mei": "ந்", "uyir": "அ", "uyirmei": "ந" },
{ "mei": "ந்", "uyir": "ஆ", "uyirmei": "நா" },
{ "mei": "ந்", "uyir": "இ", "uyirmei": "நி" },
{ "mei": "ந்", "uyir": "ஈ", "uyirmei": "நீ" },
{ "mei": "ந்", "uyir": "உ", "uyirmei": "நு" },
{ "mei": "ந்", "uyir": "ஊ", "uyirmei": "நூ" },
{ "mei": "ந்", "uyir": "எ", "uyirmei": "நெ" },
{ "mei": "ந்", "uyir": "ஏ", "uyirmei": "நே" },
{ "mei": "ந்", "uyir": "ஐ", "uyirmei": "நை" },
{ "mei": "ந்", "uyir": "ஒ", "uyirmei": "நொ" },
{ "mei": "ந்", "uyir": "ஓ", "uyirmei": "நோ" },
{ "mei": "ந்", "uyir": "ஔ", "uyirmei": "நௌ" },

{ "mei": "ப்", "uyir": "அ", "uyirmei": "ப" },
{ "mei": "ப்", "uyir": "ஆ", "uyirmei": "பா" },
{ "mei": "ப்", "uyir": "இ", "uyirmei": "பி" },
{ "mei": "ப்", "uyir": "ஈ", "uyirmei": "பீ" },
{ "mei": "ப்", "uyir": "உ", "uyirmei": "பு" },
{ "mei": "ப்", "uyir": "ஊ", "uyirmei": "பூ" },
{ "mei": "ப்", "uyir": "எ", "uyirmei": "பெ" },
{ "mei": "ப்", "uyir": "ஏ", "uyirmei": "பே" },
{ "mei": "ப்", "uyir": "ஐ", "uyirmei": "பை" },
{ "mei": "ப்", "uyir": "ஒ", "uyirmei": "பொ" },
{ "mei": "ப்", "uyir": "ஓ", "uyirmei": "போ" },
{ "mei": "ப்", "uyir": "ஔ", "uyirmei": "பௌ" },

{ "mei": "ம்", "uyir": "அ", "uyirmei": "ம" },
{ "mei": "ம்", "uyir": "ஆ", "uyirmei": "மா" },
{ "mei": "ம்", "uyir": "இ", "uyirmei": "மி" },
{ "mei": "ம்", "uyir": "ஈ", "uyirmei": "மீ" },
{ "mei": "ம்", "uyir": "உ", "uyirmei": "மு" },
{ "mei": "ம்", "uyir": "ஊ", "uyirmei": "மூ" },
{ "mei": "ம்", "uyir": "எ", "uyirmei": "மெ" },
{ "mei": "ம்", "uyir": "ஏ", "uyirmei": "மே" },
{ "mei": "ம்", "uyir": "ஐ", "uyirmei": "மை" },
{ "mei": "ம்", "uyir": "ஒ", "uyirmei": "மொ" },
{ "mei": "ம்", "uyir": "ஓ", "uyirmei": "மோ" },
{ "mei": "ம்", "uyir": "ஔ", "uyirmei": "மௌ" },

{ "mei": "ய்", "uyir": "அ", "uyirmei": "ய" },
{ "mei": "ய்", "uyir": "ஆ", "uyirmei": "யா" },
{ "mei": "ய்", "uyir": "இ", "uyirmei": "யி" },
{ "mei": "ய்", "uyir": "ஈ", "uyirmei": "யீ" },
{ "mei": "ய்", "uyir": "உ", "uyirmei": "யு" },
{ "mei": "ய்", "uyir": "ஊ", "uyirmei": "யூ" },
{ "mei": "ய்", "uyir": "எ", "uyirmei": "யெ" },
{ "mei": "ய்", "uyir": "ஏ", "uyirmei": "யே" },
{ "mei": "ய்", "uyir": "ஐ", "uyirmei": "யை" },
{ "mei": "ய்", "uyir": "ஒ", "uyirmei": "யொ" },
{ "mei": "ய்", "uyir": "ஓ", "uyirmei": "யோ" },
{ "mei": "ய்", "uyir": "ஔ", "uyirmei": "யௌ" },

{ "mei": "ர்", "uyir": "அ", "uyirmei": "ர" },
{ "mei": "ர்", "uyir": "ஆ", "uyirmei": "ரா" },
{ "mei": "ர்", "uyir": "இ", "uyirmei": "ரி" },
{ "mei": "ர்", "uyir": "ஈ", "uyirmei": "ரீ" },
{ "mei": "ர்", "uyir": "உ", "uyirmei": "ரு" },
{ "mei": "ர்", "uyir": "ஊ", "uyirmei": "ரூ" },
{ "mei": "ர்", "uyir": "எ", "uyirmei": "ரெ" },
{ "mei": "ர்", "uyir": "ஏ", "uyirmei": "ரே" },
{ "mei": "ர்", "uyir": "ஐ", "uyirmei": "ரை" },
{ "mei": "ர்", "uyir": "ஒ", "uyirmei": "ரொ" },
{ "mei": "ர்", "uyir": "ஓ", "uyirmei": "ரோ" },
{ "mei": "ர்", "uyir": "ஔ", "uyirmei": "ரௌ" },

{ "mei": "ல்", "uyir": "அ", "uyirmei": "ல" },
{ "mei": "ல்", "uyir": "ஆ", "uyirmei": "லா" },
{ "mei": "ல்", "uyir": "இ", "uyirmei": "லி" },
{ "mei": "ல்", "uyir": "ஈ", "uyirmei": "லீ" },
{ "mei": "ல்", "uyir": "உ", "uyirmei": "லு" },
{ "mei": "ல்", "uyir": "ஊ", "uyirmei": "லூ" },
{ "mei": "ல்", "uyir": "எ", "uyirmei": "லெ" },
{ "mei": "ல்", "uyir": "ஏ", "uyirmei": "லே" },
{ "mei": "ல்", "uyir": "ஐ", "uyirmei": "லை" },
{ "mei": "ல்", "uyir": "ஒ", "uyirmei": "லொ" },
{ "mei": "ல்", "uyir": "ஓ", "uyirmei": "லோ" },
{ "mei": "ல்", "uyir": "ஔ", "uyirmei": "லௌ" },

{ "mei": "வ்", "uyir": "அ", "uyirmei": "வ" },
{ "mei": "வ்", "uyir": "ஆ", "uyirmei": "வா" },
{ "mei": "வ்", "uyir": "இ", "uyirmei": "வி" },
{ "mei": "வ்", "uyir": "ஈ", "uyirmei": "வீ" },
{ "mei": "வ்", "uyir": "உ", "uyirmei": "வு" },
{ "mei": "வ்", "uyir": "ஊ", "uyirmei": "வூ" },
{ "mei": "வ்", "uyir": "எ", "uyirmei": "வெ" },
{ "mei": "வ்", "uyir": "ஏ", "uyirmei": "வே" },
{ "mei": "வ்", "uyir": "ஐ", "uyirmei": "வை" },
{ "mei": "வ்", "uyir": "ஒ", "uyirmei": "வொ" },
{ "mei": "வ்", "uyir": "ஓ", "uyirmei": "வோ" },
{ "mei": "வ்", "uyir": "ஔ", "uyirmei": "வௌ" },

{ "mei": "ழ்", "uyir": "அ", "uyirmei": "ழ" },
{ "mei": "ழ்", "uyir": "ஆ", "uyirmei": "ழா" },
{ "mei": "ழ்", "uyir": "இ", "uyirmei": "ழி" },
{ "mei": "ழ்", "uyir": "ஈ", "uyirmei": "ழீ" },
{ "mei": "ழ்", "uyir": "உ", "uyirmei": "ழு" },
{ "mei": "ழ்", "uyir": "ஊ", "uyirmei": "ழூ" },
{ "mei": "ழ்", "uyir": "எ", "uyirmei": "ழெ" },
{ "mei": "ழ்", "uyir": "ஏ", "uyirmei": "ழே" },
{ "mei": "ழ்", "uyir": "ஐ", "uyirmei": "ழை" },
{ "mei": "ழ்", "uyir": "ஒ", "uyirmei": "ழொ" },
{ "mei": "ழ்", "uyir": "ஓ", "uyirmei": "ழோ" },
{ "mei": "ழ்", "uyir": "ஔ", "uyirmei": "ழௌ" },


{ "mei": "ள்", "uyir": "அ", "uyirmei": "ள" },
{ "mei": "ள்", "uyir": "ஆ", "uyirmei": "ளா" },
{ "mei": "ள்", "uyir": "இ", "uyirmei": "ளி" },
{ "mei": "ள்", "uyir": "ஈ", "uyirmei": "ளீ" },
{ "mei": "ள்", "uyir": "உ", "uyirmei": "ளு" },
{ "mei": "ள்", "uyir": "ஊ", "uyirmei": "ளூ" },
{ "mei": "ள்", "uyir": "எ", "uyirmei": "ளெ" },
{ "mei": "ள்", "uyir": "ஏ", "uyirmei": "ளே" },
{ "mei": "ள்", "uyir": "ஐ", "uyirmei": "ளை" },
{ "mei": "ள்", "uyir": "ஒ", "uyirmei": "ளொ" },
{ "mei": "ள்", "uyir": "ஓ", "uyirmei": "ளோ" },
{ "mei": "ள்", "uyir": "ஔ", "uyirmei": "ளௌ" },

{ "mei": "ற்", "uyir": "அ", "uyirmei": "ற" },
{ "mei": "ற்", "uyir": "ஆ", "uyirmei": "றா" },
{ "mei": "ற்", "uyir": "இ", "uyirmei": "றி" },
{ "mei": "ற்", "uyir": "ஈ", "uyirmei": "றீ" },
{ "mei": "ற்", "uyir": "உ", "uyirmei": "று" },
{ "mei": "ற்", "uyir": "ஊ", "uyirmei": "றூ" },
{ "mei": "ற்", "uyir": "எ", "uyirmei": "றெ" },
{ "mei": "ற்", "uyir": "ஏ", "uyirmei": "றே" },
{ "mei": "ற்", "uyir": "ஐ", "uyirmei": "றை" },
{ "mei": "ற்", "uyir": "ஒ", "uyirmei": "றொ" },
{ "mei": "ற்", "uyir": "ஓ", "uyirmei": "றோ" },
{ "mei": "ற்", "uyir": "ஔ", "uyirmei": "றௌ" },


{ "mei": "ன்", "uyir": "அ", "uyirmei": "ன" },
{ "mei": "ன்", "uyir": "ஆ", "uyirmei": "னா" },
{ "mei": "ன்", "uyir": "இ", "uyirmei": "னி" },
{ "mei": "ன்", "uyir": "ஈ", "uyirmei": "னீ" },
{ "mei": "ன்", "uyir": "உ", "uyirmei": "னு" },
{ "mei": "ன்", "uyir": "ஊ", "uyirmei": "னூ" },
{ "mei": "ன்", "uyir": "எ", "uyirmei": "னெ" },
{ "mei": "ன்", "uyir": "ஏ", "uyirmei": "னே" },
{ "mei": "ன்", "uyir": "ஐ", "uyirmei": "னை" },
{ "mei": "ன்", "uyir": "ஒ", "uyirmei": "னொ" },
{ "mei": "ன்", "uyir": "ஓ", "uyirmei": "னோ" },
{ "mei": "ன்", "uyir": "ஔ", "uyirmei": "னௌ" }



// ... (continues with த், ந், ப், ம், ய், ர், ல், வ், ழ், ள், ற், ன் series)
];

const meiLetters = [...new Set(combinations.map(item => item.mei))];
const uyirLetters = [...new Set(combinations.map(item => item.uyir))];

// Build matrix
const createMatrix = () => {
  const headerRow = document.createElement("tr");
  headerRow.appendChild(document.createElement("th")); // Empty top-left cell

  uyirLetters.forEach((uyir, colIndex) => {
    const th = document.createElement("th");
    th.textContent = uyir;
    th.onclick = () => handleUyirClick(colIndex, th);
    headerRow.appendChild(th);
  });

  matrix.appendChild(headerRow);

  meiLetters.forEach((mei, rowIndex) => {
    const row = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = mei;
    th.onclick = () => handleMeiClick(rowIndex, th);
    row.appendChild(th);

    uyirLetters.forEach(() => {
      const td = document.createElement("td");
      row.appendChild(td);
    });

    matrix.appendChild(row);
  });
};

const handleMeiClick = (rowIndex, th) => {
  clearActiveHighlights();
  selectedMei = rowIndex;
  th.classList.add("active");
};

const handleUyirClick = (colIndex, th) => {
  if (selectedMei !== null) {
    selectedUyir = colIndex;
    clearActiveHighlights();
    th.classList.add("active");
    fillCell();
  }
};

const fillCell = () => {
  if (selectedMei !== null && selectedUyir !== null) {
    const meiTh = matrix.rows[selectedMei + 1].cells[0];
    const uyirTh = matrix.rows[0].cells[selectedUyir + 1];
    const cell = matrix.rows[selectedMei + 1].cells[selectedUyir + 1];

    [meiTh, uyirTh, cell].forEach(el => el.classList.add("active"));

    if (!cell.textContent) {
      const mei = meiLetters[selectedMei];
      const uyir = uyirLetters[selectedUyir];
      const match = combinations.find(c => c.mei === mei && c.uyir === uyir);

      if (match) {
        cell.textContent = match.uyirmei;
        cell.classList.add("filled");
      }
    }

    previousCells.push(cell);
    selectedMei = null;
    selectedUyir = null;
  }
};

const clearActiveHighlights = () => {
  document.querySelectorAll("th.active, td.active")
    .forEach(el => el.classList.remove("active"));
};

const resetMatrix = () => {
  document.querySelectorAll("td").forEach(td => {
    td.textContent = "";
    td.classList.remove("filled", "active");
  });
  clearActiveHighlights();
  selectedMei = null;
  selectedUyir = null;
  previousCells = [];
};

const clearPreviousSelection = () => {
  const lastCell = previousCells.pop();
  if (lastCell) {
    lastCell.textContent = "";
    lastCell.classList.remove("filled", "active");
  }
  clearActiveHighlights();
};

const toggleLanguage = () => {
  isTamil = !isTamil;

  pageTitle.textContent = isTamil ? "தமிழ் எழுத்துக்கள்" : "Tamil Letters";
  matrixTitle.textContent = isTamil ? "உயிர்-மெய் அட்டவணை" : "Uyir-Mei Matrix";
  clearAllBtn.innerHTML = isTamil ? "🗑️ <span>முழுதும் அழி</span>" : "🗑️ <span>Clear All</span>";
  clearPrevBtn.innerHTML = isTamil ? "🩹 <span>முந்தையதை அழி</span>" : "🩹 <span>Clear Previous</span>";
  footerText.textContent = isTamil ? "© 2025 தமிழ் எழுத்துக்கள். All rights reserved." : "© 2025 Tamil Letters. All rights reserved.";
  langToggleBtn.textContent = isTamil ? "🌐 Switch to English" : "🌐 தமிழ் மாற்று";
};

// Bind events
langToggleBtn.addEventListener("click", toggleLanguage);
document.addEventListener("DOMContentLoaded", createMatrix);
