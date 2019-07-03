package router

import (
	"context"
	pb "github.com/bredr/todo/pb"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestRouter_GetItem(t *testing.T) {
	t.Run("item exists", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		result, _ := router.GetItem(context.TODO(), &pb.ID{ID: "2"})
		assert.Equal(t, result, &pb.Item{ID: "2", Description: "test2"})
	})
	t.Run("item not exists", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		result, err := router.GetItem(context.TODO(), &pb.ID{ID: "3"})
		assert.Nil(t, result)
		assert.Error(t, err, "Not found")
	})
}

func TestRouter_GetItems(t *testing.T) {
	t.Run("0 offset", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1"}, {ID: "2"}, {ID: "3"}, {ID: "4"}}}
		result, err := router.GetItems(context.TODO(), &pb.Pagination{Offset: 0, Limit: 2})
		assert.Nil(t, err)
		assert.Equal(t, result, &pb.Items{Items: []*pb.Item{{ID: "1"}, {ID: "2"}}, Total: 4, Offset: 0, Limit: 2})
	})
	t.Run("1 offset", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1"}, {ID: "2"}, {ID: "3"}, {ID: "4"}}}
		result, err := router.GetItems(context.TODO(), &pb.Pagination{Offset: 1, Limit: 2})
		assert.Nil(t, err)
		assert.Equal(t, result, &pb.Items{Items: []*pb.Item{{ID: "2"}, {ID: "3"}}, Total: 4, Offset: 1, Limit: 2})
	})
	t.Run("0 offset, large limit", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1"}, {ID: "2"}, {ID: "3"}, {ID: "4"}}}
		result, err := router.GetItems(context.TODO(), &pb.Pagination{Offset: 0, Limit: 10})
		assert.Nil(t, err)
		assert.Equal(t, result, &pb.Items{Items: []*pb.Item{{ID: "1"}, {ID: "2"}, {ID: "3"}, {ID: "4"}}, Total: 4, Offset: 0, Limit: 4})
	})
	t.Run("3 offset, large limit", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1"}, {ID: "2"}, {ID: "3"}, {ID: "4"}}}
		result, err := router.GetItems(context.TODO(), &pb.Pagination{Offset: 3, Limit: 10})
		assert.Nil(t, err)
		assert.Equal(t, result, &pb.Items{Items: []*pb.Item{{ID: "4"}}, Total: 4, Offset: 3, Limit: 1})
	})
	t.Run("offset > items", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1"}, {ID: "2"}, {ID: "3"}, {ID: "4"}}}
		result, err := router.GetItems(context.TODO(), &pb.Pagination{Offset: 4, Limit: 10})
		assert.Nil(t, err)
		assert.Nil(t, result)
	})}

func TestRouter_RemoveItem(t *testing.T) {
	t.Run("item exists", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		result, _ := router.RemoveItem(context.TODO(), &pb.ID{ID: "1"})
		assert.Equal(t, result, &pb.Empty{})
		assert.Equal(t, router.Items, []*pb.Item{{ID: "2", Description: "test2"}})
	})

	t.Run("item not exists", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		result, _ := router.RemoveItem(context.TODO(), &pb.ID{ID: "3"})
		assert.Equal(t, result, &pb.Empty{})
		assert.Equal(t, router.Items, []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}})
	})
}

func TestRouter_UpsertItem(t *testing.T) {
	t.Run("item exists", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		result, err := router.UpsertItem(context.TODO(), &pb.Item{ID: "1", Description: "test1update"})
		assert.Nil(t, err)
		assert.Equal(t, result, &pb.ID{ID: "1"})
		assert.Equal(t, router.Items, []*pb.Item{{ID: "1", Description: "test1update"}, {ID: "2", Description: "test2"}})
	})
	t.Run("item not exists", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		_, err := router.UpsertItem(context.TODO(), &pb.Item{Description: "test3"})
		assert.Nil(t, err)
		assert.Equal(t, router.Items[2].Description, "test3")
	})
	t.Run("item not exists and ID set", func(t *testing.T) {
		router := Router{Items: []*pb.Item{{ID: "1", Description: "test1"}, {ID: "2", Description: "test2"}}}
		_, err := router.UpsertItem(context.TODO(), &pb.Item{ID: "3", Description: "test3"})
		assert.Error(t, err, "Unknown ID")
	})
}
