import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./HeaderWeather.css";
import {
  Sun, Moon, CloudSun, CloudMoon, Cloud,
  CloudFog, CloudRain, Snowflake, CloudLightning,
} from "lucide-react";

const REFRESH_MS = 15 * 60 * 1000;

// Andarak, Batken Region, Kyrgyzstan.
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=39.76849&longitude=69.46398" +
  "&current=temperature_2m,weather_code,is_day" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
  "&hourly=temperature_2m,weather_code,is_day,precipitation_probability" +
  "&forecast_days=7" +
  "&temperature_unit=celsius&timezone=Asia%2FBishkek";

let cachedWeather = null;

function describeWeather(code, isDay) {
  if (code === 0) {
    return {
      Icon: isDay ? Sun : Moon,
      en: isDay ? "Sunny" : "Clear night",
      ru: isDay ? "Ясно" : "Ясная ночь",
    };
  }

  if (code === 1 || code === 2) {
    return {
      Icon: isDay ? CloudSun : CloudMoon,
      en: "Partly cloudy",
      ru: "Переменная облачность",
    };
  }

  if (code === 3) {
    return { Icon: Cloud, en: "Overcast", ru: "Пасмурно" };
  }

  if (code === 45 || code === 48) {
    return { Icon: CloudFog, en: "Fog", ru: "Туман" };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { Icon: Snowflake, en: "Snow", ru: "Снег" };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      Icon: CloudLightning,
      en: "Thunderstorm",
      ru: "Гроза",
    };
  }

  if ([56, 57, 66, 67].includes(code)) {
    return {
      Icon: CloudRain,
      en: "Freezing precipitation",
      ru: "Замерзающие осадки",
    };
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return { Icon: CloudRain, en: "Rain", ru: "Дождь" };
  }

  return { Icon: Cloud, en: "Weather", ru: "Погода" };
}

export default function HeaderWeather({ lang }) {
  const [weather, setWeather] = useState(null);
  const [failed, setFailed] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let stopped = false;
    let busy = false;
    let controller;

    async function updateWeather() {
      if (document.hidden || busy) return;

      if (
        cachedWeather &&
        Date.now() - cachedWeather.savedAt < REFRESH_MS
      ) {
        setWeather(cachedWeather.current);
        setForecast(cachedWeather);
        setFailed(false);
        return;
      }

      busy = true;
      controller = new AbortController();
      const timeout = window.setTimeout(
        () => controller.abort(),
        10000
      );

      try {
        const response = await fetch(WEATHER_URL, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Weather unavailable");

        const data = await response.json();
        const current = data.current;

        if (
          !Number.isFinite(current?.temperature_2m) ||
          !Number.isFinite(current?.weather_code) ||
          ![0, 1].includes(current?.is_day) ||
          !data.daily?.time?.length || !data.hourly?.time?.length ||
          !["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"].every(
            (key) => Array.isArray(data.daily[key]) && data.daily[key].length === data.daily.time.length
          ) ||
          !["temperature_2m", "weather_code", "is_day", "precipitation_probability"].every(
            (key) => Array.isArray(data.hourly[key]) && data.hourly[key].length === data.hourly.time.length
          )
        ) {
          throw new Error("Invalid weather response");
        }

        if (!stopped) {
          cachedWeather = { ...data, savedAt: Date.now() };
          setWeather(current);
          setForecast(cachedWeather);
          setFailed(false);
        }
      } catch {
        if (!stopped) {
          setWeather(null);
          setForecast(null);
          setFailed(true);
        }
      } finally {
        window.clearTimeout(timeout);
        busy = false;
      }
    }

    updateWeather();

    const interval = window.setInterval(updateWeather, REFRESH_MS);
    document.addEventListener("visibilitychange", updateWeather);

    return () => {
      stopped = true;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", updateWeather);
    };
  }, [retry]);

  const ru = lang === "ru";
  const locale = ru ? "ru-RU" : "en-GB";
  const daily = forecast?.daily;
  const hourly = forecast?.hourly;
  const day = daily?.time.includes(selected) ? selected : daily?.time[0];
  const localNow = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bishkek", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date()).replace(" ", "T");
  const today = localNow.slice(0, 10);
  const dateLabel = (date) => new Intl.DateTimeFormat(locale, {
    weekday: "short", day: "numeric", month: "short", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
  const degrees = (value) => Number.isFinite(value) ? `${Math.round(value)}°` : "—";
  const probability = (value) => Number.isFinite(value) ? `${Math.round(value)}%` : "—";
  const hours = hourly?.time.map((time, i) => ({ time, i })).filter(({ time }) =>
    time.startsWith(day) && (day !== today || time >= `${today}T${localNow.slice(11, 13)}:00`)
  ) || [];

  const description = weather
    ? describeWeather(weather.weather_code, weather.is_day === 1)
    : null;

  const Icon = description?.Icon;
  const temperature = weather
    ? `${Math.round(weather.temperature_2m)}°C`
    : "—";

  const label = weather
    ? `${lang === "ru" ? "Андарак" : "Andarak"}: ${
        description[lang === "ru" ? "ru" : "en"]
      }, ${temperature}. ${
        lang === "ru"
          ? "Оценка погоды по модели"
          : "Model-estimated weather"
      }. Weather by Open-Meteo.`
    : lang === "ru"
      ? failed ? "Погода временно недоступна" : "Загрузка погоды"
      : failed ? "Weather temporarily unavailable" : "Loading weather";

  return (
    <Dialog.Root open={open} onOpenChange={(next) => { setOpen(next); if (next) setSelected(null); }}>
    <Dialog.Trigger asChild>
    <button
      type="button"
      className="header-weather"
      title={label}
      aria-label={`${ru ? "Открыть прогноз на 7 дней" : "Open 7-day forecast"}. ${label}`}
    >
      {Icon ? (
        <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
      ) : (
        <span className="header-weather-placeholder" aria-hidden="true">
          —
        </span>
      )}
      <span>{temperature}</span>
    </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="weather-overlay" />
      <Dialog.Content className="weather-panel">
        <div className="weather-panel-heading">
          <div>
            <Dialog.Title>{ru ? "Погода в Андараке" : "Weather in Andarak"}</Dialog.Title>
            <Dialog.Description>{ru ? "7 дней · Время Андарака (UTC+6)" : "7 days · Andarak time (UTC+6)"}</Dialog.Description>
          </div>
          <Dialog.Close className="weather-close" aria-label={ru ? "Закрыть" : "Close"}>×</Dialog.Close>
        </div>
        {!forecast ? (
          <div className="weather-message" role="status">
            <p>{failed ? (ru ? "Погода временно недоступна." : "Weather temporarily unavailable.") : (ru ? "Загрузка прогноза…" : "Loading forecast…")}</p>
            {failed && <button onClick={() => { setFailed(false); setRetry((n) => n + 1); }}>{ru ? "Повторить" : "Try again"}</button>}
          </div>
        ) : (
          <>
            <div className="weather-current"><Icon size={32} aria-hidden="true" /><strong>{temperature}</strong><span>{description[ru ? "ru" : "en"]}</span></div>
            <p className="weather-hint">{ru ? "Выберите день, чтобы увидеть прогноз по часам" : "Choose a day to see the hourly forecast"}</p>
            <div className="weather-days" role="group" aria-label={ru ? "Дни прогноза" : "Forecast days"}>
              {daily.time.map((date, i) => {
                const condition = describeWeather(daily.weather_code[i], true);
                const DayIcon = condition.Icon;
                return <button key={date} className="weather-day" aria-pressed={date === day} onClick={() => setSelected(date)}>
                  <strong>{date === today ? (ru ? "Сегодня" : "Today") : dateLabel(date)}</strong>
                  <DayIcon size={24} aria-hidden="true" />
                  <span>{condition[ru ? "ru" : "en"]}</span>
                  <b>{degrees(daily.temperature_2m_max[i])} / {degrees(daily.temperature_2m_min[i])}</b>
                  <small>{ru ? "Осадки" : "Precip."} {probability(daily.precipitation_probability_max[i])}</small>
                </button>;
              })}
            </div>
            <h3 className="weather-hour-title">{dateLabel(day)} · {ru ? "По часам" : "Hourly"}</h3>
            <div className="weather-hours" key={day}>
              {hours.map(({ time, i }) => {
                const condition = describeWeather(hourly.weather_code[i], hourly.is_day[i] === 1);
                const HourIcon = condition.Icon;
                return <div className="weather-hour" key={time}>
                  <time>{time.slice(11, 16)}</time><HourIcon size={22} aria-hidden="true" />
                  <span>{condition[ru ? "ru" : "en"]}</span>
                  <strong>{degrees(hourly.temperature_2m[i])}</strong>
                  <small>{ru ? "Осадки" : "Precip."} {probability(hourly.precipitation_probability[i])}</small>
                </div>;
              })}
              {!hours.length && <p>{ru ? "На сегодня прогноз по часам закончился. Выберите следующий день." : "No remaining hours today. Choose the next day."}</p>}
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root>
  );
}
