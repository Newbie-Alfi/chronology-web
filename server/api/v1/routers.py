from django.urls import include, path

from api.chronology.v1 import routers

app_name = "api.v1"

urlpatterns = routers.urlpatterns
