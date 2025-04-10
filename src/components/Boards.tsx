import Image from "next/image";
import Link from "next/link";
import { Board } from "@/app/api/boards";

interface BoardsProps {
  boards: Board[];
  activeId?: string;
}

export function Boards({ boards, activeId }: BoardsProps) {
  return (
    <div className="w-full px-4 mx-auto max-w-[2000px] mb-12">
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className={`group relative aspect-square overflow-hidden rounded-xl bg-muted ${
              activeId === board.id ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
          >
            {board.thumbnails?.[0] && (
              <Image
                src={board.thumbnails[0]}
                alt={board.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-semibold text-white">
                {board.title}
              </h3>
              {board.description && (
                <p className="mt-1 text-sm text-white/80 line-clamp-2">
                  {board.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
