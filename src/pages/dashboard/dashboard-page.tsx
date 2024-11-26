import DashSec01 from "./Dash_Sec_01"

type Props = {}

export default function DashboardPage({}: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
        <DashSec01/>
    </div>
  )
}