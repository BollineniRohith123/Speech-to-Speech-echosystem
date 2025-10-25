import { FC, useEffect, useRef } from "react";
import { useServerText } from "../../hooks/useServerText";

type TextDisplayProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  displayColor: boolean | undefined;
};

// Palette: Purple to Pink Vemi AI
// Gradient from deep purple through violet to pink
const textDisplayColors = [
  "#6366f1", "#7c3aed", "#8b5cf6", "#a78bfa",
  "#c084fc", "#d8b4fe", "#e9d5ff", "#f5d0fe",
  "#f9a8d4", "#f472b6", "#ec4899"]

function clamp_color(v: number) {
  return v <= 0
    ? 0
    : v >= textDisplayColors.length
      ? textDisplayColors.length
      : v
}

export const TextDisplay: FC<TextDisplayProps> = ({
  containerRef, displayColor
}) => {
  const { text, textColor } = useServerText();
  const currentIndex = text.length - 1;
  const prevScrollTop = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      prevScrollTop.current = containerRef.current.scrollTop;
      containerRef.current.scroll({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [text]);
  if (displayColor && (textColor.length == text.length)) {
    return (
      <div className="h-full w-full max-w-full max-h-full  p-2 text-white">
        {text.map((t, i) => (
          <span
            key={i}
            className={`${i === currentIndex ? "font-bold" : "font-normal"}`}
            style={{
              color: `${textDisplayColors[clamp_color(textColor[i])]}`
            }}
          >
            {t}
          </span>
        ))
        }
      </div >
    );
  }
  else {
    return (
      <div className="h-full w-full max-w-full max-h-full  p-2 text-white">
        {text.map((t, i) => (
          <span
            key={i}
            className={`${i === currentIndex ? "font-bold" : "font-normal"}`}
          >
            {t}
          </span>
        ))}
      </div>
    );
  };
};
