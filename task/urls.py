from django.urls import path

from .views import *

urlpatterns = [
    path('', TaskList.as_view(), name='task_list_url'),
    path('<str:id>/completed/', TaskComplete.as_view(), name="task_complete_url"),
    path('<str:id>/delete/', TaskDelete.as_view(), name="task_delete_url")
]
