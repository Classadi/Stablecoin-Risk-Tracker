#ifndef DATA_TYPES_HPP
#define DATA_TYPES_HPP

#include <string>
#include <vector>

struct StablecoinData {
    std::string name;
    double price;
    double supply;
    double marketCap;
    double volume24h;
    double pegDeviation;
    // Add more fields as needed
};

struct RiskScore {
    std::string coinName;
    double score;
    std::string reason;
};

#endif // DATA_TYPES_HPP
