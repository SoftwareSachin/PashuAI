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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Current Mandi Prices</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="self-start sm:self-auto"
          data-testid="button-refresh-prices"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <Card className="p-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </Card>
      ) : (
        <>
          <div className="hidden md:block">
            <Card className="overflow-hidden">
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
                        <td className="px-6 py-4 text-sm text-foreground font-medium" data-testid={`commodity-${price.id}`}>{price.commodity}</td>
                        <td className="px-6 py-4 text-sm text-foreground font-mono" data-testid={`price-${price.id}`}>
                          ₹{price.price.toLocaleString()}/{price.unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground" data-testid={`market-${price.id}`}>{price.market}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className={`flex items-center gap-1 ${price.change >= 0 ? "text-green-600" : "text-red-600"}`} data-testid={`change-${price.id}`}>
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
            </Card>
          </div>

          <div className="md:hidden space-y-3">
            {prices.map((price) => (
              <Card key={price.id} className="p-4" data-testid={`price-card-${price.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1" data-testid={`commodity-${price.id}`}>
                      {price.commodity}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`market-${price.id}`}>
                      {price.market}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${price.change >= 0 ? "text-green-600" : "text-red-600"}`} data-testid={`change-${price.id}`}>
                    {price.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium text-sm">{Math.abs(price.change)}%</span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-foreground font-mono" data-testid={`price-${price.id}`}>
                  ₹{price.price.toLocaleString()}/{price.unit}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
