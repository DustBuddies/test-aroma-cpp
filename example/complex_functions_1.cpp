// Example 1: Complex Decision Structures
#include <iostream>
using namespace std;

int complexFunction1(int a, int b, int c) {
    int result = 0;
    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                result += a + b + c;
            } else {
                result -= a + b;
            }
        } else if (b < 0) {
            result += a - b;
        } else {
            result *= c;
        }
    } else if (a < 0) {
        switch (c) {
            case 1: result += b; break;
            case 2: result -= b; break;
            case 3: result *= b; break;
            default: result /= (b + 1);
        }
    } else {
        for (int i = 0; i < 5; i++) {
            result += i * b;
        }
    }
    int sum = 0;
    for (int i = 0; i < c; i++) {
        if (i % 2 == 0) {
            sum += i;
        } else if (i % 3 == 0) {
            sum -= i;
        } else if (i % 5 == 0) {
            sum *= i;
        } else {
            sum /= (i + 1);
        }
    }
    return result, sum;
}

int complexFunction2(int a, int b, int c) {
    int result = 0;
    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                result += a + b + c;
            } else {
                result -= a + b;
            }
        } else if (b < 0) {
            result += a - b;
        } else {
            result *= c;
        }
    } else if (a < 0) {
        switch (c) {
            case 1: result += b; break;
            case 2: result -= b; break;
            case 3: result *= b; break;
            default: result /= (b + 1);
        }
    } else {
        for (int i = 0; i < 5; i++) {
            result += i * b;
        }
    }

    while (a > 0 && b > 0) {
        if (a % 2 == 0 && b % 3 == 0) {
            result += a - b;
        } else if (a % 5 == 0 || b % 7 == 0) {
            result *= a + b;
        } else {
            result /= (a + b + 1);
        }
        a--;
        b--;
    }
    int sum = 0;
    for (int i = 0; i < result; i++) {
        if (i % 2 == 0) {
            sum += i;
        } else if (i % 3 == 0) {
            sum -= i;
        } else if (i % 5 == 0) {
            sum *= i;
        } else {
            sum /= (i + 1);
        }
    }
    return result, sum;
}

int complexFunction3(int a, int b) {
    int result = 1;
    while (a > 0 && b > 0) {
        if (a % 2 == 0 && b % 3 == 0) {
            result += a - b;
        } else if (a % 5 == 0 || b % 7 == 0) {
            result *= a + b;
        } else {
            result /= (a + b + 1);
        }
        a--;
        b--;
    }
    int sum = 0;
    for (int i = 0; i < a; i++) {
        if (i % 2 == 0) {
            sum += i;
        } else if (i % 3 == 0) {
            sum -= i;
        } else if (i % 5 == 0) {
            sum *= i;
        } else {
            sum /= (i + 1);
        }
    }
    return result, sum;
}
