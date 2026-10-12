import { useEffect, useRef, useState } from "react";
import { GALLERY } from "@/data/chapters";
import "./GalleryPage.css";

export default function GalleryPage({ lang = "en" }) {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [opened, setOpened] = useState(0);

  const dialogRef = useRef(null);
  const touchStart = useRef(null);
  const ignoreClickUntil = useRef(0);
  const hoverTimer = useRef(null);
  const hoverLockedUntil = useRef(0);

  const count = GALLERY.length;
  const ru = lang === "ru";

  const caption = (photo) =>
    photo?.caption?.[lang] || photo?.caption?.en || "";

  const wrap = (index) =>
    count ? ((index % count) + count) % count : 0;

  const clearHover = () => {
    window.clearTimeout(hoverTimer.current);
  };

  useEffect(() => {
    return () => window.clearTimeout(hoverTimer.current);
  }, []);

  const select = (index) => {
    clearHover();
    hoverLockedUntil.current = Date.now() + 800;
    setActive(wrap(index));
  };

  const hoverPhoto = (event, index) => {
    if (
      event.pointerType !== "mouse" ||
      index === active ||
      Date.now() < hoverLockedUntil.current
    ) {
      return;
    }

    clearHover();
    hoverTimer.current = window.setTimeout(() => {
      select(index);
    }, 350);
  };

  const openPhoto = (index) => {
    clearHover();
    setOpened(index);
    dialogRef.current?.showModal();
  };

  const finishSwipe = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      ignoreClickUntil.current = Date.now() + 500;
      select(active + (dx < 0 ? 1 : -1));
    }
  };

  const offsetFor = (index) => {
    let offset = wrap(index - active);
    if (offset > count / 2) offset -= count;
    return offset;
  };

  if (!count) {
    return (
      <section className="andarak-gallery">
        <div className="ag-heading">
          <h1>{ru ? "Галерея скоро появится" : "Photos coming soon"}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="andarak-gallery" data-testid="gallery-page">
      <header className="ag-heading">
        <p className="ag-eyebrow">
          {ru ? "Фотоархив Андарака" : "The photo archive"}
        </p>

        <h1>
          {ru ? "Андарак нашими глазами" : "Andarak, through our eyes"}
        </h1>
      </header>

      <div
        className="ag-stage"
        role="region"
        aria-label={ru ? "Карусель фотографий" : "Photo carousel"}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = {
            x: touch.clientX,
            y: touch.clientY,
          };
        }}
        onTouchEnd={finishSwipe}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            select(active + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            select(active - 1);
          }
        }}
      >
        <div className="ag-orbit" aria-hidden="true" />

        {GALLERY.map((photo, index) => {
          const offset = offsetFor(index);
          const distance = Math.abs(offset);
          const visible = distance <= 2;
          const scale = distance === 0 ? 1 : distance === 1 ? 0.8 : 0.62;

          return (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              className="ag-card"
              tabIndex={visible ? 0 : -1}
              aria-hidden={!visible}
              aria-label={`${index + 1}. ${caption(photo)}`}
              aria-current={index === active ? "true" : undefined}
              onPointerEnter={(event) => hoverPhoto(event, index)}
              onPointerLeave={clearHover}
              onClick={() => {
                if (Date.now() < ignoreClickUntil.current) return;
                if (index === active) openPhoto(index);
                else select(index);
              }}
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 82}%)
                  translateY(${distance * 18}px)
                  rotateY(${offset * -12}deg)
                  scale(${scale})
                `,
                zIndex: 5 - Math.min(distance, 4),
                opacity: visible ? (distance === 0 ? 1 : 0.65) : 0,
                filter: distance === 0
                  ? "none"
                  : `blur(${distance === 1 ? 1 : 3}px)`,
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <img
                src={photo.src}
                alt={caption(photo)}
                loading={visible ? "eager" : "lazy"}
                draggable={false}
              />
            </button>
          );
        })}

        {count > 1 && (
          <>
            <button
              type="button"
              className="ag-arrow ag-arrow-prev"
              aria-label={ru ? "Предыдущее фото" : "Previous photo"}
              onClick={() => select(active - 1)}
            >
              ←
            </button>

            <button
              type="button"
              className="ag-arrow ag-arrow-next"
              aria-label={ru ? "Следующее фото" : "Next photo"}
              onClick={() => select(active + 1)}
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="ag-details">
        <div aria-live="polite" aria-atomic="true">
          <p className="ag-count">
            {String(active + 1).padStart(2, "0")}
            {" / "}
            {String(count).padStart(2, "0")}
          </p>
          <p className="ag-caption">{caption(GALLERY[active])}</p>
        </div>

        <p className="ag-hint">
          {ru
            ? "Наведите курсор или листайте пальцем · Нажмите в центре, чтобы увеличить"
            : "Hover or swipe to explore · Click the center photo to enlarge"}
        </p>

        <button
          type="button"
          className="ag-all-button"
          aria-expanded={showAll}
          aria-controls="all-gallery-photos"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? (ru ? "Скрыть фотографии ↑" : "Hide all photos ↑")
            : (ru ? "Все фотографии ↗" : "View all photos ↗")}
        </button>
      </div>

      <div id="all-gallery-photos" hidden={!showAll}>
        {showAll && (
          <div className="ag-grid">
            {GALLERY.map((photo, index) => (
              <button
                key={`${photo.src}-${index}`}
                type="button"
                onClick={() => openPhoto(index)}
              >
                <img
                  src={photo.src}
                  alt={caption(photo)}
                  loading="lazy"
                />
                <span>{caption(photo)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="ag-dialog"
        style={{ margin: "auto" }}
        aria-label={ru ? "Просмотр фотографии" : "Photo viewer"}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setOpened((index) => wrap(index + 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setOpened((index) => wrap(index - 1));
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            dialogRef.current.close();
          }
        }}
      >
        <div className="ag-dialog-controls">
          <button
            type="button"
            disabled={count < 2}
            onClick={() => setOpened((index) => wrap(index - 1))}
            aria-label={ru ? "Предыдущее фото" : "Previous photo"}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => dialogRef.current.close()}
          >
            {ru ? "Закрыть ×" : "Close ×"}
          </button>

          <button
            type="button"
            disabled={count < 2}
            onClick={() => setOpened((index) => wrap(index + 1))}
            aria-label={ru ? "Следующее фото" : "Next photo"}
          >
            →
          </button>
        </div>

        <img
          src={GALLERY[opened].src}
          alt={caption(GALLERY[opened])}
        />
        <p>{caption(GALLERY[opened])}</p>
      </dialog>
    </section>
  );
}