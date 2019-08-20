from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import ResultSerializer, LoginSerializer, RegisterSerializer, ProfileSerializer, ModifySerializer


def get_token(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[0]
    data = {'token': token}
    return data


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
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            "token": str(refresh.access_token),
        })


class RegisterApiView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "token": str(refresh.access_token),
        })


class ProfileApiView(generics.GenericAPIView):
    serializer_class = ProfileSerializer

    def get(self, request):
        token = get_token(request)
        serializer = self.get_serializer(data=token)
        serializer.is_valid(raise_exception=False)
        user = serializer.validated_data

        return Response({'email': user.email, 'name': user.username})


class ModifyApiView(generics.GenericAPIView):
    serializer_class = ModifySerializer

    def post(self, request):
        token = get_token(request)
        profile_serializer = ProfileSerializer(data=token)
        profile_serializer.is_valid(raise_exception=True)
        user = profile_serializer.validated_data

        serializer = self.get_serializer(user, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            print(e)

        return Response({'email': user.email, 'name': user.username})


class ResultApiView(generics.GenericAPIView):
    serializer_class = ResultSerializer

    def get(self, request):
        token = get_token(request)
        profile_serializer = ProfileSerializer(data=token)
        profile_serializer.is_valid(raise_exception=True)
        user = profile_serializer.validated_data
        serializer = self.get_serializer(data=user.result_set.all(), many=True)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(e)

        return Response(serializer.data)

    def post(self, request):
        token = get_token(request)
        profile_serializer = ProfileSerializer(data=token)
        profile_serializer.is_valid(raise_exception=True)
        user = profile_serializer.validated_data
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(e)
        user.result_set.create(**serializer.validated_data)
        return Response()
