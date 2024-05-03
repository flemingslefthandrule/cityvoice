# under construction
# todo :
# import anonuser
# import requests
# write custom function to decode jwt token when pinged to verify token end point

class Auth(MiddlewareMixin):
    if not request.user.is_authenticated:
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]
        elif "accessToken" in request.GET:
            token = request.GET["accessToken"]
        else:
            token = None

        if token:
            url = "/user/token/verify/"
            payload = {}
            headers = {"Authorization": "Bearer {}".format(token)}
            response = requests.request("GET", url, headers=headers, data=payload)
            if response.ok:
                request.user = response.json()
            else:
                request.user = AnonymousUser
        else:
            request.user = AnonymousUser