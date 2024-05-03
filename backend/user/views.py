from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, TokenRefreshSerializer, LoginSerializer
from post.serializers import LabelSerializer
from .models import User
from post.models import Post

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from django.views.decorators.http import require_http_methods

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': str(user.username)
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        # phone = request.data.get('phone', None)

        if password is None:
            return Response({'error': 'please provide your password.'}, status=status.HTTP_400_BAD_REQUEST)
        elif username is None: # and phone is None:
            return Response({'error': 'please provide your username.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # if username is None:
            #     user = User.objects.get(phone=phone)
            #     username = user.username
                
            user = User.objects.get(username=username)

            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                response_data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username': str(user.username)
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

        except User.DoesNotExist:
            return Response({'error': 'invalid phone number or username.'}, status=status.HTTP_401_UNAUTHORIZED)


        def get(self, request): 

            authenticated_user = authenticate(username=request.username, password= request.password) 

            if not authenticated_user:
                return Response({'error': 'authentication failed'}, status=HTTP_401_UNAUTHORIZED)

            serializer = self.serializer_class(authenticated_user)
            return Response(serializer.data, status=HTTP_200_OK)

# class ProfileView():

class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def post(self, request):
        try:
            refresh = RefreshToken.for_user(user)
            refresh.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

def userinfo(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'user not found'}, status=404)

    followers = [{'username': follower.username, 'is_expert': follower.is_expert} for follower in user.get_followers]
    following = [{'username': following_user.username, 'is_expert': following_user.is_expert} for following_user in user.get_following]

    user_data = {
        'username': user.username,
        'photo' : user.photo,
        'is_expert': user.is_expert,
        'followers': followers,
        'following': following,
    }

    if user.is_expert:
        user_data = {
            'username': user.username,
            'photo' : user.photo,
            'is_expert': user.is_expert,
            'department': user.department,
            'followers': followers,
            'following': following
        }

    return JsonResponse(user_data, safe=False)


def usertagged(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'user not found'}, status=404)

    post_data = [{
        "postid" : post.postid,
        "title" : post.title,
        "body" : post.body,
        "label" : LabelSerializer(post.label).data,
        "upvotes" : post.upvotes.count(),
        "downvotes" : post.downvotes.count(),
        "created_at" : post.created_at,
        } for post in user.get_tagged]

    return JsonResponse(post_data, safe=False)


def userposts(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'user not found'}, status=404)
    
    posts = Post.objects.filter(author=user)

    post_data = [{
        "postid" : post.postid,
        "title" : post.title,
        "body" : post.body,
        "label" : LabelSerializer(post.label).data,
        "upvotes" : post.upvotes.count(),
        "downvotes" : post.downvotes.count(),
        "created_at" : post.created_at,
    } for post in posts]

    return JsonResponse(post_data, safe=False)

# @login_required
# @api_view(['POST'])
# @require_http_methods(['POST'])
def follow(request, username):
    user_to_follow = get_object_or_404(User, username=username)
    user = request.user

    if user == user_to_follow:
        return JsonResponse({"follow":"can't follow self"})
    elif user in user_to_follow.followers.all():
        return JsonResponse({"follow":"already following"})
    else:
        user.following.add(user_to_follow)

    return JsonResponse({"follow":"sucessful"})

# @login_required
# @api_view(['POST'])
# @require_http_methods(['POST'])
def unfollow(request, username):
    user_to_unfollow = get_object_or_404(User, username=username)
    user = request.user
    if user in user_to_unfollow.followers.all():
        user.following.remove(user_to_unfollow)
    else:
        return JsonResponse({"unfollow":"not following"})

    return JsonResponse({"unfollow":"sucessful"})

def finduser(request, whoisname):
    users = User.objects.all()

    name = whoisname

    if name:
        users = users.filter(username__icontains=name)

    user_data = [
        {
            'name': user.username,
            'photo': user.photo if user.photo else None,
        }
        for user in users
    ]

    if user_data == [] :
        user_data = [
            {
                'err' : 'not found'
            }
        ] 

    return JsonResponse(user_data, safe=False)
