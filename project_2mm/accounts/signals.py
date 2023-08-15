# signals.py
from allauth.account.signals import user_logged_in
from django.dispatch import receiver
from posts.models import UserInfo
from .views import get_kakao_user_info

@receiver(user_logged_in)
def user_logged_in_handler(sender, request, user, **kwargs):
    access_token = request.data.get('kakaoToken')  # 카카오 로그인 후에 받은 토큰
    if access_token:
        user_info = get_kakao_user_info(access_token)

        if user_info:
            userinfo, created = UserInfo.objects.get_or_create(user=user)
            userinfo.nickname = user_info.get('kakao_account', {}).get('profile', {}).get('nickname')
            userinfo.save()

