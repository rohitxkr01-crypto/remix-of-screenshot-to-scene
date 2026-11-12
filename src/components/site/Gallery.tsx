import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryImage } from "@/content/site";
import { cn } from "@/lib/utils";

export function Gallery({ images, featured = true }: { images: GalleryImage[]; featured?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index !== null ? images[index] : undefined;
  const open = current !== undefined;
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, close]);

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4", featured ? "md:grid-cols-4 md:auto-rows-[200px]" : "md:grid-cols-3 md:auto-rows-[240px]")}>
        {images.map((img, i) => (
          <li
            key={img.src}
            className={cn(
              "aspect-square md:aspect-auto",
              featured && i === 0 && "col-span-2 aspect-[4/3] md:row-span-2",
              featured && i === 3 && "md:col-span-2",
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setIndex(i);
              }}
              className="group relative block h-full w-full overflow-hidden rounded-2xl bg-soft"
              aria-label={`Open image: ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                width={img.width}
                height={img.height}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-navy-deep/85 to-transparent px-4 pb-3 pt-10 text-left text-sm font-medium text-navy-foreground opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                {img.caption}
                <Expand className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${images.length}: ${current.caption}`}
          className="fixed inset-0 z-[60] flex flex-col bg-navy-deep/95 animate-in fade-in duration-200"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const endX = e.changedTouches[0]?.clientX;
            if (endX === undefined) return;
            const dx = endX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between p-4 text-navy-foreground">
            <p className="text-sm text-navy-muted" aria-live="polite">
              {index + 1} / {images.length}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              className="grid h-12 w-12 place-items-center rounded-full bg-navy-foreground/10 hover:bg-navy-foreground/20"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
            <figure key={index} className="flex max-h-full flex-col items-center animate-in fade-in zoom-in-95 duration-300">
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain"
              />
              <figcaption className="mt-4 text-center text-navy-foreground">{current.caption}</figcaption>
            </figure>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
