import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"
import { Stats } from "@/components/dashboard/stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Stats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <UpcomingMeetings />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

