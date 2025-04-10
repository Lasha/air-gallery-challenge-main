import { Gallery } from "@/components/Gallery";
import { Boards } from "@/components/Boards";
import { fetchBoards } from "@/app/api/boards";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fetchAssets, ClipsListResponse } from "@/app/api/clips";

interface BoardPageProps {
  params: {
    id: string;
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { data: boards = [] } = await fetchBoards();
  const initialClipsResponse = await fetchAssets({
    cursor: null,
    boardId: params.id,
  });
  const initialClips = initialClipsResponse.data.clips || [];

  async function getMoreClips(
    cursor: string | null
  ): Promise<ClipsListResponse> {
    "use server";
    return fetchAssets({ cursor, boardId: params.id });
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">
              {boards.find((board) => board.id === params.id)?.title ||
                "Image Gallery"}
            </span>
          </div>
          <h1 className="text-4xl font-bold">
            {boards.find((board) => board.id === params.id)?.title ||
              "Image Gallery"}
          </h1>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Boards</h2>
          <Boards boards={boards} activeId={params.id} />
          <Gallery
            initialClips={initialClips}
            boardId={params.id}
            onLoadMore={getMoreClips}
          />
        </div>
      </div>
    </div>
  );
}
