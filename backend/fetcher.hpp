#ifndef FETCHER_HPP
#define FETCHER_HPP

#include "data_types.hpp"
#include <vector>
#include <string>

// Fetches stablecoin data from an API or data source
std::vector<StablecoinData> fetchStablecoinData(const std::string& apiUrl);

#endif // FETCHER_HPP
