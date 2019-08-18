from jwt import decode as jwt_decode
from rest_framework import serializers

from backend import settings
from .models import Result, MyUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('email', 'username')


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email', None)
        password = data['password']
        if not email:
            raise serializers.ValidationError(detail={'message': 'Email is required'})
        try:
            user = MyUser.objects.get(email=email)
        except MyUser.DoesNotExist:
            raise serializers.ValidationError(detail={'message': 'User not found'})
        if not user.check_password(password):
            raise serializers.ValidationError(detail={'message': 'Incorrect credentials'})
        if user.is_active:
            return user
        raise serializers.ValidationError(detail={'message': 'User is not active'})


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = MyUser.objects.create_user(validated_data['email'], validated_data['username'],
                                          validated_data['password'])

        return user


class ProfileSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        user_data = jwt_decode(data['token'], settings.SECRET_KEY, algorithms=['HS256'])
        user = MyUser.objects.get(id=user_data['user_id'])

        return user


class ModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['email', 'username']

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.save()

        return instance


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['nBlack', 'nWhite', 'finalTime']
