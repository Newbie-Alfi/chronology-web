from django.contrib import admin
from django.urls import include, path

from api.v1 import routers

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(routers.urlpatterns)),
]
