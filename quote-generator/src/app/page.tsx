"use client";

import { useCallback, useEffect, useState } from "react";

type QuoteResponse = {
  quote: string;
  author: string;
  source: "internet" | "local";
  backgroundImageUrl: string;
};

type DummyJsonQuote = {
  quote: string;
  author: string;
};

const UNSPLASH_SCENERY_IMAGES = [
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",
];

const LOCAL_FALLBACK_QUOTES: Array<Omit<QuoteResponse, "backgroundImageUrl">> = [
  {
    quote: "Progress compounds when you stay consistent through ordinary days.",
    author: "Codex",
    source: "local",
  },
  {
    quote: "Small actions repeated daily beat perfect plans delayed forever.",
    author: "Codex",
    source: "local",
  },
  {
    quote: "Discipline is a shortcut that looks like patience.",
    author: "Codex",
    source: "local",
  },
];

function randomImageUrl(): string {
  return UNSPLASH_SCENERY_IMAGES[
    Math.floor(Math.random() * UNSPLASH_SCENERY_IMAGES.length)
  ];
}

function randomLocalQuote(): Omit<QuoteResponse, "backgroundImageUrl"> {
  return LOCAL_FALLBACK_QUOTES[
    Math.floor(Math.random() * LOCAL_FALLBACK_QUOTES.length)
  ];
}

async function getQuoteWithBackground(): Promise<QuoteResponse> {
  const backgroundImageUrl = randomImageUrl();

  try {
    const response = await fetch("https://dummyjson.com/quotes/random", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Quote API unavailable");
    }

    const data = (await response.json()) as DummyJsonQuote;

    if (!data?.quote) {
      throw new Error("Invalid quote payload");
    }

    return {
      quote: data.quote,
      author: data.author || "Unknown",
      source: "internet",
      backgroundImageUrl,
    };
  } catch {
    const fallback = randomLocalQuote();
    return {
      ...fallback,
      backgroundImageUrl,
    };
  }
}

export default function Home() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuote = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getQuoteWithBackground();
      setQuote(data);
    } catch {
      setError("Could not load a quote right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuote();
  }, [loadQuote]);

  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-6 text-white md:py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.45), rgba(2, 6, 23, 0.45)), url('${quote?.backgroundImageUrl ?? UNSPLASH_SCENERY_IMAGES[0]}')`,
      }}
    >
      <div className="flex h-full items-center">
        <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8">
          <h1 className="text-3xl font-semibold tracking-tight">Random Quote Generator</h1>

          <section className="w-full rounded-2xl border border-white/30 bg-white/90 p-8 text-slate-900 shadow-sm backdrop-blur-sm">
            {loading ? (
              <p className="text-center text-slate-500">Loading quote...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <>
                <p className="text-center text-xl leading-relaxed">“{quote?.quote}”</p>
                <p className="mt-4 text-center text-sm text-slate-500">— {quote?.author}</p>
                <p className="mt-2 text-center text-xs uppercase tracking-wide text-slate-400">
                  Source: {quote?.source}
                </p>
              </>
            )}
          </section>

          <button
            type="button"
            onClick={() => void loadQuote()}
            disabled={loading}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "New Quote"}
          </button>
        </main>
      </div>
    </div>
  );
}
