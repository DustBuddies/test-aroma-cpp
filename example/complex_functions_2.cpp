// Example 2: Nested Loops and Conditions
#include <vector>
using namespace std;

int complexFunction4(const vector<int>& arr) {
    int count = 0;
    for (size_t i = 0; i < arr.size(); i++) {
        for (size_t j = 0; j < arr.size(); j++) {
            if (arr[i] == arr[j]) {
                count++;
            } else if (arr[i] > arr[j]) {
                count += 2;
            } else {
                count -= 1;
            }
        }
    }
    return count;
}

int complexFunction5(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            if (i % j == 0) {
                total++;
            }
        }
    }
    return total;
}

int complexFunction6(int x, int y) {
    int z = 0;
    for (int i = 0; i < x; i++) {
        for (int j = 0; j < y; j++) {
            if ((i + j) % 2 == 0) {
                z += i * j;
            } else if ((i * j) % 3 == 0) {
                z -= i + j;
            } else {
                z ^= i ^ j;
            }
        }
    }
    return z;
}
