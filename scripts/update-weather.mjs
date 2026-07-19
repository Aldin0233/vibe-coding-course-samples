import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_KEY = process.env.KMA_API_KEY;
const LOCATION_NAME = process.env.KMA_LOCATION || "서울";
const NX = Number(process.env.KMA_NX || 60);
const NY = Number(process.env.KMA_NY || 127);

if (!API_KEY) {
  throw new Error("KMA_API_KEY가 설정되지 않았습니다.");
}

const baseSlots = [2, 5, 8, 11, 14, 17, 20, 23];

function pad(value) {
  return String(value).padStart(2, "0");
}

function kstDateParts(date) {
  const shifted = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes()
  };
}

function selectBaseTime() {
  const delayedNow = new Date(Date.now() - 20 * 60 * 1000);
  let parts = kstDateParts(delayedNow);
  let slot = [...baseSlots].reverse().find((hour) => hour <= parts.hour);

  if (slot === undefined) {
    const previousDay = new Date(delayedNow.getTime() - 24 * 60 * 60 * 1000);
    parts = kstDateParts(previousDay);
    slot = 23;
  }

  return {
    baseDate: `${parts.year}${pad(parts.month)}${pad(parts.day)}`,
    baseTime: `${pad(slot)}00`
  };
}

function skyLabel(value) {
  return { "1": "맑음", "3": "구름많음", "4": "흐림" }[String(value)] || "정보 없음";
}

function precipitationLabel(value) {
  return {
    "0": "없음",
    "1": "비",
    "2": "비 또는 눈",
    "3": "눈",
    "4": "소나기"
  }[String(value)] || "정보 없음";
}

function toKstComparable(date, time) {
  return `${date}${time}`;
}

const { baseDate, baseTime } = selectBaseTime();
const endpoint = new URL("https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst");
endpoint.searchParams.set("serviceKey", API_KEY);
endpoint.searchParams.set("pageNo", "1");
endpoint.searchParams.set("numOfRows", "1000");
endpoint.searchParams.set("dataType", "JSON");
endpoint.searchParams.set("base_date", baseDate);
endpoint.searchParams.set("base_time", baseTime);
endpoint.searchParams.set("nx", String(NX));
endpoint.searchParams.set("ny", String(NY));

const response = await fetch(endpoint, { signal: AbortSignal.timeout(20_000) });
if (!response.ok) throw new Error(`기상청 API HTTP 오류: ${response.status}`);
const payload = await response.json();
const resultCode = payload?.response?.header?.resultCode;
if (resultCode !== "00") {
  throw new Error(`기상청 API 오류: ${resultCode} ${payload?.response?.header?.resultMsg || ""}`);
}

const items = payload?.response?.body?.items?.item;
if (!Array.isArray(items) || items.length === 0) throw new Error("예보 데이터가 없습니다.");

const now = kstDateParts(new Date());
const nowKey = `${now.year}${pad(now.month)}${pad(now.day)}${pad(now.hour)}${pad(now.minute)}`;
const groups = new Map();

for (const item of items) {
  const key = toKstComparable(item.fcstDate, item.fcstTime);
  if (!groups.has(key)) groups.set(key, {});
  groups.get(key)[item.category] = item.fcstValue;
}

const selectedKey = [...groups.keys()].sort().find((key) => key >= nowKey.slice(0, 12)) || [...groups.keys()].sort()[0];
const selected = groups.get(selectedKey);
const precipitation = precipitationLabel(selected.PTY);
const condition = precipitation === "없음" ? skyLabel(selected.SKY) : precipitation;

const output = {
  source: {
    name: "기상청 단기예보 조회서비스",
    url: "https://www.data.go.kr/data/15084084/openapi.do"
  },
  location: { name: LOCATION_NAME, nx: NX, ny: NY },
  forecast: {
    date: `${selectedKey.slice(0, 4)}-${selectedKey.slice(4, 6)}-${selectedKey.slice(6, 8)}`,
    time: `${selectedKey.slice(8, 10)}:${selectedKey.slice(10, 12)}`,
    temperature: Number(selected.TMP),
    condition,
    precipitationType: precipitation
  },
  updatedAt: new Date().toISOString(),
  isSample: false
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(scriptDir, "../public/pwa/data/weather-cache.json");
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`날씨 캐시를 갱신했습니다: ${LOCATION_NAME} ${output.forecast.date} ${output.forecast.time}`);
