import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type deleteModalProps = {
  onClose: (open: boolean) => void
  onDelete: () => void
  open: boolean
}

export default function DeleteModal({
  onClose,
  onDelete,
  open,
}:deleteModalProps) {

  return (
    <AlertDialog
      open={open}
      onOpenChange={onClose}
    >
      <AlertDialogTrigger render={<Button variant="outline" />}>
        削除
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>削除しますか?</AlertDialogTitle>
          <AlertDialogDescription>
            削除された内容は元に戻せません
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

