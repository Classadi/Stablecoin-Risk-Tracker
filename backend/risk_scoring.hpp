#ifndef RISK_SCORING_HPP
#define RISK_SCORING_HPP

#include "data_types.hpp"
#include <vector>

// Calculates risk scores for a list of stablecoins
std::vector<RiskScore> calculateRiskScores(const std::vector<StablecoinData>& data);

#endif // RISK_SCORING_HPP
