from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import ValidationError

from .serializers import ResultSerializer, LoginSerializer, UserSerializer


class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({
                "message": e.detail['message'][0]
            }, status.HTTP_400_BAD_REQUEST)
        return Response(serializer.validated_data)


class RegisterApiView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "token": user.token,
        })


class ProfileApiView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def get(self, request):
        return Response({'email': request.user.email, 'name': request.user.username})

    def post(self, request):
        serializer = self.get_serializer(request.user, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            print(e)

        return Response({'email': request.user.email, 'name': request.user.username})


class ResultApiView(generics.GenericAPIView):
    serializer_class = ResultSerializer

    def get(self, request):
        serializer = self.get_serializer(data=request.user.result_set.all(), many=True)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(e)

        return Response(serializer.data)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(e)
        request.user.result_set.create(**serializer.validated_data)
        return Response()
