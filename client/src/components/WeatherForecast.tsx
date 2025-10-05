import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Loader2, Cloud, CloudRain, Sun } from "lucide-react";
import type { WeatherData } from "@shared/schema";

export function WeatherForecast() {
  const [location, setLocation] = useState("Delhi");
  const [searchInput, setSearchInput] = useState("");

  const { data: weather, isLoading } = useQuery<WeatherData>({
    queryKey: ["/api/weather", location],
  });

  const handleSearch = () => {
    if (searchInput.trim()) {
      setLocation(searchInput);
    }
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes("rain")) return CloudRain;
    if (condition.toLowerCase().includes("cloud")) return Cloud;
    return Sun;
  };

  return (
    <section id="weather">
      <h2 className="text-3xl font-semibold text-foreground mb-6">Weather Forecast</h2>
      
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search location..."
              className="pl-10"
              data-testid="input-location"
            />
          </div>
          <Button onClick={handleSearch} data-testid="button-search-weather">
            <MapPin className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : weather ? (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-1" data-testid="text-weather-location">
                {weather.location}
              </h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="text-5xl font-bold text-foreground" data-testid="text-temperature">
                  {weather.temperature}°C
                </div>
                <div>
                  <div className="text-lg text-foreground capitalize" data-testid="text-condition">
                    {weather.condition}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Humidity: {weather.humidity}% • Wind: {weather.windSpeed} km/h
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {weather.forecast.map((day, index) => {
                const Icon = getWeatherIcon(day.condition);
                return (
                  <Card key={index} className="p-4 text-center bg-muted" data-testid={`forecast-day-${index}`}>
                    <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground capitalize mb-2">{day.condition}</div>
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">{day.high}°</span>
                      <span className="text-muted-foreground"> / {day.low}°</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
      </Card>
    </section>
  );
}
