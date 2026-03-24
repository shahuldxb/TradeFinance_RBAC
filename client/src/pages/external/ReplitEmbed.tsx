const ReplitEmbed = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <iframe
        src="https://72824d72-f7ab-4e5c-b2b8-1c81cce9da53-00-3t4rc8awpyh0e.riker.replit.dev/"
        title="Replit App Demo"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </div>
  );
};

export default ReplitEmbed;
