import { use } from "react"
import { useLocation } from "react-router"

export default function OverviewPage() {

  const { state } = useLocation()

  console.log(state)



  return (
    <div>OverviewPage {state?.from}</div>
  )
}
