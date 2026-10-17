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
  isOpen: boolean,
  onDelete: () => Promise<void>,
  onClose: () => void
}

export default function DeleteModal({
  isOpen,
  onDelete,
  onClose
}: deleteModalProps) {
  return (
    <div>
      <AlertDialog
        open={isOpen}
        onOpenChange={onClose}
      >
        <AlertDialogContent>
            <AlertDialogTitle>記事を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              削除した記事は元に戻せません
            </AlertDialogDescription>
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
    </div>
  )
}