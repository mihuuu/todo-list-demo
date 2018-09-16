from rest_framework import generics
from .models import Todo
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import status
from django.utils import timezone


class AllListView(generics.ListAPIView):
    # GET all/
    queryset = Todo.objects.all().order_by('finished', 'priority', '-c_time')
    serializer_class = TodoSerializer

class TodoListView(generics.ListAPIView):
    # GET todos/
    queryset = Todo.objects.filter(finished=False).order_by('-c_time', 'priority')
    serializer_class = TodoSerializer


class DoneListView(generics.ListAPIView):
    # GET dones/
    queryset = Todo.objects.filter(finished=True).order_by('-c_time')
    serializer_class = TodoSerializer


class AddTodoView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def post(self, request, *args, **kwargs):
        new_todo = Todo.objects.create(
            id=request.data["id"],
            content=request.data["content"],
            finished=False, priority=3,
            expire_date=None
        )
        return Response(
            data=TodoSerializer(new_todo).data,
            status=status.HTTP_201_CREATED
        )


class MarkTodoView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = SelectTodoSerializer

    # post id
    def post(self, request, *args, **kwargs):
        try:
            target_item = self.queryset.get(
                id=request.data["id"],
            )
            target_item.finished = not target_item.finished
            target_item.save()

            return Response(
                data={
                    "marked": True,
                    "item_id": target_item.id
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                data={"message": "item fail to mark!"},
                status=status.HTTP_404_NOT_FOUND
            )


class EditTodoView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = EditTodoSerializer

    # post id
    def post(self, request, *args, **kwargs):
        try:
            target_item = self.queryset.get(
                id=request.data["id"],
            )
            #print(target_item)
            target_item.content=request.data["content"]
            target_item.save()

            return Response(
                data={
                    "message": "SUCCESS"
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                data={"message": "item fail to edit!"},
                status=status.HTTP_404_NOT_FOUND
            )


class DeleteTodoView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = SelectTodoSerializer

    # post id
    def post(self, request, *args, **kwargs):
        try:
            target_item = self.queryset.get(
                id=request.data["id"],
            )
            target_item.delete()

            return Response(
                data={
                    "message": "SUCCESS"
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                data={"message": "item fail to delete!"},
                status=status.HTTP_404_NOT_FOUND
            )


class GetTodoView(generics.ListAPIView):
    # GET get_todo/
    queryset = Todo.objects.all()
    serializer_class = SelectTodoSerializer

    def post(self, request, *args, **kwargs):
        try:
            target_item = self.queryset.get(
                id=request.data["id"],
            )
            return Response(
                data=TodoSerializer(target_item).data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                data={"message": "item fail to get!"},
                status=status.HTTP_404_NOT_FOUND
            )


class EditPriorityView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = EditPrioritySerializer

    # post id
    def post(self, request, *args, **kwargs):
        try:
            target_item = self.queryset.get(
                id=request.data["id"],
            )
            #print(target_item)
            target_item.priority=request.data["priority"]
            target_item.save()

            return Response(
                data={
                    "message": "SUCCESS"
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                data={"message": "item fail to edit!"},
                status=status.HTTP_404_NOT_FOUND
            )


class EditTimeView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = EditTimeSerializer

    # post id
    def post(self, request, *args, **kwargs):
        try:
            target_item = self.queryset.get(
                id=request.data["id"],
            )
            #print(target_item)
            print(request.date["expire_date"])
            target_item.expire_date=request.data["expire_date"]
            target_item.save()

            return Response(
                data={
                    "message": "SUCCESS"
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                data={"message": "item fail to edit!"},
                status=status.HTTP_404_NOT_FOUND
            )