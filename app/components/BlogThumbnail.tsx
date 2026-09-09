import { supabase } from "@/libs/supabase";
import Image from "next/image";

type BlogThumbnailProps = {
  thumbnailImageKey: string | null
}

export const BlogThumbnail = ({
  thumbnailImageKey,
}: BlogThumbnailProps) => {
  if (!thumbnailImageKey) {
    return null
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from('catBlog_image')
    .getPublicUrl(thumbnailImageKey)

  return (
    <div>
      <Image
        src={publicUrl}
        alt="thumbnail"
        width={300}
        height={400}
        className="rounded-xl"
      />
    </div>
  )
}