from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Result
from .serializers import ResultSerializer, LoginSerializer, RegisterSerializer


class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            "token": str(refresh.access_token),
        })


class RegisterApiView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "token": str(refresh.access_token),
        })


class ResultListView(APIView):

    def get(self, request):
        results = Result.objects.all()
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)

    def post(self):
        pass
