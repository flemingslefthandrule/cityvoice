# city voice

to do

- [ ] accounts
    - [x] general `is_expert = False`
    - [x] expert/govt `is_expert = True`
    - [x] login : `/user/login/`
        - [x] username
        - [x] password
        <!-- - [ ] else : 
            - [ ] phone
                - [ ] otp
                - [x] phone and password? `username = User.objects.get(phone=phone)` -->
    - [x] register : `/user/register`
        - [x] username
        - [x] password
        - [x] phone
    - [x] logout `/user/logout`
- [ ] custom middleware for auth
- [x] profile page `/user/<username>`
    - [x] follow `/user/<username>/follow`
    - [x] unfollow `/user/<username>/unfollow`
    - [x] followers list `comes with userinfo at /user/<username>`
    - [x] following list `comes with userinfo at /user/<username>`
- [ ] post creation `/post/new`
    - [x]  text
    - [x] poll `/post/<postid>/add_poll/`
        - [x] poll results with percentage for each option `/post/<str:postid>/results/`
    - [ ]  image
    - [ ]  video
- [x] tag other accounts in post `"tagged" : {} in /post/`
- [x] reply to post `/post/<postid>/replies/create/`
- [x] upvote downvote posts `/post/<postid>/upvote/` - `/post/<postid>/upvote/`
- [x] upvote downvote replys `/reply/<replyid>/upvote/` - `/post/<postid>/upvote/`
- [x] hashtags ( topics ) `post/labels/`
- [ ] search and filters
    - [x] search post by words in title or body? `/post/whois/<phrase>/`
    - [x] search user by part of their username? `/user/whois/<part>/`
    - [x] search post by user? `/user/<username>/posts/`
    - [x] search posts tagged to user? `/user/<username>/tagged/`
- [ ] feed
   - [x] local feed
   - [x] follow feed
   - [ ] topic feed
   - [ ] global feed
- [ ] venv creation automate
- [ ] notifications
- [ ] talk with other servers

## contributors

<a href="https://github.com/flemingslefthandrule/cityvoice/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=flemingslefthandrule/cityvoice">
</a>