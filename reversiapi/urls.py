from django.urls import path

from .views import LoginApiView, RegisterApiView, ProfileApiView, ModifyApiView, ResultApiView

urlpatterns = [
    path('user/login', LoginApiView.as_view()),
    path('user/register', RegisterApiView.as_view()),
    path('user/profile', ProfileApiView.as_view()),
    path('user/modify', ModifyApiView.as_view()),
    path('game/result', ResultApiView.as_view()),
]
