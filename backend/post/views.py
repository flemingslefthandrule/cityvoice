from rest_framework.generics import GenericAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Post, Reply, Label, Poll
from .serializers import PostSerializer, ReplySerializer, PollSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status

from django.db.models import Q

def getlabels(request):  
    labels = Label.objects.all()

    label_data = [{
        "name" : label.name,
    } for label in labels]

    return JsonResponse(label_data, safe=False)
       
class RenderLocalFeed(APIView):
    serializer_class = PostSerializer

    def get(self, request):
        posts = Post.objects.all().order_by("-created_at")[:50] 
        return Response(self.serializer_class(posts, many=True).data) 


class RenderFollowFeed(APIView):
    serializer_class = PostSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            following = user.get_following
            posts = Post.objects.filter(author__in=following).order_by("-created_at")[:50]
            serialized_posts = self.serializer_class(posts, many=True).data
            return Response(serialized_posts)
 


class CreateNewPostView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class PostDetailView(RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'postid'

class PostUpdateView(UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'postid'

class PostDeleteView(DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'postid'

class ReplyListView(RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer
    lookup_field = 'postid'

    def get_queryset(self):
        postid = self.kwargs.get('postid')
        post = get_object_or_404(Post, postid=postid)
        return post.replies.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CreateReplyView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        postid = self.kwargs.get('postid')
        post = Post.objects.get(postid=postid)
        serializer.save(post=post)

class ReplyDetailView(RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer
    queryset = Reply.objects.all()
    lookup_field = 'replyid'

class ReplyUpdateView(UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer
    queryset = Reply.objects.all()
    lookup_field = 'replyid'

class ReplyDeleteView(DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer
    queryset = Reply.objects.all()
    lookup_field = 'replyid'


class PostUpvote(APIView): 
    def post(self,request, postid):
        post = get_object_or_404(Post, postid=postid)
        user = request.user

        if user in post.upvotes.all():
            post.upvotes.remove(user.id)
        elif user in post.downvotes.all():
            post.downvotes.remove(user.id)
        else:
            post.upvotes.add(user.id)

        post = Post.objects.get(pk=post.pk)


        return Response({
            'message': 'Upvote successful' if user in post.upvotes.all() else 'Downvote removed' if user not in post.upvotes.all() else 'Downvote successful',
            'upvotes': post.upvotes.count(),
            'downvotes': post.downvotes.count(),
            'postid': post.postid
        })


class PostDownvote(APIView):
    def post(self,request, postid):
        post = get_object_or_404(Post, postid=postid)
        user = request.user

        if user in post.downvotes.all():
            post.downvotes.remove(user.id)
        elif user in post.upvotes.all():
            post.upvotes.remove(user.id)
        else:
            post.downvotes.add(user.id)

        post = Post.objects.get(pk=post.pk)


        return Response({
            'message': 'Downvote successful' if user in post.downvotes.all() else 'Upvote removed' if user not in post.downvotes.all() else 'Upvote successful',
            'downvotes': post.downvotes.count(),
            'upvotes': post.upvotes.count(),
            'postid': post.postid
        })

# todo : poll

class AddPoll(APIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PollSerializer

    def post(self, request, postid):
        post = get_object_or_404(Post, postid=postid)

        question = request.data.get('question')
        options = request.data.get('options')

        if question and options:
            poll = Poll.objects.create(question=question, post=post)
            for option_text in options:
                poll.options.create(text=option_text)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response({'error': 'missing question or options'}, status=400)

class VotePoll(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, postid, option_text):
        user = request.user

        post = get_object_or_404(Post, postid=postid)
        poll = get_object_or_404(Poll, post=post)
        has_voted = poll.has_voted(poll, request.user)
        option = get_object_or_404(poll.options.all(), text=option_text)

        if not poll.has_voted(poll, user): 
            vote = PollVote.objects.create(option=option, voter=user)
            option.vote_count += 1
            option.save()

        serializer = PostSerializer(post)
        return Response(serializer.data)

class PollResults(APIView):
    def get(self, request, postid):
        post = get_object_or_404(Post, postid=postid)
        poll = get_object_or_404(Poll, post=post)

        total_votes = sum(option.vote_count for option in poll.options.all())

        serializer = PollSerializer(poll)
        data = serializer.data

        data['total_votes'] = total_votes
        for option in data['options']:
            option['vote_percentage'] = (option['vote_count'] / total_votes) * 100 if total_votes > 0 else 0

        return Response(data)

# endtodo : poll


def findpost(request, whoispost):
    posts = Post.objects.all()

    titleorbody = whoispost

    if titleorbody:
        posts = posts.filter(Q(title__icontains=titleorbody) | Q(body__icontains=titleorbody))

    post_data = [
        {
            'title': post.title,
            'body': post.body,
            'author': post.author.username,
        }
        for post in posts
    ]

    if post_data == [] :
        post_data = [
            {
                'err' : 'not found'
            }
        ] 

    return JsonResponse(post_data, safe=False)
