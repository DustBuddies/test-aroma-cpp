// Example 3: Complex Switch and Condition Combinations
#include <string>
using namespace std;

int complexFunction7(string str) {
    int value = 0;
    for (char c : str) {
        switch (c) {
            case 'a': value += 1; break;
            case 'b': value += 2; break;
            case 'c': value += 3; break;
            case 'd':
                if (value % 2 == 0) {
                    value *= 2;
                } else {
                    value /= 2;
                }
                break;
            default:
                value -= 1;
        }
    }
    return value;
}

int complexFunction8(int p, int q) {
    int res = 0;
    for (int i = 0; i < p; i++) {
        if (i % 4 == 0) {
            res += q;
        } else if (i % 3 == 0) {
            res -= q;
        } else if (i % 2 == 0) {
            res *= q;
        } else {
            res /= (q + 1);
        }
    }
    return res;
}

int complexFunction9(int m, int n, int o) {
    int result = 0;
    if (m > n) {
        if (n > o) {
            result += m * n;
        } else {
            result -= o;
        }
    } else {
        if (m == o) {
            result += n;
        } else {
            result *= o;
        }
    }
    for (int i = 0; i < m + n + o; i++) {
        if (i % 5 == 0) {
            result++;
        }
    }
    return result;
}