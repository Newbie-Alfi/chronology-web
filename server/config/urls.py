from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


from api.v1 import routers


app_name = "chronology"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/token/", TokenObtainPairView.as_view(),  # type: ignore
         name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(),  # type: ignore
         name="token_refresh"),
    path("api/v1/token/verify/", TokenVerifyView.as_view(),  # type: ignore
         name="token_verify"),
    path("api/v1/", include(routers.urlpatterns)),
    path("api/v1/token/verify/", TokenVerifyView.as_view(),  # type: ignore
         name="token_verify"),
]
