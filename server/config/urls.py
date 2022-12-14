from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from api.v1 import routers

schema_view = get_schema_view(
    openapi.Info(
        title="Хронология",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


app_name = "chronology"

urlpatterns = [
    path(
        "doc/",
        schema_view.with_ui("swagger", cache_timeout=0),  # type: ignore
        name="schema-swagger-ui",
    ),
    path("admin/", admin.site.urls),
    path(
        "api/v1/token/",
        TokenObtainPairView.as_view(),  # type: ignore
        name="token_obtain_pair",
    ),
    path(
        "api/v1/token/refresh/",
        TokenRefreshView.as_view(),  # type: ignore
        name="token_refresh",
    ),
    path(
        "api/v1/token/verify/",
        TokenVerifyView.as_view(),  # type: ignore
        name="token_verify",
    ),
    path("api/v1/", include(routers.urlpatterns)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
