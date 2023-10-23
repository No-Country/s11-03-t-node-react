import NavBar from '../home/navBar/navBar'
import Calendar from '../components/calendar/calendar'
import CalendarHeader from '../components/calendar/calendarHeader'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <CalendarHeader />
      {children}
      <Calendar />
    </div>
  )
}
