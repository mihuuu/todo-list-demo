from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "content", "finished", "priority", "expire_date")


class SelectTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id",)


class EditTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "content")


class EditPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "priority")


class EditTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "expire_date")
