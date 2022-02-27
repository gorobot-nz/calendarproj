package main

import (
	"fmt"
	"github.com/nu7hatch/gouuid"
	"net"
	"os"
	"strconv"
	"strings"
)

type MessageType int

const (
	FUNC MessageType = iota
	CLASSIQUE
)

type ConnectionStatus int

const (
	JOINING ConnectionStatus = iota
	LEAVING
)

const (
	port string = ":4545"
)

var p = fmt.Println
var pf = fmt.Printf

type Server struct {
	conn     *net.UDPConn
	messages chan string
	clients  map[*uuid.UUID]Client
}

type Client struct {
	userID   uuid.UUID
	userName string
	userAddr *net.UDPAddr
}

type Message struct {
	messageType      MessageType
	userID           *uuid.UUID
	userName         string
	content          string
	connectionStatus ConnectionStatus
	time             string
}

func (s *Server) handleMessage() {
	var buf [512]byte

	n, addr, err := s.conn.ReadFromUDP(buf[0:])
	if err != nil {
		return
	}

	msg := string(buf[0:n])
	m := s.parseMessage(msg)

	if m.connectionStatus == LEAVING {
		delete(s.clients, m.userID)
		s.messages <- msg
		p(m.userName, " left")
	} else {
		switch m.messageType {
		case FUNC:
			var c Client
			c.userAddr = addr
			c.userID = *m.userID
			c.userName = m.userName
			s.clients[m.userID] = c
			s.messages <- msg
			pf("%s joining", m.userName)
		case CLASSIQUE:
			pf("%s %s: %s", m.time, m.userName, m.content)
			s.messages <- msg
		}
	}
}

func (s *Server) parseMessage(msg string) (m Message) {
	stringArray := strings.Split(msg, "\x01")

	fmt.Println("")
	m.userID, _ = uuid.ParseHex(stringArray[0])
	messageTypeStr, _ := strconv.Atoi(stringArray[1])
	m.messageType = MessageType(messageTypeStr)
	m.userName = stringArray[2]
	m.content = stringArray[3]
	m.time = stringArray[4]
	if strings.HasPrefix(m.content, ":q") || strings.HasPrefix(m.content, ":quit") {
		m.connectionStatus = LEAVING
	}
	return
}

func (s *Server) sendMessage() {
	for {
		msg := <-s.messages
		for _, c := range s.clients {
			_, err := s.conn.WriteToUDP([]byte(msg), c.userAddr)
			checkError(err)
		}
	}

}

func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error:%s", err.Error())
		os.Exit(1)
	}
}

func main() {
	udpAddress, err := net.ResolveUDPAddr("udp4", port)
	checkError(err)

	var s Server
	s.messages = make(chan string, 20)
	s.clients = make(map[*uuid.UUID]Client, 0)

	s.conn, err = net.ListenUDP("udp", udpAddress)
	checkError(err)

	go s.sendMessage()

	for {
		s.handleMessage()
	}
}
