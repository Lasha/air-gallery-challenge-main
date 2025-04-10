import { Gallery } from "@/components/Gallery";
import { Boards } from "@/components/Boards";
import { fetchBoards } from "./api/boards";
import { fetchAssets, ClipsListResponse } from "./api/clips";

export default async function Home() {
  const { data: boards = [] } = await fetchBoards();
  const initialClipsResponse = await fetchAssets({ cursor: null });
  const initialClips = initialClipsResponse.data.clips || [];

  async function getMoreClips(
    cursor: string | null
  ): Promise<ClipsListResponse> {
    "use server";
    return fetchAssets({ cursor });
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-center mb-12">Image Gallery</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Boards</h2>
          <Boards boards={boards} activeId={undefined} />
          <Gallery initialClips={initialClips} onLoadMore={getMoreClips} />
        </div>
      </div>
    </div>
  );
}
