import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp } from "lucide-react";
import type { CropRecommendation } from "@shared/schema";

export function CropRecommendations() {
  const { data: crops = [], isLoading } = useQuery<CropRecommendation[]>({
    queryKey: ["/api/crops"],
  });

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section id="crops">
      <h2 className="text-3xl font-semibold text-foreground mb-6">Recommended Crops to Sell</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden hover-elevate" data-testid={`crop-card-${crop.id}`}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">{crop.name}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Profit Potential:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden w-24">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${crop.profitPotential}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{crop.profitPotential}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Market Demand:</span>
                    <Badge variant="outline" className={getDemandColor(crop.marketDemand)}>
                      {crop.marketDemand}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Season:</span>
                    <span className="text-sm font-medium text-foreground">{crop.season}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Investment:</span>
                    <span className="text-sm font-medium text-foreground">{crop.investment}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" data-testid={`button-view-details-${crop.id}`}>
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
