from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from datetime import date
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'birth_date', 'password']

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Esse email já está cadastrado.")
        return value

    def validate_birth_date(self, value):
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 18:
            raise serializers.ValidationError("Você precisa ter pelo menos 18 anos para se cadastrar.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

