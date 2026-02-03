import { MapPin } from 'lucide-react';
import { getEventStyles } from './calendar-utils';

interface CalendarEventCardProps {
  eventInfo: any;
}

export default function CalendarEventCard({ eventInfo }: CalendarEventCardProps) {
  const { event } = eventInfo;
  const { extendedProps } = event;
  const styles = getEventStyles(extendedProps.courseType);
  const timeText = eventInfo.timeText; 

  return (
    <div className={`w-full h-full flex flex-col relative overflow-hidden rounded-md border-l-[4px] ${styles.bg} ${styles.border} text-white hover:brightness-105 transition-all shadow-md group cursor-pointer ring-1 ring-black/5`}>
      
      <div className="flex items-center justify-between p-1.5 pb-0 shrink-0">
           <span className="text-[10px] font-mono font-bold opacity-90 leading-none">
              {timeText}
           </span>
           {extendedProps.courseType && (
               <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded shadow-sm border border-white/10">
                   {extendedProps.courseType}
               </span>
           )}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center p-1 gap-1 min-h-0">
          
          <div className="font-bold text-xs sm:text-[13px] leading-tight line-clamp-3 drop-shadow-sm" title={event.title}>
            {extendedProps.subject || event.title}
          </div>
          
          {extendedProps.room && (
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold opacity-90 bg-black/10 px-2 py-0.5 rounded-full mt-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="font-mono truncate max-w-[120px]">
                      {extendedProps.room}
                  </span>
              </div>
          )}
      </div>
    </div>
  );
}
