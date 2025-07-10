#ifndef MONITOR_HPP
#define MONITOR_HPP

#include "data_types.hpp"
#include "risk_scoring.hpp"
#include "fetcher.hpp"
#include "logger.hpp"
#include <string>
#include <thread>
#include <chrono>

// Monitors a single stablecoin in a loop
void monitorStablecoin(const std::string& coinName, const std::string& apiUrl, Logger& logger, int intervalSeconds = 60);

#endif // MONITOR_HPP
