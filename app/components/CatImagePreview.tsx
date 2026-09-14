import { supabase } from "@/libs/supabase";
import Image from "next/image";

type CatImageProps = {
  CatImageKey: string | null
}

export const CatImagePreview = ({
  CatImageKey,
}: CatImageProps) => {
  if (!CatImageKey) {
    return null
  }

   // 画像表示
  const {
    data: { publicUrl },
  } = supabase.storage
    .from('cat_image')
    .getPublicUrl(CatImageKey)

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