package main

import (
	"log"
	"net/http"
	"time"

	pb "github.com/bredr/todo/pb"
	"github.com/bredr/todo/router"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
)

func main() {

	routing := &router.Router{}
	var opts []grpc.ServerOption
	s := grpc.NewServer(opts...)
	pb.RegisterTodoServer(s, routing)

	wrappedGrpc := grpcweb.WrapServer(s)
	httpSrv := &http.Server{
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       120 * time.Second,
		Addr:              ":8080",
	}
	httpSrv.Handler = http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		if wrappedGrpc.IsGrpcWebRequest(req) {
			wrappedGrpc.ServeHTTP(resp, req)
			return
		}
		// Fall back to other servers.
		http.DefaultServeMux.ServeHTTP(resp, req)
	})
	log.Fatal(httpSrv.ListenAndServe())
}
