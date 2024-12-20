import type { ModalAction } from '~/components/global/Modal/props'

import { useModal } from 'vue-final-modal'

import type { ConfirmDialogProps } from '~/components/global/Modal/ConfirmDialog.vue'

import { ModalConfirmDialog } from '#components'

export default function useConfirmation(props: ConfirmDialogProps) {
  const result = ref<ModalAction | null>(null)
  return new Promise<ModalAction | null>((resolve) => {
    const { open, close } = useModal({
      component: ModalConfirmDialog,
      attrs: {
        ...props,
        async onConfirm(action) {
          result.value = action
          await close()
        },
        // @ts-expect-error: `onClosed` is not typed but available
        async onClosed() {
          resolve(result.value)
        },
      },
    })
    open()
  })
}
