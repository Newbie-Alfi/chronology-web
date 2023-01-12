from django.urls import include, path

from api.chronology.v1 import routers
from api.authication.v1 import routers as auth_routers

app_name = "api.v1"

urlpatterns = routers.urlpatterns + auth_routers.urlpatterns
