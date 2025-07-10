// TypeScript API Service Layer
// Simulates the C++ Backend: Stablecoin Depeg Prediction Engine
// Matches the C++ data structures and risk calculation logic

export interface StablecoinData {
  name: string;
  price: number;
  onChainVolume: number;
  walletConcentration: number;
  marketVolatility: number;
  socialSentiment: number;
}

export interface RiskScore {
  score: number;
  level: "Low" | "Medium" | "High" | "Critical";
  reason: string;
}

export interface StablecoinAnalysis {
  data: StablecoinData;
  risk: RiskScore;
  timestamp: Date;
}

export interface AlertData {
  id: number;
  type: "info" | "warning" | "critical";
  title: string;
  message: string;
  timestamp: Date;
  coin: string;
}

// Simulates the C++ fetchStablecoinData function
function fetchStablecoinData(coin: string): StablecoinData {
  // Simulated values matching C++ implementation
  const randomValue = (min: number, max: number) => 
    Math.random() * (max - min) + min;
  
  return {
    name: coin,
    price: randomValue(0.95, 1.05),
    onChainVolume: randomValue(0.8, 2.0) * 1000000,
    walletConcentration: randomValue(0.05, 0.12),
    marketVolatility: randomValue(0.02, 0.08),
    socialSentiment: randomValue(20, 100)
  };
}

// Matches the C++ calculateRiskScore logic exactly
function calculateRiskScore(data: StablecoinData): RiskScore {
  let risk = 0.0;

  // Same risk calculation logic as C++ backend
  if (data.price < 0.98 || data.price > 1.02) risk += 2.0;
  if (data.onChainVolume > 1.5e6) risk += 1.5;
  if (data.walletConcentration > 0.08) risk += 1.0;
  if (data.marketVolatility > 0.04) risk += 1.0;
  if (data.socialSentiment < 40) risk += 0.5;

  let level: "Low" | "Medium" | "High" | "Critical" = "Low";
  if (risk > 3.0) level = "Medium";
  if (risk > 5.0) level = "High";
  if (risk > 6.5) level = "Critical";

  return { 
    score: risk, 
    level, 
    reason: "Calculated based on multi-factor model" 
  };
}

// Store for active alerts
let alertIdCounter = 1;
const activeAlerts: AlertData[] = [];

// Generate alerts based on risk levels
function generateAlert(analysis: StablecoinAnalysis): AlertData | null {
  const { data, risk } = analysis;
  
  if (risk.level === "Critical") {
    return {
      id: alertIdCounter++,
      type: "critical",
      title: `${data.name} Critical Risk Detected`,
      message: `Risk score: ${risk.score.toFixed(2)} - Immediate attention required`,
      timestamp: new Date(),
      coin: data.name
    };
  }
  
  if (risk.level === "High" && Math.random() > 0.7) {
    return {
      id: alertIdCounter++,
      type: "warning",
      title: `${data.name} High Risk Alert`,
      message: `Price deviation: ${((data.price - 1.0) * 100).toFixed(3)}%`,
      timestamp: new Date(),
      coin: data.name
    };
  }

  if (data.onChainVolume > 1.8e6 && Math.random() > 0.8) {
    return {
      id: alertIdCounter++,
      type: "info",
      title: `${data.name} High Volume Activity`,
      message: `Unusual on-chain volume detected: ${(data.onChainVolume / 1e6).toFixed(2)}M`,
      timestamp: new Date(),
      coin: data.name
    };
  }

  return null;
}

// Main API class that simulates the C++ backend
export class StablecoinAPI {
  private static instance: StablecoinAPI;
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private dataStore: Map<string, StablecoinAnalysis> = new Map();
  private listeners: ((data: StablecoinAnalysis[]) => void)[] = [];
  private alertListeners: ((alerts: AlertData[]) => void)[] = [];

  private constructor() {}

  static getInstance(): StablecoinAPI {
    if (!StablecoinAPI.instance) {
      StablecoinAPI.instance = new StablecoinAPI();
    }
    return StablecoinAPI.instance;
  }

  // Start monitoring (simulates the C++ thread-based monitoring)
  startMonitoring(coins: string[] = ["USDT", "USDC", "DAI", "FRAX"]): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log("[API] Starting stablecoin monitoring...");

    this.monitoringInterval = setInterval(() => {
      const analyses: StablecoinAnalysis[] = [];
      
      coins.forEach(coin => {
        const data = fetchStablecoinData(coin);
        const risk = calculateRiskScore(data);
        const analysis: StablecoinAnalysis = {
          data,
          risk,
          timestamp: new Date()
        };
        
        this.dataStore.set(coin, analysis);
        analyses.push(analysis);

        // Generate alerts
        const alert = generateAlert(analysis);
        if (alert) {
          activeAlerts.unshift(alert);
          // Keep only last 10 alerts
          if (activeAlerts.length > 10) {
            activeAlerts.pop();
          }
          this.notifyAlertListeners();
        }

        // Log like C++ backend
        console.log(`[${coin}] Price: ${data.price.toFixed(4)}, Risk: ${risk.score.toFixed(2)} (${risk.level})`);
      });

      this.notifyListeners(analyses);
    }, 3000); // 3 seconds like C++ implementation
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    console.log("[API] Stopped stablecoin monitoring");
  }

  // Subscribe to real-time data updates
  subscribe(callback: (data: StablecoinAnalysis[]) => void): () => void {
    this.listeners.push(callback);
    
    // Send current data immediately
    const currentData = Array.from(this.dataStore.values());
    if (currentData.length > 0) {
      callback(currentData);
    }

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Subscribe to alerts
  subscribeToAlerts(callback: (alerts: AlertData[]) => void): () => void {
    this.alertListeners.push(callback);
    
    // Send current alerts immediately
    callback([...activeAlerts]);

    return () => {
      const index = this.alertListeners.indexOf(callback);
      if (index > -1) {
        this.alertListeners.splice(index, 1);
      }
    };
  }

  // Get current data snapshot
  getCurrentData(): StablecoinAnalysis[] {
    return Array.from(this.dataStore.values());
  }

  // Get current alerts
  getCurrentAlerts(): AlertData[] {
    return [...activeAlerts];
  }

  // Dismiss alert
  dismissAlert(alertId: number): void {
    const index = activeAlerts.findIndex(alert => alert.id === alertId);
    if (index > -1) {
      activeAlerts.splice(index, 1);
      this.notifyAlertListeners();
    }
  }

  private notifyListeners(data: StablecoinAnalysis[]): void {
    this.listeners.forEach(listener => listener(data));
  }

  private notifyAlertListeners(): void {
    this.alertListeners.forEach(listener => listener([...activeAlerts]));
  }

  // Performance metrics (simulated)
  getPerformanceMetrics() {
    return {
      dataProcessingSpeed: 4800 + Math.random() * 100, // pts/sec
      alertLatency: 2.0 + Math.random() * 1.0, // ms
      predictionAccuracy: 94.0 + Math.random() * 2.0, // %
      dataSources: [
        { name: "Price Feeds", status: "healthy", uptime: "99.9%" },
        { name: "On-chain Data", status: "healthy", uptime: "99.7%" },
        { name: "Social Sentiment", status: Math.random() > 0.8 ? "warning" : "healthy", uptime: "97.2%" },
        { name: "DeFi Protocols", status: "healthy", uptime: "99.8%" }
      ]
    };
  }
}

// Export singleton instance
export const stablecoinAPI = StablecoinAPI.getInstance();

/*
Integration Notes for C++ Backend:

To connect this frontend to your actual C++ backend:

1. Replace this service with HTTP API calls to your C++ server
2. Your C++ backend would need to expose REST endpoints like:
   - GET /api/stablecoins - Get current data
   - GET /api/alerts - Get active alerts
   - POST /api/alerts/:id/dismiss - Dismiss alert
   - WebSocket /ws/live - Real-time data stream

3. Example C++ HTTP server integration:
   ```cpp
   // Add HTTP server library (e.g., cpp-httplib, crow, etc.)
   app.Get("/api/stablecoins", [](const Request& req, Response& res) {
       json response;
       for (const auto& coin : coins) {
           StablecoinData data = fetchStablecoinData(coin);
           RiskScore risk = calculateRiskScore(data);
           response[coin] = {
               {"data", {
                   {"name", data.name},
                   {"price", data.price},
                   {"onChainVolume", data.onChainVolume},
                   {"walletConcentration", data.walletConcentration},
                   {"marketVolatility", data.marketVolatility},
                   {"socialSentiment", data.socialSentiment}
               }},
               {"risk", {
                   {"score", risk.score},
                   {"level", risk.level},
                   {"reason", risk.reason}
               }}
           };
       }
       res.set_content(response.dump(), "application/json");
   });
   ```

4. Update the TypeScript service to make HTTP requests:
   ```typescript
   async fetchStablecoinData(): Promise<StablecoinAnalysis[]> {
       const response = await fetch('/api/stablecoins');
       return await response.json();
   }
   ```
*/
