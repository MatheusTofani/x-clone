from rest_framework import serializers
from .models import Post, Like
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']  

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    retweet_post = serializers.SerializerMethodField(read_only=True)
    retweet_post_id = serializers.PrimaryKeyRelatedField(
        queryset=Post.objects.all(), source='retweet_post', write_only=True, required=False
    )
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()  # ✅ novo campo

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'content', 'created_at',
            'retweet_post', 'retweet_post_id',
            'likes_count', 'is_liked', 'is_owner'  # ✅ incluir no Meta
        ]

    def get_retweet_post(self, obj):
     if obj.retweet_post:
        return PostSerializer(obj.retweet_post, context=self.context).data
     return None


    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False

    def get_is_owner(self, obj):
        user = self.context.get('request').user
        return obj.user == user if user.is_authenticated else False



class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']
