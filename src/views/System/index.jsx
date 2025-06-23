import { systems } from "@/micro"
import { useRoute, useRouter } from 'vue-router'

export const system = () => {
  const route = useRoute()
  const router = useRouter()

  console.log(systems, route);
  const name = route.params?.name

  if (!name || !systems[name]) {
    router.replace({path: '/403'})
  }
  return <div className="system-container">
    <micro-app name={name} url={systems[name]}></micro-app>
  </div>
}

export default system