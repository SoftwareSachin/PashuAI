import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import type { MarketPrice } from "@shared/schema";

export function MarketPrices() {
  const { data: prices = [], isLoading } = useQuery<MarketPrice[]>({
    queryKey: ["/api/market-prices"],
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/market-prices"] });
  };

  return (
    <section id="market-prices">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-foreground">Current Mandi Prices</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          data-testid="button-refresh-prices"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Commodity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Market</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price, index) => (
                  <tr
                    key={price.id}
                    className={index % 2 === 0 ? "bg-background" : "bg-card"}
                    data-testid={`price-row-${price.id}`}
                  >
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{price.commodity}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-mono">
                      ₹{price.price.toLocaleString()}/{price.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{price.market}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className={`flex items-center gap-1 ${price.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {price.change >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">{Math.abs(price.change)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  );
}
