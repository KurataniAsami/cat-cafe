import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MailForm from "../components/MailForm"
export default function Contactpage() {
  return (
    <div>
      {/* mb-4: 16px */}
      <h2 className="text-2xl my-4 text-center">お問い合わせフォーム</h2>
      {/* <Input /> */}
      {/* <Button variant="outline">Button</Button> */}

      <MailForm/>
    </div>
  )
}