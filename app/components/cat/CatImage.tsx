import { supabase } from "@/libs/supabase"
import Image from "next/image"

export default function CatImage() {
  if(!CatImageKey) return

   const {
    data: { publicUrl },
  } = supabase.storage
    .from('cat_image')
    .getPublicUrl(CatImageKey)

  return (
    <div>
      <Image
        src={publicUrl}
        alt="catImage"
        width={200}
        height={300}      
      />
    </div>
  )
}