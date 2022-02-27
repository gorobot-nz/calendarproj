package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/nu7hatch/gouuid"
)

type MessageType int

const (
	FUNC MessageType = iota
	CLASSIQUE
)

type ConnectionStatus int

type Client struct {
	connection          *net.UDPConn
	alive               bool
	userID              uuid.UUID
	userName            string
	sendingMessageQueue chan string
	receiveMessages     chan string
}

var scanError error

func (c *Client) packMessage(msg string, messageType MessageType) string {
	return strings.Join([]string{c.userID.String(), strconv.Itoa(int(messageType)), c.userName, msg, time.Now().Format("15:04:05")}, "\x01")
}

func (c *Client) funcSendMessage(msg string) {
	message := c.packMessage(msg, FUNC)
	_, err := c.connection.Write([]byte(message))
	checkError(err)
}

func (c *Client) sendMessage() {
	for c.alive {

		msg := <-c.sendingMessageQueue
		message := c.packMessage(msg, CLASSIQUE)
		_, err := c.connection.Write([]byte(message))
		checkError(err)
	}

}

func (c *Client) receiveMessage() {
	var buf [512]byte
	for c.alive {
		n, err := c.connection.Read(buf[0:])
		checkError(err)
		c.receiveMessages <- string(buf[0:n])
		fmt.Println("")
	}
}

func (c *Client) readInput() {
	var msg string
	for c.alive {
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Split(bufio.ScanLines)
		for scanner.Scan() {
			msg = scanner.Text()
			if msg == ":quit" || msg == ":q" {
				c.alive = false
				return
			}
			c.sendingMessageQueue <- msg
		}
	}
}

func (c *Client) printMessage() {
	for c.alive {
		msg := <-c.receiveMessages
		stringArray := strings.Split(msg, "\x01")
		var userName = stringArray[2]
		var content = stringArray[3]
		var t = stringArray[4]
		if strings.HasPrefix(content, ":q") || strings.HasPrefix(content, ":quit") {
			fmt.Printf("%s is leaving", userName)
			fmt.Println("")
		} else {
			fmt.Printf("%s %s: %s", t, userName, content)
			fmt.Println("")
		}
	}
}

func nowTime() string {
	return time.Now().String()
}
func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error:%s", err.Error())
		os.Exit(1)
	}
}
func main() {
	udpAddr, err := net.ResolveUDPAddr("udp4", "127.0.0.1:4545")
	checkError(err)

	var c Client
	c.alive = true
	c.sendingMessageQueue = make(chan string)
	c.receiveMessages = make(chan string)
	u, err := uuid.NewV4()

	c.userID = *u

	fmt.Println("input name: ")
	_, err = fmt.Scanln(&c.userName)
	checkError(err)

	c.connection, err = net.DialUDP("udp", nil, udpAddr)
	checkError(err)
	defer c.connection.Close()

	c.funcSendMessage("joined")

	go c.printMessage()
	go c.receiveMessage()

	go c.sendMessage()
	c.readInput()

	c.funcSendMessage(":quit")

	os.Exit(0)
}
