from rest_framework import serializers
from .models import Post, Reply, Label, Poll, PollOption, PollVote

class PollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = ('id', 'text', 'vote_count')

class PollSerializer(serializers.ModelSerializer):
    options = PollOptionSerializer(many=True)

    class Meta:
        model = Poll
        fields = ('id', 'question', 'options') #, 'has_voted')

    def has_voted(self, instance, user):
        votes = instance.votes.filter(voter=user)
        return votes.exists()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        poll = PollSerializer(read_only=True)
        fields = ['postid', 'author', 'title', 'body', 'label', 'tagged', 'created_at', 'upvotes', 'downvotes', 'poll']
        read_only_fields = ['postid', 'created_at','poll']

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['replyid', 'post', 'author', 'body', 'created_at', 'upvotes', 'downvotes', 'parent']
        read_only_fields = ['replyid', 'created_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.parent:
            representation['parent'] = ReplySerializer(instance.parent).data
        return representation

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ['name']