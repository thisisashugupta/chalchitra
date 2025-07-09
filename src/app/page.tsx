"use server";

import { Suspense } from "react";
import Feed from "@/components/Feed";
import Tags from "@/components/Tags";
import FeedSkeleton from "@/components/ui/skeletons/FeedSkeleton";

export default async function Home() {
  return (
    <div>
      <Tags />
      <div className="z-10">
        <Suspense
          fallback={
            <div className="md:mx-4 md:my-6">
              <FeedSkeleton />
            </div>
          }
        >
          <Feed />
        </Suspense>
      </div>
    </div>
  );
}
