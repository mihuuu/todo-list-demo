from django.urls import include, path
from .views import *

# api url 配置
urlpatterns = [
    path('api/all/', AllListView.as_view(), name="todos-all"),
    path('api/todo/', TodoListView.as_view(), name="todos"),
    path('api/done/', DoneListView.as_view(), name="dones"),
    path('api/add_todo/', AddTodoView.as_view(), name="add-new-todo"),
    path('api/mark_todo/', MarkTodoView.as_view(), name="mark-todo"),
    path('api/delete_todo/', DeleteTodoView.as_view(), name="delete-todo"),
    path('api/edit_todo/', EditTodoView.as_view(), name="edit-todo"),
    path('api/get_todo/', GetTodoView.as_view(), name="get-todo"),
    path('api/edit_priority/', EditPriorityView.as_view(), name="edit pri"),
    path('api/edit_time/', EditTimeView.as_view(), name="edit time")
]