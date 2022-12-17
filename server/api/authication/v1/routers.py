from django.urls import path
from .views import MyObtainTokenPairView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "authication"

urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(),  # type: ignore
         name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(),  # type: ignore
         name='token_refresh'),
    path('register/', RegisterView.as_view(),  # type: ignore
         name='auth_register'),
]
