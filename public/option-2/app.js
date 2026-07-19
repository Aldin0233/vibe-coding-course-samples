const STORAGE_KEY = "vibe_diary_entries_v3";
const form = document.querySelector("#diary-form");
const entryDate = document.querySelector("#entry-date");
const entryText = document.querySelector("#entry-text");
const textCount = document.querySelector("#text-count");
const entryList = document.querySelector("#entry-list");
const entryCount = document.querySelector("#entry-count");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");

let entries = loadEntries();

function localDateString(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function loadEntries() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) {
    console.warn("저장된 기록을 읽지 못했습니다.", error);
  }
  return [];
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric", weekday: "short" }).format(new Date(`${value}T00:00:00`));
}

function createEntry(entry) {
  const article = document.createElement("article");
  article.className = "entry-item";

  const date = document.createElement("time");
  date.className = "entry-date";
  date.dateTime = entry.date;
  date.textContent = formatDate(entry.date);

  const body = document.createElement("div");
  body.className = "entry-body";
  const mood = document.createElement("span");
  mood.className = "entry-mood";
  mood.textContent = `● ${entry.mood}`;
  const text = document.createElement("p");
  text.className = "entry-text";
  text.textContent = entry.text;
  body.append(mood, text);

  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.dataset.id = entry.id;
  remove.setAttribute("aria-label", `${formatDate(entry.date)} 기록 삭제`);
  remove.title = "삭제";
  remove.textContent = "×";

  article.append(date, body, remove);
  return article;
}

function render() {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  entryList.replaceChildren(...sorted.map(createEntry));
  entryCount.textContent = `${entries.length}개`;
  emptyState.hidden = entries.length > 0;
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(announce.timer);
  announce.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
}

entryText.addEventListener("input", () => {
  textCount.textContent = `${entryText.value.length} / 280`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  entries.push({
    id: crypto.randomUUID(),
    date: String(data.get("date")),
    mood: String(data.get("mood")),
    text: String(data.get("text")).trim()
  });
  saveEntries();
  form.reset();
  entryDate.value = localDateString();
  textCount.textContent = "0 / 280";
  render();
  announce("기록을 저장했습니다.");
});

entryList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  entries = entries.filter((entry) => entry.id !== button.dataset.id);
  saveEntries();
  render();
  announce("기록을 삭제했습니다.");
});

document.querySelector("#date-heading").textContent = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(new Date());
entryDate.value = localDateString();
render();
