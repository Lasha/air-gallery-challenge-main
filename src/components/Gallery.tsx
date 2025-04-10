import Image from "next/image";
import { Clip } from "@/app/api/clips";

interface GalleryProps {
  clips: Clip[];
}

export function Gallery({ clips = [] }: GalleryProps) {
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
              width={800}
              height={600}
              className="w-full rounded-lg hover:opacity-90 transition-opacity"
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
