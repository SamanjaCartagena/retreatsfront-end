
import { Retreat } from "../data/retreats";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface RetreatCardProps {
  retreat: Retreat;
}

export function RetreatCard({ retreat }: RetreatCardProps) {
  const retreaturl =()=>{
    window.open(retreat.url,'_blank');
  }
  return (
    <Card className="rounded-xl overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer " onClick={retreaturl}>
      <div className="aspect-[5/3] overflow-hidden">
        <img
          src={retreat.image}
          alt={retreat.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif font-medium text-lg line-clamp-1">{retreat.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} fill="currentColor" className="text-retreat-forest" />
            <span>{retreat.rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2">
          {retreat.location}, {retreat.country}
        </p>
        <div className="flex justify-between items-center mt-1">
          <div className="flex gap-1 flex-wrap">
            {retreat.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="text-xs bg-retreat-sage/10 text-retreat-forest px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
            {retreat.categories.length > 2 && (
              <span className="text-xs text-muted-foreground">+{retreat.categories.length - 2}</span>
            )}
          </div>
        </div>
        <div className="mt-3 font-medium">
          <span className="text-lg">${retreat.price}</span>
          <span className="text-sm text-muted-foreground"> / person</span>
        </div>
      </CardContent>
    </Card>
  );
}
