"use client";

import { Dispatch, SetStateAction } from "react";

const patterns = [
  {
    name: "midjourney",
    image: <img style={{height: 30 + 'px'}} src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/midjourney.svg"  alt="midjourney"/>,
  },
  {
    name: "dall-e-3",
    image: <img style={{height: 30 + 'px'}} src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/dalle.svg"  alt="dalle"/>,
  },
  {
    name: "flux",
    image: <img style={{height: 30 + 'px'}} src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/flux.svg"  alt="flux"/>,
  },
];

export default function PatternPicker({
  setPattern,
  setOpenPopover,
  patternValue,
}: {
  setPattern: Dispatch<SetStateAction<string>>;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  patternValue?: string;
}) {
  return (
    <div className="w-full overflow-auto md:max-w-xl">
      <div className="p-4">
        <p className="py-2 font-display text-xl text-gray-700">
          <img src={"https://unpkg.com/@lobehub/icons-static-svg@latest/icons/pollinations.svg"} alt="pollinations" style={{height: 56 + 'px'}} />
          Pollinations Patterns
        </p>
        <div className="grid grid-cols-4 gap-3">
          {patterns.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                setPattern(p.name);
                setOpenPopover(false);
              }}
              className={`rounded-md border border-gray-300 p-2 transition-all hover:border-gray-500 ${patternValue === p.name ? "border-blue-500" : ""}`}
            >
              {p.image}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
