const STORAGE_KEY = "vibe_weather_schedule_items_v1";
const scheduleForm = document.querySelector("#schedule-form");
const scheduleList = document.querySelector("#schedule-list");
const scheduleCount = document.querySelector("#schedule-count");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const installButton = document.querySelector("#install-button");

let deferredInstallPrompt = null;
let schedules = loadSchedules();

function localDateString(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function seedSchedules() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return [
    { id: crypto.randomUUID(), title: "야외 프로그램 준비", date: localDateString(tomorrow), location: "서울" }
  ];
}

function loadSchedules() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) {
    console.warn("저장된 일정을 읽지 못했습니다.", error);
  }
  const seeded = seedSchedules();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveSchedules() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric", weekday: "short" }).format(new Date(`${value}T00:00:00`));
}

function createScheduleItem(schedule) {
  const item = document.createElement("li");
  item.className = "schedule-item";

  const date = document.createElement("time");
  date.className = "schedule-day";
  date.dateTime = schedule.date;
  date.textContent = formatDate(schedule.date);

  const main = document.createElement("div");
  main.className = "schedule-main";
  const title = document.createElement("p");
  title.className = "schedule-title";
  title.textContent = schedule.title;
  const location = document.createElement("span");
  location.className = "schedule-location";
  location.textContent = schedule.location;
  main.append(title, location);

  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.dataset.id = schedule.id;
  remove.setAttribute("aria-label", `${schedule.title} 삭제`);
  remove.title = "삭제";
  remove.textContent = "×";

  item.append(date, main, remove);
  return item;
}

function renderSchedules() {
  const sorted = [...schedules].sort((a, b) => a.date.localeCompare(b.date));
  scheduleList.replaceChildren(...sorted.map(createScheduleItem));
  scheduleCount.textContent = `${schedules.length}건`;
  emptyState.hidden = schedules.length > 0;
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(announce.timer);
  announce.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1700);
}

function weatherSymbol(condition) {
  if (condition.includes("비") || condition.includes("소나기")) return "☂";
  if (condition.includes("눈")) return "❄";
  if (condition.includes("흐림")) return "●";
  if (condition.includes("구름")) return "◐";
  return "☀";
}

async function loadWeather() {
  try {
    const response = await fetch("./data/weather-cache.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`날씨 응답 오류: ${response.status}`);
    const data = await response.json();
    document.querySelector("#weather-title").textContent = data.location.name;
    document.querySelector("#weather-temperature").textContent = `${data.forecast.temperature}°`;
    document.querySelector("#weather-condition").textContent = data.forecast.condition;
    document.querySelector("#weather-symbol").textContent = weatherSymbol(data.forecast.condition);
    const updated = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(data.updatedAt));
    document.querySelector("#weather-time").textContent = `${data.isSample ? "예시 날씨" : "최근 갱신"} · ${updated}`;
    document.querySelector("#source-link").href = data.source.url;
  } catch (error) {
    document.querySelector("#weather-title").textContent = "날씨를 불러오지 못했습니다";
    document.querySelector("#weather-condition").textContent = "일정 기능은 계속 사용할 수 있습니다";
    document.querySelector("#weather-time").textContent = "네트워크 연결 후 다시 확인";
    console.warn(error);
  }
}

function updateConnectionState() {
  document.querySelector("#connection-state").textContent = navigator.onLine ? "온라인" : "오프라인 · 저장된 화면 사용";
}

scheduleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(scheduleForm);
  schedules.push({
    id: crypto.randomUUID(),
    title: String(data.get("title")).trim(),
    date: String(data.get("date")),
    location: String(data.get("location"))
  });
  saveSchedules();
  scheduleForm.reset();
  document.querySelector("#schedule-date").value = localDateString();
  renderSchedules();
  announce("일정을 저장했습니다.");
});

scheduleList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  schedules = schedules.filter((schedule) => schedule.id !== button.dataset.id);
  saveSchedules();
  renderSchedules();
  announce("일정을 삭제했습니다.");
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    announce("이미 설치된 앱에서 실행 중입니다.");
    return;
  }
  if (!deferredInstallPrompt) {
    announce("브라우저의 앱 설치 메뉴를 이용해 주세요.");
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installButton.hidden = true;
  announce("앱 설치가 완료되었습니다.");
});

window.addEventListener("online", updateConnectionState);
window.addEventListener("offline", updateConnectionState);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch((error) => console.warn("서비스 워커 등록 실패", error));
  });
}

document.querySelector("#schedule-date").value = localDateString();
updateConnectionState();
renderSchedules();
loadWeather();
