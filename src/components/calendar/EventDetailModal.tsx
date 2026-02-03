import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, MapPin, Clock, GraduationCap } from 'lucide-react';
import moment from 'moment';
import { type PlanningEvent, getEventStyles } from './calendar-utils';

interface EventDetailModalProps {
  event: PlanningEvent | null;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[450px] p-0 gap-0 overflow-hidden border-0 shadow-2xl bg-card">
            {event && (
                <>
                <div className={`h-2.5 w-full ${getEventStyles(event.courseType).bg}`} />
                
                <DialogHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className={`${getEventStyles(event.courseType).light} border-0 uppercase tracking-widest font-black text-[10px] px-2 py-0.5 shadow-sm`}>
                            {event.courseType || "COURS"}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {moment(event.start).format('DD MMMM YYYY')}
                        </span>
                    </div>
                    <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-foreground">
                        {event.subject || event.title}
                    </DialogTitle>
                    <DialogDescription className="hidden">Details</DialogDescription>
                </DialogHeader>
                
                <div className="p-6 pt-4 grid gap-6">
                     <div className="flex flex-col gap-4">
                        <div className="space-y-1.5 bg-secondary/20 p-3 rounded-lg border border-border/50">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Horaire</span>
                            </div>
                            <p className="font-mono text-sm sm:text-base font-semibold text-foreground">
                                {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
                            </p>
                        </div>
                        <div className="space-y-1.5 bg-secondary/20 p-3 rounded-lg border border-border/50">
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Salle</span>
                            </div>
                            <p className="font-mono text-sm sm:text-base font-semibold text-foreground truncate" title={event.room}>
                                {event.room || "Non définie"}
                            </p>
                        </div>
                     </div>

                     <div className="space-y-2 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <GraduationCap className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Enseignant</span>
                        </div>
                         <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/40 transition-colors">
                            <p className="text-sm font-medium">
                                {(event.teacher || "Non assigné")
                                    .replace(/Monsieur/g, 'Mr')
                                    .replace(/Madame/g, 'Ms')
                                }
                            </p>
                         </div>
                     </div>
                </div>
                
                <div className="bg-muted/30 p-4 flex justify-end">
                     <Button variant="secondary" onClick={onClose}>Fermer</Button>
                </div>
                </>
            )}
        </DialogContent>
    </Dialog>
  );
}
