from .views import GeoView
from rest_framework import routers

app_name = "geo"

router = routers.SimpleRouter()

router.register("geo", GeoView)

urlpatterns = router.urls
