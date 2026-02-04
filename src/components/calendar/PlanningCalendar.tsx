import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './calendar.css';
import { type PlanningEvent } from './calendar-utils';
import CalendarEventCard from './CalendarEventCard';
import EventDetailModal from './EventDetailModal';

interface Props {
  events: PlanningEvent[];
}

export default function PlanningCalendar({ events }: Props) {
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedEvent, setSelectedEvent] = useState<PlanningEvent | null>(null);



  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();
  const handleToday = () => calendarRef.current?.getApi().today();
  const handleWeek = () => calendarRef.current?.getApi().changeView('timeGridWeek');
  const handleMonth = () => calendarRef.current?.getApi().changeView('dayGridMonth');

  return (
    <>
    <Card className="h-full flex flex-col border-0 shadow-none sm:border sm:rounded-xl overflow-hidden bg-background">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between py-2 px-4 border-b bg-muted/20">
        <div className="flex items-center gap-3 w-full">
           <div className="bg-primary/10 p-2.5 rounded-xl text-primary hidden sm:block">
              <CalendarIcon className="w-5 h-5" />
           </div>
           <div>
              <CardTitle className="text-lg font-bold tracking-tight">Planning</CardTitle>
           </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="flex items-center bg-secondary/50 rounded-lg p-0.5 border border-border/50">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePrev}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="px-3 min-w-[100px] text-center text-sm font-semibold cursor-pointer hover:bg-muted/50 rounded transition-colors" onClick={handleToday}>
                    Aujourd'hui
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleNext}>
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
            
            <div className="flex bg-secondary/50 p-0.5 rounded-lg border border-border/50">
                <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={handleMonth}>Mois</Button>
                <Button variant="secondary" size="sm" className="h-7 text-xs px-2" onClick={handleWeek}>Semaine</Button>
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 relative h-full">
         <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={false} 
            events={events}
            
            firstDay={1} 
            hiddenDays={[0]} 
            allDaySlot={false}
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            slotDuration="01:00:00"
            dayHeaderFormat="dddd DD/MM"
            

            
            slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }}
            eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                meridiem: false
            }}

            height="100%"
            expandRows={true}
            stickyHeaderDates={true}
            nowIndicator={true}
            
            eventContent={(info) => <CalendarEventCard eventInfo={info} />}
            eventClick={(info) => {
                const props = info.event.extendedProps;
                setSelectedEvent({
                    id: info.event.id,
                    title: info.event.title,
                    start: info.event.startStr,
                    end: info.event.endStr,
                    room: props.room,
                    subject: props.subject,
                    courseType: props.courseType,
                    teacher: props.teacher
                });
            }}

            dayHeaderClassNames="bg-muted/10 text-muted-foreground uppercase text-xs font-bold tracking-wider py-2"
            slotLabelClassNames="text-muted-foreground text-xs font-mono px-2"
            
            editable={false}
            selectable={false}
            selectMirror={false}
            eventMinHeight={40}
         />
      </CardContent>
    </Card>

    <EventDetailModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
    />
    </>
  );
}
