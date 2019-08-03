package router

import (
	"context"
	"errors"
	pb "github.com/bredr/todo/pb"
	"github.com/google/uuid"
	"log"
)

type Router struct {
	Items []*pb.Item
}

var _ pb.TodoServer = &Router{}

func (r *Router) GetItem(ctx context.Context, req *pb.ID) (*pb.Item, error) {
	log.Printf("GetItem::%v", req)
	for _, v := range r.Items {
		if v.ID == req.ID {
			return v, nil
		}
	}
	return nil, errors.New("Not found")
}

func (r *Router) GetItems(ctx context.Context, req *pb.Pagination) (*pb.Items, error) {
	log.Printf("GetItems::%v", req)
	if len(r.Items) == 0 || int(req.Offset) >= len(r.Items) {
		return &pb.Items{}, nil
	}
	end := int(req.Limit + req.Offset)
	if end > len(r.Items) {
		end = len(r.Items)
	}
	return &pb.Items{Items: r.Items[req.Offset:end], Total: int32(len(r.Items)), Offset: req.Offset, Limit: int32(end) - req.Offset}, nil
}

func (r *Router) RemoveItem(ctx context.Context, req *pb.ID) (*pb.Empty, error) {
	log.Printf("RemoveItem::%v", req)
	var new []*pb.Item
	for _, v := range r.Items {
		if v.ID != req.ID {
			new = append(new, v)
		}
	}
	r.Items = new
	return &pb.Empty{}, nil
}

func (r *Router) UpsertItem(ctx context.Context, req *pb.Item) (*pb.ID, error) {
	log.Printf("UpsertItem::%v", req)
	if req.ID == "" {
		ID, err := uuid.NewRandom()
		if err != nil {
			return nil, err
		}
		req.ID = ID.String()
		r.Items = append(r.Items, req)
		return &pb.ID{ID: req.ID}, nil
	}
	for i, v := range r.Items {
		if v.ID == req.ID {
			r.Items[i] = req
			return &pb.ID{ID: req.ID}, nil
		}
	}
	return nil, errors.New("Unknown ID")
}
