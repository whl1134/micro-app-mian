import { useUserStore } from '@/stores'

const checkPermission = (el, binding) => {
  const userStore = useUserStore()
  const { value } = binding
}

const directive = {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  },
}

export default directive