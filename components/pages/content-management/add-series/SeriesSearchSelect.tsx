import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";

interface Series {
  id: string;
  name: string;
}

interface SeriesResponse {
  content_type: string;
  items: Series[];
  q: string | null;
  page: number;
  take: number;
  total: number;
  totalPages: number;
}

export function SeriesSearchSelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (id: string, name: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery<SeriesResponse>({
    queryKey: ["series-list"],
    queryFn: async () => {
      const res = await privateAxios.get("/contents/user/content/series");
      return res.data; // response IS the SeriesResponse directly
    },
  });

  // ✅ Correct: items is at root level, filter by name
  const filtered = (data?.items ?? []).filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (series: Series) => {
    setSelectedName(series.name);
    onChange(series.id, series.name);
    setSearch("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <div
        className={`flex items-center justify-between h-10 px-3 rounded border cursor-pointer bg-[#131824] transition-colors ${
          open ? "border-purple-500" : "border-[#1B202C] hover:border-slate-600"
        }`}
        onClick={() => setOpen((p) => !p)}
      >
        <span className={selectedName ? "text-slate-100 text-sm" : "text-slate-500 text-sm"}>
          {selectedName || "Search and select series…"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded border border-[#1B202C] bg-[#131824] shadow-xl">
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1B202C]">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search series..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
            />
            {search && (
              <X
                className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-300"
                onClick={() => setSearch("")}
              />
            )}
          </div>

          {/* Options */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {isLoading ? (
              <li className="px-4 py-3 text-sm text-slate-500">Loading…</li>
            ) : filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-500">No series found</li>
            ) : (
              filtered.map((series) => (
                <li
                  key={series.id}
                  onClick={() => handleSelect(series)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-200 hover:bg-[#1B202C] cursor-pointer"
                >
                  <span>{series.name}</span>
                  {value === series.id && (
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}