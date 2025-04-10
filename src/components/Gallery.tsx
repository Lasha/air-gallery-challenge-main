"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clip, ClipsListResponse } from "@/app/api/clips";
import { Loader2 } from "lucide-react";

interface GalleryProps {
  initialClips: Clip[];
  boardId?: string;
  onLoadMore: (cursor: string | null) => Promise<ClipsListResponse>;
}

export function Gallery({ initialClips, boardId, onLoadMore }: GalleryProps) {
  const [clips, setClips] = useState<Clip[]>(initialClips);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClips(initialClips);
    setCursor(null);
    setHasMore(true);
  }, [initialClips]);

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;
    if (!currentLoaderRef || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore, isLoading, cursor]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await onLoadMore(cursor);
      setClips((prevClips) => [...prevClips, ...response.data.clips]);
      setCursor(response.pagination.cursor);
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      console.error("Error loading more clips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!Array.isArray(clips) || clips.length === 0) {
    return (
      <div className="w-full px-4 mx-auto max-w-[2000px] text-center py-8">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 mx-auto max-w-[2000px]">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4">
        {clips.map((clip) => (
          <div key={clip.id} className="break-inside-avoid">
            <Image
              src={clip.assets.image}
              alt={clip.title || "Gallery image"}
              width={clip.width}
              height={clip.height}
              className="w-full rounded-lg hover:opacity-90 transition-opacity"
              priority={false}
            />
          </div>
        ))}
        {hasMore && (
          <div
            ref={loaderRef}
            className="col-span-full flex justify-center p-4"
          >
            <Loader2 className={`h-6 w-6 ${isLoading ? "animate-spin" : ""}`} />
          </div>
        )}
      </div>
    </div>
  );
}
