from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Result, MyUser


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError(
                detail={'message': 'An email address is required to log in.'}
            )

        if password is None:
            raise serializers.ValidationError(
                detail={'message': 'A password is required to log in.'}
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(detail={
                'message': 'A user with this email and password was not found.'
            })

        if not user.is_active:
            raise serializers.ValidationError(detail={'message': 'User is not active'})

        return {
            'token': user.token
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        user = MyUser.objects.create_user(validated_data['email'], validated_data['username'],
                                          validated_data['password'])

        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.save()

        return instance


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['nBlack', 'nWhite', 'finalTime']
