package main

import "C"
import (
	"math"
	"strconv"
	"strings"
	
)

type Cryptography struct {
	prime1     int
	prime2     int
	carmichael int
	modulus    int
	e          int
	d          int
}

//export Start
func Start(prime1 int, prime2 int) (int, int, int, int) {
	c := new(Cryptography)
	c.Init(61, 53)
	return c.modulus, c.carmichael, c.e, c.d
}

//export isPrime
func isPrime(value int) bool {
	for i := 2; i <= int(math.Floor(float64(value)/2)); i++ {
		if value%i == 0 {
			return false
		}
	}
	return value > 1
}
func (c *Cryptography) Init(prime1 int, prime2 int) {
	prime1 = 61
	prime2 = 53
	c.prime1 = prime1
	c.prime2 = prime2
	c.calculateModulus()
	c.calculateCarmichael()
	c.calculateE()
}
func (c *Cryptography) calculateModulus() {
	c.modulus = c.prime1 * c.prime2
}
func (c *Cryptography) calculateCarmichael() {
	c.carmichael = (c.prime1 - 1) * (c.prime2 - 1)
}
func (c *Cryptography) calculateE() {
	for i := 2; i < c.carmichael; i++ {
		if c.carmichael%i != 0 {
			flag := isPrime(i)
			if flag && i != c.prime1 && i != c.prime2 {
				c.e = i
				c.calculateD()
				if c.d > 0 {
					break
				}
			}
		}
	}
}
func (c *Cryptography) calculateD() {
	loop := true
	temp := 1
	for loop {
		temp += c.carmichael
		if temp%c.e == 0 {
			c.d = temp / c.e
			if c.d != 0 {
				loop = false
				break
			}
		}
	}
}
func (c *Cryptography) getFirstPartOfKey() int {
	return c.modulus
}

func (c *Cryptography) getSecondPartOfKey() int {
	return c.e
}

//export getDecryptedMessage
func getDecryptedMessage(message string, d int, modulus int) *C.char {
	result := ""
	msg := strings.Split(message, " ")
	for _, letter := range msg {
		temp := string(letter)
		byteVal, _ := strconv.Atoi(temp)
		k := 1
		for j := 0; j < d; j++ {
			k = k * byteVal

			k = k % modulus
		}

		result += string(k)
	}
	/* temp := string(msg[len(msg)-1])
	byteVal, _ := strconv.Atoi(temp)
	k := 1
	for j := 0; j < d; j++ {
		k = k * byteVal
		//fmt.Println(k)
		k = k % modulus
	}

	result += string(k) */
	return C.CString(result)
}
func (c *Cryptography) getD() int {
	return c.d
}
//export getEncryptedMessage
func getEncryptedMessage(message string, modulus int, e int) *C.char {
	result:= ""
	for _, letter := range message {
		//temp := char(letter)
		
		byteVal := int(letter)
		k := 1
		for j := 0; j < e; j++ {
			k = k * byteVal

			k = k % modulus
		}

		result += strconv.Itoa(k)
		result += " "
	}
	
	return C.CString(result)
}
func main() {
	//p1, p2, _, e, d := Start(2, 3)
	//str = "1087 3071 1877 1877 3183"
	//fmt.Println(e)
	//fmt.Println(getDecryptedMessage(p1, p2))
}
