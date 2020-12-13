#include "Cryptography1.h"
#include <iostream>
#include <iterator>
#include <boost/math/special_functions/prime.hpp>

using namespace std;

bool Cryptography::isPrime(int n)
{
    bool isPrime = true;
    if (n == 0 || n == 1)
    {
        isPrime = false;
    }
    else
    {
        for (int i = 2; i <= n / 2; ++i)
        {
            if (n % i == 0)
            {
                isPrime = false;
                break;
            }
        }
    }
    return isPrime;
}

Cryptography::Cryptography(int prime1, int prime2)
    : prime1(prime1), prime2(prime2)
{
    calculateModulus();
    calculateCarmichael();
    calculateE();
}
Cryptography::Cryptography()
{
    /* prime1 = generateRandomPrimeNumber();
    prime2 = generateRandomPrimeNumber() */
    prime1 = 61;
    prime2 = 53;
    calculateModulus();
    calculateCarmichael();
    calculateE();
}

void Cryptography::calculateModulus()
{
    modulus = prime1 * prime2;
}
void Cryptography::calculateCarmichael()
{
    carmichael = (prime1 - 1) * (prime2 - 1);
}
void Cryptography::calculateE()
{
    //Calculate E
    for (int i = 2; i < carmichael; i++)
    {
        if (carmichael % i != 0)
        {
            bool flag = isPrime(i);
            if (flag && i != prime1 && i != prime2)
            {
                e = i;
                cout<<e<<endl;
                calculateD();
                if(d> 0){
                    cout<<"Hello"<<endl;
                    break;
                }
            }
        }
    }
    //Calculate D

    
}
void Cryptography::calculateD(){
    bool loop = true;
    long int temp = 1;
    while (loop)
    {
        temp += carmichael;
        if (temp % e == 0)
        {
            d = temp / e;
            if (d != 0)
            {
                loop = false;
                break;
            }
        }
    }
}
int Cryptography::getFirstPartOfKey()
{
    return modulus;
}

int Cryptography::getSecondPartOfKey()
{
    return e;
}

std::string Cryptography::getDecryptedMessage(std::string message)
{
    std::string result;
    std::istringstream iss(message);
    std::vector<std::string> words(std::istream_iterator<std::string>{iss},
                                 std::istream_iterator<std::string>());
    long int pt, key = d, k;
    int i = 0;
    for ( string it: words)
    {
        auto ct = std::stoi(it);
        //cout << "M: " << it << endl;
        k = 1;
        for (int j = 0; j < key; j++)
        {
            k = k * ct;
            k = k % modulus;
        }
        char longToChar = k;
        result.push_back(longToChar);
    }
    return result;
}
int Cryptography::getD()
{
    return d;
}
