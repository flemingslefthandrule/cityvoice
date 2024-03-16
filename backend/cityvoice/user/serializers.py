from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'phone', 'is_expert', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['phone'],
            validated_data['password'],
            is_expert=validated_data.get('is_expert', False)
        )
        return user

class ExpertUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'phone','photo', 'is_expert', 'password','department')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['phone'],
            validated_data['password'],
            is_expert=validated_data.get('is_expert', False)
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("incorrect credentials")

class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh = attrs.get('refresh')
        if refresh is None:
            raise serializers.ValidationError('refresh token is required.')

        try:
            refresh_token = RefreshToken(refresh)
            access_token = refresh_token.access_token
        except Exception as e:
            raise serializers.ValidationError(str(e))

        data = {
            'access': str(access_token),
        }
        return data