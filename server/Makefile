.PHONY: all
all: tools protos

.PHONY: protos
protos:
	protoc -I/usr/local/include -I. --go_out=plugins=grpc:.  pb/todo.proto


.PHONY: tools
tools:
	go get -u github.com/golang/protobuf/proto
	go get -d -u github.com/golang/protobuf/protoc-gen-go
	go install github.com/golang/protobuf/protoc-gen-go
	go get -u google.golang.org/grpc

.PHONY: start
start:
	go run main.go