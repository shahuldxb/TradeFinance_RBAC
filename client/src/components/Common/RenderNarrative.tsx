import React from "react";

type Props = {
  text: string;
};

const RenderNarrative: React.FC<Props> = ({ text }) => {
  if (!text) return null;

  // Split by issue headers: "### ISSUE X"
  const sections = text.split(/### ISSUE/).map((sec, index) => {
    if (index === 0) return sec; // skip header section
    return "### ISSUE" + sec;
  });

  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        if (!section.trim()) return null;

        const lines = section.trim().split("\n");

        const title = lines[0]?.replace("###", "").trim();
        const body = lines.slice(1).join("\n");

        return (
          <div key={index} className="border rounded-xl p-5 bg-gray-50 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-3">{title}</h2>

            {body.split("\n").map((line, idx) => (
              <p key={idx} className="text-sm text-gray-700 leading-relaxed mb-1">
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default RenderNarrative;
