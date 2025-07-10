import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Activity,
  DollarSign,
  BarChart3,
  Bell,
  Zap
} from "lucide-react";

// Simulated real-time data
const generateMockData = () => ({
  stablecoins: [
    {
      symbol: "USDT",
      name: "Tether USD",
      price: 0.9998 + (Math.random() - 0.5) * 0.0002,
      depegRisk: Math.random() * 100,
      volume24h: 15000000000 + Math.random() * 5000000000,
      marketCap: 120000000000,
      status: Math.random() > 0.7 ? "warning" : "stable"
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      price: 1.0001 + (Math.random() - 0.5) * 0.0002,
      depegRisk: Math.random() * 100,
      volume24h: 8000000000 + Math.random() * 3000000000,
      marketCap: 35000000000,
      status: Math.random() > 0.8 ? "critical" : "stable"
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      price: 0.9999 + (Math.random() - 0.5) * 0.0003,
      depegRisk: Math.random() * 100,
      volume24h: 500000000 + Math.random() * 200000000,
      marketCap: 4500000000,
      status: "stable"
    },
    {
      symbol: "FRAX",
      name: "Frax",
      price: 1.0002 + (Math.random() - 0.5) * 0.0004,
      depegRisk: Math.random() * 100,
      volume24h: 100000000 + Math.random() * 50000000,
      marketCap: 1200000000,
      status: Math.random() > 0.6 ? "warning" : "stable"
    }
  ],
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "USDT Liquidity Decrease",
      message: "Significant reduction in DEX liquidity pools detected",
      timestamp: new Date(Date.now() - 300000),
      coin: "USDT"
    },
    {
      id: 2,
      type: "info",
      title: "Large Wallet Movement",
      message: "Whale wallet transferred 50M USDC to exchange",
      timestamp: new Date(Date.now() - 600000),
      coin: "USDC"
    }
  ]
});

const formatCurrency = (value: number) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

const getRiskColor = (risk: number) => {
  if (risk < 30) return "text-success";
  if (risk < 70) return "text-warning";
  return "text-destructive";
};

const getRiskBadge = (status: string) => {
  switch (status) {
    case "stable":
      return <Badge variant="outline" className="border-success text-success">Stable</Badge>;
    case "warning":
      return <Badge variant="outline" className="border-warning text-warning">Warning</Badge>;
    case "critical":
      return <Badge variant="destructive">Critical</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export function StablecoinDashboard() {
  const [data, setData] = useState(generateMockData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Stablecoin Depeg Tracker
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time monitoring and risk assessment system
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
          </div>
        </div>

        {/* Alert Banner */}
        {data.alerts.length > 0 && (
          <Alert className="border-warning/50 bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning">
              {data.alerts.length} active alert(s) - Check the alerts section for details
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="metrics">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stablecoin Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {data.stablecoins.map((coin) => (
                <Card key={coin.symbol} className="bg-card border-border hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{coin.symbol}</CardTitle>
                        <CardDescription>{coin.name}</CardDescription>
                      </div>
                      {getRiskBadge(coin.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="font-mono text-lg">
                          ${coin.price.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <span className={`font-bold ${getRiskColor(coin.depegRisk)}`}>
                          {coin.depegRisk.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={coin.depegRisk} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">24h Volume</span>
                        <span>{formatCurrency(coin.volume24h)}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Market Cap</span>
                        <span>{formatCurrency(coin.marketCap)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/20 rounded-lg">
                      <Shield className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stable Coins</p>
                      <p className="text-2xl font-bold">
                        {data.stablecoins.filter(c => c.status === "stable").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-warning/20 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">At Risk</p>
                      <p className="text-2xl font-bold">
                        {data.stablecoins.filter(c => c.status !== "stable").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                      <p className="text-2xl font-bold">{data.alerts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
                <CardDescription>
                  Real-time notifications for potential depeg events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.alerts.map((alert) => (
                    <div 
                      key={alert.id}
                      className="p-4 border border-border rounded-lg bg-card/50 animate-slide-up"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={alert.type === "warning" ? "outline" : "secondary"}>
                              {alert.coin}
                            </Badge>
                            <span className="font-medium">{alert.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Real-time processing metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Processing Speed</span>
                    <span className="font-mono text-sm">4,832 pts/sec</span>
                  </div>
                  <Progress value={96} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alert Latency</span>
                    <span className="font-mono text-sm">2.3ms</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prediction Accuracy</span>
                    <span className="font-mono text-sm">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                  <CardDescription>Connection status and health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Price Feeds", status: "healthy", uptime: "99.9%" },
                    { name: "On-chain Data", status: "healthy", uptime: "99.7%" },
                    { name: "Social Sentiment", status: "warning", uptime: "97.2%" },
                    { name: "DeFi Protocols", status: "healthy", uptime: "99.8%" }
                  ].map((source) => (
                    <div key={source.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          source.status === "healthy" ? "bg-success" : "bg-warning"
                        }`} />
                        <span className="text-sm">{source.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{source.uptime}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}