#ifndef LOGGER_HPP
#define LOGGER_HPP

#include <string>
#include <fstream>
#include <iostream>
#include <ctime>

class Logger {
public:
    enum Level {
        INFO,
        WARNING,
        ERROR
    };

    Logger(const std::string& filename) : log_file(filename, std::ios::app) {}

    void log(const std::string& message, Level level = INFO) {
        if (log_file.is_open()) {
            log_file << currentDateTime() << " [" << levelToString(level) << "] " << message << std::endl;
        } else {
            std::cerr << "Logger: Unable to open log file." << std::endl;
        }
    }

private:
    std::ofstream log_file;

    std::string currentDateTime() {
        std::time_t now = std::time(nullptr);
        char buf[80];
        std::strftime(buf, sizeof(buf), "%Y-%m-%d %X", std::localtime(&now));
        return buf;
    }

    std::string levelToString(Level level) {
        switch (level) {
            case INFO: return "INFO";
            case WARNING: return "WARNING";
            case ERROR: return "ERROR";
            default: return "UNKNOWN";
        }
    }
};

#endif // LOGGER_HPP
